import { emitEvent } from '@/shared/helpers/emitEvent';

/**
 * Функция открывает попап заданного варианта(варианты находятся в widgets/popups), с пропсами, переданные в объект data
 */
export const openPopup = (variant: string, data?: object): void => {
  emitEvent('modalOpen', {
    variant,
    data,
  });
}
