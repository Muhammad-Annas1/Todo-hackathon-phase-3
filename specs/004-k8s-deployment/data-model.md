# Data Model: Kubernetes Deployment (Minikube + Helm + AI DevOps)

**Feature**: 004-k8s-deployment  
**Date**: 2026-02-01  
**Author**: Qwen  

## Overview

This document defines the data model for the Kubernetes deployment of the Todo AI Chatbot application. The model includes Docker images, Helm chart components, and Kubernetes resources required for the deployment.

## Entities

### 1. Docker Images

**Entity**: Docker Image
- **Name**: Containerized application component identifier
- **Fields**:
  - `imageId`: Unique identifier for the Docker image
  - `imageName`: Name of the Docker image (e.g., todo-frontend, todo-backend)
  - `version`: Tag/version of the image (e.g., latest, v1.0.0)
  - `baseImage`: Base image used in multi-stage build (e.g., node:18-alpine, python:3.11-slim)
  - `buildContext`: Directory containing Dockerfile and build context
  - `securityScanPassed`: Boolean indicating if security scan passed
  - `size`: Size of the final image in MB
- **Relationships**: One Helm Chart contains multiple Docker Images
- **Validation rules**: 
  - imageName must follow Docker naming conventions
  - baseImage must be from trusted registry
  - size should be under 200MB for optimized builds
- **State transitions**: N/A

### 2. Helm Chart

**Entity**: Helm Chart
- **Name**: Package of Kubernetes resources
- **Fields**:
  - `chartName`: Name of the Helm chart (e.g., todo-app)
  - `version`: Chart version following semantic versioning
  - `appVersion`: Version of the application being deployed
  - `description`: Brief description of the chart's purpose
  - `maintainers`: List of chart maintainers
  - `dependencies`: List of dependent charts
  - `templates`: Directory containing Kubernetes manifest templates
  - `values`: Default configuration values
- **Relationships**: Contains multiple Kubernetes Resources
- **Validation rules**:
  - chartName must follow Helm naming conventions
  - version must follow semantic versioning
  - All templates must pass Helm lint validation
- **State transitions**: N/A

### 3. Kubernetes Deployment

**Entity**: Kubernetes Deployment
- **Name**: Deployment configuration for application pods
- **Fields**:
  - `deploymentName`: Name of the deployment
  - `replicas`: Number of pod replicas to maintain
  - `selector`: Label selector to identify pods
  - `template`: Pod template specification
  - `strategy`: Update strategy (RollingUpdate, Recreate)
  - `resources`: Resource limits and requests (CPU, memory)
  - `healthChecks`: Liveness and readiness probe configurations
- **Relationships**: Managed by Helm Chart
- **Validation rules**:
  - replicas should be >= 1 for availability
  - resource limits should be specified to prevent resource exhaustion
  - health checks must be configured for reliable operation
- **State transitions**: 
  - Pending → Running (when pods start successfully)
  - Running → Failed (when pods crash repeatedly)

### 4. Kubernetes Service

**Entity**: Kubernetes Service
- **Name**: Network abstraction for accessing pods
- **Fields**:
  - `serviceName`: Name of the service
  - `serviceType`: Type of service (ClusterIP, NodePort, LoadBalancer)
  - `selector`: Label selector to identify target pods
  - `ports`: List of ports to expose
  - `clusterIP`: Internal IP address assigned to the service
- **Relationships**: Associated with one or more Deployments
- **Validation rules**:
  - serviceName must be unique within namespace
  - serviceType must be one of allowed values
  - Ports must be in valid range (1-65535)
- **State transitions**: N/A

### 5. Kubernetes ConfigMap

**Entity**: Kubernetes ConfigMap
- **Name**: Configuration data storage
- **Fields**:
  - `configMapName`: Name of the ConfigMap
  - `data`: Key-value pairs of configuration data
  - `binaryData`: Binary data (if needed)
- **Relationships**: Referenced by Deployments
- **Validation rules**:
  - configMapName must follow Kubernetes naming conventions
  - Keys must be valid DNS subdomain names
  - Total size must be under 1MB
- **State transitions**: N/A

### 6. Kubernetes Secret

**Entity**: Kubernetes Secret
- **Name**: Sensitive data storage
- **Fields**:
  - `secretName`: Name of the Secret
  - `data`: Base64-encoded sensitive data
  - `stringData`: Plaintext sensitive data (encoded automatically)
  - `type`: Type of secret (Opaque, kubernetes.io/tls, etc.)
- **Relationships**: Referenced by Deployments
- **Validation rules**:
  - secretName must follow Kubernetes naming conventions
  - Data must be properly encoded
  - Should not contain plaintext sensitive information
- **State transitions**: N/A

### 7. Kubernetes Ingress

**Entity**: Kubernetes Ingress
- **Name**: HTTP/HTTPS routing configuration
- **Fields**:
  - `ingressName`: Name of the Ingress resource
  - `rules`: List of host/path rules
  - `tls`: TLS/SSL configuration
  - `annotations`: Ingress controller specific configurations
- **Relationships**: Routes traffic to Services
- **Validation rules**:
  - ingressName must be unique within namespace
  - Hostnames must be valid DNS names
  - Paths must follow proper format
- **State transitions**: N/A

## Relationships

- **Helm Chart** 1 ---- * **Docker Images**: A Helm chart packages multiple Docker images
- **Helm Chart** 1 ---- * **Kubernetes Resources**: A Helm chart defines multiple Kubernetes resources
- **Kubernetes Deployment** 1 ---- * **Pods**: A deployment manages multiple pods
- **Kubernetes Service** 1 ---- * **Kubernetes Deployment**: A service routes traffic to deployment pods
- **Kubernetes Deployment** * ---- * **Kubernetes ConfigMap**: Deployments can reference multiple ConfigMaps
- **Kubernetes Deployment** * ---- * **Kubernetes Secret**: Deployments can reference multiple Secrets
- **Kubernetes Ingress** 1 ---- * **Kubernetes Service**: An ingress routes traffic to multiple services

## Validation Rules Summary

- All Kubernetes resource names must follow DNS-1123 naming conventions
- Resource limits and requests should be specified for predictable performance
- Health checks (liveness/readiness probes) must be configured for reliable operation
- Sensitive data must be stored in Secrets, not ConfigMaps or environment variables
- Docker images should be from trusted sources and scanned for vulnerabilities
- Helm charts must pass lint validation before deployment