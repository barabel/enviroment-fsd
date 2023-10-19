import { MediaSizes } from '@/shared/enums';
import Swiper, { Navigation } from 'swiper';

export class Tabs {
  private readonly parent: HTMLElement;
  private readonly buttons: HTMLElement[];
  private readonly content: HTMLElement[];

  private swiperInst?: Swiper;

  private readonly parentClass = 'tabs' as const;
  private readonly classes = {
    parent: this.parentClass,
    swiperButtons: `${this.parentClass}__swiper-buttons`,
    buttons: `${this.parentClass}__buttons`,
    navBtn: `${this.parentClass}__nav-btn`,
    contentWrapper: `${this.parentClass}__content-wrapper`,
    active: 'tab-active',
  } as const;

  constructor(parent: HTMLElement) {
    this.parent = parent;

    this.buttons = [].slice.call(this.parent.querySelector(`.${this.classes.buttons}`)?.children);
    this.content = [].slice.call(this.parent.querySelector(`.${this.classes.contentWrapper}`)?.children);
  }

  public init(): void {
    if (this.buttons.length > 0) {
      this.buttons.forEach((button) => {
        this.setButtonClass(button);
      });

      const mediaQuery = window.matchMedia(`(min-width: ${MediaSizes.DESKTOP}px)`);
      mediaQuery.addEventListener('change', (event) => {
        this.toggleSwiperForButtons(event.matches);
      });

      this.toggleSwiperForButtons(window.innerWidth >= MediaSizes.DESKTOP);

      const activeButton = this.buttons.findIndex(button => button.classList.contains(this.classes.active));
      if (activeButton === -1) {
        this.buttons[0].classList.add(this.classes.active);
        this.content[0].classList.add(this.classes.active);
      }

      if (activeButton > -1) {
        if (this.content[activeButton] !== undefined) {
          this.content[activeButton].classList.add(this.classes.active);
        }
      }

      this.buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
          this.buttons.forEach((button) => {
            button.classList.remove(this.classes.active);
          });

          button.classList.add(this.classes.active);

          const possibleItem = this.content[index];
          if (possibleItem !== undefined) {
            this.content.forEach((item) => {
              item.classList.remove(this.classes.active);
            });

            possibleItem.classList.add(this.classes.active);
          }
        });
      });
    }
  }

  private setButtonClass(element: HTMLElement): void {
    if (element) {
      element.classList.add('swiper-slide');
    }
  }

  private initSliderForButtons(): void {
    const swiperEl = this.parent.querySelector<HTMLElement>(`.${this.classes.swiperButtons}`);
    if (swiperEl) {
      const prevEl = this.parent.querySelector<HTMLElement>(`.${this.classes.navBtn}--prev`);
      const nextEl = this.parent.querySelector<HTMLElement>(`.${this.classes.navBtn}--next`);

      this.swiperInst = new Swiper(swiperEl, {
        modules: [Navigation],
        slidesPerView: 'auto',
        navigation: {
          prevEl,
          nextEl,
        },
      });
    }
  }

  private destroySliderForButtons(): void {
    this.swiperInst?.destroy();
  }

  private toggleSwiperForButtons(match: boolean): void {
    if (match) {
      this.initSliderForButtons();
    } else {
      this.destroySliderForButtons();
    }
  }
}
