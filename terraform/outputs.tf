output "name_prefix" {
  description = "Shared resource name prefix."
  value       = local.name_prefix
}

output "tags" {
  description = "Tags applied to Terraform-managed AWS resources."
  value       = local.common_tags
}

output "aws_region" {
  description = "AWS region used by this stack."
  value       = var.aws_region
}
