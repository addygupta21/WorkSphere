
// type Callback = (topic: string, args: any) => void;

// interface PubSub {
//   subscribe: (topic: string, func: Callback, id: string) => void;
//   publish: (topic: string, args: any) => void;
//   unsubscribe: (id: string) => void;
// }

// interface Subscription {
//   [key: string]: {
//     eventType: string;
//     callback: Callback;
//   };
// }

// const bridge: PubSub = (function (q) {
//   const subscriptions: Subscription = {}; // Map of subscriptionID → { eventType, callback }

//   q.subscribe = function (topic: string, func: Callback, id: string) {
//     subscriptions[id] = { eventType: topic, callback: func };
//   };

//   q.publish = function (topic: string, args: any) {
//     for (const id in subscriptions) {
//       if (subscriptions[id].eventType === topic) {
//         subscriptions[id].callback(topic, args);
//       }
//     }
//   };

//   q.unsubscribe = function (id: string) {
//     delete subscriptions[id];
//   };

//   return q;
// })({} as PubSub);

// export default bridge;




type Callback = (args: any) => void;

interface PubSub {
  subscribe: (event: string, func: Callback) => string;
  publish: (event: string, args: any) => boolean;
  unsubscribe: (token: string) => boolean;
}

const bridge: PubSub = (function (q) {
  const topics: Record<string, { token: string; func: Callback }[]> = {};  // Event -> {token, function}.
  let subUid = -1;

  q.subscribe = function (event, func) {
    if (!topics[event]) {
      topics[event] = [];
    }
    const token = (++subUid).toString();
    topics[event].push({ token, func });
    return token;  // After subscribing returns token to the subscriber.
  };

  q.publish = function (event, args) {
    if (!topics[event]) {
      return false;
    }
    setTimeout(() => {
      const subscribers = topics[event];
      let len = subscribers ? subscribers.length : 0;
      while (len--) {
        subscribers[len].func(args);
      }
    }, 0);
    return true;
  };

  q.unsubscribe = function (token) {
    for (const m in topics) {
      if (topics[m]) {
        for (let i = 0; i < topics[m].length; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return true;
          }
        }
      }
    }
    return false;
  };

  return q;
})({} as PubSub);

export default bridge;
