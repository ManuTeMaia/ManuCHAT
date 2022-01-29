Manutemaia Chat
======

## Учебный проект Yandex.Практикум. Спринт 3.

[Дизайн-макет в Figma](https://www.figma.com/file/LTUtHdbBdjjGonMOwMMljk/Manutemaia-Chat?node-id=0%3A1)

[Веб-хостинг в Netify](https://quirky-lumiere-db1dd9.netlify.app)

[Репозиторий Спринт #1](https://github.com/ManuTeMaia/middle.messenger.praktikum.yandex/tree/sprint_1)

[Репозиторий Спринт #2](https://github.com/ManuTeMaia/middle.messenger.praktikum.yandex/tree/sprint_2)

pull request #3: https://github.com/ManuTeMaia/middle.messenger.praktikum.yandex/pull/3

### Команды:

```
npm run dev //тестируем
npm run build //собираем
npm run start // запускаем сервер
npm run eslint // ESlint
npm run styles // StyleLint
npm run test // запуск тестов

```

### Под капотом: 

#### Sprint 1

1. NodeJs 14.17.5

2. Parcel 1.12.5 c плагинами (parcel-plugin-handlebars-precompile, parcel-plugin-static-files-copy)

3. Handlebars 4.7.7

4. PostCss (из коробки Parcel) c плагинами (autoprefixer, cssnano, postcss-normalize, postcss-grid, postcss-import, postcss-url, postcss-custom-properties)

5. Express 4.17.1

#### Sprint 2

6. Проект переведен на TipeScript

7. Добавлены линтеры ESLint и StyleLint

8. Попытка компонентного подхода

#### Sprint 3

9. Добавлен роутинг
10. Реализация компонентного подхода (рефакторинг на 80%)
11. Работа с API и WS
12. Тесты Mocha & Chai & Sinon & JSDOM

### Информация для ревью:

1. Страница профиля пользователя доступна при нажатии на аватар в боковой панели.
