import { throttle } from '@/shared/helpers/throttle';
import { HeaderMenu } from './menu/header-menu';
import { initHeaderCallback } from './callback';
import { emitEvent } from '@/shared/helpers/emitEvent';

export enum headerMods {
  hide = 'header--hide',
  white = 'header--white',
}

type TOptions = Partial<{
  onBurgerClick: () => void
  onCloseMenu: () => void
  onOpenMenu: () => void
}>

export class Header {
  private readonly parent: HTMLElement;
  private previousScrollPosition: number;
  private menuInst?: HeaderMenu;
  private scrollFlag: boolean;

  private readonly options: TOptions

  private readonly parentClass = 'header';
  private readonly classes = {
    parent: this.parentClass,
  } as const

  constructor(parent: HTMLElement, options?: TOptions) {
    this.parent = parent;
    this.scrollFlag = true;
    this.previousScrollPosition = 0;

    this.options = {
      ...options,
    };

    this.init();
  }

  private init(): void {
    const menu = this.parent.querySelector<HTMLElement>('.header__menu');
    if (menu !== null) {
      this.menuInst = new HeaderMenu(menu, {
        beforeOpen: (): void => {
          if (typeof this.options.onOpenMenu === 'function') {
            this.options.onOpenMenu();
          }

          this.stopScrollAction();
        },
        beforeClose: (): void => {
          if (typeof this.options.onCloseMenu === 'function') {
            this.options.onCloseMenu();
          }

          this.enableScrollAction();
        },
      });
    }

    const burger = this.parent.querySelector<HTMLElement>('.header__burger');
    if (burger !== null) {
      if (typeof this.options.onBurgerClick === 'function') {
        burger.addEventListener('click', this.options.onBurgerClick);
      } else {
        burger.addEventListener('click', this.openMenu.bind(this));
      }
    }

    const callbackButton = this.parent.querySelector<HTMLElement>('.header__callback');
    if (callbackButton !== null) {
      initHeaderCallback(callbackButton);
    }
  }

  private stopScrollAction(): void {
    this.scrollFlag = false;
  }

  private enableScrollAction(): void {
    this.scrollFlag = true;
  }

  private scrollListner(): void {
    if (this.scrollFlag) {
      this.scrollHeaderAction();
      this.changeColor();
    }
  }

  private scrollHeaderAction(): void {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition >= this.previousScrollPosition) {
      if (window.scrollY > this.parent.offsetHeight) {
        this.parent?.classList.add(headerMods.hide);
        emitEvent('headerHidden');
      }
    } else {
      this.parent?.classList.remove(headerMods.hide);
      emitEvent('headerVisible');
    }
    this.previousScrollPosition = currentScrollPosition;
  }

  private changeColor(): void {
    if (this.parent !== null) {
      if (window.scrollY > this.parent.offsetHeight) {
        this.parent.classList.add(headerMods.white);
      } else {
        this.parent.classList.remove(headerMods.white);
      }
    }
  }

  public blockInteraction(): void {
    this.parent.classList.add(`${this.classes.parent}--blocked`);
  }

  public enableInteraction(): void {
    this.parent.classList.remove(`${this.classes.parent}--blocked`);
  }

  public openMenu(): void {
    this.menuInst?.open();
  }

  public closeMenu(): void {
    this.menuInst?.close();
  }

  public initRecolor(): void {
    this.scrollHeaderAction();
    this.changeColor();

    window.addEventListener('scroll', throttle(() => {
      this.scrollListner();
    }));
  }
}
