
export interface Ingredient {
  item: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: Ingredient[];
  instructions: string[];
  kidFriendlyTip: string;
  nutritionalHighlights: string[];
  tags: string[];
}

export type ViewType = 'discover' | 'saved' | 'details';

export interface SearchFilters {
  dietary?: string;
  maxTime?: number;
  ingredients?: string;
}
