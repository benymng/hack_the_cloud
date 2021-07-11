const useRecipeSearch = () => {
  const search = async (query, callback) => {
    const data = {
      query: query,
    };

    const response = await fetch(
      "https://captain-cook-api.herokuapp.com/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const recipes = await response.json();

    callback(recipes);
  };

  return {
    search,
  };
};

export default useRecipeSearch;
