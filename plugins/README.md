# Плагины

## Структура плагина
```
└── SomeObjectPlugin/                         # Плагин
    └── src/                                  # Файлы редактора
        ├── ISomeObject.ts                    # Интерфейс объекта
        ├── SomeObject.ts                     # Объект сцены
        ├── DrawSomeObject.ts                 # Функция отрисовки
        ├── SomeObjectEditorSupport.ts        # Поддержка инструкментов сцены
        ├── SomeObjectExtension               # Расширение для сцены
        ├── SomeObjectBlockCellRenderer.ts    # ?
        ├── SomeObjectCodeDOMBuilder.ts       # ?
        ├── SomeObjectCodeResources.ts        # Регистрация code-resources
        ├── SomeObjectComponent.ts            # Свойства объекта
        ├── SomeObjectPlugin.ts               # Регистрация плагина
        ├── SomeObjectSection.ts              # ?
        └── tsconfig.json                     # Расширение tsconfig
    └── code-resources/                       # Файлы Phaser
        ├── SomeObject.ts                     # Компонент
        ├── registerSomeObjectFactory.ts      # Регистрация фабрики компонента
        └── drawSomeObject.ts                 # Функция отрисовки
    └── plugin.json                           # Манифест плагина
```

## Начало разработки

Для начала разработки плагина необходимо склонировать репозиторий [PhaserEditor2D-v3](https://github.com/PhaserEditor2D/PhaserEditor2D-v3) выше папки проекта
```
git clone https://github.com/PhaserEditor2D/PhaserEditor2D-v3.git
```

## Манифест `plugin.json`
Для подключения редактор использует файлы манифеста. 
Пример заполнения:
```json
{
  "id": "phasereditor2d.someObject",
  "styles": [],
  "priority": 2,
  "scripts": [
      "_out/phasereditor2d.someObject.js"
  ]
}
```

## Расширение `tsconfig.json`

Для корректного отображение типов редактора в корне папки с плагинами лежит файл [tsconfig.json](./tsconfig.json), включающий референсы до типов редактора.

Плагин должен иметь собственный, расширяющий корневой, `tsconfig.json` в папке с файлами редактора *(`src/`)* и содержать поле `outFile`. Оно должно совпадать с тем, что указывается в поле `scripts` в манифесте плагина.

Пример:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
      "outFile": "../_out/phasereditor2d.someObject.js"
  },
  "exclude": ["../_out/", "../data/"]
}
```

## Ресурсы (code-resources)

Ресурсы - это файлы компонента Phaser.

Содержит два файла:
- SomeObject.ts - основной файл компонента
- registerSomeObjectFactory.ts -  регистрация фабрики компонента в Phaser

Выделение функции отрисовки в отдельный файл не обязательно.

## Компиляция плагинов

Для использования плагинов необходимо скомпилировать файлы редактора и ресурсы.

Скомпилированный плагин будет выглядеть следующим образом:
```
└── phasereditor2d.someObject/
    └── _out/                                     # Файлы редактора
        ├── phasereditor2d.someObject.d.ts.map    # Карта d.ts?
        └── phasereditor2d.someObject.js          # Скомпилированные файлы редактора
    └── code-resources/                           # Файлы Phaser
        └── ts-module/                            # Скопированные ресурсы 
```

📌 Нужен скрипт компиляции

## Подключение плагинов

Для отображение плагинов в редакторе необходимо добавить путь к папке с компилированными файлами в [phasereditor2d.config.json](../phasereditor2d.config.json):
```json
{
  ...
  "plugins": ["./src/plugins"],
}
```