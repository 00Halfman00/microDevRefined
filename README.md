# Ticketing Marketplace

This is a microservices-based application for an online ticket marketplace. The frontend is built with Next.js, and the backend consists of multiple services, starting with an authentication service.

## Project Structure

This repository is a monorepo containing the following services:

-   `/auth`: The authentication service, responsible for user sign-up, sign-in, and session management.
-   `/client`: The Next.js frontend application that users interact with.
-   `/infra`: Contains Kubernetes and Skaffold configurations for deployment and local development.

## Getting Started

To get the application running locally, you will need to have [Skaffold](https://skaffold.dev/) and [Kubernetes](https://kubernetes.io/docs/tasks/tools/) (like Docker Desktop with Kubernetes enabled or Minikube) installed.

Once you have the prerequisites, you can run the application with the following command from the root of the project:

```bash
skaffold dev
```

This will build the Docker images, deploy the services to your local Kubernetes cluster, and watch for file changes to automatically redeploy.

## Services

### Authentication Service

-   **Language/Framework:** Node.js with Express
-   **Database:** MongoDB
-   **Description:** Handles user registration, login, and authentication.

### Frontend Client

-   **Framework:** Next.js
-   **Description:** The user-facing application for browsing and purchasing tickets.
