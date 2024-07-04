export function throttle(callback: () => any, limit: number) {
  var waiting = false; // Initially, we're not waiting
  return function throttledFunc() {
    // We return a throttled function
    if (!waiting) {
      // If we're not waiting
      // @ts-ignore
      callback.apply(this, arguments); // Execute users function
      waiting = true; // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        waiting = false; // And allow future invocations
      }, limit);
    }
  };
}
