# DUO

## Команды
local_server
```
npm run local_server
```
build
```
npm run build
```
develop
```
npm run watch
```
## Транспиляция twig шаблона в js шаблон
```
npm run twigtojs (путь к файлу, к примеру ./src/views/partials/organisms/construction-reports/cards/construction-reports-cards.inline.twig)
```
После выполнения данной команды появится js файл с тем же именем.
При импорте данного файла будет возвращать функцию, которая, в свою очередь, после прокидывания данных, будет возвращать inline HTML верстку.

## Названия svg для спарйта дложны быть в camel case
