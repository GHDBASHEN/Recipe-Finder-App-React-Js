import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Register from "./register";

const App = () => {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = useCallback(async () => {
    if (!ingredient) {
      setError("Please enter an ingredient");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`,
        {
          params: {
            ingredients: ingredient,
            number: 5,
            apiKey: "820a2df37676426cb6bf880ada9bdb85", // Replace with your actual API key
          },
        }
      );
      setRecipes(response.data);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [ingredient]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        fetchRecipes();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [fetchRecipes]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="flex justify-between items-center p-6">
          <div className="text-3xl font-bold text-orange-600">RECIPES</div>
          <nav className="space-x-8 text-lg">
            <Link to="/" className="text-black">
              Home
            </Link>
            <Link to="/register" className="bg-orange-500 text-white px-4 py-2 rounded">
              Register
            </Link>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <main className="flex flex-col items-center justify-center flex-grow text-center p-6">
                <h1 className="text-5xl font-bold mb-4">
                  Welcome To The Home of Recipes
                </h1>
                <p className="text-lg mb-8">
                  Chef’s special freshness in every bite.
                </p>
                <div className="relative w-full max-w-md">
                  <input
                    type="text"
                    placeholder="Search a recipe by ingredient..."
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    className="w-full py-3 pl-12 pr-4 border-2 border-orange-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
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
                    <div
                      key={recipe.id}
                      className="bg-white shadow rounded-lg p-4 text-center"
                    >
                      <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-48 object-cover rounded"
                      />
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
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
