---
sidebar_position: 1
---

# Lab-1-5

**(2% of the course mark)**

## Express js API Compression Lab

- Students will learn how to **integrate** and **configure compression middleware** in an **Express.js app**. They will understand the importance of **response compression** in **improving API performance** and **reducing bandwidth usage**.

### Lab objectives

- Explain why **compression** is **beneficial for API performance** and how it **impacts bandwidth usage**.

- **Install** and **configure** the **compression middleware** in an Express application.

- **Customize compression settings** to **optimize performance** for **different content types** and **scenarios**.

- **Verify** that **responses** are being compressed using tools such as **Postman** or **browser developer tools**.

### Create Node.js Express app

1. Open **VSCode** and create a folder named **Express-API-COMPRESSION**.

2. Open the **terminal** and change the directory to **Express-API-COMPRESSION**.

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

14. Install **compression** by running the following command:

```bash
npm install compression
npm install @types/compression -D
```

15. In the root folder of the app, create a folder named **repositories**.

16. In the **repositories folder**, create a file named **photosRepository.ts** and add the following code, from the file below:

[**photosRepository.ts**](/img/common/lab1/photosRepository.ts)

17. In the root folder of the app, create a folder named **middlewares**.

18. In the **middlewares folder**, create a file named **compress.ts** and add the following code:

```js
// Developer:
// Purpose:

import { type Request, type Response, type NextFunction } from "express";
import compression from "compression";

export function compressResponse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return compression({ threshold: 0 })(req, res, next);
}
```

19. Create a file named **index.ts** and add the following code:

```js
// Developer:
// Purpose:

import * as dotenv from "dotenv";
dotenv.config();
import express, { type Request, type Response } from "express";
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = express();

import { compressResponse } from "./middlewares/compress.js";
import { photos } from "./repositories/photosRepository.js";

// Uncompressed photos route
app.get("/photos", (req: Request, res: Response) => {
  res.json(photos);
});

// Compressed photos route
app.get("/compress/photos", compressResponse, (req: Request, res: Response) => {
  res.json(photos);
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

:::danger Express app status

Verify that your Express app starts without errors before proceeding to the next step.

:::

### Developer tools testing

1. Open the browser's **Developer Tools**, click on the **Network tab**, and ensure that **Disable Cache is checked**.

2. Open your browser and navigate to: **http://localhost:3000/photos**. Take a screenshot and save it as **not-compressed.png**.

:::danger Ensure the screenshot includes the following information

**xxxx kB transferred xxxx kB resources Finish: xxxx ms DOMContentLoaded: xxxx ms Load: xxxx ms**.

:::

3. Open your browser and navigate to: **http://localhost:3000/compress/photos**. Take a screenshot and save it as **compressed.png**.

:::danger Ensure the screenshot includes the following information

**xxxx kB transferred xxxx kB resources Finish: xxxx ms DOMContentLoaded: xxxx ms Load: xxxx ms**.

:::

4. Compare the results from both **screenshots**, **what conclusions can you draw?** Take note of your conclusion, as you will need to **write it in the Comments text area** when **submitting this lab**.

### Submission

1. Create a folder named **submit**.

:::danger Delete node_modules

Delete the **node_modules** folder on **any app that you are submitting**.

:::

2. Copy the **Express-API-COMPRESSION** folder and all the screenshots **(not-compressed.png and compressed.png)** to the **submit folder**. Write your **conclusion** in the **Comments text area**.

3. Create a **zip** file of the **submit folder**.

4. Navigate back to where the lab was originally downloaded, there should be a **Submissions section** (see below) where the zip file can be uploaded.

<img src="/img/common/submission.png" alt="submission" width="600"/>
