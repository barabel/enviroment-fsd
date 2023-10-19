# Компонент checkbox

![checkbox](./checkbox-example.jpg?raw=true "checkbox")

#### Пропсы:
- title: string, Текст чекбокса
- name?: string, Имя чекбокса
- value: string, Значение чекбокса
- isDisabled?: boolean, Флаг состояния disabled для чекбоксы
- isSelected?: boolean, Флаг чекнутого чекбокса 
- onChange: (event: ChangeEvent<HTMLInputElement>, isSelected: boolean) => void, Колбак, вызывающий при изменение чекбокса

Пример данных:
```
{
    "title": "все",
    "value": "all",
    "isSelected": true
}
```
