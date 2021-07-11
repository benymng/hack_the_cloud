import { Paper, Grid, Typography } from "@material-ui/core";

import { truncate } from "../utils/text";

const RecipeCard = ({ name, descriptions, image, href, handleImageLoad }) => {
  return (
    <Paper elevation={5}>
      <Grid container>
        <Grid item xs={4} style={{ padding: "0.5em" }}>
          <img
            src={image}
            onLoad={handleImageLoad}
            alt={name}
            style={{
              borderRadius: "0.5em",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>

        <Grid item xs={8} style={{ padding: "0.5em" }}>
          <div style={{ marginBottom: "0.5em" }}>
            <Typography variant="h6" lineHeight="1.2em">
              {name}
            </Typography>
          </div>
          <div style={{ height: "5em" }}>
            <Typography
              variant="caption"
              style={{ lineHeight: "0.8em", width: "100%" }}
              color="textSecondary"
            >
              {truncate(descriptions, 105)}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RecipeCard;
