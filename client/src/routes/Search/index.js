import { useEffect, useState } from "react";

import { Button, Grid, Typography } from "@material-ui/core";

import useRecipeAPI from "../../hooks/useRecipeAPI";

import Loading from "../../components/Loading";
import RecipeCard from "../../components/RecipeCard";
import LogoHeader from "../../components/LogoHeader";
import { ChevronLeftRounded } from "@material-ui/icons";

const Search = (props) => {
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const { searchAllRecipes } = useRecipeAPI();

  const searchField = props.location.state?.searchField;

  useEffect(() => {
    if (props.location.state?.searchResults) return;
    searchAllRecipes(searchField, (results) => {
      setLoading(false);
      setSearchResults(results);
    });
  }, [searchField]);

  useEffect(() => {
    if (props.location.state?.searchResults) {
      setLoading(false);
      setSearchResults(props.location.state.searchResults);
    } else if (!searchField) {
      props.history.push("/");
    }
  }, []);

  const back = () => {
    props.history.push("/");
    setImagesLoaded(0);
  };

  const allImagesLoaded = imagesLoaded === searchResults.length;

  return (
    <>
      {(loading || !allImagesLoaded) && <Loading />}
      {!loading && searchResults && (
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ display: allImagesLoaded ? null : "none" }}
        >
          <Grid item>
            <LogoHeader />
          </Grid>
          <Grid item>
            <Typography textAlign="center" variant="h4">
              Search Results
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={back}
              color="secondary"
              startIcon={<ChevronLeftRounded />}
              style={{ margin: "0.5em 0" }}
            >
              Back
            </Button>
          </Grid>
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            style={{
              width: "100%",
              padding: "1em 2em",
            }}
          >
            {searchResults.map((recipeDetails, idx) => (
              <Grid item style={{ width: "100%" }}>
                <RecipeCard
                  {...recipeDetails}
                  key={idx + recipeDetails}
                  openRecipe={() => {
                    props.history.push("/recipe", {
                      recipeHref: recipeDetails.href,
                      searchResults,
                    });
                  }}
                  handleImageLoad={() => {
                    setImagesLoaded(imagesLoaded + 1);
                  }}
                />
              </Grid>
            ))}
          </Grid>
          {searchResults.length === 0 && (
            <Typography variant="h6" color="textSecondary" align="center">
              Sorry, no results were found.
            </Typography>
          )}
        </Grid>
      )}
    </>
  );
};

export default Search;
