import { Category } from "./categoryDTO";

export interface CreateCategoryFormProps {
    categories: Category[];
    onCategoryCreated: () => void; 
  }