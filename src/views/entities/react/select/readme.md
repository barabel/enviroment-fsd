# Компонент селекта на реакте

![screen](./screen-1.jpg?raw=true "Скриншот компонента селекта на реакте")
![screen](./screen-2.jpg?raw=true "Скриншот компонента селекта на реакте")

## Пропсы:
  - className?: string, Дополнительные классы;
  - options: object[], Варианты селекта;
    - selected?: boolean, Флаг выбранного вариант селекта в начале. Если в вариантах его нет, то отображается первый вариант;
    - title: string, Название варианта селекта;
    - value: string, Значение варианта селекта для формы;
  - isMulti?: boolean, Флаг селекта с мультивыбором;
  - placeholder?: string, Плейсхолдер селекта с мултивыбором;
  - selectAll?: string, Название варианта в мультиселекте, который выделяет все элементы
  - selectedOption?: string, Значение выбранного варианта селекта. Если не указан, то отображается первый вариант
  - onChange?: function, Колбак функция, вызываемая при изменение варианта селекта.
  - sendAll?: boolean, Флаг, показывающий, нужно ли отправлять пустой массив или все выбранные варианты, когда выбираешь все варианты
  - prefix?: string, Добавляет префикс перед вариантом
