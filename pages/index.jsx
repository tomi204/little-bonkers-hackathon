import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");
import { useWallet } from "@solana/wallet-adapter-react";
import Navbar from "../components/Navbar/Navbar";
import {
  NftCollectionListingStatsStream,
  NftListings,
  NftListingStatusRequest,
} from "@hellomoon/api";
import { Container } from "@chakra-ui/react";
import { GetNFTs } from "../components/context/moonskd";
import { useState } from "react";
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const { StreamClient } = require("@hellomoon/api");

// replace this API_KEY below with your own.
const API_KEY = "f2cc01a0-5363-4d94-a6e5-4ed62aceb860";
// replace this SUBSCRIPTION_ID below with your own.
const subscriptionId = "d69aeaad-60dc-4620-83e9-4a0a47bf120a";

const Home = () => {
  const wallet = useWallet();

  const { overlap, topHolders } = GetNFTs();
  console.log(topHolders, "overlap");

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <main className={styles.main}>
          {!wallet.disconnect ? (
            <div className={styles.disconnectedDiv}>
              <h1 className={styles.title}>Connect your wallet </h1>
              <WalletMultiButtonDynamic />
            </div>
          ) : (
            <div className={styles.divConnect}>
              <h1 className={styles.title}>Welcome to the Moon! </h1>
              <Container maxW="container.xl"></Container>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
