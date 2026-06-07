---
sidebar_position: 1
---

# Backend Final Project

**(39% of the course mark)**

## Course Final Project

- Students will design and implement a **custom backend API** using **Express.js**, integrating with either **SQL** or **NoSQL**. This project involves creating **RESTful endpoints**, handling **CRUD operations**, ensuring **data validation** and **error handling**.

### Final project objectives

- Proficient in setting up and configuring an **Express.js server**.

- Skilled in designing and building **RESTful APIs**.

- Experienced in **integrating** and **querying databases**.

- Knowledgeable in implementing **authentication** and **authorization mechanisms**.

- Competent in **error handling** and **data validation**.

### Final project Guidelines

1. Develop an **Express.js API backend** integrated with a **SQL** or **NoSQL DB** which supports **license plate generation**, **assignment** and **revocation**.

:::info VIN and License plate

A valid **VIN** (ie: **1HGCM82633A123456**) meets the following criteria:

- **17** characters in **length**.

- **Alphanumeric**, **excluding** the letters **I**, **O**, and **Q**.

A valid **Ontario license plate** (ie: **ABCD123**) meets the following criteria:

- **7** characters in **length**.

- **4** uppercase letters **(A-Z)** followed by **3** numbers **(0-9)**.

- Valid license plate range: starts at **AAAA000** and ends at **ZZZZ999**.

:::

2. Create a license plate assignment API endpoint that has the following specifications:

| **API route**                                      | **HTTP Method** | Description                                                                                                                                                                                                                                             |
| -------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /license-plates/assign/:vin                        | PUT             | This endpoint **accepts a VIN** and **assigns** the **next available license plate**, If the VIN **does not have an assigned license plate**; otherwise, it will **return a message** indicating that the **VIN already has a license plate assigned**. |
| /license-plates/revoke/:vin                        | POST            | This endpoint **accepts a VIN** and **revokes** the **license plate assigned** to it.                                                                                                                                                                   |
| /license-plates/verify-vin/:vin                    | GET             | This endpoint **accepts a vin** and returns whether it is **already assigned** a license plate.                                                                                                                                                         |
| /license-plates/verify-license-plate/:licensePlate | GET             | This endpoint **accepts a license plate** and returns whether it is **already assigned** to a vin.                                                                                                                                                      |

### Sample Request / Response

1. **Assign a license plate to vin that does have a license plate assigned yet**.

**Request**: /license-plates/assign/12345678901234567

**Response**:

```json
{
  "message": "License Plate: AAAA000 is assigned to Vin: 12345678901234567."
}
```

**HTTP Response code**: 200

2. **Assign a license plate to vin that already have a license plate assigned**.

**Request**: /license-plates/assign/12345678901234567

**Response**:

```json
{
  "message": "License Plate: AAAA000 is already assigned to Vin: 12345678901234567."
}
```

3. **Revoke a license plate of a vin that has a license plate assigned**.

**Request**: /license-plates/revoke/12345678901234567

**Response**:

```json
{
  "message": "License Plate: AAAA000 is revoked for Vin: 12345678901234567."
}
```

**HTTP Response code**: 200

4. **Revoke a license plate of a vin that does not have a license plate assigned**.

**Request**: /license-plates/revoke/12345678901234567

**Response**:

```json
{
  "message": "Vin: 12345678901234567 is not assigned a license plate."
}
```

**HTTP Response code**: 200

5. **Verify a license plate that is already assigned a vin**.

**Request**: /license-plates/verify-license-plate/AAAA000

**Response**:

```json
{
  "message": "License Plate: AAAA000 is assigned to Vin: 12345678901234567."
}
```

**HTTP Response code**: 200

6. **Verify a license plate that is not assigned a vin**.

**Request**: /license-plates/verify-license-plate/AAAA000

**Response**:

```json
{
  "message": "License Plate: AAAA000 is not assigned a vin."
}
```

**HTTP Response code**: 200

7. **Verify a vin that is already assigned a license plate**.

**Request**: /license-plates/verify-vin/12345678901234567

**Response**:

```json
{
  "message": "Vin: 12345678901234567 is assigned to License Plate: AAAA000."
}
```

**HTTP Response code**: 200

8. **Verify a vin that is not assigned a license plate**.

**Request**: /license-plates/verify-vin/12345678901234567

**Response**:

```json
{
  "message": "Vin: 12345678901234567 is not assigned a license."
}
```

9. **Request that has an invalid vin**.

**Request**: /license-plates/verify-vin/INVALID_VIN

**Response**:

```json
{
  "message": "Vin: INVALID_VIN is invalid."
}
```

**HTTP Response code**: 400

10. **Request that has an invalid license plate**.

**Request**: /license-plates/verify-license-plate/INVALID_LICENSE_PLATE

**Response**:

```json
{
  "message": "License Plate: INVALID_LICENSE_PLATE is invalid."
}
```

**HTTP Response code**: 400

11. **Request to a url that does not exist**.

**Request**: /INVALID_URL

**Response**:

```json
{
  "message": "/INVALID_URL does not exists."
}
```

**HTTP Response code**: 401

12. **Turn off your container and make a valid request, this should result in an error**.

**Request**: Any valid request

**Response**:

```json
{
  "message": "Service is unavailble, please try again."
}
```

**HTTP Response code**: 503

### Marks breakdown

1. Implementation of all the features listed above.

2. Usage of the following concepts:

- Modular coding:

  - ES6 Import / Export
  - Express MVC Router

- API security:

  - API Keys
  - Helmet

- API performance:

  - Compression
  - Rate limiting

- Input verification using regular expressions:

  - Proper response message text and http status(2xx, 4xx, 5xx)
  - Validate the field values using regular expression, for instance validation of the format of vins and license plates

### Submission

1. Create a **GitHub repository** named **COMP9784-87486-Final-Project**. If the repository is **private**, add **roderickkit-bernardo as a collaborator**.

2. Upload **all files required to run your app excluding node_modules** to the following repo: **COMP9784-87486-Final-Project**.

3. Send an email to **roderick.bernardo@georgebrown.ca** with your repository details and, if applicable, any necessary build instructions.
