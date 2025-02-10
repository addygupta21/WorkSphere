type Callback = (args: any) => void;

interface PubSub {
  subscribe: (event: string, func: Callback) => string;
  publish: (event: string, args: any) => boolean;
  unsubscribe: (token: string) => boolean;
}

const bridge: PubSub = (function (q) {
  const topics: Record<string, { token: string; func: Callback }[]> = {};  // Event -> {token, function}.
  let Uid = -1;

  q.subscribe = function (event, func) {
    if (!topics[event]) {
      topics[event] = [];
    }
    const token = (++Uid).toString();
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
