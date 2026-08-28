export type CategoryId = 
  | "finance" 
  | "business" 
  | "math" 
  | "health" 
  | "time-date" 
  | "converters" 
  | "education" 
  | "other";

export interface CalculatorItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  popular?: boolean;
  keywords: string[];
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  href: string;
}
