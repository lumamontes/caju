import { TransactionProp } from "./types";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("caju.db");

const addTransaction = (transaction: TransactionProp) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "INSERT INTO transactions (title, value, type, benefitSlug, date) VALUES (?, ?, ?, ?, ?)",
        [
          transaction.title,
          transaction.value,
          transaction.type,
          transaction.benefitSlug,
          transaction.date,
        ]
      );
    },
    (err) => console.log("Error adding transaction", err)
  );
};

const listTransactionsForBenefit = (
  benefitSlug: string,
  setTransactions: React.Dispatch<React.SetStateAction<TransactionProp[]>>
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM transactions WHERE benefitSlug = ?",
      [benefitSlug],
      (_, { rows: { _array } }) => {
        setTransactions(_array);
      },
      (_, err) => {
        console.error("Error listing transactions for benefit", err);
        return false;
      }
    );
  });
};

export const database = {
  addTransaction,
  listTransactionsForBenefit,
};
