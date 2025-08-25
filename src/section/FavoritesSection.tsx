import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesSection: React.FC = () => {
    const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section>
        <h2>Favorites</h2>
        <p>No favorites yet. Click the heart on a recipe to add some!</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Favorites</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {favorites.map((recipe) => (
            <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            state={recipe} // pass recipe to detail page
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
          <div
            style={{
              width: '200px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '-webkit-fill-available',
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{ width: '100%', height: '150px', objectFit: 'none', cursor: 'pointer' }}
            />
            <div style={{ padding: '8px 8px 0px' }}>{recipe.title}</div>
            <div style={{ fontSize: '0.8rem', color: '#666', padding: '8px 8px 18px' }}>
                Prep: {recipe.readyInMinutes} mins
              </div>

            
            <button
              onClick={(e) => {
                e.preventDefault(); // prevent Link navigation when clicking heart
                removeFavorite(recipe.id);
              }}
              style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: 'red',
              }}
            >
              ♥ 
            </button>


          </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FavoritesSection;
