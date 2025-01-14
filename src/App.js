import React, { useState, useEffect } from 'react';
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
          apiKey: '820a2df37676426cb6bf880ada9bdb85', // Replace with your actual API key
        },
      });
      setRecipes(response.data);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        fetchRecipes();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [ingredient]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-6">
        <div className="text-3xl font-bold text-orange-600">RECIPES</div>
        <nav className="space-x-8 text-lg">
          <a href="#" className="text-black">Home</a>
          <a href="#" className="text-black">Browse</a>
          <a href="#" className="text-black">Members</a>
          <a href="#" className="text-black">Blogs</a>
          <a href="#" className="text-gray-500">LOG IN</a>
          <a href="#" className="bg-orange-500 text-white px-4 py-2 rounded">Register</a>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow text-center p-6">
        <h1 className="text-5xl font-bold mb-4">Welcome To The Home of Recipes</h1>
        <p className="text-lg mb-8">Chef’s special freshness in every bite.</p>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search recipes"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="w-full py-3 pl-12 pr-4 border-2 border-orange-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 text-xl"></i>
          <button
            onClick={fetchRecipes}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full shadow-lg transition-all"
          >
            Search
          </button>
        </div>
        {loading && <p className="text-orange-500 mt-4">Loading...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white shadow rounded-lg p-4 text-center">
              <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded" />
              <a
                href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 underline mt-2 block"
              >
                View Recipe
              </a>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center p-4 text-gray-500">
        &copy; 2025 Recipes Home
      </footer>
    </div>
  );
};

export default App;
