Наш додаток Life4Paws включає в себе серверну логіку
Використовуємо такі компоненти

1) Frontend - React .... React-dom, axios, react-router-dom, js

2) Backend - python, 
            uvicorn як Асинхронний веб сервер, 
            SQLAlchemy для ORM, 
            FastAPI для ендпоїнтів
            passlib для хешування паролів
            aiomysql - для асинхронного доступу до бази даних MySQL,
            httpx - для допоміжних запитів на ендпоїнти
            і решта

3) Mysql - база даних MySQL
    Таблиці:    volunteer - таблиця бази даних для волонтерів
                shelter - таблиця бази даних для притулків
                volunteer_article - таблиця для улюблених оголошень
                article - таблиця оголошень
                comments - таблиця коментарів


--------------------------Як запустити ----------------------

1) Створіть базу даних на основі бекапу в ./database/backup.sql
    1.а     Скопіюйте код бази даних в Mysql-workbench
    1.b     Додайте рядки на початок файлу з ./database/init.sql

2) Створіть віртуальне середовище в Пайтон в директорії ./backend/
    Windows: python -m venv venv
             ./venv/Scripts/activate
        !!Якщо користуєтесь оболонкою bash Linux використовуйте
            source ./venv/Scripts/activate
        
    Linux:    python3 -m venv venv
              source ./venv/bin/activate

    перевірте чи змінилася директорія інтерпретатора 
                which python 

            використовуйте python3 для Лінукса
        Можливо потрібно буде ввести шлях вручну. У VScode Ctrl+Shift+P->Python: Select interpreter->шлях до .exe файлу

3)Завантаження бібліотек
    cd ./backend/
    pip install -r requirements.txt
    pip freeze > requirements.txt

4)Передивляємось чи всі біблотеки імпортувалися
    файли backend/database.py
          backend/views/utils.py
    чутливі до змін, бо у них є параметри шляху до .env файлу. Замініть шлях на свій

5)Пробуємо запустити сервер 
в директорії backend/


uvicorn views.main:animal_shelter --reload

перевіряємо логи сервера

6) заходимо на папку frontend/animal_shelter/

якщо у вас є npm або yarn

npm install react react-router-dom axios web-vitals 

7) Пробуємо запускати сервер для фронтенду

npm start


Якщо у вас є якісь питання по встановленню:
Contact-info: daniklv2006@gmail.com
