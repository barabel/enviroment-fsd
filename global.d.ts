import { type Header } from '@/widgets/header';

declare global {
  interface WindowEventMap {
    'modalOpen': CustomEvent
    'closePopup': CustomEvent
  }

  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
    mainHeaderInst?: Header
    ym?: any
  }
}

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<
    Option,
    IsMulti extends boolean, // eslint-disable-line @typescript-eslint/no-unused-vars
    Group extends GroupBase<Option>, // eslint-disable-line @typescript-eslint/no-unused-vars
  > {
    prefix?: string
  }
}
export {}
