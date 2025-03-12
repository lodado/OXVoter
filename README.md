# Lotion

this project is currently under development.

## Project Architecture

This project is designed with a focus on maintainability, scalability, and separation of concerns. The architecture leverages Clean Architecture principles, Feature-Sliced Design (FSD), and event-driven patterns using Redux and Redux-Saga.

### Clean Architecture

Clean Architecture is employed to achieve a clear separation of concerns.

This is accomplished through modularization, encapsulation, and the arrangement of software layers.

The primary layers include:

```
Entities: Core business logic and domain objects.

Use Cases: Application-specific business rules.

Adapters: Interface adapters and controllers.

Frameworks & Drivers: External interfaces such as databases, and external APIs.
```

Business logic is handled in the UseCase layer, while libraries like Redux and TanStack Query are only responsible for propagating re-renders due to state changes.

#### Clean Architecture Motivation

1. Frustrated with the frequently changing frontend library ecosystem, I designed a system to extract stable business logic into a UseCase layer and connect different libraries (React, Next, Redux, etc.) via an Adapter layer.

2. To abstract and unify business logic used in React's RSC and client components, delegating detailed implementations through DIP (Dependency Inversion Principle).

3. To make writing test code easier.


#### Simple Example

```
Entities: src/entities/Auth/core/entities/UserEntity.tsx

Use Cases: src/entities/Auth/core/usecase/Oauth2LoginUseCase.ts, LogoutUseCase.ts 

Adapters: Redux(for client state) or tanstack-query(for server state) 

Frameworks & Drivers: src/entities/Auth/server/repository 
or 
src/entities/Auth/client/repository
```

### Feature-Sliced Design (FSD)

Feature-Sliced Design is used to explicitly define business logic and ensure that each feature is self-contained. This approach helps in organizing the codebase by features rather than technical layers, making it easier to manage and scale.

```
App: The top-level layer responsible for the application's initial setup and global configurations.

homePages(Pages): Individual screens presented to the user, combining various features and entities.

Widgets: A higher-level layer created by combining several feature layers.

Features: Self-contained units that provide specific business functionalities.

Entities: Defines data models and related logic within the business domain.

Shared: A collection of utilities and components commonly used across multiple layers.

```

#### FSD Motivation


1. I encountered difficulties managing code files, which led me to feel the need for a file structure that supports more manageable dependencies.

2. I wanted to eliminate circular dependencies. It doesn't make sense for a Button to use a Calendar, but a Calendar might use a Button. I wanted to make this explicitly visible in the file structure.


#### Custom roles

I was concerned that following the standard FSD rules might lead to a single layer containing dozens of files, similar to atomic design, which could hurt readability.

So I added a few of my own rules:


1. I worried that the boundary between the widget layer and the features layer could be subjective and ambiguous for different people. Therefore, the widget layer is used only when combining components from the features/entities/shared layer. (at least 2 features layer components)

2. Anticipating that too many features layers might be created but that typically only one feature would be used per page, I decided to place features used in the pages layer within that folder. The features/widgets layer is reserved for common components like the GNB Bar.


### Event-Driven Architecture with Redux and Redux-Saga (Currently experimenting)

Redux and Redux-Saga are used to implement an event-driven architecture pattern. This ensures that state changes are handled in a transactional manner, providing consistency and reliability.

#### EDA Motivation

I drew inspiration from the MSA architecture in backend systems and the workings of Kafka.

I divided the functionality into several domains(entities) and used the publisher-subscriber pattern to propagate events (state changes) to each domain when changes occurred. Each domain handled the event appropriately, using loose coupling to reduce dependency.

Additionally, I implemented it using redux-saga, ensuring that the events were either fully applied like a database transaction or rolled back if not.
