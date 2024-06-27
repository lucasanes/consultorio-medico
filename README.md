# Consultório Médico API

Este é um projeto de API para gerenciar um sistema de consultório médico. A API foi desenvolvida utilizando NestJS e Prisma ORM, e suporta tanto REST quanto GraphQL para manipulação de dados.

## Tecnologias Utilizadas

- **NestJS** para a construção do backend
- **PostgreSQL** como banco de dados relacional
- **Prisma** como ORM para interações com o banco de dados
- **GraphQL** para consultas eficientes aos dados 

## Pré-requisitos
Lista de ferramentas necessárias:
- [Node.js](https://nodejs.org/pt)

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

A API REST estará disponível em http://localhost:3000.
<br>
E a API GraphQL esterá disponível em http://localhost:3000/graphql.

## Tabelas

<ul>

<li>
  Medico

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
  Paciente

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
  Consulta

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
  Médicos

  <ul>
    <li>
      GET /doctor: Retorna todos os médicos cadastrados.
    </li>
    <li>
      GET /doctor/:id: Retorna um médico específico pelo ID.
    </li>
    <li>
      POST /doctor: Cria um novo médico.
    </li>
    <li>
      PATCH /doctor/:id: Atualiza os dados de um médico existente.
    </li>
    <li>
      DELETE /doctor/:id: Remove um médico pelo ID.
    </li>
  </ul>

</li>

<br>

<li>
  Pacientes

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
  Consultas

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
  Endereços

  <ul>
    <li>
      GET /address: Retorna todos os endereços cadastrados.
    </li>
    <li>
      GET /address/:id: Retorna um endereço específico pelo ID.
    </li>
    <li>
      POST /address: Cria um novo endereço.
    </li>
    <li>
      PATCH /address/:id: Atualiza os dados de um endereço existente.
    </li>
    <li>
      DELETE /address/:id: Remove um endereço pelo ID.
    </li>
  </ul>
</li>

</ul>

## GraphQL Query

```graphql
query {
  medicos {
    id
    nome
    especialidade
    endereco {
      id
      street
      city
      state
      zip
    }
    consultas {
      id
      date
      pacientes {
        id
        name
        age
      }
    }
  }
}
```

```graphql
mutation {
  createMedico(input: {
    nome: "Dr. João Silva",
    especialidade: "Cardiologista",
    enderecoId: 1
  }) {
    id
    nome
    especialidade
    endereco {
      id
      street
      city
      state
      zip
    }
  }
}
```

## Estrutura do projeto:

```
├── README.md
├── nest-cli.json
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
|  |  └── migration_lock.toml
|  └── schema.prisma
├── src
|  ├── app.controller.ts
|  ├── app.module.ts
|  ├── app.service.ts
|  ├── main.ts
|  ├── models
|  |  ├── address
|  |  |  ├── address.controller.ts
|  |  |  ├── address.model.ts
|  |  |  ├── address.module.ts
|  |  |  ├── address.resolver.ts
|  |  |  ├── address.service.ts
|  |  |  └── dto
|  |  |     ├── create-address.ts
|  |  |     └── update-address.ts
|  |  ├── appointment
|  |  |  ├── appointment.controller.ts
|  |  |  ├── appointment.model.ts
|  |  |  ├── appointment.module.ts
|  |  |  ├── appointment.resolver.ts
|  |  |  ├── appointment.service.ts
|  |  |  └── dto
|  |  |     ├── create-appointment.ts
|  |  |     └── update-appointment.ts
|  |  ├── doctor
|  |  |  ├── doctor.controller.ts
|  |  |  ├── doctor.model.ts
|  |  |  ├── doctor.module.ts
|  |  |  ├── doctor.resolver.ts
|  |  |  ├── doctor.service.ts
|  |  |  └── dto
|  |  |     ├── create-doctor.ts
|  |  |     └── update-doctor.ts
|  |  ├── patient
|  |  |  ├── dto
|  |  |  |  ├── create-patient.ts
|  |  |  |  └── update-patient.ts
|  |  |  ├── patient.controller.ts
|  |  |  ├── patient.model.ts
|  |  |  ├── patient.module.ts
|  |  |  ├── patient.resolver.ts
|  |  |  └── patient.service.ts
|  |  └── patientAppointment
|  |     └── patientAppointment.model.ts
|  ├── modules
|  |  └── prisma
|  |     ├── prisma.module.ts
|  |     └── prisma.service.ts
|  └── schema.gql
├── tsconfig.build.json
└── tsconfig.json

directory: 2706 file: 22795

ignored: directory (215)
```