# Branded Thing API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /login-google`
- `GET /categories`
- `POST /categories`
- `DELETE /categories/:id`
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `DELETE /products/:id`
- `POST /customers/register`
- `POST /customers/login`
- `POST /customers/login-google`
- `GET /categories/:id`
- `PUT /categories/:id`
- `PATCH /products/:id`
- `GET /histories`
- `GET /wishlists`
- `POST /wishlists/:id`
- `GET /customers/products`
- `GET /customers/categories`
- `GET /customers/products/:id`
- `POST /customers/products/qrcode`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
}
```

_Response (201 - Created)_

```json
{
  "message": "account has been created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username required"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "password required"
}
OR
{
  "message": "min 5 characters"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "token": "string",
  "id": "integer",
  "name": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email or password required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email or password incorrrect"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 3. POST /login-google

Request:

- headers:

```json
{
  "idToken": "string"
}
```

_Response (200 - OK)_

```json
{
  "token": "string",
  "id": "integer",
  "name": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email or password required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email or password incorrrect"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 4. GET /categories

Description:
- Get all category from database

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Rok",
    "createdAt": "2023-02-19 00:01:09.713 +0700",
    "updatedAt": "2023-02-19 00:01:09.713 +0700"
  }
  ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 5. POST /categories

Description:
- Create category to database

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "category has been created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name required"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 6. DELETE /categories/:id

Description:
- Delete category by id

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "category ${deleted.name} deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Category not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 7. POST /products

Description:
- Create product to database

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer"
}
```

- user.id:

```json
{
  "authorId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name required"
}
OR
{
  "message": "description required"
}
OR
{
  "message": "price required"
}
OR
{
  "message": "Price min Rp.150.000"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 8. GET /products

Description:
- Get all product from database

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Jaket Kemeja AirSense",
    "description": "Jaket Kemeja Pria yang nyaman dengan performa tinggi. Dengan desain yang ringan dan stylish",
    "price": "899000",
    "stock": "3",
    "imgUrl": "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455700/sub/goods_455700_sub14.jpg?width=750",
    "categoryId": 2,
    "authorId": 1,
    "createdAt": "2023-02-19 00:01:09.713 +0700",
    "updatedAt": "2023-02-19 00:01:09.713 +0700",
    "User": [{
       "userId": 1,
       "nameAuthor": "Randy",
       "role": "staff" 
    }]
  }
  ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 9. GET /products/:id

Description:
- Get specific product from database by id/primary key

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Jaket Kemeja AirSense",
    "description": "Jaket Kemeja Pria yang nyaman dengan performa tinggi. Dengan desain yang ringan dan stylish",
    "price": "899000",
    "stock": "3",
    "imgUrl": "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455700/sub/goods_455700_sub14.jpg?width=750",
    "categoryId": 2,
    "authorId": 1,
    "createdAt": "2023-02-19 00:01:09.713 +0700",
    "updatedAt": "2023-02-19 00:01:09.713 +0700"
  }
  ...,
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 10. DELETE /products/:id

Description:
- Delete products by id

Request:

- headers
```json
  {
  "access_token": "integer"
  }
``` 

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "product deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 11. POST /customers/register 
Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
}
```

_Response (201 - Created)_

```json
{
  "message": "account has been created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username required"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "password required"
}
OR
{
  "message": "min 5 characters"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 12. POST /customers/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "token": "string",
  "id": "integer",
  "name": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email or password required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email or password incorrrect"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 13. POST /customers/login-google 

Request:

- headers:

```json
{
  "idToken": "string"
}
```

_Response (200 - OK)_

```json
{
  "token": "string",
  "id": "integer",
  "name": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email or password required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email or password incorrrect"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 14. GET /categories/:id

Description:
- Get specific category from database by id/primary key

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Jaket Kemeja AirSense",
    "description": "Jaket Kemeja Pria yang nyaman dengan performa tinggi. Dengan desain yang ringan dan stylish",
    "price": "899000",
    "stock": "3",
    "imgUrl": "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455700/sub/goods_455700_sub14.jpg?width=750",
    "categoryId": 2,
    "authorId": 1,
    "createdAt": "2023-02-19 00:01:09.713 +0700",
    "updatedAt": "2023-02-19 00:01:09.713 +0700"
  }
  ...,
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Category not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 15. PUT /categories/:id

Description:
- Update category by id/primary key

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "string",
}
```

_Response (200 - OK)_

```json
{
  "message": "Category has been updated!",
  "data": "{
    id: integer,
    name: string
  }"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name required"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 16. PATCH /products/:id

