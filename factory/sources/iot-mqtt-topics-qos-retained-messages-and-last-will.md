# Sources: iot-mqtt-topics-qos-retained-messages-and-last-will

Primary: OASIS MQTT 5.0 and 3.1.1 specs, Mosquitto manual, Azure IoT Hub docs. Secondary (vendor article): HiveMQ.

## Spec versions

- MQTT 5.0 is an OASIS Standard dated 7 March 2019.
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- MQTT 5.0 supersedes MQTT 3.1.1 (Related work section).
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- MQTT 3.1.1 is an OASIS Standard dated 29 October 2014.
  Source: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
- The Azure IoT Hub MQTT page is dated 16 November 2026 (ms.date).
  Source: https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub
- IoT Hub with the classic connection profile "isn't a full-featured MQTT broker" (section "Compare MQTT support in IoT Hub and Event Grid").
  Source: https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub
- The Mosquitto configuration manual states no version or date; read on 23 November 2026. The Mosquitto defaults in this post are as shown on that page on that day.
  Source: https://mosquitto.org/man/mosquitto-conf-5.html

## Topics

- A Topic Name labels an Application Message; a Topic Filter in a subscription states interest in one or more topics (5.0 section 1.2).
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- "/" divides a topic into levels (3.1.1 section 4.7).
  Source: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
- Topic Names and Topic Filters are case sensitive; "ACCOUNTS" and "Accounts" differ (3.1.1 section 4.7.3).
  Source: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
- Wildcards are allowed only in filters, not in Topic Names [MQTT-4.7.1-1]; 5.0 also says PUBLISH Topic Names must not contain wildcards [MQTT-3.3.2-2].
  Source: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- "+" matches exactly one level and must occupy an entire level [MQTT-4.7.1-3].
  Source: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
- "#" matches the parent level and any number of child levels and must be the last character [MQTT-4.7.1-2].
  Source: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
- Filters starting with "#" or "+" do not match Topic Names starting with "$"; a client subscribes to "$SYS/#" separately [MQTT-4.7.2-1].
  Source: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
- Mosquitto `sys_interval` defaults to 10 seconds; 0 disables the $SYS hierarchy.
  Source: https://mosquitto.org/man/mosquitto-conf-5.html

## QoS

- QoS 0 is at most once, QoS 1 at least once, QoS 2 exactly once (5.0 Abstract, 3.3.1.2).
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- QoS 0 has no acknowledgement or retry; message loss can occur (3.1.1 section 4.3.1; 5.0 Abstract).
  Source: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
- QoS 1 is acknowledged by PUBACK; duplicates can occur.
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- QoS 2 uses PUBLISH, PUBREC, PUBREL, PUBCOMP (Table 2-1; 3.1.1 section 4.3.3).
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- A Subscription comprises a Topic Filter and a maximum QoS (1.2); delivered QoS is the minimum of published QoS and granted maximum QoS [MQTT-3.8.4-8].
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- Mosquitto `max_qos` is per listener, default 2; clients publishing with a too-high QoS are disconnected.
  Source: https://mosquitto.org/man/mosquitto-conf-5.html
- Azure IoT Hub (classic profile) does not support QoS 2; a QoS 2 publish closes the network connection.
  Source: https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub
- A QoS 2 subscription to IoT Hub gets maximum QoS 1 in SUBACK.
  Source: https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub

## Retained messages

- RETAIN=1 makes the server replace any existing retained message for the topic and store the new one [MQTT-3.3.1-5].
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- A zero-byte payload removes the retained message for that topic and is not stored [MQTT-3.3.1-6, -7].
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- By default (Retain Handling 0 in 5.0), on a new subscription the last retained message on each matching topic is sent. MQTT 5.0 Retain Handling can change this.
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- Retain Handling 0 sends at subscribe, 1 only if the subscription did not exist, 2 does not send [MQTT-3.3.1-9..11].
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- When a retained message's Message Expiry Interval passes, it is discarded (3.3.1.3).
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- Mosquitto `retain_available` defaults to true; when false, clients sending retained messages are disconnected.
  Source: https://mosquitto.org/man/mosquitto-conf-5.html
