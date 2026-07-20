# Terraform

This folder is the starting point for AWS infrastructure.

## What this scaffold gives you

- A pinned Terraform version and AWS provider.
- Shared naming and tags for the `dev`, `staging`, and `prod` environments.
- A remote-state backend example.
- A place to grow into VPC, compute, database, and edge resources.

## Suggested next pieces

- VPC and subnet layout for the backend and database.
- ECS Fargate or App Runner for the Fastify API.
- S3 plus CloudFront for the Expo web build.
- RDS Postgres for Prisma-backed persistence.

## Typical flow

1. Copy `backend.hcl.example` to `backend.hcl` and fill in the remote-state values.
2. Copy `environments/dev.tfvars.example` to a real tfvars file.
3. Run `terraform init -backend-config=backend.hcl`.
4. Run `terraform plan` and `terraform apply`.
