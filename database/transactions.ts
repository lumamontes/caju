import { TransactionProp } from "./types";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("caju.db");

const addTransaction = (transaction: TransactionProp) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "INSERT INTO transactions (title, value, type, prevBenefit, benefit, date) VALUES (?, ?, ?, ?, ?, ?)",
        [
          transaction.title,
          transaction.value,
          transaction.type,
          transaction.prevBenefit,
          transaction.benefit,
          transaction.date,
        ]
      );
      //Atualiza o saldo do benefício
      if (transaction.type === "income") {
        tx.executeSql(
          "UPDATE benefits SET balance = balance + ? WHERE slug = ?",
          [transaction.value, transaction.benefit]
        );
      }
      if (transaction.type === "outcome") {
        tx.executeSql(
          "UPDATE benefits SET balance = balance - ? WHERE slug = ?",
          [transaction.value, transaction.benefit]
        );
      }
    },
    (err) => console.log("Error adding transaction", err)
  );
};

const listTransactionsForBenefit = (
  benefitSlug: string,
  setTransactions: React.Dispatch<React.SetStateAction<TransactionProp[]>>
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `SELECT transactions.*, benefits.name as benefit, benefits.bgColor, benefits.icon
        FROM transactions 
        LEFT JOIN benefits ON transactions.benefit = benefits.slug
        WHERE transactions.benefit = ?
        GROUP BY transactions.id, transactions.date
        ORDER BY transactions.date DESC;
        `,
        [benefitSlug],
        (_, { rows }) => {
          setTransactions(rows._array);
        }
      );
    },
    (err) => console.log("Error listing transactions", err)
  );
};

export const database = {
  addTransaction,
  listTransactionsForBenefit,
};
