import { type TPopupChild } from '@/shared/types';
import PopupMessage from '@/widgets/popups/ui/variant/message';

export interface TPopupErrorFallback {
  title?: string
  description?: string
}

export const PopupErrorFallback: TPopupChild<TPopupErrorFallback> = ({
  title = 'Ой',
  description = 'что-то пошло не так, попробуйте перезагрузить страницу',
  closePopup,
}) => {
  return (
    <PopupMessage
      title={title}
      description={description}
      closePopup={closePopup}
    />
  );
}
