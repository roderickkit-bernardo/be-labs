---
sidebar_position: 1
---

# Lab-2-2

**(2% of the course mark)**

## SQL Basics via MySQL Lab

- SQL Basics via MySQL is a hands-on laboratory course designed to introduce students to one of the world's most widely used relational database management systems. Through guided exercises and practical challenges, students will develop the foundational skills needed to **interact with MySQL databases** confidently and effectively. This lab bridges the gap between database theory and real-world application, giving students direct experience **writing queries**, **managing data**, and **working within the MySQL environment**.

### Lab objectives

- **Create** and **drop database objects** such as **DATABASES** and **TABLES**.

- **View existing databases objects** using **SHOW DATABASES** and **SHOW TABLES**.

- Use **SQL commands** such as **SELECT**, **INSERT**, **UPDATE**, and **DELETE**.

- **Combine matching rows** from **two tables** using **INNER JOIN**.

- **Write clean**, **readable SQL statements** following standard formatting and naming conventions.

:::danger Docker Desktop Installation and Configuration

- Ensure that **Docker Desktop** is installed and that a **MySQL image** and **container** are configured and running properly. These activities are covered in **Lab 2-1**.

:::

### Start MySQL container

1. Open **Docker Desktop** and click on **Containers**.

2. Locate **mysql-container** and start it by clicking the **triangle icon** under the **Actions column**.

:::danger MySQL container start

- Ensure the **mysql-container** is running successfully before proceeding to the next step.

:::

### MySQL Workbench Connection

1. Open **MySQL Workbench** and click the **(+)** icon next to **MySQL Connections** to create a new connection.

2. Set the **Connection Name** to **mysql-container**.

<img src="/img/common/lab2/mysql-workbench-01.png" alt="mysql-workbench-01" width="600"/>

3. Click **Store in Vault...** and enter **password** as the password.

<img src="/img/common/lab2/mysql-workbench-02.png" alt="mysql-workbench-02" width="300"/>

4. Click **OK** to save the connection.

<img src="/img/common/lab2/mysql-workbench-03.png" alt="mysql-workbench-03" width="150"/>

### Connect and Use DB

1. Open **MySQL Workbench** and click mysql-container connection to connect the MySQL db server.

2. Create the database: company_db, On the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
CREATE DATABASE company_db;
```

3. Use the database: company_db, On the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
USE company_db;
```

### Create Tables

1. Create the **departments table**, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
CREATE TABLE departments (
    department_id   INT            PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100)   NOT NULL UNIQUE,
    location        VARCHAR(100)   DEFAULT 'Head Office',
    budget          DECIMAL(15, 2) CHECK (budget >= 0)
);
```

2. Create the **employees table**, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
CREATE TABLE employees (
    employee_id   INT            PRIMARY KEY AUTO_INCREMENT,
    first_name    VARCHAR(50)    NOT NULL,
    last_name     VARCHAR(50)    NOT NULL,
    email         VARCHAR(150)   NOT NULL UNIQUE,
    phone         VARCHAR(20),
    hire_date     DATE           NOT NULL,
    salary        DECIMAL(10, 2) CHECK (salary > 0),
    is_active     BOOLEAN        DEFAULT TRUE,
    department_id INT,

    -- Foreign key with ON DELETE SET NULL
    -- If a department is deleted, employee row stays but department_id becomes NULL
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE SET NULL
);
```

3. Create the **projects table**, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
CREATE TABLE projects (
    project_id    INT          PRIMARY KEY AUTO_INCREMENT,
    project_name  VARCHAR(150) NOT NULL,
    start_date    DATE,
    end_date      DATE,
    department_id INT,

    -- Foreign key with ON DELETE CASCADE
    -- If a department is deleted, its projects are also deleted
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE CASCADE
);
```

4. Create the **employee_projects junction table**, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
CREATE TABLE employee_projects (
    employee_id INT          NOT NULL,
    project_id  INT          NOT NULL,
    role        VARCHAR(100),

    PRIMARY KEY (employee_id, project_id), -- Composite primary key

    FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id)
        ON DELETE CASCADE,

    FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE
);
```

### Insert Data

1. Populate the **departments table**, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
INSERT INTO departments (department_name, location, budget) VALUES
('Engineering', 'Floor 3',     500000.00),
('Marketing',   'Floor 2',     200000.00),
('HR',          'Floor 1',     150000.00),
('Finance',     'Head Office', 300000.00);
```

2. Populate the **employees table**, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
INSERT INTO employees (first_name, last_name, email, phone, hire_date, salary, department_id) VALUES
('Alice', 'Smith',  'alice@company.com', '555-1001', '2020-03-15',  95000.00, 1),
('Bob',   'Jones',  'bob@company.com',   '555-1002', '2019-07-01',  88000.00, 1),
('Carol', 'White',  'carol@company.com', '555-1003', '2021-01-10',  72000.00, 2),
('David', 'Brown',  'david@company.com', '555-1004', '2018-11-20',  65000.00, 3),
('Eva',   'Davis',  'eva@company.com',   '555-1005', '2022-06-05', 110000.00, 1),
('Frank', 'Miller', 'frank@company.com', '555-1006', '2020-09-30',  78000.00, 4),
('Grace', 'Wilson', 'grace@company.com', '555-1007', '2023-02-14',  60000.00, 2);
```

