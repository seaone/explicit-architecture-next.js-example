# Explicit Architecture Next.js Template

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It is designed to manage a list of todos, allowing users to create, update, and delete todo items. The application leverages modern web development practices, including TypeScript, TailwindCSS, and ESLint for code quality.

The architecture of this project is designed to reflect the domain and business rules clearly in the code. This approach is inspired by the article [Reflecting architecture and domain in code](https://herbertograca.com/2019/06/05/reflecting-architecture-and-domain-in-code/), which emphasizes the importance of aligning the code structure with the underlying architecture and domain model. By organizing the code into layers (core, infrastructure, UI, and shared), the project ensures that the domain logic is clearly separated from technical concerns, making the system more maintainable and scalable.

## File Structure

The project follows a Explicit Architecture approach, which is reflected in its file structure. Below is an overview of the key directories and files:

### Root Directory

- **`package.json`**: Contains project dependencies, scripts, and metadata.
- **`tsconfig.json`**: TypeScript configuration file.
- **`next.config.ts`**: Next.js configuration file.
- **`eslint.config.mjs`**: ESLint configuration file.
- **`README.md`**: Project documentation and setup instructions.

### `src` Directory

The `src` directory is organized into layers that align with Explicit Architecture principles:

#### App Router (`src/app`)

Next.js file-based routing system. It enables layouts, nested routes, server components, loading states, and error handling.

#### Core Layer (`src/core`)

- **`application/`**: Contains use cases and application logic.
  - `use-cases/`: Implementation of use cases like `CreateTodoUseCase`, `UpdateTodoUseCase`, etc.
  - `errors/`: Custom error classes for use cases.
  - `repositories/`: Repository interfaces and implementations (e.g., `TodoRepository`).
- **`domain/`**: Contains domain entities and business logic.
  - `entities/`: Domain entities like `Todo`.
- **`ports/`**: Interfaces for ports (e.g., `PersistencePort`).

#### Infrastructure Layer (`src/infrastructure`)

- **`storage/`**: Adapters for external systems (e.g., `LocalStorageTodoAdapter`).
- **`errors/`**: Custom error classes for infrastructure-related issues.

#### User Interface Layer (`src/user-interface`)

- **`adapters/`**: Adapters to connect the UI with the application layer (e.g., `TodoUIAdapter`).
- **`components/`**: React components for the UI.
  - `todo-list/`: Components related to the todo list, including `TodoList`, `TodoListItem`, and `TodoCreationForm`.

#### Shared Layer (`src/shared`)

- **`errors/`**: Shared error handling utilities (e.g., `BaseError`, `ErrorHandler`).

### Other Files

- **`src/composition-root.ts`**: Dependency injection and composition root for the application.

## Architecture Explanation

This project follows **Explicit Architecture**, which emphasizes separation of concerns and independence of layers. Here's how the architecture is structured:

1. **Core Layer**:

   - Contains the **domain logic** (entities and business rules) and **application logic** (use cases).
   - The `Todo` entity represents the core business object, while use cases like `CreateTodoUseCase` and `UpdateTodoUseCase` encapsulate application-specific logic.
   - The `TodoRepository` interface defines the contract for data access, ensuring the core layer remains independent of external systems.

2. **Infrastructure Layer**:

   - Implements adapters for external systems, such as `LocalStorageTodoAdapter`, which interacts with the browser's local storage.
   - This layer depends on the core layer but not vice versa, adhering to the Dependency Rule of Explicit Architecture.

3. **User Interface Layer**:

   - Contains React components and adapters like `TodoUIAdapter` that bridge the UI with the application layer.
   - Components like `TodoList` and `TodoCreationForm` are responsible for rendering the UI and handling user interactions.

4. **Shared Layer**:
   - Provides utilities like error handling (`BaseError`, `ErrorHandler`) that are used across layers.

### Key Principles

- **Separation of Concerns**: Each layer has a distinct responsibility, making the system easier to maintain and extend.
- **Dependency Rule**: Dependencies flow inward, with the core layer being independent of external systems.
- **Testability**: The architecture promotes testability by isolating business logic from infrastructure and UI concerns.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
