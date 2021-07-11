import { useEffect, useState } from "react";

import { Button, Grid, Typography } from "@material-ui/core";

import useRecipeSearch from "../../hooks/useRecipeSearch";

import Loading from "../../components/Loading";
import RecipeCard from "../../components/RecipeCard";
import LogoHeader from "../../components/LogoHeader";
import { ChevronLeftRounded } from "@material-ui/icons";

const Search = (props) => {
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const { search } = useRecipeSearch();

  const searchField = props.location.state?.searchField;

  useEffect(() => {
    search(searchField, (results) => {
      setLoading(false);
      setSearchResults(results);
    });
  }, [searchField]);

  const back = () => {
    props.history.push("/");
    setImagesLoaded(0);
  };

  if (!searchField) props.history.push("/");

  const allImagesLoaded = imagesLoaded === searchResults.length;

  return (
    <>
      {(loading || !allImagesLoaded) && <Loading />}
      {!loading && (
        <Grid
          container
          direction="column"
          alignContent="center"
          style={{ display: allImagesLoaded ? null : "none" }}
        >
          <LogoHeader />
          <Typography textAlign="center" variant="h4">
            Search Results
          </Typography>
          <Button
            onClick={back}
            color="secondary"
            startIcon={<ChevronLeftRounded />}
            style={{ margin: "0.5em 0" }}
          >
            Back
          </Button>
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
                  key={recipeDetails.href}
                  openRecipe={() => {
                    props.history.push("/recipe", {
                      recipeHref: recipeDetails.href,
                    });
                  }}
                  handleImageLoad={() => {
                    setImagesLoaded(imagesLoaded + 1);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Search;
