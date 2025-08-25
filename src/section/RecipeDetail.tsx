import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetail, RecipeDetail as RecipeType } from '../api/recipes';
import { Recipe  } from '../api/recipes';

const RecipeDetail: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState(true);
  /* const [recipe, setRecipe] = useState<RecipeType  | null>(
    (location.state as RecipeType)  | null
  );

  const [loading, setLoading] = useState(!location.state); */

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchRecipeDetail(Number(id))
        .then((data) => setRecipe(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p>Loading recipe…</p>;
  if (!recipe) return <p>No recipe found.</p>;
  
  

  return (
    <div style={{ padding: '20px' }}>
      <h1>{recipe.title}</h1>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{ width: '300px', objectFit: 'cover' }}
        />
      )}

      <h3>Ingredients:</h3>
      {recipe.ingredients && recipe.ingredients.length > 0 ?  (
        <ul>{recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}</ul>
      ) : (
        <p>No ingredients available</p>
      )}
      {/* {recipe.ingredients && recipe.ingredients.length > 0 ? (
        <ul>
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      ) : (
        <p>No ingredients available</p>
      )} */}

      <h3>Instructions:</h3>
      {recipe.instructions ? (
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        ) : (
          <p>No instructions available.</p>
        )}
    </div>
  );
};

export default RecipeDetail;