3. Populate the **projects table**, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
INSERT INTO projects (project_name, start_date, end_date, department_id) VALUES
('Website Redesign',  '2024-01-01', '2024-06-30', 1),
('Brand Campaign',    '2024-03-01', '2024-09-30', 2),
('HR System Upgrade', '2024-02-01', '2024-12-31', 3),
('API Modernisation', '2024-04-01', '2025-03-31', 1);
```

4. Populate the **employee_projects table**, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
INSERT INTO employee_projects (employee_id, project_id, role) VALUES
(1, 1, 'Tech Lead'),
(2, 1, 'Backend Developer'),
(5, 1, 'Frontend Developer'),
(3, 2, 'Campaign Manager'),
(7, 2, 'Content Writer'),
(4, 3, 'Project Coordinator'),
(1, 4, 'Architect'),
(2, 4, 'Developer');
```

### Select Data

1. Get all the employees, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
SELECT * FROM employees;
```

2. Take a screenshot of the results and save it as **all-employees.png**.

3. Get all the employees with specific columns, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
SELECT first_name, last_name, salary FROM employees;
```

4. Take a screenshot of the results and save it as **specific-columns-all-employees.png**.

5. Get all the employees earning over 80k, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
SELECT first_name, last_name, salary
FROM employees
WHERE salary > 80000;
```

6. Take a screenshot of the results and save it as **employees-where.png**.

7. Get all the employees earning over 70k and department_id = 1, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
SELECT first_name, last_name, salary, department_id
FROM employees
WHERE salary > 70000 AND department_id= 1;
```

8. Take a screenshot of the results and save it as **employees-and.png**.

9. Get all the employees in department_id 1 or 2, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
SELECT first_name, last_name, department_id
FROM employees
WHERE department_id IN (1, 2);
```

10. Take a screenshot of the results and save it as **employees-in.png**.

11. Get all the employees with first names start with A or D, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
SELECT first_name, last_name
FROM employees
WHERE first_name LIKE 'A%' OR first_name LIKE 'D%';
```

12. Take a screenshot of the results and save it as **employees-like.png**.

13. Get all the employees and order by salary in descending order, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC;
```

14. Take a screenshot of the results and save it as **employees-order-by-01.png**.

15. Get all the employees salary and order by ascending(department_id) and descending(salary), on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
SELECT first_name, last_name, department_id, salary
FROM employees
ORDER BY department_id ASC, salary DESC;
```

16. Take a screenshot of the results and save it as **employees-order-by-02.png**.

### Joins

1. Get all employees with their department name, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
SELECT
    e.employee_id,
    e.first_name,
    e.last_name,
    e.salary,
    d.department_name,
    d.location
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;
```

2. Take a screenshot of the results and save it as **inner-join.png**.

3. Get all employees with or without their department name, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;
```

4. Take a screenshot of the results and save it as **left-join.png**.

### Update Data

1. Give all Engineering employees a 10% raise, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
UPDATE employees
SET salary = salary * 1.10
WHERE department_id = (
    SELECT department_id FROM departments WHERE department_name = 'Engineering'
);
```

```sql
-- Verify the changes
SELECT * FROM employees WHERE department_id = (
    SELECT department_id FROM departments WHERE department_name = 'Engineering'
);
```

2. Take a screenshot of the results and save it as **update-01.png**.

3. Update a single employee's phone number, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
UPDATE employees
SET phone = '555-9999'
WHERE email = 'alice@company.com';
```

```sql
-- Verify the changes
SELECT * FROM employees WHERE email = 'alice@company.com';
```

4. Take a screenshot of the results and save it as **update-02.png**.

5. Deactivate employees hired before 2020, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
UPDATE employees
SET is_active = FALSE
WHERE hire_date < '2020-01-01';
```

```sql
-- Verify the changes
SELECT first_name, last_name, salary, is_active FROM employees ORDER BY hire_date;
```

6. Take a screenshot of the results and save it as **update-03.png**.

### Delete Data

1. Delete a specific employee (cascades to employee_projects), on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
DELETE FROM employees
WHERE email = 'grace@company.com';
```

```sql
-- Verify deletion
SELECT first_name, last_name FROM employees;
```

2. Take a screenshot of the results and save it as **delete-01.png**.

3. Delete the Finance department, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
DELETE FROM departments WHERE department_name = 'Finance';
```

```sql
-- Verify deletion
SELECT *FROM employees WHERE email = 'frank@company.com';
```

4. Take a screenshot of the results and save it as **delete-02.png**.

5. Delete the Marketing department, on the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
DELETE FROM departments WHERE department_name = 'Marketing';
```

```sql
-- Verify deletion
-- Marketing department projects ('Brand Campaign') should also be deleted automatically
SELECT * FROM projects;
--
```

6. Take a screenshot of the results and save it as **delete-03.png**.

### Cleanup

1. On the **Query tab** enter the following **sql statements** and **click the execute icon ⚡**.

```sql
-- Must drop child tables before parent tables
DROP TABLE IF EXISTS employee_projects;
```

```sql
-- Must drop child tables before parent tables
DROP TABLE IF EXISTS projects;
```

```sql
-- Must drop child tables before parent tables
DROP TABLE IF EXISTS employees;
```

```sql
-- Must drop child tables before parent tables
DROP TABLE IF EXISTS departments;
```

```sql
-- Drop database
DROP DATABASE IF EXISTS company_db;
```

### Submission

1. Create a folder named **submit**.

2. Copy all the screenshots to the **submit folder**.

3. Create a **zip** file of the **submit folder**.

4. Navigate back to where the lab was originally downloaded, there should be a **Submissions section** (see below) where the zip file can be uploaded.

<img src="/img/common/submission.png" alt="submission" width="600"/>
```
