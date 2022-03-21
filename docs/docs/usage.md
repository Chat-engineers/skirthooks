# Using Skirthooks

Let's get you through your first Skirthooks app!

## Skirthooks is MQTT

Sounds scary huh? Well, it isn't. MQTT is a fancy name for a very simple way to exchange data between machines in the Internet Of Things world. But why use it for LiveChat webhooks?

- MQTT is broker based. This means no web servers setup for you. No tunnels, no port forwarding, no magic.
- Using MQTT subscriptions leads to a nice and clean architecture. Your apps are decoupled, with less code and state to manage.
- MQTT takes care of hard things like network failure tolerance, so you focus on your apps.

## Credentials

To connect to Skirthooks broker, you will need to use your username and password. To access these, visit [Skirthooks settings on LiveChat](https://my.livechatinc.com/settings/applications/skirthooks). You can find the connect URL for clients that support it and by clicking Advanced you can find detailed information about your credentials.

## Subscribing to webhooks

So how does it work? As written above, we will subscribe to topics according the webhooks to consume. The topic name consists of your license id, a slash `/` and the webhook topic.

Examples:

| License id | Webhooks           | Topic                     |
| ---------- | ------------------ | ------------------------- |
| 100233     | incoming_event     | 100233/incoming_event     |
| 100233     | incoming_chat      | 100233/incoming_chat      |
| 381132     | routing_status_set | 381132/routing_status_set |

There is a very special topic that you can use to subscribe to all available webhooks. It's recommended to use that only for debugging reasons as it can stress your infrastructure without any benefit.
To subscribe to all available webhooks, use `#` for webhook. For example, `100233/#`.

## Your first application - aka hello world

Let's build an application that will output the URL the chat has started on. For this one, we will use [HiveMQ cli client](https://hivemq.github.io/mqtt-cli/) and [jq](https://stedolan.github.io/jq/) utilities to be installed on our computer.

Go to [Skirthooks settings on LiveChat](https://my.livechatinc.com/settings/applications/skirthooks) and copy the HiveMQ example. Open a terminal and paste it there. Change the topic to "incoming_chat" and add the jq extraction command. It should look like this:

```bash
$ mqtt sub -V 3 \
 --host skirthooks.chatengineers.com \
 --port 1883 \
 --topic <your license id>/incoming_chat \
 --user <your license id> \
 --password your-password-here \
 | jq .payload.chat.thread.properties.routing.start_url
```

Hit the enter key and go start a chat somewhere. You will notice something like the below coming to your terminal:

```
"https://direct.lc.chat/00000000/"
```

Congrats! You just built your first Skirthooks app!

## Building an app with node.js

Building apps with Skirthooks is even easier with node.js. Consider this example from mqtt.js.

```javascript
const mqtt = require("mqtt");

const MQTT_URL = "mqtt://username:password@skirthooks.chatengineers.com"; // Take this from Skirthooks settings
const topic = "00000000/#"; // replace 00000000 with your license id

const client = mqtt.connect(MQTT_URL);

client.on("connect", function () {
  client.subscribe(topic);
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
});
```

That's it! Run your app and go start a chat.
