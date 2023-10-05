# Skeleton Application

This skeleton application is designed for rapid application testing and prototype development on the NL Design System. It provides a basic skeleton application with full NL Design system functionality that any developer can easily extend, view locally and deploy to an online environment for demonstration purposes. The main benefits are:

-   Development and (online) demonstration of prototypes without the need of a server.
-   An out-of-the-box basic application that doesn't require configuration or setup and can be extended immediately.


## Getting started

To set up your own project, you will need a GitHub account and be logged in. Simply click on the "use this template" button. Tell GitHub where you want to spin up your prototype and click "create a repository from template".


## Spinning up your local environment

To develop locally, clone your new repository to your local machine. Open the terminal, navigate to the folder containing your repository, and make a choice to run the app in Node.js/npm or docker.

### Node.js / NPM
You will need a Git client(optional), and have Node.js and NPM installed. This will run the frontend on port :9000 so make sure nothing runs on that.

```cli
$ cd /pwa
$ npm run build
$ npm run serve
```


### Docker

You will need to have docker installed. This will run the frontend on port :81 so make sure nothing runs on that.

```cli
$ docker-compose pull
```

The first time you start the docker containers or when you made major changes to the working of the application you run the following command:
```cli
$ docker-compose up --build
```

Otherwise you run the containers without rebuilding the application container
```
$ docker-compose up
```

After succesfully setting up your dev environment, navigate to [http://localhost:81/](http://localhost:81/) to view the app in your browser.

### Configure back-end connection
To connect to frontend to your local back-end you will first need to set up your back-end, you can follow the installation guide provided [here](https://github.com/OpenCatalogi/OpenCatalogiBundle#opencatalogibundle-).

To connect the app to your local gateway, you will need to change the environment variables in the `.env.development` file. Replace the content below Backend-config with the following:
```
GATSBY_ME_URL=http://localhost/me
GATSBY_API_URL=http://localhost/api
GATSBY_ADMIN_URL=http://localhost/admin
GATSBY_BASE_URL=http://localhost
GATSBY_FRONTEND_URL=http://localhost:8000
GATSBY_ORGANIZATION=http://webresourcecatalogus.conduction.svc.cluster.local/organizations/b2d3176e-f1c6-4365-ab86-dd253c65fc43
GATSBY_LOGIN_REDIRECT=vault
GATSBY_ADMIN_DASHBOARD_URL=https://admin.opencatalogi.nl
```

After editing this file restart the frontend

#### Node.js / NPM
Stop the server by pressing `CTRL + C` and rebuild the frontend:

```cli
$ npm run build
$ npm run serve
```

#### Docker
Stop the server by pressing `CTRL + C` and restart the frontend:
```cli
$ docker-compose down
$ docker-compose up
```


To edit the working of the common gateway spun with the application we kindly refer to the technical documentation of the [common gateway](https://docs.conductor-gateway.app/en/latest/installation/).

## Installing on Kubernetes environments
In order to install the application in your own cloud environment we support installation in [Kubernetes](https://kubernetes.io) using the supplied [helm](https://helm.sh) chart. Kubernetes is a Container Orchestration Engine that has been standardised for Dutch municipalities under the [Haven](https://haven.commonground.nl) standard, and for which Helm is the default installation method of components.

This helm chart can be installed with the help of Kubernetes Management Tools like [Rancher](https://rancher.com).

This helm chart can be installed by running Helm from your local machine (see instructions on how to install Helm on [helm.sh](https://helm.sh/docs/intro/install/#through-package-managers), which requires to have [kubectl](https://kubernetes.io/docs/tasks/tools/) installed).

If you have Helm and Kubectl installed and you have configured access to your cluster (usually via a kubeconfig file) you can run the following commands to install the application.
```cli
$ helm repo add opencatalogi https://raw.githubusercontent.com/opencatalogi/web-app/development/helm/
$ helm install my-opencatalogi opencatalogi/opencatalogi
```

For further configuration we kindly refer to the documentation of the helm chart found [here](helm/README.md)

## Technical Documentation @TODO IN PROGRESS

Full technical documentation is provided on [read the docs](https://skeleton-app.readthedocs.io/en/latest//) and is based on [MKDocs](https://www.mkdocs.org/). A more product owner focused (and less technical) product page is hosted at [link to be added]().

If you want to run the technical documentation locally, you can do so by using MKDocs build server and the serve command. Just go to the local repository and execute the following command for the documenation to be available on [port 8000](localhost://8000). Make sure to [install MKDocs](https://www.mkdocs.org/user-guide/installation/) first.





