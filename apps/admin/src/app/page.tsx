import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const SECRET = process.env.NEXT_PUBLIC_EXAMPLE_NAME;

  return (
    <main className={styles.main}>
      <h1>
        NX SST Next.js App
      </h1>

      <div className={styles.center}>
          <h1>
            NEXT_PUBLIC_EXAMPLE_NAME: {process.env.NEXT_PUBLIC_EXAMPLE_NAME}
            <br />
            ENVIRONMENT_NAME: {process.env.ENVIRONMENT_NAME}
          </h1>
      </div>


    </main>
  );
}
