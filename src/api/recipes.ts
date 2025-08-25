import axios from 'axios';

const API_KEY = process.env.REACT_APP_SPOONACULAR_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  ingredients?: string[];    
  instructions?: string;     
}

export interface RecipeDetail {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    ingredients: string[];
    instructions: string;
  }

export const fetchRecipes = async (ingredients: string[]): Promise<Recipe[]> => {
  if (ingredients.length === 0) return [];

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
        includeIngredients: ingredients.join(','),
        number: 8, // limit to 8 results
        addRecipeInformation: true,
      },
    });

    return response.data.results.map((r: any) => ({
      id: r.id,
      title: r.title,
      image: r.image,
      readyInMinutes: r.readyInMinutes,
      ingredients: r.extendedIngredients?.map((ing: any) => ing.original) || [],
      instructions: r.instructions || 'No instructions available',
    }));
  } catch (err) {
    console.error('Error fetching recipes:', err);
    return [];
  }
};

export const fetchRecipeDetail = async (id: number): Promise<RecipeDetail | null> => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: { apiKey: API_KEY },
      });
  
      const data = response.data;
  
      return {
        id: data.id,
        title: data.title,
        image: data.image,
        readyInMinutes: data.readyInMinutes,
        ingredients: data.extendedIngredients?.map((ing: any) => ing.original) || [],
        instructions: data.instructions || "No instructions available",
      };
    } catch (err) {
      console.error("Error fetching recipe details:", err);
      return null;
    }
  };
