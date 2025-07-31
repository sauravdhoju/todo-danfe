# 📝 Todo CRUD App – ASP.NET Core + React + SQLite

This is a full-stack Todo CRUD application using:

- ASP.NET Core Web API (.NET 6 or later)
- SQLite with Entity Framework Core
- React (with Vite)
- Swagger UI for API testing

---

## 📦 Prerequisites

### 🔧 Backend

- [.NET SDK (6 or later)](https://dotnet.microsoft.com/en-us/download)
- SQLite (optional, for CLI usage)
- C# compatible IDE (Visual Studio, Rider, VS Code)

### 🖥️ Frontend

- [Node.js (18 or later)](https://nodejs.org/)
- npm or yarn

---

## 🚀 Backend Setup

### 📁 Navigate to the backend folder

```bash
cd TaskCrudApp
```

### 📦 Install required NuGet packages

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Swashbuckle.AspNetCore
```

### 🛠️ Run EF Core migrations (if using migrations)

```bash
dotnet tool install --global dotnet-ef
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### ▶️ Run the backend

```bash
dotnet run
```

Visit: `https://localhost:5001/swagger` to test APIs using Swagger UI.

---

## 🌐 Frontend Setup

### 📁 Navigate to the frontend folder (Vite app)

```bash
cd todo-frontend
```

### 📦 Install dependencies

```bash
npm install
```

### ▶️ Run the React app

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)
