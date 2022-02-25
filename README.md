Manutemaia Chat
======

## Учебный проект Yandex.Практикум. Спринт 3.

[Дизайн-макет в Figma](https://www.figma.com/file/LTUtHdbBdjjGonMOwMMljk/Manutemaia-Chat?node-id=0%3A1)

[Веб-хостинг в Heroku]()

[Репозиторий Спринт #1](https://github.com/ManuTeMaia/middle.messenger.praktikum.yandex/tree/sprint_1)

[Репозиторий Спринт #2](https://github.com/ManuTeMaia/middle.messenger.praktikum.yandex/tree/sprint_2)

[Репозиторий Спринт #3](https://github.com/ManuTeMaia/middle.messenger.praktikum.yandex/tree/sprint_3)

pull request #4: 

### Команды:

```
npm run serve //тестируем (Webpack)
npm run build //собираем (Webpack)
npm run eslint // ESlint
npm run styles // StyleLint
npm run test // запуск тестов Jest

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
13. Установлен Helmet для защиты от XSS

#### Sprint 4

14. Сборка переехала на Webpack 5 
15. Husky следит за прекомпиляцией
16. Тесты переехали на Jest
17. Проект упакован в Docker
18. Проект выложен на Heroku

### Информация для ревью:

1. Страница профиля пользователя доступна при нажатии на аватар в боковой панели.
