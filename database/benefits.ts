import { BenefitProp } from "./types";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("caju.db");

const insertMockDataIfNeeded = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "SELECT COUNT(*) as count FROM benefits;",
        [],
        (_, { rows }) => {
          const count = rows.item(0).count;
          if (count === 0) {
            const benefitsInicialData = [
              {
                slug: "home-office",
                name: "Home Office",
                icon: "home",
                balance: 150 * 100,
                bgColor: "#BFABE6",
              },
              {
                slug: "refeicao",
                name: "Refeição",
                icon: "coffee",
                balance: 200 * 100,
                bgColor: "#F08184",
              },
              {
                slug: "alimentacao",
                name: "Alimentação",
                icon: "map",
                balance: 250 * 100,
                bgColor: "#FEAC66",
              },
              {
                slug: "mobilidade",
                name: "Mobilidade",
                icon: "map-pin",
                balance: 300 * 100,
                bgColor: "#FEE082",
              },
              {
                slug: "cultura",
                name: "Cultura",
                icon: "book-open",
                balance: 350 * 100,
                bgColor: "#75D0EA",
              },
              {
                slug: "saude",
                name: "Saúde",
                icon: "heart",
                balance: 400 * 100,
                bgColor: "#9AE59A",
              },
              {
                slug: "educacao",
                name: "Educação",
                icon: "book",
                balance: 400 * 100,
                bgColor: "#F69BC6",
              },
            ];
            benefitsInicialData.forEach(
              ({ slug, name, icon, balance, bgColor }) => {
                tx.executeSql(
                  "INSERT INTO benefits (slug, name, icon, balance, bgColor) VALUES (?, ?, ?, ?, ?);",
                  [slug, name, icon, balance, bgColor],
                  () => console.log(`Benefício ${name} inserido com sucesso.`),
                  (transaction, error) => {
                    console.error(
                      `Erro ao inserir o benefício ${name}:`,
                      error
                    );
                    return false;
                  }
                );
              }
            );
          } else {
            console.log("Dados mockados já inseridos anteriormente.");
          }
        },
        (transaction, error) => {
          console.error("Erro ao verificar a tabela benefits:", error);
          return true;
        }
      );
    },
    (error) => {
      console.error(
        "Erro na transação para verificar/inserir dados mockados:",
        error
      );
    },
    () => {
      console.log("Verificação/Inserção de dados mockados concluída.");
    }
  );
};

const listBeneficios = (
  setBeneficios: React.Dispatch<React.SetStateAction<BenefitProp[]>>
) => {
  db.transaction(
    (tx) => {
      tx.executeSql("SELECT * FROM benefits", [], (_, { rows }) => {
        setBeneficios(rows._array);
      });
    },
    (err) => console.log("Error listing benefits", err)
  );
};

const totalBenefitsBalance = (
  setTotal: React.Dispatch<React.SetStateAction<number>>
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "SELECT SUM(balance) as total FROM benefits",
        [],
        (_, { rows }) => {
          setTotal(rows._array[0].total);
        }
      );
    },
    (err) => console.log("Error getting total balance", err)
  );
};

const getBenefitBySlug = (
  slug: string,
  setBenefit: React.Dispatch<React.SetStateAction<BenefitProp | undefined>>
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "SELECT * FROM benefits WHERE slug = ?",
        [slug],
        (_, { rows }) => {
          setBenefit(rows._array[0]);
        }
      );
    },
    (err) => console.log("Error getting benefit by slug", err)
  );
};

const updateBenefitBalance = (slug: string, newBalance: number) => {
  db.transaction(
    (tx) => {
      tx.executeSql("UPDATE benefits SET balance = ? WHERE slug = ?", [
        newBalance,
        slug,
      ]);
    },
    (err) => console.log("Error updating benefit balance", err)
  );
};

export const benefitsDatabase = {
  listBeneficios,
  totalBenefitsBalance,
  insertMockDataIfNeeded,
  getBenefitBySlug,
  updateBenefitBalance,
};
