# Development environment

In order to run application use:
      `docker-compose up`

Maybe the first time nodemon will block access to the database so stop the container and run again:
```bash
docker-compose up
```

## API Endpoints Reference

- ### Feed Database with data

```http
  POST localhost:3000/feedDB
```


- ### Get Users' Info by using parameters

```http
  GET localhost:3000/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` |      user's id           |
| `firstName` | `string` |      user's first name           |
| `lastName` | `string` |      user's last name           |
| `gender` | `string` |    user's gender  (Male or Female or N/A)        |
| `dateOfBirth` | `iso string` |      user's date of birth       |
| `username` | `string` |       user's username          |
| `createdAt` | `iso string` |              |
| `updatedAt` | `iso string` |        |

#### Usage/Examples

```javascript
localhost:3000/users?gender=Male
```


- ### Get messages that 2 users have exchanged, ordered by the most recent sent

```http
  GET localhost:3000/users/messages/{:id1}/{:id2}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id1` | `number` |     first user id           |
| `id2` | `number` |     second user id           |


#### Usage/Examples

```javascript
localhost:3000/users/messages/1/3
```

- ### Get  list of users, sorted by the most recent message that has been exchanged between the user requested and the rest of the users 

```http
  GET localhost:3000/users/contacts/{:id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `number` |   user id           |


#### Usage/Examples

```javascript
localhost:3000/users/contacts/1
```

## Front-End App: 
 ### folder: /client
```javascript
localhost:5000
```
