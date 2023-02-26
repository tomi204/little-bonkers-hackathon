import { useWallet } from "@solana/wallet-adapter-react";
import style from "./Navbar.module.css";
import { Stack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const wallet = useWallet();
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );
  return (
    <div className={style.navbar}>
      <div className={style.navbar__left}>
        <div className={style.navbar__logo}>
          <img src={"/assets/Little_Bonke.png"} width={250} height={30} />
        </div>
      </div>
      <div className={style.navbar__title}>
        <h1>Little Bonkers</h1>
      </div>
      <div className={style.navbar__right}>
        <Link className={style.link__nav} href="https://play.littlebonkers.xyz">
          Play
        </Link>
        <br />
        <Link
          className={style.link__nav}
          href="https://play.littlebonkers.xyz/signup"
        >
          Sing UP!
        </Link>
        {wallet.connected && (
          <div className={style.navbar__wallet}>
            <WalletMultiButtonDynamic />
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
