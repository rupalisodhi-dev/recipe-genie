import React, { useState, KeyboardEvent } from 'react';

interface IngredientInputProps {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, setIngredients }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim() !== '') {
      e.preventDefault();
      if (!ingredients.includes(input.trim())) {
        setIngredients([...ingredients, input.trim()]);
      }
      setInput('');
    }
    if (e.key === 'Backspace' && input === '') {
      // Remove last ingredient if backspace pressed on empty input
      setIngredients(ingredients.slice(0, -1));
    }
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      {ingredients.map((ing, idx) => (
        <div key={idx} style={{ backgroundColor: '#eee', padding: '4px 8px', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
          <span>{ing}</span>
          <button
            onClick={() => removeIngredient(idx)}
            style={{ marginLeft: '5px', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type ingredient and press Enter"
        style={{ flex: 1, border: 'none', outline: 'none', minWidth: '120px' }}
      />
    </div>
  );
};

export default IngredientInput;
