import styles from "../../styles/Home.module.css";

export const Top10 = ({ top10 }) => {
  console.log(top10);
  return (
    <div>
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
    </div>
  );
};
