export class Share {
  private readonly parent: HTMLElement;

  private readonly parentClass = 'share' as const;
  private readonly classes = {
    parent: this.parentClass,
    btn: `${this.parentClass}__btn`,
  } as const;

  private readonly shareLinks = {
    telegram: 'https://t.me/share/url?url=',
    whatsapp: 'whatsapp://send?text=',
    vk: 'https://vk.com/share.php?url=',
  };

  constructor(parent: HTMLElement) {
    this.parent = parent;

    const shareBtns = this.parent.querySelectorAll<HTMLElement>(`.${this.classes.btn}`);
    if (shareBtns.length) {
      shareBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const name = btn.getAttribute('data-name');

          if (name && Object.prototype.hasOwnProperty.call(this.shareLinks, name)) {
            this.shareClick(name as keyof typeof this.shareLinks);
          }
        });
      });
    }
  }

  shareClick(name: keyof typeof this.shareLinks): void {
    let url = this.shareLinks[name];
    url += `${encodeURIComponent(window.location.href)}`

    window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
  }
}
