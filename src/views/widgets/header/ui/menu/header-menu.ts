import { ScrollLock, ScrollCustom } from '@/shared/lib/scroll';
import { initHeaderCallback } from '../callback';

const bodyScrollLock = new ScrollLock();

interface headerMenuOptions {
  beforeOpen?: Function
  beforeClose?: Function
}

export class HeaderMenu {
  private readonly menu: HTMLElement;
  private readonly options?: headerMenuOptions;
  private readonly headerMenuOpened: string;
  private readonly headerLink: {
    link: string
    fade: string
    active: string
  }

  constructor(menu: HTMLElement, options?: headerMenuOptions) {
    this.menu = menu;
    this.options = options;
    this.headerMenuOpened = 'header-menu--opened';
    this.headerLink = {
      link: 'header-menu__link',
      fade: 'header-menu__link--fade',
      active: 'header-menu__link--active',
    }

    this.init();
  }

  private init(): void {
    const scrollWrapper = this.menu.querySelector<HTMLElement>('.header-menu__scroll-wrapper');
    if (scrollWrapper !== null) {
      new ScrollCustom(scrollWrapper);
    }

    const burger = this.menu.querySelector<HTMLElement>('.header-menu__burger');
    if (burger !== null) {
      burger.addEventListener('click', () => {
        this.close();
      });
    }

    const callbackButton = this.menu.querySelector<HTMLElement>('.header-menu__callback');
    if (callbackButton !== null) {
      initHeaderCallback(callbackButton);
    }

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });

    const links = Array.from(this.menu.querySelectorAll<HTMLAnchorElement>(`.${this.headerLink.link}`));
    if (links.length > 0) {
      links.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          links.forEach((link) => {
            link.classList.add(this.headerLink.fade);
          })

          link.classList.remove(this.headerLink.fade);
        });

        link.addEventListener('mouseleave', () => {
          links.forEach((link) => {
            link.classList.remove(this.headerLink.fade);
          })
        });

        if (typeof link.href !== 'undefined' && link.href !== '' && !link.href.includes('#')) {
          const linkUrl = new URL(link.href);

          if ((linkUrl.origin + linkUrl.pathname) === (window.location.origin + window.location.pathname.replace(/\/+$/, ''))) {
            link.classList.add(this.headerLink.active);
          }
        }
      });
    }
  }

  public open(): void {
    if (typeof this.options?.beforeOpen === 'function') {
      this.options.beforeOpen();
    }

    this.menu.classList.add(this.headerMenuOpened);

    bodyScrollLock.lock(this.menu);
  }

  public close(): void {
    if (typeof this.options?.beforeClose === 'function') {
      this.options.beforeClose();
    }

    this.menu.classList.remove(this.headerMenuOpened);

    bodyScrollLock.enable(this.menu);
  }

  public toggle(): void {
    if (this.menu.classList.contains(this.headerMenuOpened)) {
      this.close();
    } else {
      this.open();
    }
  }
}
