export const getHeaderSize = (): number => {
  const header = document.querySelector<HTMLElement>('.header');
  if (header) {
    return header.getBoundingClientRect().height;
  }

  return 0;
}
