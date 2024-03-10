import { Feather } from "@expo/vector-icons";

export interface BenefitProp {
    slug: string;
    name: string;
    icon: React.ComponentProps<typeof Feather>["name"];
    balance: number; // Agora como número
    bgColor: string;
  }
  
export interface TransactionProp {
    id: number;
    title: string;
    value: number; // Já é um número, mantemos
    type: 'income' | 'outcome';
    benefitSlug: string; // Referência ao slug do benefício
    date: string; // Formato de data ISO como string
  }
  