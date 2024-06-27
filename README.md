# Consultório Médico API

Este é um projeto de API para gerenciar um sistema de consultório médico. A API foi desenvolvida utilizando NestJS e Prisma ORM, e suporta tanto REST quanto GraphQL para manipulação de dados.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [GraphQL](https://graphql.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Configuração do Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/lucasanes/consultorio-medico.git
cd consultorio-medico
```

### 2. Instale as dependências

```bash
npm i
```

### 3. Configure o arquivo .env

```bash 
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

### 4. Execute as migrações do Prisma

```bash
npx prisma migrate dev
```

### 5. Inicie o servidor

```bash
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
      PUT /doctor/:id: Atualiza os dados de um médico existente.
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
      PUT /patient/:id - Atualiza os dados de um paciente existente.
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
      PUT /appointment/:id - Atualiza os dados de uma consulta existente.
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
      PUT /address/:id: Atualiza os dados de um endereço existente.
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