import { useState } from "react";

import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import { SearchRounded, PhotoCamera } from "@material-ui/icons";

import logo from "../../logo.svg";

const Home = (props) => {
  const [searchField, setSearchField] = useState("");

  const search = () => {
    if (!searchField) return;

    props.history.push("/search", { searchField });
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item style={{ marginTop: "2em" }}>
        <img
          src={logo}
          alt="logo"
          style={{ height: "15em", pointerEvents: "none" }}
        />
      </Grid>

      <Grid item style={{ marginTop: "2em" }}>
        <TextField
          variant="standard"
          label="Search recipes"
          autoComplete="new-password"
          spellCheck={false}
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && search(searchField)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => search(searchField)}>
                  <SearchRounded />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Grid>

      <Grid item style={{ marginTop: "3em" }}>
        <Button
          variant="outlined"
          startIcon={<PhotoCamera />}
          onClick={() => props.history.push("/scan")}
        >
          Scan Ingredients
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
