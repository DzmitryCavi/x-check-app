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
-	пользовательские навыки в работе с любой OC;
-	пользовательские навыки работы с любым современным веб-браузером.

**Требования к программному обеспечению**. Для корректной работы **X-Check App** следует использовать веб-браузеры, обеспечивающие полную совместимость со стандартами: HTML5, CSS 3.0 и JavaScript.
Рекомендуемое программное обеспечение:
- **ОС:**	MS Windows, Linux, Mac OS
- **Веб-браузеры:**	Firefox 80+, Opera 68+, Google Chrome 85+ и другие браузеры последней версии

**Запуск системы.** Доступ к веб-сервису **X-Check App** осуществляется интерактивно через сеть Интернет посредством обращения по адресу: **[ссылка](https://brave-banach-54e725.netlify.app/)**.

**Вход в систему.** Процесс входа производится через GitHub аккаунт с предварительным выбором роли, которая будет в дальнейшем использоваться для входа в персональный раздел.
![image](https://user-images.githubusercontent.com/11542402/94576324-e15bf600-027d-11eb-95be-af2799211473.png)



# Автор (author)

### Главная страница
![image](https://user-images.githubusercontent.com/11542402/94578363-516b7b80-0280-11eb-829b-e3d4d41b0d0d.png)

### Страница со списком всех заданий автора

Функциональные фозможности:
- Фильтрация заданий (по имени и статусу), сортировка по полям
- Переход на страницу просмотра задачи (клик по заголовку задачи)
- Переход на страницу редактирование задачи (клик по иконке редактирования)
- Удаление задачи (клик по иконке удаления)
- Переход на страницу создания категории текущей задачи (клик по кнопке [+Add])
- Export / Import как одной так и нескольких задач (собственный формат | формат RSS)

![image](https://user-images.githubusercontent.com/11542402/94578761-c474f200-0280-11eb-9b62-d673e98ef0ed.png)

### Страница создания задачи

Функциональные фозможности:
- Создание задачи (заполнение полей):
  - Заголовок (title)*
  - Статус (DRAFT) - по умолчанию, пока у задачи нет категории
  - Описание (description) с возможностью форматирования текста (вставка ссылок, списков, таблиц и тд.)

![image](https://user-images.githubusercontent.com/11542402/94578988-01d97f80-0281-11eb-86b0-2cdc0ed2163b.png)

### Страница редактирования задачи

Функциональные фозможности:
- Редактирование задачи (заполнение полей):
  - Заголовок (title)*
  - Статус задачи (DRAFT | PUBLISHED | ARCHIVE)
  - Описание (description) с возможностью форматирования текста (вставка ссылок, списков, таблиц и тд.)
- Список категорий текущей задачи:
  - Переход к созданию категории
  - Переход к редактированию категории
  - Удаление категории
  
![image](https://user-images.githubusercontent.com/11542402/94579236-4107d080-0281-11eb-8022-3d903cfbc10d.png)

### Страница создания (редактирования) категории

Функциональные фозможности:
- Создание (редактирования) категории (заполнение полей):
  - Заголовок (title)*
  - Описание (description) с возможностью форматирования текста (вставка ссылок, списков, таблиц и тд.)
  - Добавление критерий (изменение существующих):
    - Доступность (Всем | Ментору | Студенту)
    - Оценка (положительное | отрицательное число)
    - Текст критерия
    
![image](https://user-images.githubusercontent.com/11542402/94579681-c7241700-0281-11eb-9e6b-73d8610ecfc8.png)

# Курс-менеджер (courseManager)

### Страница со списком всех опубликованных заданий (Tasks List)

Функциональные фозможности:
- Фильтрация заданий (по имени и статусу), сортировка по полям
- Переход на страницу детального просмотра

![image](https://user-images.githubusercontent.com/11542402/94580129-369a0680-0282-11eb-9e95-2f9a67faf991.png)

### Страница со списком результатов проверкок (Marks List)

Функциональные фозможности:
- Фильтрация заданий и сортировка по полям
- Переход на страницу просмотра задачи (клик по заголовку задачи)
- Выставления временных ограничений (выдача заданий на выполнение - startDate & endDate)
- Export как одной так и нескольких задач (собственный формат | формат RSS)

![image](https://user-images.githubusercontent.com/11542402/94580210-516c7b00-0282-11eb-816b-d8bf679407a6.png)

# Студент (student)
### Страница навигации (Home)
  Функциональные фозможности:
- Переход к странице создания запроса на проверку
- Переход к списку созданных запросов 

![изображение](https://user-images.githubusercontent.com/48457759/94552118-0f7e0d80-025f-11eb-9a81-1cb7d1196672.png)

### Страница создания / изменения запроса (Create Request)
  Функциональные фозможности:
- Выбор задания для создания запроса на его проверку (доступны только начатые, опубликованные задания у которых не настал дедлайн)
- Создание запроса 
  - Текстовое поле для вставки ссылки на выполнение (Валидация по патеррну взятому из приложения RSS)
  - Форма самопроверки 
    - Каждому пункту задания можно выставить оценку кликнув по кнопкам быстрой оценки (MIN | HALF | MAX) или введя значение вручную (текстовое принимает только числа в заданных приделах). При выставлении оценки ниже максимально открывается обязательное поле для коментария своего выбора с предустановленным коментарием, который можно дополнить или заменить.
    - Автоматический подсчет суммы балов возле кнопки отправки
 - Сохранене данных без отправки запроса (запрос сохраняется в статусе DRAFT, при следующем открытии этого запроса откроется форма с заполненными полями)
 - Отправка запроса (невозможно отправить запрос без самопроверки)
 
 Выбор задания
 ![изображение](https://user-images.githubusercontent.com/48457759/94553689-90d69f80-0261-11eb-903d-23ccfd7dfd1a.png)
 
 Прмер Формы 1
 ![изображение](https://user-images.githubusercontent.com/48457759/94555840-d6e13280-0264-11eb-9310-dcf69913844e.png)
 
 Пример формы 2
 ![изображение](https://user-images.githubusercontent.com/48457759/94554449-c62fbd00-0262-11eb-972b-cd8d11f8dcc9.png)
 

### Страница со списком запросов (Requests list)
Функциональные фозможности:
- Просмотр списка всех существующих запросов пользователя
  - Возможна фильтрация по имени и статусу (DRAFT | SUBMITTED | GRADED)
  - Возможна сортировка
- Переход к странице просмотра и редактирования запросов (клик по кнопке редактирования запроса)
- Удаление неотправленных запросов (кнопка удаления)
- Переход к странице просмотра оценки (кнопка view появляется у запросов в статусе GRADED)
 
 Список запросов
 ![изображение](https://user-images.githubusercontent.com/48457759/94556258-77cfed80-0265-11eb-974f-b7cf457cdf5b.png)
 
 ### Страница просмотра оценки задачи (GRADE)
 Функциональные фозможности:
- Просмотр общего бала и процента выпонения задания
- Просотр подробной оценки по каждому пункту
  -Самооценка и коментарий
  -Оценка ментора и коментарий
- Возможность открытия спора по каждому пункту (По нажатию на кнопку Dispute, октрывается поле для описания проблемы)
- Если существует хотябы один спорный пункт то появляется кнопка "OPEN DISPUTE" (открыть спор) иначе появляется кнопка "ACCEPT"(принять оценку)

Вид страницы 
![image](https://user-images.githubusercontent.com/48457759/94569411-afc23b00-023b-11eb-930e-dad7fe4c487e.png)


Спор открыт
![image](https://user-images.githubusercontent.com/48457759/94569717-062f7980-023c-11eb-8345-0738ed6743c8.png)

Спора нет

![image](https://user-images.githubusercontent.com/48457759/94569816-23fcde80-023c-11eb-996c-a8c0a9c0c336.png)


# Ментор (supervisor)

### Страница навигации (Home)
  Функциональные фозможности:
- Переход к списку запросов на проверку (Request list)
- Переход к списку обработанных запросов (Review history)
- На каждом элементе навигации существует бэйдж уведомляющий о наличии запросов (число необработанныз запросов на Request list и число споров на Review history). Если уведомлений нет, бэйдж отсутствует


![image](https://user-images.githubusercontent.com/48457759/94571698-3c6df880-023e-11eb-803a-1410f2934815.png)

### Страница со списком запросов (Requests list)
Функциональные фозможности:
- Просмотр списка всех существующих запросов пользователя


## For Work

- For running : npm start

- For testing : npm test

- For prod building : npm build

- Lint : npm lint

- Eject: npm eject

## Built with

-  [Create React App](https://github.com/facebook/create-react-app) - This project (X Check App) was bootstrapped with Create React App.

-  [Antd](http://getbootstrap.com/) -  React UI library antd that contains a set of high quality components and demos for building rich, interactive user interfaces.

-  [React](https://reactjs.org/) - A JavaScript library for building user interfaces.

-  [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps.

-  [Redux-saga](https://redux-saga.js.org/) - is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

-  [EsLint](https://eslint.org/) - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

## Team
The RsLang app was created by a team of RSSchool students as a learning project.

# [Rolling Scopes School ](https://rs.school/)

