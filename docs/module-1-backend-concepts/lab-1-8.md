---
sidebar_position: 1
---

# Lab-1-8

**(2% of the course mark)**

## Express.js API Pagination Lab

- In this lab, students will learn how to implement **pagination in an Express.js application**. Pagination is **essential for managing large datasets** and **improving the user experience** by **loading data in manageable chunks**. Students will practice creating paginated endpoints and understand how to handle query parameters to fetch specific subsets of data.

### Lab objectives

- Understand the **concept** and **importance of pagination** in web applications.

- Implement **pagination logic** in an **Express.js application**.

- Use **url parameters** to **fetch specific pages of data**.

### Create Node.js Express app

1. Open **VSCode** and create a folder named **Express-API-PAGINATION**.

2. Open the **terminal** and change the directory to **Express-API-PAGINATION**.

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
MAX_RECORDS=10
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

14. In the **repositories folder**, create a file named **photosRepository.ts** and add the following code, from the file below:

[**photosRepository.ts**](/img/common/lab1/photosRepository.ts)

15. Update **photosRepository.ts** and on the top of file, add the following code:

```js
export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
```

16. In the root folder of the app, create a folder named **lib**.

17. In the **lib folder**, create a file named **utils.ts** and add the following code:

```js
// Developer:
// Purpose:

import { photos, type Photo } from "../repositories/photosRepository.js";

export function findById(id: number) {
  const convertedId = Number(id);
  if (!Number.isInteger(convertedId)) {
    return {};
  }

  const photo = photos.find((photo) => photo.id === convertedId);
  return photo ? photo : {};
}

export function findByIndex(index: number, maxRecords: number) {
  const convertedIndex = Number(index);
  const defaultResponse: {
    maxRecords: number,
    data: Photo[],
    nextIndex: number,
  } = {
    maxRecords: photos.length,
    data: [],
    nextIndex: 1,
  };

  if (!Number.isInteger(convertedIndex)) {
    return defaultResponse;
  }

  if (convertedIndex < 1) {
    return defaultResponse;
  }

  index = index - 1;
  defaultResponse.data = photos.slice(index, index + maxRecords);
  const nextIndex = index + maxRecords + 1;
  defaultResponse.nextIndex =
    nextIndex < defaultResponse.maxRecords
      ? nextIndex
      : defaultResponse.maxRecords;

  return defaultResponse;
}
```

18. Create a file named **index.ts** and add the following code:

```js
// Developer:
// Purpose:

import * as dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response } from "express";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = express();
const MAX_RECORDS: number = process.env.MAX_RECORDS
  ? parseInt(process.env.MAX_RECORDS)
  : 10;

import { findById, findByIndex } from "./lib/utils.js";

app.get("/id/:id", (req: Request, res: Response) => {
  res.json(findById(Number(req.params.id)));
});

app.get("/index/:index", (req: Request, res: Response) => {
  res.json(findByIndex(Number(req.params.index), MAX_RECORDS));
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

19. Build the app by running the following command:

```bash
npm run build
```

20. Start the app by running the following command:

```bash
npm run start
```

:::danger Express app status

Verify that your Express app starts without errors before proceeding to the next step.

:::

### Browser testing

1. Open your **browser**, **navigate** to **each URL** in the table below, take a **screenshot**, and use the **corresponding name for each URL**.

| URL                                 | Screenshot name   |
| ----------------------------------- | ----------------- |
| http://localhost:3000/id/1          | id-valid.png      |
| http://localhost:3000/id/invalid    | id-invalid.png    |
| http://localhost:3000/index/1       | index-valid.png   |
| http://localhost:3000/index/invalid | index-invalid.png |

### Upgrade pagination endpoint

1. Modify **index.ts** and **utils.ts** to support the following requirements:

   - Endpoint shall be able to accept **start** and **end indexes**.

   - Indexes shall be **validated** and **must be numbers**.

   - Start index **shall be less** than end index.

   - Endpoint shall return **records** based on the **start** and **end indexes**; however, the **number of returned records** shall **not exceed MAX_RECORDS**.

### Submission

1. Create a folder named **submit**.

:::danger Delete node_modules

Delete the **node_modules** folder on **any app that you are submitting**.

:::

2. Copy the **Express-API-PAGINATION** folder and all the screenshots **(id-valid.png, id-invalid.png, index-valid.png, and index-invalid.png)** to the **submit folder**.

3. Create a **zip** file of the **submit folder**.

4. Navigate back to where the lab was originally downloaded, there should be a **Submissions section** (see below) where the zip file can be uploaded.

<img src="/img/common/submission.png" alt="submission" width="600"/>
