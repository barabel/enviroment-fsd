import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { createRoot } from 'react-dom/client';
import { Popups } from '@/widgets/popups';
import { Header } from '@/widgets/header';
import { openPopup } from '@/shared/lib/popups';

// Рут для попапов
const popups = document.getElementById('popups');

let popupsRoot;
if (popups !== null) {
  popups.innerHTML = '';
  popupsRoot = createRoot(popups);
  popupsRoot.render(<Popups />);
}

// Шапка
const header = document.querySelector<HTMLElement>('.header');
if (header) {
  window.mainHeaderInst = new Header(header);
  window.mainHeaderInst?.initRecolor();
}

// Открытие попапа с формой по якорю
const param = window.location.hash.split('#').pop();
if (param === 'popupCallback') {
  window.addEventListener('load', () => {
    const isMainPage = document.body.classList.contains('body--main-page');
    if (isMainPage) {
      window.addEventListener('preloaderEnd', () => {
        openPopup('callback');
      });
    } else {
      openPopup('callback');
    }
  })
}
