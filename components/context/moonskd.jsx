import React, { useEffect } from "react";
import { useState } from "react";
const axios = require("axios");

export async function GetNFTs() {
  const [overlap, setOverlap] = useState([]);
  const [topHolders, setTopHolders] = useState([]);
  useEffect(() => {
    const urlTop =
      "https://rest-api.hellomoon.io/v0/nft/collection/ownership/top-holders";

    async function getTopHolders() {
      const { data } = await axios.post(
        urlTop,
        {
          helloMoonCollectionId: "5gPHbYV8LkN5uyZCvFEHRq7ZKtTWySMYF8zHRt2j5YP5",
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
      console.log(data);
    }
    getTopHolders();
  }, []);

  return {
    overlap,
    topHolders,
  };
}
