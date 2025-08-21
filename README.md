# Consultório Médico API

Este é um projeto de API para gerenciar um sistema de consultório médico. A API foi desenvolvida utilizando NestJS e Prisma ORM, e suporta tanto REST quanto GraphQL para manipulação de dados.

## Tecnologias Utilizadas

- **NestJS** para a construção do backend
- **PostgreSQL** como banco de dados relacional
- **Prisma** como ORM para interações com o banco de dados
- **GraphQL** para consultas eficientes aos dados 

## Pré-requisitos
Lista de ferramentas necessárias:
- [NPM](https://www.npmjs.com/)
- [Node.js](https://nodejs.org/pt)
- [PostgreSQL](https://www.postgresql.org/)


## Importante

### Criação do usuário

Para executar qualquer rota, você precisa estar autenticado, logo, o primeiro passo é criar um usuário.
<br>
OBS: O usuário pode ter o Role USER ou ADMIN. Role USER pode executar apenas rotas GET.

Rota:
```js
POST /user
```

Body:
```json
{
  "name": "Lucas",
  "email": "lucas003@gmail.com",
  "password": "Lucas123",
  "role": "ADMIN"
}
```

Response:
```json
{
  "id": 1,
  "name": "Lucas",
  "email": "lucas003@gmail.com",
  "password": "Lucas123",
  "role": "ADMIN",
  "isValidated": false
}
```

### Login

Após criado seu usuário, você precisará fazer login.

Rota:
```js
POST /user/signin
```

Body:
```json
{
  "email": "lucas003@gmail.com",
  "password": "Lucas123"
}
```

Response:
```json
{
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzE5NjA0NjE5LCJleHAiOjE3MTk2OTEwMTl9._4O5O5vmfkIWPl3YPSZhepMiPcqTncK7cPiE4pTpn3k"
}
```

### Verificação

Também foi criada uma integração com e-mail, então após login, será necessário a verificação do e-mail.
Para isso, basta ir em seu email, e checar a mensagem que lhe foi enviada quando criada a conta.
<br>
Este e-mail terá um código, irei mostrar como usá-lo.

Rota:
```js
POST /user/verify
```

Body:
```json
{
  "email": "lucas003@gmail.com",
  "code": "A1B2C3"
}
```

Response:
```json
{
  "E-mail verificado."
}
```

## Caso tenha esquecido sua senha

Você primeiro terá de enviar um código a seu e-mail.

Rota:
```js
POST /user/forgot-password
```

Body:
```json
{
  "email": "lucas003@gmail.com"
}
```

Response:
```json
{
  "Email enviado com sucesso."
}
```

Agora poderá alterar a senha pelo uso deste código.

Rota:
```js
POST /user/change-password
```

Body:
```json
{
  "email": "lucas003@gmail.com",
  "code": "A1B2C3",
  "password": "Lucas12345"
}
```

### Agora está tudo pronto!

## Configuração do Projeto

### 1. Clone o Repositório

```sh
git clone https://github.com/lucasanes/consultorio-medico.git
cd consultorio-medico
```

### 2. Instale as dependências

```sh
npm i
```

### 3. Configure o arquivo .env

Para configurar o ambiente de desenvolvimento, é necessário um arquivo `.env` dentro do backend do projeto, pode simplesmente copiar o arquivo `.env.example` e renomeá-lo para `.env`.

```sh
cp .env.example .env
```

## 4. Banco de Dados
Para acessar o banco de dados, é necessário um cliente de PostgreSQL, como o [DBeaver](https://dbeaver.io/). Utilize as seguintes credenciais:
- **Host**: localhost
- **Port**: 5432
- **Database**: postgres
- **User**: postgres
- **Password**: admin

### 5. Execute as migrações do Prisma

```sh
npx prisma migrate dev
```

### 6. Inicie o servidor

```sh
npm start
```

## API

A API REST estará disponível em http://localhost:3030.
<br>
E a API GraphQL esterá disponível em http://localhost:3030/graphql.
<br>
Para ver a documentação da API, acesse http://localhost:3030/api.

## Tabelas

<ul>

<li>
  User

  <ul>
    <li>
      id (Int, Primary Key)
    </li>
    <li>
      name (String)
    </li>
    <li>
      email (String)
    </li>
    <li>
      password (String)
    </li>
    <li>
      role (USER | ADMIN)
    </li>
    <li>
      isValidated (Boolean)
    </li>
  </ul>
</li>

<br>

<li>
  Code

  <ul>
    <li>
      id (Int, Primary Key)
    </li>
    <li>
      code (String)
    </li>
    <li>
      userEmail (String)
    </li>
  </ul>
</li>

<br>

<li>
  Doctor

  <ul>
    <li>
      id (Int, Primary Key)
    </li>
    <li>
      name (String)
    </li>
    <li>
      specialty (String)
    </li>
    <li>
      address (Address)
    </li>
    <li>
      appointments (Appointment[])
    </li>
  </ul>
</li>

<br>

<li>
  Patient

  <ul>
    <li>
      id (Int, Primary Key)
    </li>
    <li>
      name (String)
    </li>
    <li>
      age (Int)
    </li>
    <li>
      appointments (PatientAppointment[])
    </li>
  </ul>
</li>

<br>

<li>
  Appointment

  <ul>
    <li>
      id (Int, Primary Key)
    </li>
    <li>
      date (String)
    </li>
    <li>
      doctorId (Int)
    </li>
    <li>
      patients (PatientAppointment[])
    </li>
  </ul>
</li>

<br>

<li>
  Address

  <ul>
    <li>
      id (Int, Primary Key)
    </li>
    <li>
      street (String)
    </li>
    <li>
      neighborhood (String)
    </li>
    <li>
      complement (String)
    </li>
    <li>
      city (String)
    </li>
    <li>
      state (String)
    </li>
    <li>
      doctorId (Int)
    </li>
  </ul>
</li>

<br>

<li>
  PatientAppointment

  <ul>
    <li>
      id (Int, Primary Key)
    </li>
    <li>
      patientId (Int)
    </li>
    <li>
      appointmentId (Int)
    </li>
  </ul>
</li>

</ul>

## Conexões entre Tabelas

<ul>
  <li>
    Medico <-> Endereco: Relação 1 para 1 (um médico possui um endereço).
  </li>
  <li>
    Consulta <-> Medico: Relação 1 para N (uma consulta possui um médico).
  </li>
  <li>
    Consulta <-> Paciente: Relação N para N (uma consulta pode envolver vários pacientes).
  </li>
</ul>

## REST Endpoints

<ul>

<li>
  User

  <ul>
    <li>
      GET /user/:id - Retorna um usuário específico pelo ID.
    </li>
    <li>
      POST /user - Cria um novo usuário.
    </li>
    <li>
      PATCH /user/:id - Atualiza os dados de um usuário existente.
    </li>
    <li>
      DELETE /user/:id - Remove um usuário pelo ID.
    </li>
    <li>
      POST /user/signin - Efetua o login, retornando e salvando o token em memória.
    </li>
    <li>
      POST /user/signout - Desconecta o login.
    </li>
    <li>
      POST /user/verify - Verifica o e-mail do usuário.
    </li>
    <li>
      POST /user/forgot-password - Envia um código pelo e-mail para alteração de senha.
    </li>
    <li>
      POST /user/change-password - Altera a senha pelo uso do código.
    </li>
  </ul>

</li>

<br>

<li>
  Doctor

  <ul>
    <li>
      GET /doctor - Retorna todos os médicos cadastrados.
    </li>
    <li>
      GET /doctor/:id - Retorna um médico específico pelo ID.
    </li>
    <li>
      POST /doctor - Cria um novo médico.
    </li>
    <li>
      PATCH /doctor/:id - Atualiza os dados de um médico existente.
    </li>
    <li>
      DELETE /doctor/:id - Remove um médico pelo ID.
    </li>
  </ul>

</li>

<br>

<li>
  Patient

  <ul>
    <li>
      GET /patient - Retorna todos os pacientes cadastrados.
    </li>
    <li>
      GET /patient/:id - Retorna um paciente específico pelo ID.
    </li>
    <li>
      POST /patient - Cria um novo paciente.
    </li>
    <li>
      PATCH /patient/:id - Atualiza os dados de um paciente existente.
    </li>
    <li>
      DELETE /patient/:id - Remove um paciente pelo ID.
    </li>
  </ul>
</li>

<br>

<li>
  Appointment

  <ul>
    <li>
      GET /appointment - Retorna todas as consultas cadastradas.
    </li>
    <li>
      GET /appointment/:id - Retorna uma consulta específica pelo ID.
    </li>
    <li>
      POST /appointment - Cria uma nova consulta.
    </li>
    <li>
      PATCH /appointment/:id - Atualiza os dados de uma consulta existente.
    </li>
    <li>
      DELETE /appointment/:id - Remove uma consulta pelo ID.
    </li>
  </ul>
</li>

<br>

<li>
  Address

  <ul>
    <li>
      GET /address - Retorna todos os endereços cadastrados.
    </li>
    <li>
      GET /address/:id - Retorna um endereço específico pelo ID.
    </li>
    <li>
      POST /address - Cria um novo endereço.
    </li>
    <li>
      PATCH /address/:id - Atualiza os dados de um endereço existente.
    </li>
    <li>
      DELETE /address/:id - Remove um endereço pelo ID.
    </li>
  </ul>
</li>

</ul>

## GraphQL Examples

```graphql
query Doctors {
  doctors {
    id
    name
    specialty
    Address {
      id
      street
      neighborhood
      complement
      city
      state
    }
    appointments {
      id
      date
      patients {
        patient {
          id
          name
          age
        }
      }
    }
  }
}
```

```graphql
mutation {
  createDoctor(createDoctorDTO: {name: "Lucas", specialty: "Laringologista", addressId: 1}) {
    id
    name
    specialty
    Address {
      id
      street
      neighborhood
      complement
      city
      state
    }
  }
}
```

## Estrutura do projeto:

```
├── README.md
├── coverage
|  ├── clover.xml
|  ├── coverage-final.json
|  ├── lcov-report
|  |  ├── base.css
|  |  ├── block-navigation.js
|  |  ├── favicon.png
|  |  ├── index.html
|  |  ├── prettify.css
|  |  ├── prettify.js
|  |  ├── sort-arrow-sprite.png
|  |  ├── sorter.js
|  |  └── src
|  |     ├── app.module.ts.html
|  |     ├── common
|  |     |  ├── guards
|  |     |  |  ├── admin.guard.ts.html
|  |     |  |  ├── auth.guard.ts.html
|  |     |  |  └── index.html
|  |     |  └── utils
|  |     |     ├── generateCode.ts.html
|  |     |     └── index.html
|  |     ├── dto
|  |     |  ├── FindOneParams.ts.html
|  |     |  ├── FindOneParamsGraphQL.ts.html
|  |     |  └── index.html
|  |     ├── index.html
|  |     ├── main.ts.html
|  |     ├── models
|  |     |  ├── address
|  |     |  |  ├── address.controller.ts.html
|  |     |  |  ├── address.model.ts.html
|  |     |  |  ├── address.module.ts.html
|  |     |  |  ├── address.resolver.ts.html
|  |     |  |  ├── address.service.ts.html
|  |     |  |  ├── dto
|  |     |  |  |  ├── create-address.ts.html
|  |     |  |  |  ├── index.html
|  |     |  |  |  ├── update-address-id.ts.html
|  |     |  |  |  └── update-address.ts.html
|  |     |  |  └── index.html
|  |     |  ├── appointment
|  |     |  |  ├── appointment.controller.ts.html
|  |     |  |  ├── appointment.model.ts.html
|  |     |  |  ├── appointment.module.ts.html
|  |     |  |  ├── appointment.resolver.ts.html
|  |     |  |  ├── appointment.service.ts.html
|  |     |  |  ├── dto
|  |     |  |  |  ├── create-appointment.ts.html
|  |     |  |  |  ├── index.html
|  |     |  |  |  ├── update-appointment-id.ts.html
|  |     |  |  |  └── update-appointment.ts.html
|  |     |  |  └── index.html
|  |     |  ├── auth
|  |     |  |  ├── auth.module.ts.html
|  |     |  |  ├── auth.service.ts.html
|  |     |  |  └── index.html
|  |     |  ├── doctor
|  |     |  |  ├── doctor.controller.ts.html
|  |     |  |  ├── doctor.model.ts.html
|  |     |  |  ├── doctor.module.ts.html
|  |     |  |  ├── doctor.resolver.ts.html
|  |     |  |  ├── doctor.service.ts.html
|  |     |  |  ├── dto
|  |     |  |  |  ├── create-doctor.ts.html
|  |     |  |  |  ├── index.html
|  |     |  |  |  ├── update-doctor-id.ts.html
|  |     |  |  |  └── update-doctor.ts.html
|  |     |  |  └── index.html
|  |     |  ├── email
|  |     |  |  ├── email.module.ts.html
|  |     |  |  ├── email.service.ts.html
|  |     |  |  └── index.html
|  |     |  ├── patient
|  |     |  |  ├── dto
|  |     |  |  |  ├── create-patient.ts.html
|  |     |  |  |  ├── index.html
|  |     |  |  |  ├── update-patient-id.ts.html
|  |     |  |  |  └── update-patient.ts.html
|  |     |  |  ├── index.html
|  |     |  |  ├── patient.controller.ts.html
|  |     |  |  ├── patient.model.ts.html
|  |     |  |  ├── patient.module.ts.html
|  |     |  |  ├── patient.resolver.ts.html
|  |     |  |  └── patient.service.ts.html
|  |     |  ├── patientAppointment
|  |     |  |  ├── index.html
|  |     |  |  └── patientAppointment.model.ts.html
|  |     |  └── user
|  |     |     ├── dto
|  |     |     |  ├── change-password.ts.html
|  |     |     |  ├── create-user.ts.html
|  |     |     |  ├── forgot-password.ts.html
|  |     |     |  ├── index.html
|  |     |     |  ├── signin-user.ts.html
|  |     |     |  ├── update-user-id.ts.html
|  |     |     |  ├── update-user.ts.html
|  |     |     |  └── verify-user.ts.html
|  |     |     ├── index.html
|  |     |     ├── msgResponse.model.ts.html
|  |     |     ├── user.controller.ts.html
|  |     |     ├── user.model.ts.html
|  |     |     ├── user.module.ts.html
|  |     |     ├── user.resolver.ts.html
|  |     |     └── user.service.ts.html
|  |     ├── modules
|  |     |  └── prisma
|  |     |     ├── index.html
|  |     |     ├── prisma.module.ts.html
|  |     |     └── prisma.service.ts.html
|  |     └── test
|  |        ├── getPrismaTest.ts.html
|  |        ├── index.html
|  |        └── test-util.ts.html
|  └── lcov.info
├── nest-cli.json
├── out.txt
├── package-lock.json
├── package.json
├── prisma
|  ├── migrations
|  |  ├── 20240626165106_init
|  |  |  └── migration.sql
|  |  ├── 20240626182323_rename
|  |  |  └── migration.sql
|  |  ├── 20240626195829_add
|  |  |  └── migration.sql
|  |  ├── 20240627132255_on_delete
|  |  |  └── migration.sql
|  |  ├── 20240627133859_doctor
|  |  |  └── migration.sql
|  |  ├── 20240628130643_add
|  |  |  └── migration.sql
|  |  ├── 20240628180058_add
|  |  |  └── migration.sql
|  |  ├── 20240628182233_add
|  |  |  └── migration.sql
|  |  ├── 20240629003049_model
|  |  |  └── migration.sql
|  |  └── migration_lock.toml
|  └── schema.prisma
├── src
|  ├── app.module.ts
|  ├── common
|  |  ├── guards
|  |  |  ├── admin.guard.spec.ts
|  |  |  ├── admin.guard.ts
|  |  |  ├── auth.guard.spec.ts
|  |  |  └── auth.guard.ts
|  |  └── utils
|  |     └── generateCode.ts
|  ├── dto
|  |  ├── FindOneParams.ts
|  |  └── FindOneParamsGraphQL.ts
|  ├── main.ts
|  ├── models
|  |  ├── address
|  |  |  ├── address.controller.ts
|  |  |  ├── address.model.ts
|  |  |  ├── address.module.ts
|  |  |  ├── address.resolver.ts
|  |  |  ├── address.service.ts
|  |  |  ├── dto
|  |  |  |  ├── create-address.ts
|  |  |  |  ├── update-address-id.ts
|  |  |  |  └── update-address.ts
|  |  |  └── tests
|  |  |     ├── address.controller.spec.ts
|  |  |     ├── address.resolver.spec.ts
|  |  |     └── address.service.spec.ts
|  |  ├── appointment
|  |  |  ├── appointment.controller.ts
|  |  |  ├── appointment.model.ts
|  |  |  ├── appointment.module.ts
|  |  |  ├── appointment.resolver.ts
|  |  |  ├── appointment.service.ts
|  |  |  ├── dto
|  |  |  |  ├── create-appointment.ts
|  |  |  |  ├── update-appointment-id.ts
|  |  |  |  └── update-appointment.ts
|  |  |  └── tests
|  |  |     ├── appointment.controller.spec.ts
|  |  |     ├── appointment.resolver.spec.ts
|  |  |     └── appointment.service.spec.ts
|  |  ├── auth
|  |  |  ├── auth.module.ts
|  |  |  └── auth.service.ts
|  |  ├── doctor
|  |  |  ├── doctor.controller.ts
|  |  |  ├── doctor.model.ts
|  |  |  ├── doctor.module.ts
|  |  |  ├── doctor.resolver.ts
|  |  |  ├── doctor.service.ts
|  |  |  ├── dto
|  |  |  |  ├── create-doctor.ts
|  |  |  |  ├── update-doctor-id.ts
|  |  |  |  └── update-doctor.ts
|  |  |  └── tests
|  |  |     ├── doctor.controller.spec.ts
|  |  |     ├── doctor.resolver.spec.ts
|  |  |     └── doctor.service.spec.ts
|  |  ├── email
|  |  |  ├── email.module.ts
|  |  |  ├── email.service.spec.ts
|  |  |  └── email.service.ts
|  |  ├── patient
|  |  |  ├── dto
|  |  |  |  ├── create-patient.ts
|  |  |  |  ├── update-patient-id.ts
|  |  |  |  └── update-patient.ts
|  |  |  ├── patient.controller.ts
|  |  |  ├── patient.model.ts
|  |  |  ├── patient.module.ts
|  |  |  ├── patient.resolver.ts
|  |  |  ├── patient.service.ts
|  |  |  └── tests
|  |  |     ├── patient.controller.spec.ts
|  |  |     ├── patient.resolver.spec.ts
|  |  |     └── patient.service.spec.ts
|  |  ├── patientAppointment
|  |  |  └── patientAppointment.model.ts
|  |  └── user
|  |     ├── dto
|  |     |  ├── change-password.ts
|  |     |  ├── create-user.ts
|  |     |  ├── forgot-password.ts
|  |     |  ├── signin-user.ts
|  |     |  ├── update-user-id.ts
|  |     |  ├── update-user.ts
|  |     |  └── verify-user.ts
|  |     ├── msgResponse.model.ts
|  |     ├── tests
|  |     |  ├── user.controller.spec.ts
|  |     |  ├── user.resolver.spec.ts
|  |     |  └── user.service.spec.ts
|  |     ├── user.controller.ts
|  |     ├── user.model.ts
|  |     ├── user.module.ts
|  |     ├── user.resolver.ts
|  |     └── user.service.ts
|  ├── modules
|  |  └── prisma
|  |     ├── prisma.module.ts
|  |     ├── prisma.service.spec.ts
|  |     └── prisma.service.ts
|  ├── schema.gql
|  └── test
├── tsconfig.build.json
└── tsconfig.json

directory: 3219 file: 27647
```