# Task 2 API — Postman testing

Start the existing Task 1 server, then use `http://localhost:5000` as the base URL.

## 1. Create a user and sign in

Use the register and login requests already present in Task 1. Copy the JWT from the login response.

For each task request below, open **Authorization**, choose **Bearer Token**, and paste that JWT.

## 2. Create a few tasks

Send **POST** to `http://localhost:5000/api/tasks` with **Body → raw → JSON**:

```json
{
  "title": "Finish project report",
  "description": "Review the final notes",
  "priority": "high",
  "dueDate": "2026-12-01"
}
```

Create two or three tasks and keep one task `_id` from the response.

## 3. Get all your tasks

Send **GET** to `http://localhost:5000/api/tasks`. The response includes `count` and a `tasks` array, newest first.

## 4. Update a task

Send **PUT** to `http://localhost:5000/api/tasks/TASK_ID`, replacing `TASK_ID` with the saved `_id`.
Use a JSON body such as:

```json
{
  "status": "in-progress",
  "priority": "medium"
}
```

Only fields included in the request are changed. The `user` field cannot be changed.

## 5. Delete a task

Send **DELETE** to `http://localhost:5000/api/tasks/TASK_ID`. A successful response says `Task deleted`.

## 6. Check task ownership

Register and sign in as a second user. With the second user's JWT, request **GET** `http://localhost:5000/api/tasks/FIRST_USER_TASK_ID`.
The response should be **404** with `{ "message": "Task not found" }`.

## Existing Task 1 setup

The supplied Task 1 source files were not included with this request, so `server.js` uses the described `connectDB` export and `/api/auth` and `/api/users` mounts. If your working server uses different existing mount paths or a different database export, keep those existing lines and add the `taskRoutes` import and `/api/tasks` mount. The task model, controller, and routes do not depend on those mount names.
