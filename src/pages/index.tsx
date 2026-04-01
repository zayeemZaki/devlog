import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Zayeem's DevLog"
      description="A minimal engineering DevLog by Zayeem.">
      <main className="container margin-vert--xl text--center">
        <Heading as="h1">Zayeem's DevLog</Heading>
        <p>Documenting my engineering journey, lessons, and implementation notes.</p>
        <Link className="button button--primary button--lg" to="/docs/typescript/intro">
          Enter DevLog
        </Link>
      </main>
    </Layout>
  );
}
