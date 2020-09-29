<p align="center">
  <img width="200" height="200" src="./documentation/logo.png" alt="WebApp">
</p>

# X Check App

## Назначение и условия применения

**Область применения.** Образовательный процесс.
**X-Check App** – веб-система целью которой является автоматизация процессов, связанных с управлением задачами (task managment), самопроверка и проверка преподавателем (ментором) результатов работы, кросс-чек сессии, обратная связь в ходе учебного процесса и т.д..

**Краткое описание возможностей.** Набор операций по работе с веб-системой распределяется между функциональными группами следующим образом:

- **Автор (author)**
  - CRUD tasks - (создание / просмотр / редактирование / удаление) заданий
  - CRUD categories - (создание / просмотр / редактирование / удаление) категорий заданий
  - Export / Import задач
- **Студент (student)**
  - Самопроверка выполненного задания(-ий)
  - (Создание / редактирование) запроса(-ов) на проверку:
    - Ментор
    - Cross-Check **(в разработке)**
  - Cross-Check Review **(в разработке)**
  - Обратная связь с ментором (результаты проверки и возможность апелляции)
- **Ментор (supervisor)**
  - Рассмотрение запросов на проверку заданий от студентов
  - Разрешение споров (апелляций)
- **Курс-менеджер (courseManager)**
  - Export задач
  - Выставление дедлайна на определенную задачу
  - Просмотр статистики (истории) о выполнении (сдачи) заданий

**Уровень подготовки пользователя.** Пользователь **X-Check App** должен обладать следующей квалификацией:

- пользовательские навыки в работе с любой OC;
- пользовательские навыки работы с любым современным веб-браузером.

**Требования к программному обеспечению**. Для корректной работы **X-Check App** следует использовать веб-браузеры, обеспечивающие полную совместимость со стандартами: HTML5, CSS 3.0 и JavaScript.
Рекомендуемое программное обеспечение:

- **ОС:** MS Windows, Linux, Mac OS
- **Веб-браузеры:** Firefox 80+, Opera 68+, Google Chrome 85+ и другие браузеры последней версии

