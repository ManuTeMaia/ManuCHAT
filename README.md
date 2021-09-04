Manutemaia Chat
======

## Учебный проект Yandex.Практикум. Спринт 1.

[Дизайн-макет в Figma](https://www.figma.com/file/LTUtHdbBdjjGonMOwMMljk/Manutemaia-Chat?node-id=0%3A1)

[Веб-хостинг в Netify](https://quirky-lumiere-db1dd9.netlify.app)

pull request https://github.com/ManuTeMaia/middle.messenger.praktikum.yandex/pull/1

### Под капотом: 
1. NodeJs 14.17.5

2. Parcel 1.12.5 c плагинами (parcel-plugin-handlebars-precompile, parcel-plugin-static-files-copy)

3. Handlebars 4.7.7

4. PostCss (из коробки Parcel) c плагинами (autoprefixer, cssnano, postcss-normalize, postcss-grid, postcss-import, postcss-url, postcss-custom-properties)

5. Express 4.17.1

### Информация для ревью:

1. Не удержалась и попыталась сделать что-то вроде SPA, хотя это задача второго спринта. Получилось крипово, но работает в рамках этой сборки.

2. Страницы с ошибками открываются отдельно: 

[Ошибка 50*](https://quirky-lumiere-db1dd9.netlify.app/500.html)

[Ошибка 404](https://quirky-lumiere-db1dd9.netlify.app/404.html) 

3. Страница профиля пользователя доступна при нажатии на аватар в боковой панели.
