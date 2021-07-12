const useRecipeAPI = () => {
  const callAPI = async (endpoint = "", data = {}, method = "POST") => {
    const baseURL = "https://captain-cook-api.herokuapp.com";

    const response = await fetch(`${baseURL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return responseData;
  };

  const searchAllRecipes = async (query, callback) => {
    const data = {
      query,
    };

    const recipes = await callAPI("search", data);

    callback(recipes);
  };

  const fetchRecipe = async (recipeHref, callback) => {
    const data = {
      recipeHref,
    };

    const recipe = await callAPI("recipe", data);

    callback(recipe);
  };

  const identifyIngredients = async (screenshot, callback) => {
    const data = {
      screenshot,
    };

    const ingredients = await callAPI("ingredients", data);

    callback(ingredients);
  };

  return {
    searchAllRecipes,
    fetchRecipe,
    identifyIngredients,
  };
};

export default useRecipeAPI;
