import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Recipe({ title, ingredients, link }) {
  return (
    <div className="recipe">
      <h2><a href={link} target="_blank" rel="noopener noreferrer">{title}</a></h2>
      <p>Ingredients: {ingredients.join(', ')}</p>
    </div>
  );
}

function App() {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = document.getElementById('queryInput').value.trim();
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error.message);
      setRecipes([]);
    }
  };

  return (
    <div>
      <form id="recipeForm" onSubmit={handleSearch}>
        <input type="text" id="queryInput" placeholder="Search for recipes" required />
        <button type="submit">Search</button>
      </form>
      <div id="recipes">
        {recipes.map((recipe, index) => (
          <Recipe
            key={index}
            title={recipe.title}
            ingredients={recipe.extendedIngredients.map(ingredient => ingredient.name)}
            link={recipe.sourceUrl}
          />
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('recipes'));
