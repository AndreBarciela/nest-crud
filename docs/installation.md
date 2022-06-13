# Installation

- Clone this repository

  ```text
  git clone git@github.com:AndreBarciela/nest-crud.git
  ```

- Open its folder

  ```text
  cd crud-nest 
  ```

- Copy environments file and it to configure if necessary

  ```text
  cp -v .env.example .env
  ```

- Copy the docker-compose for configure the containers of node and postgres

  ```text
  cp -v docker-compose.example.yml docker-compose.yml
  ```

  - Then run

    ```text
    docker-compose up --build
    ```

- For usage of API follow the [usage documentation](usage.md).