- Mosquitto `persistence` defaults to false; data is stored in memory only unless true.
  Source: https://mosquitto.org/man/mosquitto-conf-5.html
- Mosquitto `persistence` enables built-in persistence; the manual says "It is recommended that a plugin based persistence is used instead." When enabled, data is written to disk in mosquitto.db and reloaded on restart.
  Source: https://mosquitto.org/man/mosquitto-conf-5.html
- Mosquitto `autosave_on_changes`: if true, Mosquitto counts subscription changes, "retained messages received" and queued messages, and saves the in-memory database when the total exceeds `autosave_interval`. Applies to built-in persistence only.
  Source: https://mosquitto.org/man/mosquitto-conf-5.html
- IoT Hub does not persist Retain messages; it adds the `mqtt-retain` property and passes the message to the backend.
  Source: https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub
- IoT Hub classic has "Static, predefined topics" and "No support for ... device-to-device communication" (comparison table). IoT Hub "isn't a general-purpose publish-subscribe messaging broker, it only supports the documented topic names and topic filters" (section "Receive cloud-to-device messages"). Checklist step 5 rests on these lines and uses the page's own wording "device-to-device communication". The page also says IoT Hub passes messages to the backend application, so step 5 does not claim that no other client receives device messages.
  Source: https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub

## Will Message

- The server publishes the Will Message after the network connection closes without a normal DISCONNECT; triggers include keep-alive timeout (5.0 section 3.1.2.5; 3.1.1 section 3.1.2.5).
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
  Source: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
- In 5.0, DISCONNECT with reason code 0x00 removes the Will Message without publishing [MQTT-3.1.2-10].
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- In 3.1.1, on receipt of DISCONNECT the Server must discard the Will Message without publishing it (section 3.14.4, [MQTT-3.14.4-3]). The 3.1.1 DISCONNECT has no reason code.
  Source: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
- Will Delay Interval defaults to 0; the server waits for the interval or session end; if a new connection arrives first, it does not send the will [MQTT-3.1.3-9].
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- 3.1.1 defines no Will Delay Interval; it lets the server defer Will publication after a server shutdown or failure.
  Source: https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html
- With Will Retain 1, the server publishes the Will Message as retained [MQTT-3.1.2-15].
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html
- IoT Hub: devices should use `devices/{device-id}/messages/events/` as Will topic; IoT Hub sends the will to the telemetry channel with `iothub-MessageType` = `Will`.
  Source: https://learn.microsoft.com/en-us/azure/iot/iot-mqtt-connect-to-iot-hub

## Status-topic pattern (vendor article)

- HiveMQ (article dated 9 Feb 2026) suggests a retained "Offline" will on e.g. `client1/status`, then a retained "Online" after connect; on unexpected disconnect the will becomes the new retained message.
  Source: https://www.hivemq.com/blog/mqtt-essentials-part-9-last-will-and-testament/
- Checklist step 3 (publish `offline` before a planned DISCONNECT) is derived from [MQTT-3.1.2-10]; it is the writer's inference, not stated by HiveMQ.
  Source: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html

## Other

- AWS IoT Core MQTT support is based on 3.1.1 and 5.0 "with some differences".
  Source: https://docs.aws.amazon.com/iot/latest/developerguide/mqtt.html

## Not measured

- AWS IoT Core's listed differences from the spec (page not read in full).
- MQTT 5.0 section 4.3 and 4.7 text (not read; QoS flow and topic rules taken from 3.1.1 and 5.0 packet sections).
- The restart behaviour of Mosquitto retained messages was not tested (no broker was run).
- When Mosquitto publishes a will after its own restart.
- No broker was run; no behaviour was tested.
