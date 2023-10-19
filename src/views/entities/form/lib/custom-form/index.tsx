import { Controller, useForm } from 'react-hook-form';
import cn from 'classnames';
import { type FCClass } from '@/shared/types';
import { clearWasteData } from '@/shared/helpers/clear-waste-data';
import './form.scss';
import { openPopup } from '@/shared/lib/popups';
import { ReactButton } from '@/shared/react/button';
import { ReactPolitics } from '@/shared/react/politics';
import { type TReactInput } from '../../ui/input';
import { type TReactTextarea } from '../../ui/textarea';
import { WrapperField } from '../../ui/wrapper-field';
import { getUTMFromUrlWithCurrentPage } from '@/shared/helpers/get-UTM-from-url';

export interface TFormFields {
  Component: TReactInput | TReactTextarea
  props: any
  isRequired?: boolean
  validation?: Function
}

export interface TForm {
  onSubmit: Function
  isResetForm?: boolean
}

export type TData = Record<string, string | number>;

export const fabricCustomForm = (props: {
  fields: TFormFields[]
}): {
  Form: FCClass<TForm>
} => {
  const { fields: formFields } = props;

  const Form: FCClass<TForm> = ({
    className,
    onSubmit,
    isResetForm = true,
  }) => {
    const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
    } = useForm();

    const errorValid = (name: string, errorText: string = 'Ошибка ввода'): string => {
      if (typeof name !== 'string') return '';

      const error = errors[name] ? errorText : '';
      return error;
    }

    const handleSubmitForm = (data: TData): void => {
      if (typeof onSubmit === 'function') {
        const sendData = {
          ...clearWasteData(data),
          ...getUTMFromUrlWithCurrentPage(),
        }

        onSubmit(sendData).then((res: {
          isSuccess: boolean
        }) => {
          const { isSuccess } = res;

          if (isSuccess) {
            openPopup('message', {
              isCloseAll: true,
            });

            if (isResetForm) {
              reset();
            }
          } else {
            openPopup('message', {
              title: 'Ошибка отправки',
              description: 'Попробуйте позднее',
            });
          }
        }).catch((error: any) => { console.error(error); });
      }
    }

    return (
      <form
        className={cn('form', className)}
        method={'POST'}
        onSubmit={handleSubmit(handleSubmitForm) as () => void}
      >
        <fieldset className='form__fieldset'>
          {formFields.map((field) => {
            const { Component, props, isRequired, validation } = field;

            return (
              <Controller
                key={props.name}
                control={control}
                name={props.name}
                defaultValue=''
                rules={isRequired === true
                  ? {
                      required: true,
                      validate: typeof validation === 'function'
                        ? {
                            validation: (input) => validation(input),
                          }
                        : undefined,
                    }
                  : undefined}
                render={({ field: { value, name, onChange } }) => {
                  return (
                    <WrapperField
                      className='form__field'
                      error={errorValid(name)}
                    >
                      <Component
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={props.placeholder}
                      />
                    </WrapperField>
                  );
                }}
              />
            )
          })}
        </fieldset>
        <ReactPolitics
          className='form__politics'
        />
        <ReactButton
          className='form__submit-button'
          title='Отправить'
          disabled={Boolean(Object.keys(errors).length)}
          onClick={() => {
            if (window.ym) {
              window.ym(93552332, 'reachGoal', 'lead');
            }
          }}
        />
      </form>
    );
  }

  return {
    Form,
  }
}
