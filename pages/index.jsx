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
import { useEffect, useState } from "react";
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
const axios = require("axios");

const Home = () => {
  const wallet = useWallet();
  const [overlap, setOverlap] = useState([]);
  const [topHolders, setTopHolders] = useState([]);
  const [price, setPrice] = useState([]);
  const [totalSupply, setTotalSupply] = useState([]);
  const [metadata, setMetadata] = useState([]);
  useEffect(() => {
    const urlTop =
      "https://rest-api.hellomoon.io/v0/nft/collection/ownership/top-holders";
    const urlPrice = "https://rest-api.hellomoon.io/v0/token/candlesticks";

    async function getTopHolders() {
      const { data } = await axios.post(
        urlTop,
        {
          helloMoonCollectionId: "ac64e3873bbc715017274585f664ec30",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer f2cc01a0-5363-4d94-a6e5-4ed62aceb860",
          },
        }
      );
      setTopHolders(data);
    }

    const urlMeta = "https://rest-api.hellomoon.io/v0/token/list";

    async function getTokenInfo() {
      const { data } = await axios.post(
        urlMeta,
        {
          name: "Bonk",
          page: 1,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer f2cc01a0-5363-4d94-a6e5-4ed62aceb860",
          },
        }
      );
      setMetadata(data.data);
      console.log(data.data);
    }

    getTokenInfo();
    getTopHolders();
  }, []);
  const top10 = topHolders.data?.slice(0, 10);
  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <main className={styles.main}>
          {metadata
            .filter(
              (item) =>
                item.mint === "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
            )
            .map((item) => (
              <div key={item.data} className={styles.bonk}>
                <h1 className={styles.bonkH}>${item.name}</h1>
                <h1 className={styles.bonkH}>$ 0</h1>
              </div>
            ))}
          <h1 className={styles.title}>Top 10 Holders</h1>
          {top10?.length > 0 && (
            <div className={styles.topHolders__container}>
              <div className={styles.Address__amount}>
                <h1 className={styles.tablaAddressM}>Address</h1>
                <h1 className={styles.tablaAddressM}>Total Tokens</h1>
              </div>
              {top10?.map((holder) => (
                <div
                  key={holder.ownerAccount}
                  className={styles.topHolders__holder}
                >
                  <div className={styles.colums}>
                    <h3 className={styles.tablaAddress}>
                      {holder.ownerAccount.substr(0, 18) + "..."}
                    </h3>
                  </div>
                  <div>
                    <h3 className={styles.tablaAddress}>{holder.amount}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
