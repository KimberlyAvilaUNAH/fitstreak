# FitStreak

Plataforma web gamificada que fomenta la constancia en el entrenamiento. Los usuarios (**Atletas**) registran sus rutinas diarias, acumulan **rachas** y desbloquean **pases/descuentos** canjeables en gimnasios o tiendas deportivas, los cuales son gestionados por un **Coach**.

A diferencia de un simple To-Do List, FitStreak recompensa la constancia: al alcanzar una meta de días consecutivos, el motor de rachas calcula el progreso en el servidor y genera automáticamente un cupón para el Atleta.

## Stack Tecnológico

- **Backend:** .NET 10 + Clean Architecture + Vertical Slicing
- **Frontend:** React + TypeScript + Feature-Sliced Design
- **Base de Datos:** PostgreSQL 16 (Docker)
- **ORM:** Entity Framework Core + Npgsql
- **Seguridad:** JWT + RBAC (roles: `Athlete`, `Coach`)
- **Documentación API:** Scalar + OpenAPI

## Estructura del Monorepo

    fitstreak/
    ├── backend/     → API .NET (Clean Architecture)
    ├── frontend/    → React + TypeScript (FSD)
    ├── infra/       → Docker Compose + PostgreSQL
    └── docs/        → Backlog y documentación