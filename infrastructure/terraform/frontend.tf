resource "docker_container" "frontend" {
  image    = docker_image.frontend.name
  name     = "${local.project_name}-frontend-${var.environment}"
  hostname = "frontend"

  attach   = false
  must_run = true
  logs     = true

  env = [
    "ENVIRONMENT=${var.environment}",
  ]

  ports {
    external = 3000
    internal = 3000
  }
}

resource "docker_image" "frontend" {
  name = "${local.project_name}/frontend"

  build {
    path       = abspath(path.cwd)
    dockerfile = "./infrastructure/docker/frontend.dockerfile"

    tag = [
      "${var.environment}"
    ]

    label = {
      author : "ixmael"
    }
  }
}
