import { BenefitProp } from "./types";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("caju.db");

const insertMockDataIfNeeded = () => {
  db.transaction(
    (tx) => {
      // Primeiro, verifica se a tabela já contém dados
      tx.executeSql(
        "SELECT COUNT(*) as count FROM benefits;",
        [],
        (_, { rows }) => {
          const count = rows.item(0).count;
          if (count === 0) {
            // Se a tabela estiver vazia, insere os dados mockados
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
                bgColor:  "#FEE082"
              },
              {
                slug: "cultura",
                name: "Cultura",
                icon: "book-open",
                balance: 350 * 100,
                bgColor: "#75D0EA"
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
            benefitsInicialData.forEach(({ slug, name, icon, balance, bgColor }) => {
              tx.executeSql(
                "INSERT INTO benefits (slug, name, icon, balance, bgColor) VALUES (?, ?, ?, ?, ?);",
                [
                  slug,
                  name,
                  icon,
                  balance,
                  bgColor,
                ],
                () => console.log(`Benefício ${name} inserido com sucesso.`),
                (transaction, error) => {
                  console.error(`Erro ao inserir o benefício ${name}:`, error);
                  return false; // Continua a propagação de erro
                }
              );
            });
          } else {
            console.log("Dados mockados já inseridos anteriormente.");
          }
        },
        (transaction, error) => {
          console.error("Erro ao verificar a tabela beneficios:", error);
          return true; // para parar a propagação do erro
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
      tx.executeSql("SELECT SUM(balance) as total FROM benefits", [], (_, { rows }) => {
        setTotal(rows._array[0].total);
      });
    },
    (err) => console.log("Error getting total balance", err)
  );
}

const getBenefitBySlug = (
  slug: string,
  setBenefit: React.Dispatch<React.SetStateAction<BenefitProp | undefined>>
) => {
  db.transaction(
    (tx) => {
      tx.executeSql("SELECT * FROM benefits WHERE slug = ?", [slug], (_, { rows }) => {
        setBenefit(rows._array[0]);
      });
    },
    (err) => console.log("Error getting benefit by slug", err)
  );
}


export const benefitsDatabase = {
  listBeneficios,
  totalBenefitsBalance,
  insertMockDataIfNeeded,
  getBenefitBySlug
};
