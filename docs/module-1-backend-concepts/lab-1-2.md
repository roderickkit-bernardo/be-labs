---
sidebar_position: 1
---

# Lab-1-2

**(2% of the course mark)**

## Express.js API Lab

- Create a simple **RESTful API** using **Node.js** and **Express.js** that handles basic **CRUD (Create, Read, Update, Delete)** operations for a resource.

### Lab objectives

- Practical experience in setting up a basic **RESTful API** using **Node.js** and **Express.js**.

- Familiarize yourself with implementing **CRUD (Create, Read, Update, Delete)** operations for a resource through HTTP methods.

### Create basic Node.js Express app

1. Open **VSCode** and create a folder named **Express-API**.

2. Open the **terminal** and change the directory to **Express-API**.

3. Initialize the app by running the following command:

```bash
npm init -y
```

4. Install **typescript** by running the following commands:

```bash
npm install typescript -D
npm install @types/node -D
```

5. Initialize **tsconfig.json** by running the following command:

```bash
npx tsc --init
```

6. Modify **tsconfig.json** and uncomment **outDir**.

7. Modify **tsconfig.json** and add the following **property**:

```json
"removeComments": true
```

8. Install **nodemon** by running the following command:

```bash
npm install nodemon -D
```

9. Install **dotenv** by running the following command:

```bash
npm install dotenv
```

10. Create an **.env file** in the root of your project and enter the following.

```bash
PORT=3000
```

11. Install **express** by running the following commands:

```bash
npm install express
npm install @types/express -D
```

12. Configure **package.json** by adding a new entry to the **scripts** property.

```json
"build": "tsc",
"start": "nodemon ./dist/index",
```

13. Configure **package.json** by adding a new property.

```json
"type": "module"
```

14. Create a file named **index.ts** and add the following code:

```js
// Developer:
// Purpose:

import * as dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response } from "express";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = express();

app.put("/", (req: Request, res: Response) => {
  res.json({ message: "PUT method = Create (CRUD)" });
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "GET method = Read (CRUD)" });
});

app.post("/", (req: Request, res: Response) => {
  res.json({ message: "POST Method = Update (CRUD)" });
});

app.delete("/", (req: Request, res: Response) => {
  res.json({ message: "DELETE Method = Delete (CRUD)" });
});

app.all("/{*catchAll}", (req: Request, res: Response) => {
  res.status(404).json({
    message: `Invalid route (${req.url}) or HTTP method (${req.method}).`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
});

function shutdown() {
  console.log(`Server is shutting down.`);
  process.exit(0);
}
```

15. Build the app by running the following command:

```bash
npm run build
```

16. Start the app by running the following command:

```bash
npm run start
```

### Postman Testing

1. Open **Postman**, click **File > New... > HTTP**.

2. Set the HTTP method to **POST** and the URL to **http://localhost:3000**.

3. Click on **Send**. Take a screenshot and save it as **post.png**.

4. Set the HTTP method to **GET** and the URL to **http://localhost:3000**.

5. Click on **Send**. Take a screenshot and save it as **get.png**.

6. Set the HTTP method to **PUT** and the URL to **http://localhost:3000**.

7. Click on **Send**. Take a screenshot and save it as **put.png**.

8. Set the HTTP method to **DELETE** and the URL to **http://localhost:3000**.

9. Click on **Send**. Take a screenshot and save it as **delete.png**.

10. Set the HTTP method to **PATCH** and the URL to **http://localhost:3000/invalid**.

11. Click on **Send**. Take a screenshot and save it as **invalid.png**.

### Submission

1. Create a folder named **submit**.

:::danger Delete node_modules

Delete the **node_modules** folder on **any app that you are submitting**.

:::

2. Copy the **Express-API** folder and all the screenshots **(post.png, get.png, put.png, delete.png, and invalid.png)** to the **submit folder**.

3. Create a **zip** file of the **submit folder**.

4. Navigate back to where the lab was originally downloaded, there should be a **Submissions section** (see below) where the zip file can be uploaded.

<img src="/img/common/submission.png" alt="submission" width="600"/>
