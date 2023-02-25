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
        <h1 className={styles.h1}> Lorem ipsum dolor sit amet consectetur </h1>
        <p className={styles.explain}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque as
          <b>
            <a
              href="https://portal.thirdweb.com/solana"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.lightPurple}
            >
              Solana SDK
            </a>
          </b>
        </p>
      </div>
    </>
  );
};

export default Home;