Description:
- Update product status by id/primary key

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "status": "string",
}
```

_Response (200 - OK)_

```json
{
  "message": "Product status has been updeted!"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 17. GET /histories

Description:
- Get all history from database

Request:

- headers
```json
  {
  "access_token": "integer"
  }
``` 

_Response (200 - OK)_

```json
[
  {
      "id": 1,
      "title": "Outer",
      "description": "category with id 1 added",
      "updatedBy": "sabanarandy98@gmail.com",
      "createdAt": "2023-02-26T04:18:27.418Z",
      "updatedAt": "2023-02-26T04:18:27.418Z"
  }
  ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 18. GET /wishlists

Description:
- Get all wishlist from database

Request:

- headers
```json
  {
  "access_token": "integer"
  }
``` 

_Response (200 - OK)_

```json
{
    "page": 1,
    "data": [
        {
            "id": 3,
            "authorId": 11,
            "productId": 2,
            "createdAt": "2023-03-02T23:43:23.578Z",
            "updatedAt": "2023-03-02T23:43:23.578Z",
            "Product": {
                "id": 2,
                "name": "Jaket Coach",
                "description": "UT launches a collection featuring four community clubs selected by Hypebeast.",
                "price": 700000,
                "stock": 3,
                "imgUrl": "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/458104/item/idgoods_09_458104.jpg?width=750",
                "categoryId": 10,
                "authorId": 2,
                "status": "Active",
                "createdAt": "2023-02-26T04:29:21.241Z",
                "updatedAt": "2023-02-26T04:29:21.241Z"
            }
        }
    ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 19. POST /wishlists/:id

Description:
- Create new wishlist to database

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

- params:

```json
{
  "id": "integer (required)"
}
```

- user.id:

```json
{
  "authorId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "authorId": "integer",
  "productId": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Wishlist already exist"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 20. GET /customers/products

Description:
- Get all product from database

Request:

- Query
```json
{
  "filter": "integer",
  "minprice": "integer",
  "maxprice": "integer",
  "page[size]": "integer",
  "page[number]": "integer"
}

```

_Response (200 - OK)_

```json
{
    "page": 3,
    "data": [
        {
            "id": 2,
            "name": "Jaket Coach",
            "description": "UT launches a collection featuring four community clubs selected by Hypebeast.",
            "price": 700000,
            "stock": 3,
            "imgUrl": "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/458104/item/idgoods_09_458104.jpg?width=750",
            "categoryId": 10,
            "authorId": 2,
            "status": "Active",
            "createdAt": "2023-02-26T04:29:21.241Z",
            "updatedAt": "2023-02-26T04:29:21.241Z"
        },
      ...,
    ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 21. GET /customers/categories

Description:
- Get all category from database

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Rok",
    "createdAt": "2023-02-19 00:01:09.713 +0700",
    "updatedAt": "2023-02-19 00:01:09.713 +0700"
  }
  ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 22. GET /customers/products/:id

Description:
- Get specific product from database by id/primary key

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Jaket Kemeja AirSense",
    "description": "Jaket Kemeja Pria yang nyaman dengan performa tinggi. Dengan desain yang ringan dan stylish",
    "price": "899000",
    "stock": "3",
    "imgUrl": "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455700/sub/goods_455700_sub14.jpg?width=750",
    "categoryId": 2,
    "authorId": 1,
    "createdAt": "2023-02-19 00:01:09.713 +0700",
    "updatedAt": "2023-02-19 00:01:09.713 +0700"
  }
  ...,
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 23 POST /customers/products/qrcode

Request:

- body:

```json
{
  "urlWeb": "string"
}
```

_Response (201 - Created)_

```json
{
  "data": "string"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```


## BARU
<!-- ============================================================ -->


# Marvel Comics API Documentation

## Endpoints :

List of available endpoints:

- `GET /books/lists`
- `GET /books/:id`
- `POST /users/register`
- `POST /users/login`
- `GET /comments/:id`
- `POST /comments/:id`
- `GET /comments/edit/:id`
- `PATCH /comments/edit/:id`
- `GET /purchases`
- 


&nbsp;

## 1 GET /books/lists

Description:
- Get all books from database

Request:

- 

_Response (200 - OK)_

```json
[
  {
    {
        "id": 1,
        "idBook": "9781302484095",
        "title": "Marvel Universe Deadpool & Wolverine",
        "publisher": "Marvel Comics",
        "publishedDate": "2016-01-27T00:00:00.000Z",
        "description": "Marvel Adventures Super Heroes (2010) 4, Marvel Universe Ultimate Spider-Man: Web Warriors 8, Free Comic Book Day 2009: Wolverine, Marvel Adventures Spider-Man (2010) 3 [research]",
        "imgUrl": "http://books.google.com/books/content?id=1ov6CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "price": 173015,
        "createdAt": "2023-03-09T02:30:56.475Z",
        "updatedAt": "2023-03-09T02:30:56.475Z"
    },
    {
        "id": 2,
        "idBook": "9781476622187",
        "title": "Marvel Comicsäó» Civil War and the Age of Terror",
        "publisher": "Kevin Michael Scott",
        "publishedDate": "2015-09-01T00:00:00.000Z",
        "description": "Marvel Comics has an established tradition of addressing relevant real-life issues facing the American public. With the publication of Civil War (2006–2007), a seven-issue crossover storyline spanning the Marvel universe, they focused on contemporary anxieties such as terrorism and threats to privacy and other civil liberties. This collection of new essays explores the Civil War series and its many tie-in titles from the perspectives of history, political science, sociology, psychology, literary criticism, philosophy, law and education. The contributors provide a close reading of the series’ main theme—the appropriate balance between freedom and security—and discuss how that balance affects citizenship, race, gender and identity construction in 21st-century America.",
        "imgUrl": "http://books.google.com/books/content?id=FIyACgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "price": 311552,
        "createdAt": "2023-03-09T02:30:56.475Z",
        "updatedAt": "2023-03-09T02:30:56.475Z"
    },
    {
        "id": 3,
        "idBook": "9780062314697",
        "title": "Marvel Comics",
        "publisher": "Sean Howe",
        "publishedDate": "2013-10-01T00:00:00.000Z",
        "description": "The defining, behind-the-scenes chronicle of one of the most extraordinary, beloved, and dominant pop cultural entities in America’s history -- Marvel Comics – and the outsized personalities who made Marvel including Martin Goodman, Stan Lee, and Jack Kirby. “Sean Howe’s history of Marvel makes a compulsively readable, riotous and heartbreaking version of my favorite story, that of how a bunch of weirdoes changed the world…That it’s all true is just frosting on the cake.” —Jonathan Lethem For the first time, Marvel Comics tells the stories of the men who made Marvel: Martin Goodman, the self-made publisher who forayed into comics after a get-rich-quick tip in 1939, Stan Lee, the energetic editor who would shepherd the company through thick and thin for decades and Jack Kirby, the WWII veteran who would co-create Captain America in 1940 and, twenty years later, developed with Lee the bulk of the company’s marquee characters in a three-year frenzy. Incorporating more than one hundred original interviews with those who worked behind the scenes at Marvel over a seventy-year-span, Marvel Comics packs anecdotes and analysis into a gripping narrative of how a small group of people on the cusp of failure created one of the most enduring pop cultural forces in contemporary America.",
        "imgUrl": "http://books.google.com/books/content?id=ESwuwYxQNpYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "price": 227850,
        "createdAt": "2023-03-09T02:30:56.475Z",
        "updatedAt": "2023-03-09T02:30:56.475Z"
    },
  }
  ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 2. GET /books/:id

Description:
- Get specific book from database by id/primary key

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "idBook": "9781302484095",
    "title": "Marvel Universe Deadpool & Wolverine",
    "publisher": "Marvel Comics",
    "publishedDate": "2016-01-27T00:00:00.000Z",
    "description": "Marvel Adventures Super Heroes (2010) 4, Marvel Universe Ultimate Spider-Man: Web Warriors 8, Free Comic Book Day 2009: Wolverine, Marvel Adventures Spider-Man (2010) 3 [research]",
    "imgUrl": "http://books.google.com/books/content?id=1ov6CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "price": 173015,
    "createdAt": "2023-03-09T02:30:56.475Z",
    "updatedAt": "2023-03-09T02:30:56.475Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 3. POST /users/register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "account has been created",
  "id": "integer",
  "name": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username required"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "password required"
}

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 4. POST /users/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "token": "string",
  "id": "integer",
  "name": "string",
  "imgUrl": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email or password required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email or password incorrrect"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 5. GET /comments/:id

Description:
- Get specific comment from database by id/primary key

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "UserId": 2,
        "BookId": 1,
        "commentText": "Mantap kali wak",
        "avatar": "https://api.dicebear.com/5.x/bottts-neutral/svg?seed=randy",
        "createdAt": "2023-03-09T03:53:15.936Z",
        "updatedAt": "2023-03-09T03:53:15.936Z"
    }
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 6. POST /comments/:id

Description:
- Create comment to database bise on book comment by user

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

- body:

```json
{
  "commentText": "text"
}
```

- user.id:

```json
{
  "authorId": "integer"
}
```

- user.avatar:

```json
{
  "authorId": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "UserId": "integer",
  "BookId": "integer",
  "commentText": "text",
  "avatar": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 7. GET /comments/edit/:id

Description:
- Get specific comment from database by id/primary key

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "UserId": 2,
        "BookId": 1,
        "commentText": "Mantap kali wak",
        "avatar": "https://api.dicebear.com/5.x/bottts-neutral/svg?seed=randy",
        "createdAt": "2023-03-09T03:53:15.936Z",
        "updatedAt": "2023-03-09T03:53:15.936Z"
    }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 8. PATCH /comments/edit/:id

Description:
- Update commet text by id/primary key

Request:

- headers
```json
  {
  "access_token": "integer"
  }
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "commentText": "text",
}
```

_Response (200 - OK)_

```json
{
  "message": "Product status has been updeted!"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 9. GET /purchases

Description:
- Get all books from database

Request:

- user.id:

```json
{
  "authorId": "integer"
}
```

_Response (200 - OK)_

```json
[
  {
    "id":
  }
  ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```











