import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    if (!ingredient) {
      setError('Please enter an ingredient');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
        params: {
          ingredients: ingredient,
          number: 5,
          apiKey: '820a2df37676426cb6bf880ada9bdb85',
        },
      });
      setRecipes(response.data);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Recipe Finder</h1>
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Enter ingredient"
      />
      <button onClick={fetchRecipes}>Search Recipes</button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <a href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`} target="_blank" rel="noopener noreferrer">
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
