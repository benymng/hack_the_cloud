import { useEffect, useState } from "react";

import {
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Fab,
} from "@material-ui/core";

import useRecipeAPI from "../../hooks/useRecipeAPI";

import Loading from "../../components/Loading";
import LogoHeader from "../../components/LogoHeader";
import { ChevronLeftRounded } from "@material-ui/icons";

const Recipe = (props) => {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState({});
  const { fetchRecipe } = useRecipeAPI();

  const recipeHref = props.location.state?.recipeHref;

  useEffect(() => {
    fetchRecipe(recipeHref, (recipe) => {
      setLoading(false);
      setRecipeDetails(recipe);
      setImageLoaded(true);
    });
  }, [recipeHref]);

  useEffect(() => {
    if (!recipeHref) props.history.push("/search");
  }, []);

  const back = () => {
    props.history.push("/search", {
      searchResults: props.location.state?.searchResults,
    });
    setImageLoaded(false);
  };

  return (
    <>
      {(loading || !imageLoaded) && <Loading />}
      {!loading && Object.keys(recipeDetails).length > 0 && (
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ display: imageLoaded ? null : "none" }}
        >
          <LogoHeader />

          <Typography textAlign="center" variant="h4">
            {recipeDetails.name}
          </Typography>

          <Button
            onClick={back}
            color="secondary"
            startIcon={<ChevronLeftRounded />}
            style={{ margin: "0.5em 0" }}
          >
            Back
          </Button>

          <Grid item style={{ padding: "1em 2em" }}>
            <img
              src={recipeDetails.image}
              alt={recipeDetails.name}
              onLoad={() => setImageLoaded(true)}
              style={{
                borderRadius: "0.5em",
                width: "100%",
                height: "10em",
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid item style={{ margin: "0 2em 4em 2em" }}>
            <Typography style={{ fontStyle: "italic", marginBottom: 2 }}>
              {recipeDetails.description}
            </Typography>

            <Typography variant="h5" gutterBottom>
              Ingredients
            </Typography>

            <List style={{ marginBottom: 2 }}>
              {recipeDetails.ingredients.map((ingredient, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>{<Checkbox />}</ListItemIcon>
                  <ListItemText>{ingredient}</ListItemText>
                </ListItem>
              ))}
            </List>

            <Typography variant="h5" gutterBottom>
              Steps
            </Typography>

            <List marginBottom={2}>
              {recipeDetails.steps.map((step, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <div>{idx + 1}</div>
                  </ListItemIcon>

                  <ListItemText>{step}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Button
            variant="contained"
            style={{ position: "sticky", bottom: "2em" }}
            size="large"
          >
            <Typography
              fontWeight="fontWeightBold"
              style={{ color: "white" }}
              onClick={() => {
                props.history.push("/cook", { recipe: recipeDetails });
              }}
            >
              Cook!
            </Typography>
          </Button>
        </Grid>
      )}
    </>
  );
};

export default Recipe;
