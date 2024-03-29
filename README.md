# Тестовое задание - fullstack приложение
Реализовать работоспособное Web-приложение написанное на Javascript (без использования TypeScript).

Так как взял шаблон Material Dashboard 2, есть много кода, написанного в шаблоне.
Основные изменения в папке layouts: tables - страница с таблицами, dashboard - страница со статистикой,
Так же был добавлен компонент ErrorComponent в папке Components, который используется на обеих страницах. 

## Локальный запуск
1. Создать базу данных по скрипту в файле init-db.sql
2. Указать свои параметры базы данных (пользователь, пароль, порт) в файле sequelizeConfig.js в папке server
3. Установить зависимости в папке server командой npm install
4. Установить зависимости в папке client командой npm install
5. Запустить сервер из папки server командой node ./src/app.js
6. Запустить клиент из папки client командой npm run start

## Задачи
• Создать базу данных в СУБД Postgres с двумя таблицами. Таблицы связать по полю foreign key. Каждая таблица должна иметь поле-ключ и другие поля типа NUMERIC, VARCHAR, DATE, INTEGER. (описаны в init-db.sql и в server/models) ✅

• Создать серверную часть с использованием NodeJS. Подключиться к созданной в п.1 БД с помощью средств pg-promise (https://github.com/vitaly-t/pg-promise) или sequalize (https://sequelize.org/). В случае использования sequelize написать часть функций (методов) работы с данными на языке SQL (использовать метод seq.query() ).
При реализации частичной подгрузки данных (пагинации, infinite loading) использовать операторы языка SQL limit и offset. (был использован sequelize, для crud операций использовались методы sequelize, для пагинации и запросов для дешборда sql запросы) ✅

• Роутеры написать по архитектурному стилю REST API. Реализовать базовые операции: создание, получение, изменение и удаление. ✅

• Серверная часть должна включать папки: модели (/models), контроллеры (/controllers), роутеры (/routes).  ✅

• Создать клиентскую часть с использованием React.
Внешний вид оформить в виде Dashboard c боковым меню из нескольких произвольных пунктов. В первом пункте поместить 2 таблицы Ag-Grid (https://www.ag-grid.com/), в которые вывести данные из таблиц созданных в п.1 с помощью сервера Над связанной таблицей поместить работающие кнопки: Добавить запись, Изменить, Удалить. При добавлении/изменении записи учитывать связь с главной таблицей в поле с foreign key. ✅

• В главной таблице применить загрузку с помощью infinite loading (использовать AgGrid Infinite Row Model). Обязательно реализовать частичную подгрузку записей с сервера (использовать операторы языка SQL limit и offset) ✅

• При оформлении Dashboard использовать шаблон одного из современных примеров c сайта Creative Tim раздела React FREE (https://www.creative-tim.com/templates/react), либо любой другой аналогичный по виду и структуре (красиво сверстанный, со стилем взятым из него) Разрешается взять готовый и поменять под тестовое задание. ✅

• Выложить на GitHub:
исходные тексты Web-приложения (без папки node_modules). Клиентская и серверная части должны находиться в одном репозитории в отдельных папках в корне проекта (/client и /server);
sql-скрипт для создания БД с данными (в файле init-db.sql);
инструкцию по установке и запуску (в файле Readme.md расположенном в корне проекта). ✅
