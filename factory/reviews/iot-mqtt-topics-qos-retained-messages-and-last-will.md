# Review: iot-mqtt-topics-qos-retained-messages-and-last-will

Fetched on 2026-11-23: OASIS MQTT 5.0 (both halves of the page), OASIS MQTT 3.1.1 (both halves), Mosquitto mosquitto.conf(5), Azure IoT Hub MQTT page, HiveMQ MQTT Essentials part 9, AWS IoT Core MQTT page.

Verified against the pages:
- Dates: 5.0 "07 March 2019"; 3.1.1 "29 October 2014"; 5.0 "replaces or supersedes" 3.1.1; Azure ms.date 2026-11-16; HiveMQ "FEB 9, 2026"; Mosquitto page states no version.
- Topics: case sensitivity and ACCOUNTS/Accounts (4.7.3); wildcards only in filters [MQTT-4.7.1-1]; `#` last and includes the parent level; `+` fills a whole level; `$` topics not matched by leading wildcards [MQTT-4.7.2-1]; `sys_interval` default 10 s, 0 disables.
- QoS: QoS 0 "once or not at all"; PUBACK for QoS 1, duplicates allowed; PUBLISH/PUBREC/PUBREL/PUBCOMP; delivered QoS is the minimum [MQTT-3.8.4-8]; Mosquitto `max_qos` per listener, default 2, disconnects; IoT Hub closes the connection on a QoS 2 publish and grants QoS 1 in SUBACK.
- Retained: [MQTT-3.3.1-5/-6/-7]; Retain Handling 0/1/2 [MQTT-3.3.1-9..11]; expired retained message is discarded (3.3.1.3); `retain_available` default true, disconnects when false; IoT Hub "doesn't persist Retain messages", adds `mqtt-retain`, passes to backend.
- Will: 5.0 triggers include Keep Alive failure and close without DISCONNECT 0x00; Will Delay default 0 and [MQTT-3.1.3-9]; Will Retain [MQTT-3.1.2-15]; 3.1.1 [MQTT-3.14.4-3] discards on any DISCONNECT; 3.1.1 "MAY defer publication of Will Messages until a subsequent restart"; IoT Hub Will topic `devices/{device-id}/messages/events/` and `iothub-MessageType` = `Will`.
- Checklist: HiveMQ pattern (`client1/status`, retained Offline will, retained Online) matches; HiveMQ does not mention publishing offline before a graceful DISCONNECT, so the claim in the post is true; step 3 is marked as inference in the sidecar. IoT Hub "Static, predefined topics", "No support for ... device-to-device communication", "only supports the documented topic names and topic filters". Mosquitto `persistence` default false, plugin persistence recommended, `autosave_on_changes` counts "retained messages received".
- AWS: "based on the MQTT v3.1.1 specification and the MQTT v5.0 specification, with some differences". Short quote, no AWS details claimed.

Standard checks:
- Sources: 6 in total. 4 primary (two OASIS specs, Mosquitto manual, Azure docs). HiveMQ is labelled as vendor guidance, not spec.
- No first-person build or use claims. No client or partner named. No marketing claim given as fact.
- Title is descriptive. The first paragraph names the reader, the problem, and what the reader gets.
- Adds a spec-vs-broker comparison, a six-step checklist, one step that HiveMQ omits, and an open question on Will timing after a broker restart.
- "What I could not confirm" section is present. "How this post was made" closing line is present.
- No widened scope found. "any DISCONNECT" (3.1.1) matches [MQTT-3.14.4-3]. "Does not support QoS 2" matches the IoT Hub page.

Checked: 62 sentences
VERDICT: PASS
