import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

// Change the network to the one you want to use: "mainnet-beta", "testnet", "devnet", "localhost" or your own RPC endpoint
const network = "mainnet-beta";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider network={network}>
      <WalletModalProvider>
        <Component {...pageProps} />
      </WalletModalProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
