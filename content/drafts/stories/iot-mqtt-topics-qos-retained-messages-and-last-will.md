title: MQTT topics, QoS levels, retained messages and Last Will: what the spec says and where brokers differ
slug: iot-mqtt-topics-qos-retained-messages-and-last-will
excerpt: A reading of the OASIS MQTT 3.1.1 and 5.0 specs on topics, QoS 0 to 2, retained messages and the Will Message, set next to what Mosquitto and Azure IoT Hub document. Ends with a checklist for an online/offline status topic.
category: IoT
category: Research
date: 2026-11-23T22:30:00.000Z

If a device publishes its status over MQTT, will a new subscriber see it, and will anyone learn when the device drops off the network? This post is for developers who start with MQTT on devices. You get what the spec says about topics, QoS, retained messages and the Will Message, where Mosquitto and Azure IoT Hub document different behaviour, and a checklist for a status topic.

The facts come from the [MQTT 5.0 OASIS Standard](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html) of 7 March 2019 and the [MQTT 3.1.1 OASIS Standard](https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html) of 29 October 2014. MQTT 5.0 supersedes 3.1.1. Product behaviour comes from the [Mosquitto configuration manual](https://mosquitto.org/man/mosquitto-conf-5.html), version not stated, read 23 November 2026, and the [Azure IoT Hub MQTT page](https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub), dated 16 November 2026. That page says IoT Hub with the classic connection profile is not a full-featured MQTT broker.

## Topics: levels, wildcards and the `$` prefix

A client publishes to a Topic Name. A subscriber gives a Topic Filter. The `/` character splits a topic into levels. Topic Names and Topic Filters are case sensitive, so `ACCOUNTS` and `Accounts` are two topics.

Only filters can hold wildcards. The `+` wildcard matches one level and must fill the whole level. The `#` wildcard matches the parent level and any number of child levels. It must come last in the filter. A filter that starts with `#` or `+` does not match topics that start with `$`. Mosquitto updates its `$SYS` topics every 10 seconds by default, and `sys_interval 0` turns them off.

## QoS 0, 1 and 2: what each level promises

The spec defines three levels. QoS 0 is "at most once": there is no acknowledgement and no retry, so a message can be lost. QoS 1 is "at least once": the receiver answers with PUBACK, and duplicates can arrive. QoS 2 is "exactly once": a four-step flow runs PUBLISH, PUBREC, PUBREL and PUBCOMP.

A subscription carries a maximum QoS. The server delivers at the lower of the published QoS and the granted QoS.

Mosquitto has a `max_qos` option per listener, with a default of 2. A client that publishes above it gets disconnected. Azure IoT Hub, in its classic profile, does not support QoS 2. A device that publishes at QoS 2 loses its connection. A device that subscribes at QoS 2 gets a grant of QoS 1.

## Retained messages: the last value on a topic

A PUBLISH with the RETAIN flag set to 1 tells the server to store the message. It replaces the earlier retained message for that topic. A retained message with a zero-byte payload removes the stored one. By default, a new subscriber receives the last retained message on each matching topic.

In MQTT 5.0, Retain Handling 0 sends retained messages on each subscribe, 1 sends them only for a new subscription, and 2 sends none. A Message Expiry Interval can discard a retained message when it runs out.

Mosquitto has `retain_available`, true by default. When it is false, a client that sends a retained message gets disconnected. Azure IoT Hub classic does not store retained messages. It adds an `mqtt-retain` property and passes the message to the backend.

## The Will Message: news of an unclean disconnect

A client can put a Will Message in its CONNECT packet. The server publishes it when the network connection closes without a normal DISCONNECT, for example after a missed keep-alive. In 5.0, a DISCONNECT with reason code 0x00 removes the Will Message unsent. In 3.1.1, any DISCONNECT removes it.

MQTT 5.0 adds a Will Delay Interval, 0 by default. The server waits for the interval or for the session end. If the client reconnects first, the server does not send the will. 3.1.1 defines no such interval. With Will Retain set, the server publishes the will as a retained message.

Azure IoT Hub classic tells devices to use its telemetry topics as the will topic. It forwards the will as telemetry, marked with `iothub-MessageType` set to `Will`.

## Checklist: an online/offline status topic

[HiveMQ](https://www.hivemq.com/blog/mqtt-essentials-part-9-last-will-and-testament/), a broker vendor, describes a pattern in a February 2026 article. It is vendor guidance, not part of the spec. The checklist adds steps from the spec and product docs:

1. At CONNECT, set a will of `offline` on a topic such as `client1/status`, with Will Retain on.
2. After CONNECT, publish a retained `online` to the same topic.
3. Before a planned DISCONNECT, publish a retained `offline` yourself. A normal DISCONNECT deletes the will, so the topic would still say `online`.
4. On MQTT 5.0, decide on a Will Delay Interval. A short reconnect inside the interval sends no `offline`.
5. On Azure IoT Hub classic this pattern does not apply. The hub accepts only its own predefined topics, does not store retained messages, and does not support device-to-device communication.
6. Check if retained messages must survive a broker restart. On Mosquitto, turn on persistence: the built-in `persistence true` or, as the manual recommends, a persistence plugin. Its `autosave_on_changes` entry counts retained messages received toward a save of the built-in database.

HiveMQ's article does not mention step 3. One question stays open. With persistence on, a retained `online` can outlive a broker restart. The 3.1.1 spec lets a server defer the will after its own failure. The sources do not say when Mosquitto then sends it, so a subscriber could read a stale `online`.

## What I could not confirm

- The [AWS IoT Core MQTT page](https://docs.aws.amazon.com/iot/latest/developerguide/mqtt.html) says AWS has "some differences" from the specs. The page was too long to read in full, so this post gives no AWS details.
- I did not read sections 4.3 and 4.7 of the 5.0 spec in full. The QoS flow and topic rules come from the 3.1.1 text and the 5.0 packet sections.
- No broker was run, so step 6 is not tested.

*How this post was made: an AI agent researched and drafted it from the sources linked above, a second agent checked it against those sources, and Timur merged it.*
