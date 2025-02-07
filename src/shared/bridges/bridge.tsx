type Callback = (topic: string, args: any) => void;

interface PubSub {
  subscribe: (topic: string, func: Callback, id: string) => void;
  publish: (topic: string, args: any) => void;
  unsubscribe: (id: string) => void;
}

interface Subscription {
  [key: string]: {
    eventType: string;
    callback: Callback;
  };
}

const bridge: PubSub = (function (q) {
  const subscriptions: Subscription = {}; // Map of subscriptionID → { eventType, callback }

  q.subscribe = function (topic: string, func: Callback, id: string) {
    subscriptions[id] = { eventType: topic, callback: func };
  };

  q.publish = function (topic: string, args: any) {
    for (const id in subscriptions) {
      if (subscriptions[id].eventType === topic) {
        subscriptions[id].callback(topic, args);
      }
    }
  };

  q.unsubscribe = function (id: string) {
    delete subscriptions[id];
  };

  return q;
})({} as PubSub);

export default bridge;
