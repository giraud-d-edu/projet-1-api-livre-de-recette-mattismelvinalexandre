export interface Recette {
    id: string;
    nom: string;
    description: string;
    category: Category;
    sous_category: SousCategory[];
    tps_preparation_min: number;
    tps_cuisson_min: number;
    type_cuisson: string;
    origine: string;
    ingredients: IngredientQuantity[];
    image?: string;
  }
  
  export interface Category {
    name: string;
  }
  
  export interface SousCategory {
    name: string;
  }
  
  export interface IngredientQuantity {
    ingredient: string;
    quantite_gr: string;
    nom?: string;
  }
  