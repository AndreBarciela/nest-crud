# Usage

# Employees

## Endpoint

  ```text
  http://localhost:3000/employees
  ```

### Create

  ```text
  Method: POST
  ```

- Fields

```text
name => Required | String
cpf => Required | StringNumber
email => Required | String
address => Required | String
companies => Optional | Array
```

- example of body

    ```text
    {
      "name": "André",
      "cpf": "11122233396",
      "email": "teste@gmail.com",
      "address": "Rio de Janeiro"
    }
    ```

    or if company already exist use the cnpj to link with the employee

    ```text
    {
      "name": "André",
      "cpf": "11122233396",
      "email": "teste@gmail.com",
      "address": "Rio de Janeiro",
      "companies": [{
        "cnpj": "28962948000147"
      }]
    }
    ```

### Find

  ```text
  Method: GET
  Url: http://localhost:3000/employees/:id or http://localhost:3000/employees
  ```

- Fields

```text
offset => Optional | Number | Default: 0
limit => Optional | Number | Default: 25
cpf => Optional | Number
```

- example

    ```text
    http://localhost:3000/employees
    ```

    or if need find cpf like '11'

    ```text
    http://localhost:3000/employees?cpf=11
    ```

    or for pagination

    ```text
    http://localhost:3000/employees?limit=10&offset=0
    ```

    or if have the employee id

    ```text
    http://localhost:3000/employees/1
    ```

### Update

  ```text
  Method: PATCH
  Url: http://localhost:3000/employees/:id
  ```

- Fields

```text
name => Optional | String
email => Optional | String
address => Optional | String
companies => Optional | Array
```

- example of body

    ```text
    {
      "name": "André"
    }
    ```

    or if company already exist use the cnpj to link with the employee

    ```text
    {
      "name": "André Barciela",
      "companies": [{
        "cnpj": "64524976000146"
      }]
    }
    ```

### Delete

  ```text
  Method: DELETE
  Url: http://localhost:3000/employees/:id
  ```

- example

    ```text
    http://localhost:3000/employees/1
    ```

# Companies

## Endpoint

  ```text
  http://localhost:3000/companies
  ```

### Create

  ```text
  Method: POST
  ```

- Fields

```text
name => Required | String
cnpj => Required | StringNumber
address => Required | String
employees => Optional | Array
```

- example of body

    ```text
    {
      name": "Home Corp",
      "cnpj": "64524976000146",
      "address": "Rio de Janeiro"
    }
    ```

    or if you want create the employee and link with the company

    ```text
    {
      "name": "Home Corp",
      "cnpj": "64524976000146",
      "address": "Rio de Janeiro",
      "employees": [{
        "name": "André 1",
        "cpf": "33900290016",
        "email": "teste1@gmail.com",
        "address": "Rio de Janeiro"
      },{
        "name": "André 2",
        "cpf": "11122233396",
        "email": "teste2@gmail.com",
        "address": "São Paulo"
      }]
    }
    ```

### Find

  ```text
  Method: GET
  Url: http://localhost:3000/companies/:id or http://localhost:3000/companies
  ```

- Fields

```text
offset => Optional | Number | Default: 0
limit => Optional | Number | Default: 25
cnpj => Optional | Number
```

- example

    ```text
    http://localhost:3000/companies
    ```

    or if need find cnpj like '11'

    ```text
    http://localhost:3000/companies?cnpj=11
    ```

    or for pagination

    ```text
    http://localhost:3000/companies?limit=10&offset=0
    ```

    or if have the employee id

    ```text
    http://localhost:3000/companies/1
    ```

### Update

  ```text
  Method: PATCH
  Url: http://localhost:3000/companies/:id
  ```

- Fields

```text
name => Optional | String
email => Optional | String
address => Optional | String
employees => Optional | Array
```

- example of body

    ```text
    {
      "name": "Home Corp"
    }
    ```

    or if employee already exist use the cpf to link with the company

    ```text
    {
      "name": "André Barciela",
      "employees": [{
        "cpf": "11122233396"
      }]
    }
    ```

### Delete

  ```text
  Method: DELETE
  Url: http://localhost:3000/companies/:id
  ```

- example

    ```text
    http://localhost:3000/companies/1
    ```
