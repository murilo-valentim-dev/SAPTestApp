# SAP Test Full Stack Application

Aplicação Full Stack simples simulando uma integração básica com o **SAP Business One (SAP B1)**.  
O backend foi desenvolvido em **C# .NET Core**, utilizando **Entity Framework Core** e **xUnit** para testes automatizados.  
O frontend foi feito em **React**, consumindo a API via **Axios** e utilizando **Bootstrap** para o layout.

---

## 📂 Estrutura do Projeto

```
root
│
├─ backend/ # API .NET Core
│ ├─ Controllers/
│ ├─ Data/
│ ├─ Entities/
│ ├─ Tests/ # Testes automatizados xUnit
│ └─ appsettings.json
│
├─ frontend/ # Aplicação React
│ ├─ src/
│ │ ├─ api/
│ │ ├─ components/
│ │ ├─ pages/
│ │ └─ App.tsx
│ └─ package.json
│
└─ scripts_sql/ # Scripts SQL fornecidos
├─ OITM.sql
└─ OCRD.sql
```


---

## ⚙️ Pré-requisitos

Antes de executar o projeto, verifique se você possui:

- **Node.js** >= 18.x
- **npm** ou **yarn**
- **.NET 7 SDK**
- **SQL Server** ou **PostgreSQL**
- **Git** para versionamento

---

## 🛠️ Instalação e Execução

### 1. Banco de Dados

1. Abra o **SQL Server Management Studio** ou seu cliente SQL.
2. Execute os scripts SQL fornecidos em `scripts_sql/` para criar e popular as tabelas:

```sql
-- OCRD.sql (Parceiros de Negócios)
-- OITM.sql (Itens)
```

## Atualize a string de conexão no arquivo backend/appsettings.json se necessário:

```
"ConnectionStrings": {
  "DefaultConnection": "Server=SEU_SERVIDOR;Database=SAPTestDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

---

## 2. Backend (.NET Core)

Navegue até a pasta backend/:
```
cd backend
```
Instale as dependências:

```
dotnet restore
```
Rode as migrations (se necessário) e inicie a aplicação:

```
dotnet ef database update
dotnet run
```
A API estará disponível em:
```
http://localhost:5219
```

## 3. Frontend (React)

Navegue até a pasta frontend/:
```
cd frontend
```
Instale as dependências:
```
npm install
# ou
yarn install

```

Execute a aplicação:
```
npm start
# ou
yarn start

```
A aplicação estará disponível em:
```
[npm start
# ou
yarn start](http://localhost:3000
)
```
---

## 🧩 Funcionalidades
# Backend

- Listagem de Parceiros de Negócios (Partners)
- Listagem de Itens (Items)
- Cadastro simples de Partners e Items
- Testes automatizados utilizando xUnit

# Frontend

- Visualização de dados em tabelas
- Formulários para cadastro de Partners e Items
- Feedback visual básico (mensagens de sucesso/erro)
- Consumo da API via Axios
- Layout com Bootstrap

## 🔧 Testes Automatizados

Os testes foram implementados no backend utilizando xUnit.
Para executar os testes:
```
cd backend
dotnet test
```

## 💡 Decisões Técnicas

- Backend: .NET Core + EF Core por facilidade de integração com SQL Server e padrão de mercado.
- Frontend: React + Axios + Bootstrap para desenvolvimento rápido e responsivo.
- Banco de dados: SQL Server conforme solicitado, mas facilmente adaptável para PostgreSQL.
- Estrutura: Separação clara entre backend e frontend, seguindo boas práticas de projeto full stack.

## 📌 Observações

- A aplicação é uma simulação de integração SAP B1, com tabelas simplificadas (OCRD e OITM).
- As funcionalidades de edição e exclusão podem ser adicionadas futuramente.
- Para testes unitários do backend, a conexão com o banco é simulada usando InMemoryDatabase do EF Core (caso configurado nos testes).

## 👤 Autor
= Desenvolvido por Murilo Valentim


