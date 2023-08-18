# Deploying to a Kubernetes Cluster

In order to install the application in your own cloud environment we support installation in [Kubernetes](https://kubernetes.io) using the supplied [helm](https://helm.sh) chart. Kubernetes is a Container Orchestration Engine that has been standardised for Dutch municipalities under the [Haven](https://haven.commonground.nl) standard, and for which Helm is the default installation method of components.

This helm chart can be installed with the help of Kubernetes Management Tools like [Rancher](https://rancher.com).

This helm chart can be installed by running Helm from your local machine (see instructions on how to install Helm on [helm.sh](https://helm.sh/docs/intro/install/#through-package-managers), which requires to have [kubectl](https://kubernetes.io/docs/tasks/tools/) installed).

If you have Helm and Kubectl installed and you have configured access to your cluster (usually via a kubeconfig file) you can run the following commands to install the application.

```cli
$ helm repo add opencatalogi https://raw.githubusercontent.com/opencatalogi/web-app/development/helm/
$ helm install my-opencatalogi opencatalogi/opencatalogi
```

The application can be adapted using the following helm values

| Value                       | Description                                                                                                                                        | Default           |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|
| `global.domain`             | Sets the domain for the application and its dependencies.                                                                                          | `opencatalogi.nl` |
| `global.tls`                | If the application should request TLS certificates for itself on the domains in `global.domain`, uses a cluster issuer named `letsencrypt-prod`.   | `true`            |
| `pwa.apiUrl`                | Overrides the domain in `global.domain` for the url of the opencatalogi api that the application should use if not set to `useDomain`.             | `useDomain`       |
| `pwa.meUrl`                 | Overrides the domain in `global.domain` for the url of the opencatalogi api me endpoint that the application should use if not set to `useDomain`. | `useDomain`       |
| `pwa.baseUrl`               | Overrides the domain in `global.domain` for the base url of the opencatalogi api that the application should use if not set to `useDomain`         | `useDomain`       |
| `pwa.frontendUrl`           | Overrides the domain in `global.domain` for the url of the application itself if not set to `useDomain`                                            | `useDomain`       |
| `pwa.adminUrl`              | Overrides the domain in `global.domain` for the url of the admin api endpoints of the opencatalogi api if not set to `useDomain`                   | `useDomain`       |
| `pwa.dashboardUrl`          | Overrides the domain in `global.domain` for the url of the admin dashboard if not set to `useDomain`                                               | `useDomain`       |
| `gateway.enabled`           | If a common gateway providing the opencatalogi api should be installed                                                                             | `true`            |
| `resources.requests.cpu`    | The amount of vCPU's to request for this application                                                                                               | `10m`             |
| `resources.requests.memory` | The amount of memory to request for this application                                                                                               | `128Mi`           |
| `resources.limits.cpu`      | The amount of vCPUs that the application should use at most (otherwise the application is restarted)                                               | -                 |
| `resources.limits.memory`   | The amount of memory that the application should use at most (otherwise the application is restarted)                                              | -                 |

For more information about the helm file for the common gateway see the [installation manual of the common gateway](https://github.com/CommonGateway/CoreBundle/blob/master/docs/features/Installation.md#haven--kubernetes).
Keep in mind that if the common gateway is installed via the subchart of this chart, all values in the manual mentioned should be prefixed by `gateway.`.

## Changelog

- 1.0.3: Updated common gateway helm chart from version 1.4.4 to version 1.5.0 (containing resource requests), added resource requests and extended helm file readme.
- 1.0.4: Updated common gateway helm chart from version 1.5.0 to version 1.5.1 (containing some fixes on ingress settings)
- 1.0.5: Updated common gateway helm chart from version 1.5.1 to version 1.5.2 (containing updated resource requests and limits for the gateway)