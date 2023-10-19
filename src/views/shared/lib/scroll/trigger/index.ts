import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ITriggerOnViewOptions {
  percent?: number
}

/**
 * Функция ставит тригер когда человек до скролил до конца блока -15% (15% по-умолчанию)
 */
export const triggerOnView = (trigger: gsap.DOMTarget, callbacks: Record<string, ScrollTrigger.Callback>, incOptions?: ITriggerOnViewOptions): ScrollTrigger => {
  const defaultOptions = {
    percent: 15,
  }

  const options = {
    ...defaultOptions,
    ...incOptions,
  }

  return ScrollTrigger.create({
    trigger,
    start: `bottom-=${options.percent}% bottom`,
    end: `bottom-=${options.percent}% top`,
    ...callbacks,
  });
}
