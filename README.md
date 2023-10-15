# Red Efectiva Test
This repository has the implementation of the Red Efectiva test.

## Frontend test
The frontend test is in the *frontend* directory.

## Build and run dockers containers
I use *terraform* to build the images and run the docker containers.

```sh
# Init terraform
terraform -chdir=./infrastructure/terraform init

# Prepare the information of the docker containers
terraform -chdir=./infrastructure/terraform plan

# Build images and run the containers
terraform -chdir=./infrastructure/terraform apply

# Destroy the docker items
terraform -chdir=./infrastructure/terraform destroy
```