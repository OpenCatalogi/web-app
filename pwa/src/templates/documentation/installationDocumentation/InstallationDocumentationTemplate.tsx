import * as React from "react";
import * as styles from "./InstallationDocumentationTemplate.module.css";
import { Container } from "@conduction/components";
import { Heading1, Heading2, Heading3, LeadParagraph, Link, Paragraph } from "@gemeente-denhaag/components-react";
import { navigate } from "gatsby";
import { ExternalLinkIcon, ArrowRightIcon } from "@gemeente-denhaag/icons";

export const InstallationDocumentationTemplate: React.FC = () => {
  return (
    <Container layoutClassName={styles.container}>
      <section className={styles.section}>
        <Heading1>Componenten op Open Catalogi plaatsen</Heading1>

        <LeadParagraph>Er zijn vier manieren om een component zichtbaar te maken op Open Catalogi.</LeadParagraph>
      </section>

      <section className={styles.section}>
        <Heading2>Getting started</Heading2>
        <Paragraph>
          To set up your own project, you will need a GitHub account and be logged in. Klik op de groene Gebruik dit
          template op de{" "}
          <a href="https://github.com/ConductionNL/skeleton-app" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                GitHub pagina
              </Link>
            </span>
          </a>{" "}
          . Tell GitHub where you want to spin up your prototype and click "create a repository from template".
        </Paragraph>

        <Heading2>Spinning up your local environment</Heading2>
        <Paragraph>
          To develop locally, clone your new repository to your local machine. Open the terminal, navigate to the folder
          containing your repository, and make a choice to run the app in Node.js/npm or docker.
        </Paragraph>

        <Heading3>Node.js / NPM</Heading3>
        <Paragraph>
          You will need a Git client(optional), and have Node.js and NPM installed. This will use port :8000 so make
          sure nothing runs on that.
          <div className={styles.code}>
            $ cd /pwa <br />
            $ npm install <br />
            $ npm run develop <br />
          </div>
        </Paragraph>

        <Heading3>Docker</Heading3>
        <Paragraph>
          You will need to have docker installed. This will also run Conductions gateway on port :80 and the app itself
          on :8000 so make sure nothing runs on those.
          <div className={styles.code}>$ docker-compose pull</div>
          The first time you start the docker containers or when you made major changes to the working of the
          application you run the following command:
          <div className={styles.code}>$ docker-compose up --build</div>
          Otherwise you run the containers without rebuilding the application container
          <div className={styles.code}>$ docker-compose up</div>
          After succesfully setting up your dev environment, navigate to{" "}
          <a href="http://localhost:81/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                http://localhost:81/
              </Link>
            </span>
          </a>{" "}
          to view the app in your browser. <br /> <br />
          To edit the working of the common gateway spun with the application we kindly refer to the technical
          documentation of the{" "}
          <a href="https://docs.conductor-gateway.app/en/latest/installation/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                common gateway
              </Link>
            </span>
          </a>
          .
        </Paragraph>

        <Heading2>Installing on Kubernetes environments</Heading2>
        <Paragraph>
          In order to install the application in your own cloud environment we support installation in{" "}
          <a href="https://kubernetes.io/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                Kubernetes
              </Link>
            </span>
          </a>{" "}
          using the supplied{" "}
          <a href="https://helm.sh/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                helm
              </Link>
            </span>
          </a>{" "}
          chart. Kubernetes is a Container Orchestration Engine that has been standardised for Dutch municipalities
          under the{" "}
          <a href="https://haven.commonground.nl/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                Haven
              </Link>
            </span>
          </a>{" "}
          standard, and for which Helm is the default installation method of components.
          <br />
          <br />
          This helm chart can be installed with the help of Kubernetes Management Tools like{" "}
          <a href="https://dashkube.com/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                Daskube
              </Link>
            </span>
          </a>{" "}
          or{" "}
          <a href="https://rancher.com/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                Rancher
              </Link>
            </span>
          </a>{" "}
          .
          <br />
          <br />
          This helm chart can be installed by running Helm from your local machine (see instructions on how to install
          Helm on{" "}
          <a href="https://helm.sh/docs/intro/install/#through-package-managers" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                helm.sh
              </Link>
            </span>
          </a>{" "}
          , which requires to have{" "}
          <a href="https://kubernetes.io/docs/tasks/tools/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                kubectl
              </Link>
            </span>
          </a>{" "}
          installed).
          <br />
          <br /> If you have Helm and Kubectl installed and you have configured access to your cluster (usually via a
          kubeconfig file) you can run the following commands to install the application.
          <div className={styles.code}>
            $ helm repo add opencatalogi https://raw.githubusercontent.com/opencatalogi/web-app/development/helm/ <br />
            $ helm install my-opencatalogi opencatalogi/opencatalogi <br />
          </div>
          For further configuration we kindly refer to the documentation of the helm chart found{" "}
          <a
            href="https://github.com/OpenCatalogi/web-app/blob/e3fdf396cd5fb39266fd77a2af404cb59a881cb7/helm/README.md"
            target={"_blank"}
          >
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                here
              </Link>
            </span>
          </a>
          .
        </Paragraph>

        <Heading2>Technical Documentation</Heading2>
        <Paragraph>
          Full technical documentation is provided on{" "}
          <a href="https://skeleton-app.readthedocs.io/en/latest//" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                read the docs
              </Link>
            </span>
          </a>{" "}
          and is based on{" "}
          <a href="https://www.mkdocs.org/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                MKDocs
              </Link>
            </span>
          </a>{" "}
          .
          <br /> <br />
          If you want to run the technical documentation locally, you can do so by using MKDocs build server and the
          serve command. Just go to the local repository and execute the following command for the documenation to be
          available on port 8000. Make sure to{" "}
          <a href="https://www.mkdocs.org/user-guide/installation/" target={"_blank"}>
            <span>
              <Link icon={<ExternalLinkIcon />} iconAlign="start">
                install MKDocs
              </Link>
            </span>
          </a>{" "}
          first.
        </Paragraph>
      </section>
    </Container>
  );
};
