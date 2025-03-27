export interface Recette {
	id?: string;
	nom: string;
	description: string;
	category: Category;
	sous_category: string[];
	tps_preparation_min: number;
	tps_cuisson_min: number;
	type_cuisson: string;
	origine: string;
	ingredients: IngredientQuantity[];
	image?: string;
}

export enum Category {
	ENTREE = 'Entrée',
	PLAT = 'Plat',
	DESSERT = 'Dessert',
	AUTRE = 'Autre'
}

export interface IngredientQuantity {
	ingredient: string;
	quantite_gr: number;
	nom?: string;
}

export interface UniqueInformations {
	sous_category: string[];
	origine: string[];
	tps_max: number;
	type_cuisson: string[];
}
