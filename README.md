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


4) Docker - контейнеризація 
        1) database_container
        2) backend container
        3) frontend container
        4) docker compose

Додаток є абсолютно динамічним в своїй основі, що надає змогу підключати, створювати об'єкти в реальному час

------------------------Як підключити------------------------------------

1) Отримайте dockerfiles, docker-compose з репозиторію
2) Завантажте docker
3) в директорії для docker-compose напишіть команду
    docker-compose up --build


