import cn from 'classnames';
import { type FCClass } from '@/shared/types';
import { type TFormCallbackData, handleSubmitCallback } from '../../api';
import { ReactInput, ReactPhoneInput } from '../input';
import { handlePhoneValidation } from '../input/validation';
import { ReactTextarea } from '../textarea';
import { fabricCustomForm } from '../../lib/custom-form';

const fields = [
  {
    Component: ReactInput,
    props: {
      name: 'name',
      placeholder: 'Имя*',
    },
    isRequired: true,
  },
  {
    Component: ReactPhoneInput,
    props: {
      name: 'phone',
      placeholder: 'телефон*',
    },
    isRequired: true,
    validation: (value: string) => {
      if (handlePhoneValidation(value)) {
        return true;
      }
      return false;
    },
  },
  {
    Component: ReactTextarea,
    props: {
      name: 'message',
      placeholder: 'сообщение',
    },
  },
]

const { Form } = fabricCustomForm({
  fields,
});

interface TFormCallback {
  additionalData?: Record<string, any>
}

export const FormCallback: FCClass<TFormCallback> = ({
  className,
  additionalData,
}) => {
  const handleFormSubmit = async(incData: TFormCallbackData): Promise<any> => {
    const data: TFormCallbackData = {
      ...additionalData,
      ...incData,
    }

    return await handleSubmitCallback(data);
  }

  return (
    <Form
      className={cn('form--callback', className)}
      onSubmit={handleFormSubmit}
    />
  );
}
