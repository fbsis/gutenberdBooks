# Kubernetes Deployment Guide - Gutenberg Application

## Prerequisites
- Docker installed
- Kubernetes cluster configured (can be local with Minikube or a cloud cluster)
- kubectl installed and configured
- Access to the application source code

## Step by Step Deployment

### 1. Build Docker Images

First, build the Docker images for frontend and backend:

```bash
docker build -t gutenberg-frontend:latest ./../../frontend
docker build -t gutenberg-backend:latest ./../../backend
```

### 2. Deploy Kubernetes Components

Apply the components in the following order:

```bash
# Create namespace
kubectl apply -f ./00-namespace.yaml

# Apply ConfigMap
kubectl apply -f 01-configmap.yaml

# Configure Redis Storage
kubectl apply -f 02-redis-storage.yaml

# Deploy Redis
kubectl apply -f 03-redis.yaml

# Deploy Backend
kubectl apply -f 04-backend.yaml

# Deploy Frontend
kubectl apply -f 05-frontend.yaml
```

### 3. Verify Deployment Status

Check if all components are deployed correctly:

```bash
kubectl get all -n gutenberg
```

## Logs and Troubleshooting

To check logs for specific components:

```bash
# Backend logs
kubectl logs -f deployment/backend -n gutenberg

# Frontend logs
kubectl logs -f deployment/frontend -n gutenberg

# Redis logs
kubectl logs -f deployment/redis -n gutenberg
```

## Important Notes

1. Ensure all Docker images are accessible to your Kubernetes cluster
2. Verify all pods are in "Running" state before accessing the application
3. Check pod logs for troubleshooting
4. Redis is configured with persistent storage to maintain data across pod restarts