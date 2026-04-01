import type {ReactNode} from 'react';
import styles from './styles.module.css';

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <p className="text--center">Curated TypeScript notes, kept concise.</p>
      </div>
    </section>
  );
}
