import React, { useState, useEffect } from 'react';
import IngredientInput from './components/IngredientInput';
import { fetchRecipes, Recipe } from './api/recipes';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import FavoritesSection from './section/FavoritesSection';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeDetail from './section/RecipeDetail'; 

function RecipesList({ recipes }: { recipes: Recipe[] }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => {
        const favorite = isFavorite(recipe.id); 

        return (
            <Link 
            key={recipe.id} 
            to={`/recipe/${recipe.id}`} 
            state={recipe} // pass recipe to detail page
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
          <div  className="recipe-card" style={{ position: 'relative' }}>
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{ width: '100%', borderRadius: '8px', objectFit: 'none', cursor: 'pointer'}}
            />
            <div style={{ padding: '8px 0px 0px' }}>{recipe.title}</div>
            <div style={{ fontSize: '0.8rem', color: '#666', padding: '8px 0px' }}>
              Prep: {recipe.readyInMinutes} mins
            </div>

            <button
              onClick={(e) => {
                e.preventDefault(); // prevent Link navigation when clicking heart
                favorite ? removeFavorite(recipe.id) : addFavorite(recipe);
              }}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem',
                color: favorite ? 'red' : '#ccc',
              }}
            >
              ♥
            </button>
          </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRecipes = async () => {
      if (ingredients.length === 0) {
        setRecipes([]);
        return;
      }

      setLoading(true);
      //const data = await fetchRecipes(ingredients);
      //setRecipes(data);
      setLoading(false);
    };

    loadRecipes();
  }, [ingredients]);

  return (
    <FavoritesProvider>
        <Router>
        <Routes>
          <Route
            path="/"
            element={
                <div className="container">
                    <header>
                    <h1>🍳 Recipe Genie</h1>
                    <p>Enter ingredients, discover recipes and save favorites.</p>
                    </header>

                    <main>
                    <section>
                        <h2>Ingredients</h2>
                        <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />
                    </section>

                    <section>
                        <h2>Recipes</h2>
                        {loading ? (
                        <p>Loading recipes…</p>
                        ) : recipes.length === 0 ? (
                        <p>No recipes found. Add ingredients above!</p>
                        ) : (
                        <RecipesList recipes={recipes} />
                        )}
                    </section>

                    <FavoritesSection />
                    </main>

                    <footer style={{ marginTop: '40px', fontSize: '0.8rem', color: '#666' }}>
                    Built with React + TypeScript + Spoonacular API
                    </footer>
                </div>
                }
                />

            <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
    </Router>
    </FavoritesProvider>
  ); 
}
