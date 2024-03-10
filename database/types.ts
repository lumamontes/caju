import { Feather } from "@expo/vector-icons";

export interface BenefitProp {
    slug: string;
    name: string;
    icon: React.ComponentProps<typeof Feather>["name"];
    balance: number; 
    bgColor: string;
  }
  
export interface TransactionProp {
    id?: number;
    title: string;
    value: number; 
    type: 'income' | 'outcome';
    benefit: string; 
    prevBenefit: string;
    date: string; 
    bgColor?: string;
    icon?: React.ComponentProps<typeof Feather>["name"];
  }
  