**Запуск системы.** Доступ к веб-сервису **X-Check App** осуществляется интерактивно через сеть Интернет посредством обращения по адресу: **[ссылка](https://brave-banach-54e725.netlify.app/)**.

**Вход в систему.** Процесс входа производится через GitHub аккаунт с предварительным выбором роли, которая будет в дальнейшем использоваться для входа в персональный раздел.

![Auth Page](https://user-images.githubusercontent.com/11542402/94576324-e15bf600-027d-11eb-95be-af2799211473.png)

# Автор (author)

### Главная страница

![Author Main Page](https://user-images.githubusercontent.com/11542402/94578363-516b7b80-0280-11eb-829b-e3d4d41b0d0d.png)

### Страница со списком всех заданий автора

Функциональные возможности:

- Фильтрация заданий (по имени и статусу), сортировка по полям
- Переход на страницу просмотра задачи (клик по заголовку задачи)
- Переход на страницу редактирование задачи (клик по иконке редактирования)
- Удаление задачи (клик по иконке удаления)
- Переход на страницу создания категории текущей задачи (клик по кнопке [+Add])
- Export / Import как одной так и нескольких задач (собственный формат | формат RSS)

![Author Tasks Page](https://user-images.githubusercontent.com/11542402/94578761-c474f200-0280-11eb-9b62-d673e98ef0ed.png)

### Страница создания задачи

Функциональные возможности:

- Создание задачи (заполнение полей):
  - Заголовок (title)\*
  - Статус (DRAFT) - по умолчанию, пока у задачи нет категории
  - Описание (description) с возможностью форматирования текста (вставка ссылок, списков, таблиц и тд.)

![Author Create Task](https://user-images.githubusercontent.com/11542402/94578988-01d97f80-0281-11eb-86b0-2cdc0ed2163b.png)

### Страница редактирования задачи

Функциональные возможности:

- Редактирование задачи (заполнение полей):
  - Заголовок (title)\*
  - Статус задачи (DRAFT | PUBLISHED | ARCHIVE)
  - Описание (description) с возможностью форматирования текста (вставка ссылок, списков, таблиц и тд.)
- Список категорий текущей задачи:
  - Переход к созданию категории
  - Переход к редактированию категории
  - Удаление категории

![Author Edit Page](https://user-images.githubusercontent.com/11542402/94579236-4107d080-0281-11eb-8022-3d903cfbc10d.png)

### Страница создания (редактирования) категории

Функциональные возможности:

- Создание (редактирования) категории (заполнение полей):
  - Заголовок (title)\*
  - Описание (description) с возможностью форматирования текста (вставка ссылок, списков, таблиц и тд.)
  - Добавление критерий (изменение существующих):
    - Доступность (Всем | Ментору | Студенту)
    - Оценка (положительное | отрицательное число)
    - Текст критерия

![Author Create/Edit Category](https://user-images.githubusercontent.com/11542402/94579681-c7241700-0281-11eb-9e6b-73d8610ecfc8.png)

# Курс-менеджер (courseManager)

### Главная страница

![Course Manager Home](https://user-images.githubusercontent.com/48457759/94600685-ed09e580-029a-11eb-8d0a-30316944dd67.png)

### Страница со списком всех опубликованных заданий (Tasks List)

Функциональные возможности:

- Фильтрация заданий и сортировка по полям
- Переход на страницу просмотра задачи (клик по заголовку задачи)
- Выставления временных ограничений (выдача заданий на выполнение - startDate & endDate)
- Export как одной так и нескольких задач (собственный формат | формат RSS)

![Course Manager Tasks List Page (PUBLISHED)](https://user-images.githubusercontent.com/48457759/94601123-ae285f80-029b-11eb-91f6-e874cee69955.png)

### Страница со списком результатов проверок (Marks List)

Функциональные возможности:

- Фильтрация по таску, ментору, студенут, состоянию
- Сортировка по баллам
- Переход на страницу детального просмотра (Кнопка Info)
- Переход на страницу решения споров, при наличии проверок в статусе DISPUTE (Кнопка Info)

![Course Manager Marks List Page](https://user-images.githubusercontent.com/48457759/94601032-8a651980-029b-11eb-8b01-a7f1d574ca70.png)

### Страница детального просмотра проверокb (Mark Info)

Функциональные возможности:

- Подробное описание ревью (статус, дата, студент, ментор, прогресс и т.д.)

![image](https://user-images.githubusercontent.com/48457759/94601305-f9427280-029b-11eb-8116-982cc9fba814.png)

# Студент (student)

### Страница навигации (Home)

Функциональные возможности:

- Переход к странице создания запроса на проверку
- Переход к списку созданных запросов

![image](https://user-images.githubusercontent.com/48457759/94598366-846d3980-0297-11eb-8398-3d67abdc4bf9.png)

### Страница создания / изменения запроса (Create Request)

Функциональные возможности:

- Выбор задания для создания запроса на его проверку (доступны только начатые, опубликованные задания у которых не настал дедлайн)
- Создание запроса
  - Текстовое поле для вставки ссылки на выполнение (Валидация по патеррну взятому из приложения RSS)
  - Форма самопроверки
    - Каждому пункту задания можно выставить оценку кликнув по кнопкам быстрой оценки (MIN | HALF | MAX) или введя значение вручную (текстовое принимает только числа в заданных приделах). При выставлении оценки ниже максимально открывается обязательное поле для коментария своего выбора с предустановленным коментарием, который можно дополнить или заменить.
    - Автоматический подсчет суммы балов возле кнопки отправки
- Сохранене данных без отправки запроса (запрос сохраняется в статусе DRAFT, при следующем открытии этого запроса откроется форма с заполненными полями)
- Отправка запроса (невозможно отправить запрос без самопроверки)

Выбор задания

![image](https://user-images.githubusercontent.com/48457759/94598259-5f78c680-0297-11eb-9189-c7ba73af25ef.png)

Прмер Формы 1

![изображение](https://user-images.githubusercontent.com/48457759/94555840-d6e13280-0264-11eb-9310-dcf69913844e.png)

Пример формы 2

![изображение](https://user-images.githubusercontent.com/48457759/94554449-c62fbd00-0262-11eb-972b-cd8d11f8dcc9.png)

### Страница со списком запросов (Requests list)

Функциональные возможности:

- Просмотр списка всех существующих запросов пользователя
  - Возможна фильтрация по имени и статусу (DRAFT | SUBMITTED | GRADED)
  - Возможна сортировка
- Переход к странице просмотра и редактирования запросов (клик по кнопке редактирования запроса)
- Удаление неотправленных запросов (кнопка удаления)
- Переход к странице просмотра оценки (кнопка view появляется у запросов в статусе GRADED)

Список запросов
![изображение](https://user-images.githubusercontent.com/48457759/94556258-77cfed80-0265-11eb-974f-b7cf457cdf5b.png)

### Страница просмотра оценки задачи (GRADE)

Функциональные возможности:

- Просмотр общего бала и процента выпонения задания
- Просотр подробной оценки по каждому пункту
  -Самооценка и коментарий
  -Оценка ментора и коментарий
- Возможность открытия спора по каждому пункту (По нажатию на кнопку Dispute, октрывается поле для описания проблемы)
- Если существует хотябы один спорный пункт то появляется кнопка "OPEN DISPUTE" (открыть спор) иначе появляется кнопка "ACCEPT"(принять оценку)

Вид страницы

![image](https://user-images.githubusercontent.com/48457759/94597721-96021180-0296-11eb-90b5-03f9d4da1d8f.png)

Спор открыт

![image](https://user-images.githubusercontent.com/48457759/94597873-d1044500-0296-11eb-9181-46c707eb28e3.png)

Спора нет

![image](https://user-images.githubusercontent.com/48457759/94569816-23fcde80-023c-11eb-996c-a8c0a9c0c336.png)

# Ментор (supervisor)

### Страница навигации (Home)

Функциональные возможности:

- Переход к списку запросов на проверку (Request list)
- Переход к списку обработанных запросов (Review history)
- На каждом элементе навигации существует бэйдж уведомляющий о наличии запросов (число необработанныз запросов на Request list и число споров на Review history). Если уведомлений нет, бэйдж отсутствует

![image](https://user-images.githubusercontent.com/48457759/94597522-59ceb100-0296-11eb-864d-e2ed48d7191e.png)

### Страница со списком запросов (Requests list)

Функциональные возможности:

- Просмотр спска сабмитнутых запросов на проверку задания от студентов
- Сортировка по всем полям
- Переход на страницу проверки выполнения и оценки

![image](https://user-images.githubusercontent.com/48457759/94579192-33eae180-0281-11eb-86b1-e926e732c80d.png)

### Страница проверки (Review)

Функциональные возможности:

- Просмотр критериев оценки (коректно выводит форматированный текст включая ссылки, списки, таблицы и др.)
- Просмотр самооценки студента (балл и коментарий)
- Возможность быстрой оценки каждого критерия используя радио кнопки (Max | Half | Min), и ввода собственного бала не превышающего максимальный (невозможно)
- Штрафы оцениваются булевыми кнопками (Yes | No)
- Динамическое отображение общего балла
- Есть возможность сохранить текущее состояние проверки не отправляя

![image](https://user-images.githubusercontent.com/48457759/94598965-6eac4400-0298-11eb-86e1-45d4be1d3231.png)

![image](https://user-images.githubusercontent.com/48457759/94599145-b03cef00-0298-11eb-97e0-9f6131dd63ce.png)

### Страница с историей оценок (Review History)

Функциональные возможности:

- Просмотр списка отосланных ревью
- Переход к изменению ревью (кнопка редактирования)
- Переход к разрешению спора в ревью со статусом DISPUTE по кнопке 'View' поясвляющейся возле статуса
- Сортировка и фильтрация по полям

При наличии спора на странице Home появляется уведомление в виде бэйджа с их количеством

![image](https://user-images.githubusercontent.com/48457759/94599872-c13a3000-0299-11eb-9847-e70de9748117.png)

Вид страницы со списком

![image](https://user-images.githubusercontent.com/48457759/94599986-ee86de00-0299-11eb-94d9-c03cc8107346.png)

Вид страницы с открытыми фильрами

![image](https://user-images.githubusercontent.com/48457759/94600054-04949e80-029a-11eb-8add-22af4cf31de2.png)

### Страница ответа на спор (Dispute)

Функциональные возможности:

- Просмотр и ответ на все оспариваемые пункты
  - Просмотр преведущей оценки и самооценки
  - Просмотр предмета спора (коментарий от студента)
  - Возможность принять или откланить замечание (ACCEPT | REJECT). При принятии открывается поле для исправления оценки по данному критерию, в ином случае оно закрыто.

![image](https://user-images.githubusercontent.com/48457759/94600215-41f92c00-029a-11eb-9990-47c463d2d739.png)

## For Work

- For running : npm start

- For testing : npm test

- For prod building : npm build

- Lint : npm lint

- Eject: npm eject

## Built with

- [Create React App](https://github.com/facebook/create-react-app) - This project (X Check App) was bootstrapped with Create React App.

- [Antd](http://getbootstrap.com/) - React UI library antd that contains a set of high quality components and demos for building rich, interactive user interfaces.

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.

- [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps.

- [Redux-saga](https://redux-saga.js.org/) - is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

- [EsLint](https://eslint.org/) - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

## Team

The RsLang app was created by a team of RSSchool students as a learning project.

# [Rolling Scopes School ](https://rs.school/)
