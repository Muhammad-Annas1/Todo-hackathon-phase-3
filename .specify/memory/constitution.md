<!--
Sync Impact Report:
- Version change: 2.0.0 → 3.0.0
- Modified principles: Updated for Phase IV - Cloud-Native Local Kubernetes Deployment
- Added sections: Containerization, Helm Charts, Minikube, AI-Assisted DevOps
- Removed sections: Phase III specific constraints (AI Integration, Cohere API usage)
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/commands/*.md ⚠ pending
- Follow-up TODOs: None
-->

# Todo Constitution

## Core Principles

### I. Code Quality & Infrastructure as Code
Every infrastructure contribution must follow established standards: Dockerfiles require multi-stage builds with minimal base images and security best practices; Helm charts require versioning, linting with sane defaults in values.yaml; Kubernetes manifests must be clean, idempotent with proper labels and selectors; All infrastructure code must be generated via AI tools with human review.

### II. Cloud-Native Architecture
The application must be deployed as containerized microservices on Kubernetes; The system must run reliably on local Minikube cluster with proper service discovery; All deployments must be scalable and resilient with health checks; Infrastructure must follow 12-factor app methodology for containerized environments.

### III. Containerization Excellence
All services must be packaged as optimized Docker images using multi-stage builds; Images must be minimal in size with security scanning passed; Dockerfiles must follow best practices including non-root users and proper layer caching; Gordon AI must be leveraged for Dockerfile generation and optimization.

### IV. Infrastructure as Code (Helm Charts)
All Kubernetes resources must be defined in versioned Helm charts; Charts must include Deployments, Services, ConfigMaps, Secrets, and optional Ingress; Values.yaml must provide configurable parameters with sensible defaults; Helm charts must be linted and tested before deployment.

### V. Local Kubernetes Deployment
Minikube must be used for local Kubernetes cluster deployment; The cluster must be single-node with necessary addons enabled (ingress, metrics-server); All services must be accessible via Minikube IP/port or service endpoints; Deployment must be repeatable and idempotent.

### VI. AI-Assisted DevOps
kubectl-ai, kagent, and Gordon must be used for Kubernetes operations and generation; Manual kubectl or helm commands are prohibited during hackathon evaluation; AI tools must be leveraged for troubleshooting, scaling, and cluster analysis; All DevOps operations must be documented with AI tool usage examples.

### VII. Security & Configuration Management
Sensitive data must be stored in Kubernetes Secrets with proper RBAC; Non-sensitive configuration must be managed via ConfigMaps; Environment variables must be securely passed to containers; Authentication and authorization must work in containerized environment.

## Technical Constraints

Containerization: Docker with multi-stage builds, minimal base images (alpine/node-slim)
Orchestration: Kubernetes v1.28+ on Minikube
Packaging: Helm 3+ charts with proper versioning and linting
Services: Frontend (Next.js), Backend (FastAPI), Optional Redis for caching
Infrastructure: Local only (Minikube + Docker Desktop), no cloud Kubernetes
AI Tools: Gordon (Docker), kubectl-ai (Kubernetes), kagent (Analysis)
Environment: COHERE_API_KEY, BETTER_AUTH_SECRET, DATABASE_URL via Secrets
Dev Process: Spec-Driven Development with AI generation, human review

## Development Workflow

- Use Spec-Kit Plus workflow: Constitution → Specify → Plan → Tasks → Qwen code generation
- Qwen as ONLY model for code/spec generation (no Claude)
- Reference specs with @specs/... syntax
- Human must review & approve every generated code block
- Preserve full spec history in specs/infra/
- Commit often with semantic messages
- No manual coding allowed for hackathon evaluation
- Use Gordon/kubectl-ai/kagent for all DevOps operations
- Maintain project structure with dedicated k8s/ and docker/ directories

## Success Definition (Phase IV Exit Criteria)

☑ Frontend & backend containerized (Docker images built and optimized)
☑ Helm chart created and deployed to Minikube successfully
☑ App accessible via Minikube IP/port (chatbot works, tasks persist in Neon DB)
☑ Gordon/kubectl-ai/kagent used in process with documented usage
☑ Secrets/ConfigMaps handle env vars securely in Kubernetes
☑ Full flow: Login → chat → add task → list → complete → all via Kubernetes pods
☑ No crashes; pods healthy (kubectl get pods shows all running)
☑ README: Step-by-step local setup, Minikube commands, AI tool usage, screenshots

## Explicit Non-Goals for Phase IV Basic

× Cloud Kubernetes (EKS/GKE/AKS)
× CI/CD pipelines
× Advanced monitoring (Prometheus/Grafana)
× Production-grade ingress/SSL
× Multi-node cluster
× Persistent volumes (Neon DB is external)
× Manual kubectl/helm commands

## Governance

This constitution is the supreme guiding document for Phase IV of Todo - Cloud-Native Local Kubernetes Deployment.
Any deviation must be:
- Explicitly justified
- Documented in specs/infra/
- Approved by project owner

All PRs/reviews must verify compliance with these principles.
Complexity must be justified with clear benefits.

Use AI DevOps tools exclusively (Gordon, kubectl-ai, kagent).
Deploy on local Kubernetes only (Minikube).

**Version**: 3.0.0 | **Ratified**: 2026-01-02 | **Last Amended**: 2026-01-30