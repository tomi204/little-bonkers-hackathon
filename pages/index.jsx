import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");
import { useWallet } from "@solana/wallet-adapter-react";
import Navbar from "../components/Navbar/Navbar";
import { NftListings } from "@hellomoon/api";
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const { StreamClient } = require("@hellomoon/api");

// replace this API_KEY below with your own.
const API_KEY = "f2cc01a0-5363-4d94-a6e5-4ed62aceb860";
// replace this SUBSCRIPTION_ID below with your own.
const subscriptionId = "7081a869-95e4-4923-a3aa-e312492a437a";

const client = new StreamClient(API_KEY);
client
  .subscribe(subscriptionId, (data) => {
    // An array of data dependent on what you are subscribed to
    console.log(data);
  })
  .then((disconnect) => {
    // Disconnect after 10 seconds, setTimeout is optional.
    setTimeout(disconnect, 10000);
  })
  .catch(console.error);

const Home = () => {
  const wallet = useWallet();
  const {
    SubscriptionManagerClient,
    TokenPriceStream,
    dataStreamFilters,
  } = require("@hellomoon/api");

  const stream = new TokenPriceStream({
    target: {
      targetType: "WEBSOCKET",
    },
    filters: {
      mint: dataStreamFilters.text.equals(
        "So11111111111111111111111111111111111111112"
      ),
      amount: dataStreamFilters.numeric.lessThanEquals(30),
    },
    name: "Alert when Wrapped Solana Drops Under 30 USDC",
  });

  // replace this API_KEY below with your own.
  const API_KEY = "f2cc01a0-5363-4d94-a6e5-4ed62aceb860";
  const client = new SubscriptionManagerClient(API_KEY);
  client
    .createSubscription(stream)
    .then((subscription) => {
      // Do something with your subscription
      console.log({ subscription } + "subscription");
    })
    .catch(console.error);

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
              Welcome to <a href="https://nextjs.org"></a>
            </h1>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
