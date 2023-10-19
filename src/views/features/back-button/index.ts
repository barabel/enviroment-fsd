export const initBackButton = (parent: HTMLElement): void => {
  const returnLink = parent.getAttribute('data-return');

  parent.addEventListener('click', () => {
    if (document.referrer) {
      window.history.back();
    } else {
      if (returnLink) {
        window.open(returnLink, '_self');
      } else {
        window.open('/', '_self');
      }
    }
  });
}
