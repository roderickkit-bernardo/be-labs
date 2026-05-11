import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Module 1 Backend Concepts",
    Svg: require("@site/static/img/os/module-1-backend-concepts.svg").default,
    description: <></>,
  },
  {
    title: "Module 2 Data-Sources and ersistence",
    Svg: require("@site/static/img/os/module-2-data-sources-and-persistence.svg")
      .default,
    description: <></>,
  },
  {
    title: "Module 3 App Deployment",
    Svg: require("@site/static/img/os/module-3-app-deployment.svg").default,
    description: <></>,
  },
  {
    title: "Final Project",
    Svg: require("@site/static/img/os/module-4-final-project.svg").default,
    description: <></>,
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
