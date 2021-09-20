Manutemaia Chat
======

## Учебный проект Yandex.Практикум. Спринт 2.

[Дизайн-макет в Figma](https://www.figma.com/file/LTUtHdbBdjjGonMOwMMljk/Manutemaia-Chat?node-id=0%3A1)

[Веб-хостинг в Netify](https://quirky-lumiere-db1dd9.netlify.app)

[Репозиторий Спринт #1](https://github.com/ManuTeMaia/middle.messenger.praktikum.yandex/tree/sprint_1)

pull request #2: 

### Команды:

```
npm run dev //тестируем
npm run build //собираем
npm run start // запускаем сервер
npm run eslint // ESlint
npm run styles // StyleLint

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

### Информация для ревью:

1. Переделан псевдороутинг.

2. Страницы с ошибками открываются отдельно: 

[Ошибка 50*](https://quirky-lumiere-db1dd9.netlify.app/500.html)

[Ошибка 404](https://quirky-lumiere-db1dd9.netlify.app/404.html) 

3. Страница профиля пользователя доступна при нажатии на аватар в боковой панели.

4. Переписка чата кликабельна во втором чате (Marvell).
