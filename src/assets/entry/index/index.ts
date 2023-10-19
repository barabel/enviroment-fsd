import { blockCallback } from '@/widgets/callback';

Array.from(document.querySelectorAll<HTMLElement>('.callback'))
  .forEach((block) => {
    blockCallback(block);
  });
