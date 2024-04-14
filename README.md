# TestTaskAvito-React

## Запуск проекта
Для запуска проекта требуется указать токен из [API кинопоиска](https://api.kinopoisk.dev/documentation) в файл **.env**(требуется создать).
**REACT_APP_API_TOKEN=токен**

## Запуск проекта в режиме разработчика:
```bash
    npm run start
```

## Примеры запросов

* Получение информации обо всех фильмов:

```bash
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=id&selectFields=poster&selectFields=name&selectFields=movieLength&selectFields=year&selectFields=countries&selectFields=genres&selectFields=persons&selectFields=rating&selectFields=shortDescription&selectFields=isSeries&selectFields=alternativeName&sortField=&sortType=1' \
     --header 'X-API-KEY: token' \
     --header 'accept: application/json'
```

* Получение фильма по ID:

```bash
    curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/movie/41519' \
     --header 'X-API-KEY: token' \
     --header 'accept: application/json'
```

* Получение отзывов и постеров:

```bash
    curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/image?page=1&limit=10&selectFields=&movieId=41519' \
     --header 'X-API-KEY: token' \
     --header 'accept: application/json'
```

```bash 
    curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/review?page=1&limit=10&selectFields=id&selectFields=movieId&selectFields=type&selectFields=review&selectFields=date&movieId=41519' \
     --header 'X-API-KEY: token' \
     --header 'accept: application/json'
```

* Поиск фильмов по названию

```bash
    curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=%D0%91%D1%80%D0%B0%D1%82' \
     --header 'X-API-KEY: token' \
     --header 'accept: application/json'  
```

* Получение стран и жанров

```bash
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name' \
     --header 'X-API-KEY: token' \
     --header 'accept: application/json'
```

```bash
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name' \
     --header 'X-API-KEY: token' \
     --header 'accept: application/json'
```

