import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");
import { useWallet } from "@solana/wallet-adapter-react";
import Navbar from "../components/Navbar/Navbar";
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const Home = () => {
  const wallet = useWallet();
  const { TokenPriceStream } = require("@hellomoon/api");

  return (
    <>
      <div className={styles.container}>
        <Navbar />

        <main className={styles.main}>
          {wallet.disconnect ? (
            <div className={styles.disconnectedDiv}>
              <h1 className={styles.title}>Connect your wallet </h1>
              <WalletMultiButtonDynamic />
            </div>
          ) : (
            <h1 className={styles.title}>
              Welcome to <a href="https://nextjs.org">Next.js!</a>
            </h1>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
