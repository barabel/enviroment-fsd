import { addScrollableSelector, clearQueueScrollLocks, disablePageScroll, enablePageScroll } from 'scroll-lock';

export class ScrollLock {
  public lock(element?: HTMLElement): void {
    addScrollableSelector(['[data-overlayscrollbars-viewport]', '[data-scroll-lock-scrollable]']);
    disablePageScroll(element);
  }

  public enable(element?: HTMLElement): void {
    enablePageScroll(element);
  }

  public enableAll(): void {
    clearQueueScrollLocks();
    enablePageScroll();
  }
}
