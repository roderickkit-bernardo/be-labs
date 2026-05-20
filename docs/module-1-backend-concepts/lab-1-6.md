---
sidebar_position: 1
---

# Lab-1-6

**(2% of the course mark)**

## Express js API Helmet Lab

- This lab focuses on integrating **Helmet**, a **security middleware for Express.js applications**, to enhance security by setting various HTTP headers.

### Lab objectives

- Understand the **purpose** and **benefits** of **using Helmet in Express.js applications**.

- Successfully **integrate Helmet** into an Express.js application.

- **Configure** different **Helmet** modules to **set appropriate HTTP headers**.

- **Identify** and **mitigate** common **security vulnerabilities** using **Helmet**.

- **Test the application** to **ensure headers** are correctly **set** and security is enhanced.

### Create Node.js Express app

1. Open **VSCode** and create a folder named **Express-API-HELMET**.

2. Open the **terminal** and change the directory to **Express-API-HELMET**.

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

14. Install **helmet** by running the following command:

```bash
npm install helmet
npm install @types/helmet -D
```

15. Create a file named **index.ts** and add the following code:

```js
// Developer:
// Purpose:

import * as dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response } from "express";
import Helmet from "helmet";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = express();

// Use the helmet middleware
app.use(Helmet());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Helmet middleware demo..." });
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

16. Build the app by running the following command:

```bash
npm run build
```

17. Start the app by running the following command:

```bash
npm run start
```

:::danger Express app status

Verify that your Express app starts without errors before proceeding to the next step.

:::

### Browser testing

:::info

- Ensure that **helmet** is **disabled** by commetting the following code:

```js
// import Helmet from "helmet";
// app.use(Helmet());
```

- **Build** the **app** by running the following command:

```bash
npm run build
```

:::

1. Open your browser and navigate to: **http://localhost:3000**.

2. Open the browser's **Developer Tools**, click on the **Network tab**, and **refresh the page**.

3. Click on **localhost** and **Headers tab**.

4. Scroll and expand the **Response Headers** section. Take a screenshot and save it as **browser-no-helment.png**.

:::info

- Ensure that **helmet** is **enabled** by uncommetting the following code:

```js
import Helmet from "helmet";
app.use(Helmet());
```

- **Build** the **app** by running the following command:

```bash
npm run build
```

:::

5. **Refresh the page** once again.

6. Click on **localhost** and **Headers tab**.

7. Scroll and expand the **Response Headers** section. Take a screenshot and save it as **browser-with-helment.png**.

8. Compare the results from both **screenshots**, **what conclusions can you draw?** Take note of your conclusion, as you will need to **write it in the Comments text area** when **submitting this lab**.

### Testing setup with vitest

1. Install **vitest** by running the following command:

```bash
npm install vitest -D
```

2. Configure **package.json** by updating the test entry of the **scripts** property.

```json
"test": "vitest run",
```

3. Modify **tsconfig.json** by adding the following **property** at the bottom of the file:

```json
"exclude": ["dist", "node_modules", "index.test.ts"]
```

4. In the root folder of the app, create a file named **index.test.ts** and add the following code:

```js
// Developer:
// Purpose:

import { describe, it, expect } from "vitest";

// Server to test
const SERVER_URL = "http://localhost:3000";

// Test plan to verify Helmet security response headers
describe("Helmet security response headers", () => {
  it('Should set X-DNS-Prefetch-Control header to "off"', async () => {
    const res = await fetch(SERVER_URL);
    expect(res.headers.get("x-dns-prefetch-control")).toBe("off");
  });

  it('Should set X-Frame-Options header to "SAMEORIGIN"', async () => {
    const res = await fetch(SERVER_URL);
    expect(res.headers.get("x-frame-options")).toBe("SAMEORIGIN");
  });

  it("Should set Strict-Transport-Security header", async () => {
    const res = await fetch(SERVER_URL);
    expect(res.headers.get("strict-transport-security")).toMatch(
      /max-age=\d+; includeSubDomains/
    );
  });

  it('Should set X-Content-Type-Options header to "nosniff"', async () => {
    const res = await fetch(SERVER_URL);
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
  });

  it('Should set X-Permitted-Cross-Domain-Policies header to "none"', async () => {
    const res = await fetch(SERVER_URL);
    expect(res.headers.get("x-permitted-cross-domain-policies")).toBe("none");
  });

  it('Should set Referrer-Policy header to "no-referrer"', async () => {
    const res = await fetch(SERVER_URL);
    expect(res.headers.get("referrer-policy")).toBe("no-referrer");
  });
});
```

:::info

- Ensure that **helmet** is **disabled** by commetting the following code:

```js
// import Helmet from "helmet";
// app.use(Helmet());
```

- **Build** the **app** by running the following command:

```bash
npm run build
```

:::

5. Open a new **terminal** window and run the following command:

```bash
npm run test
```

6. Take a screenshot of the result and save it as **vitest-no-helmet.png**.

:::info

- Ensure that **helmet** is **enabled** by uncommetting the following code:

```js
import Helmet from "helmet";
app.use(Helmet());
```

- **Build** the **app** by running the following command:

```bash
npm run build
```

:::

7. Open a new **terminal** window and run the following command:

```bash
npm run test
```

8. Take a screenshot of the result and save it as **vitest-with-helmet.png**.

9. Compare the results from both **screenshots**, **what conclusions can you draw?** Take note of your conclusion, as you will need to **write it in the Comments text area** when **submitting this lab**.

### Submission

1. Create a folder named **submit**.

:::danger Delete node_modules

Delete the **node_modules** folder on **any app that you are submitting**.

:::

2. Copy the **Express-API-HELMET** folder and all the screenshots **(browser-no-helment.png, browser-with-helment.png, vitest-no-helmet.png and vitest-with-helmet.png)** to the **submit folder**. Write your **conclusions** in the **Comments text area**.

3. Create a **zip** file of the **submit folder**.

4. Navigate back to where the lab was originally downloaded, there should be a **Submissions section** (see below) where the zip file can be uploaded.

<img src="/img/common/submission.png" alt="submission" width="600"/>
