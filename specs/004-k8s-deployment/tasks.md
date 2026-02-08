# Tasks: Phase IV - Local Kubernetes Deployment

This document breaks down the Phase IV goal into testable, atomic tasks.

## Status Mapping
- [ ] Todo
- [/] In Progress
- [x] Done

## 1. Containerization (Docker)

### Task 1.1: Generate and Build Backend Dockerfile
- **Description**: create a multi-stage Dockerfile for the FastAPI backend using optimized base images.
- **Acceptance Criteria**:
  - [x] Dockerfile exists at `docker/Dockerfile.backend`.
  - [x] Multi-stage build is implemented.
  - [/] Image builds successfully: `docker build -t todo-backend:latest -f docker/Dockerfile.backend .`
  - [ ] Image size is minimized (< 200MB).

### Task 1.2: Generate and Build Frontend Dockerfile
- **Description**: Create an optimized multi-stage Dockerfile for the Next.js frontend.
- **Acceptance Criteria**:
  - [x] Dockerfile exists at `docker/Dockerfile.frontend`.
  - [x] `npm run build` is part of the build stage.
  - [x] Image builds successfully: `docker build -t todo-frontend:latest -f docker/Dockerfile.frontend .`
  - [x] Static assets are efficiently served.

## 2. Helm Chart Implementation

### Task 2.1: Initialize Helm Chart Structure
- **Description**: Create the base directory and structure for the `todo-app` chart.
- **Acceptance Criteria**:
  - [ ] Directory `k8s/charts/todo-app` created.
  - [ ] `Chart.yaml` and `values.yaml` initialized.

### Task 2.2: Implement Backend Templates
- **Description**: Create Deployment and Service for the backend.
- **Acceptance Criteria**:
  - [ ] `templates/backend-deployment.yaml` created.
  - [ ] `templates/backend-service.yaml` created.
  - [ ] Service type is `ClusterIP`.
  - [ ] Probes (liveness/readiness) are configured for `/health`.

### Task 2.3: Implement Frontend Templates
- **Description**: Create Deployment and Service for the frontend.
- **Acceptance Criteria**:
  - [ ] `templates/frontend-deployment.yaml` created.
  - [ ] `templates/frontend-service.yaml` created.
  - [ ] Service type is `ClusterIP`.

### Task 2.4: Configure Secrets and ConfigMaps
- **Description**: Manage environment variables and sensitive keys.
- **Acceptance Criteria**:
  - [ ] `templates/secrets.yaml` handles `COHERE_API_KEY`, `BETTER_AUTH_SECRET`, `DATABASE_URL`.
  - [ ] `templates/configmap.yaml` handles non-sensitive vars (e.g., `NEXT_PUBLIC_API_URL`).

### Task 2.5: Configure Ingress
- **Description**: Set up Ingress for `todo.local` routing.
- **Acceptance Criteria**:
  - [ ] `templates/ingress.yaml` created.
  - [ ] Host `todo.local` points to frontend service.

## 3. Deployment & Verification

### Task 3.1: Load Images into Minikube
- **Description**: Transfer local images to Minikube image cache.
- **Acceptance Criteria**:
  - [ ] `minikube image load todo-frontend:latest`
  - [ ] `minikube image load todo-backend:latest`

### Task 3.2: Install Helm Chart
- **Description**: Deploy the application to the cluster.
- **Acceptance Criteria**:
  - [ ] `helm install todo-app ./k8s/charts/todo-app --set env.databaseUrl=$DATABASE_URL ...`
  - [ ] All pods reach `Running` state without restarts.

### Task 3.3: End-to-End Verification
- **Description**: Verify the full functionality via Ingress.
- **Acceptance Criteria**:
  - [ ] `http://todo.local` is accessible.
  - [ ] Login works.
  - [ ] Chatbot (Cohere) responds and can manage tasks.
  - [ ] Tasks are persisted in Neon DB.
