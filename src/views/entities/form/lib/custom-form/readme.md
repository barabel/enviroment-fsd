### Фабрика компонента формы:

В фабрику через массив передаются филды с компонентами, которые будут в форме, их пропсы и дополнительные флаги

Пример:

```
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

const { Form } = useCustomForm({
  fields,
});
```
