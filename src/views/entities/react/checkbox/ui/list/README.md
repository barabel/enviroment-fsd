# Компонент checkbox-list

![checkbox-list](./checkbox-list-example.jpg?raw=true "checkbox-list")

#### Пропсы:
- name: string, Имя группы чекбокса
- isCheckedAll?: boolean, состояние чекбокса со значением ВСЕ
- control?: Control<FieldValues>, контрол для управления группой через react-hook-form
- filterMethods: object, колбеки с методами для фильтра
- items: Array, массив данных чекбоксов
  - [Описание сheckbox](../item/README.md)

Пример данных:
```
{
    "field_type": "inline-checkboxes",
    "name": "typeFlat",
    "title": "Тип квартиры",
    "items": [
    {
      "title": "все",
      "value": "all",
      "isSelected": true
    },
    {
      "title": "квартиры",
      "value": "flat"
    }
    ]
}
```
