variable "project_name" {
  description = "Short project name used for AWS resource naming."
  type        = string
  default     = "triple-t"
}

variable "environment" {
  description = "Deployment environment name, such as dev, staging, or prod."
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region where resources should be created."
  type        = string
  default     = "us-west-2"
}

variable "extra_tags" {
  description = "Additional tags merged into the shared AWS tags."
  type        = map(string)
  default     = {}
}

variable "domain_name" {
  description = "Primary domain name for the application, if one is used."
  type        = string
  default     = null
}

variable "backend_image" {
  description = "Container image reference for the Fastify backend."
  type        = string
  default     = null
}

variable "frontend_bucket_name" {
  description = "Optional S3 bucket name for the Expo web build."
  type        = string
  default     = null
}
