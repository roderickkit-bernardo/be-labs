---
sidebar_position: 1
---

# Lab-2-3

**(2% of the course mark)**

## Database Design Lab

- This lab covers database design principles using **Entity-Relationship Diagrams (ERDs)** and **Normalization techniques**. It introduces the fundamentals of **data modeling**, **relationship mapping**, and **normalization** to ensure an efficient, consistent, and scalable database structure. MySQL Workbench and SQL scripts are used to implement the logical database design.

### Lab objectives

- Design **ERDs** to visually represent **entities**, **attributes**, and **relationships**.

- Apply **normalization** to **eliminate redundancy** and **maintain data integrity**.

- Convert **ERD models** into **relational schema**.

- **Implement relational schema** via **MySQL Workbench** and **SQL scripts**.

- **Identify** and **resolve anomalies** in database design.

- **Optimize database structure** for performance and maintainability.

:::danger Docker Desktop Installation and Configuration

- Ensure that **Docker Desktop** is installed and that a **MySQL image** and **container** are configured and running properly. These activities are covered in **Lab 2-1**.

:::

### Database design scenario

1. Design a **database schema** for a **library app** where **patrons** can **borrow** and **return books**. **Keep track** of the **number of books on hand** as well as those that have been **borrowed** and **patrons** can **only borrow one copy** of the **same book at a time**.

2. Define the **entities**, **attributes**, and **relationships** required to support the scenario described above.

### Start MySQL container

1. Open **Docker Desktop** and click on **Containers**.

2. Locate **mysql-container** and start it by clicking the **triangle icon** under the **Actions column**.

:::danger MySQL container start

- Ensure the **mysql-container** is running successfully before proceeding to the next step.

:::

### Connect and create schema

1. Open **MySQL Workbench** and click **mysql-container** connection to connect to the **Docker MySQL db server**.

2. Click on **File** > **New Model**.

3. On the **Physical Schemas section** click on the **plus icon +** to create a schema.

<img src="/img/common/lab3/mysql-workbench-physical-schema.png" alt="mysql-workbench-physical-schema" width="600"/>

4. Set the Name as **library_db**.

<img src="/img/common/lab3/mysql-workbench-library-db.png" alt="mysql-workbench-library-db" width="200"/>

5. Close the tab to finish.

### Create tables

1. Ensure that you are on the **library_db schema tab**.

<img src="/img/common/lab3/mysql-workbench-add-table-01.png" alt="mysql-workbench-add-table-01" width="200"/>

:::info

Create the **parent table before the child table**, as failing to do so will result in **extra steps** when **adding the referenced table and column**.

:::

2. Based on the **entities**, **attributes**, and **relationships** defined previously, create them by clicking **Add Table**. Enter the **column names**, and choose the **datatypes** and **constraints**.

<img src="/img/common/lab3/mysql-workbench-add-table-02.png" alt="mysql-workbench-add-table-02" width="600"/>

3. If **an entity** has a **relationship** with **another entity**, it can be set by clicking the **Foreign Keys tab**. Ensure that the **Foreign Key Name** is **unique**, choose the correct **Referenced Table**, and select the corresponding **Column** and **Referenced Column**.

<img src="/img/common/lab3/mysql-workbench-add-table-03.png" alt="mysql-workbench-add-table-02" width="600"/>

4. Repeat the previous steps until all the **entities**, **attributes**, and **relationships** are created.

### Create DB object via Forward Engineering

1. Click on **Database** > **Forward Engineer**.

2. Click on **Next**.

3. If presented with a choice to select schemas, ensure that **library_db** is selected. Click on **Next**.

4. Click on **Next**.

5. Ensure that the **selected values match** the number of **entities** / **tables** created.

<img src="/img/common/lab3/mysql-workbench-export-table.png" alt="mysql-workbench-export-table" width="200"/>

6. The next screen will provides a way to review the script. Create the schema by clicking on **Save to File...** and save it as **library_db.sql**. Click on **Next**.

7. The next screen should show a **confirmation that the schema has been created**. If there are **errors**, **take note of them** and **go back to the table definitions**.

<img src="/img/common/lab3/forward-engineering.png" alt="forward-engineering" width="300"/>

### Create ERD via Reverse Engineering

1. Click on **Database** > **Reverse Engineer**.

2. Click on **Next**.

3. Click on **Next**.

4. If presented with a choice to select schemas, ensure that **library_db** is selected. Click on **Next**.

5. Click on **Next**.

6. Click on **Execute**.

7. Click on **Next**.

8. Click on **Finish**.

9. The resulting page should be an **ERD diagram**. **Drag** the **tables** around and arrange them in a way that the **relationships are visible**.

10. **Save this diagram** as a PNG image by clicking on **File** > **Export** > **Export as PNG...** and save it as **library_db.png**.

### Submission

1. Create a folder named **submit**.

2. Copy **library_db.sql** and **library_db.png** to the submit folder.

3. Create a **zip** file of the **submit folder**.

4. Navigate back to where the lab was originally downloaded, there should be a **Submissions section** (see below) where the zip file can be uploaded.

<img src="/img/common/submission.png" alt="submission" width="600"/>
```
