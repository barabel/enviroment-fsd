export type TthrottledEventHandler = (this: any) => void;
export type Tthrottle = (callback: Function, delay?: number) => TthrottledEventHandler;

/**
 * функция, которая вызывает другую функцию, «пропуская» некоторые вызовы с определённой периодичностью.
 */
export const throttle: Tthrottle = (fn, wait = 300) => {
  let inThrottle: boolean,
    lastFn: ReturnType<typeof setTimeout>,
    lastTime: number;

  return function(this: any) {
    const args = arguments;

    if (!inThrottle) {
      fn.apply(this, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(this, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
