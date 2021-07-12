import { useState } from "react";

import {
  Avatar,
  Grid,
  IconButton,
  Slider,
  Typography,
} from "@material-ui/core";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
  ClearRounded,
  ReplayRounded,
} from "@material-ui/icons";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import { blueGrey, cyan, orange, red } from "@material-ui/core/colors";

import useStep from "../../hooks/useStep";

const Cook = (props) => {
  const recipe = props.location.state?.recipe;

  const [step, setStep] = useState(0);
  const [
    section,
    nextSection,
    previousSection,
    moreSectionsForward,
    moreSectionsBackward,
  ] = useStep(2, 0);
  const sections = [
    {
      name: "Ingredients",
      color: orange[500],
      array: recipe.ingredients,
      icon: "number",
    },
    {
      name: "Steps",
      color: cyan[500],
      array: recipe.steps,
      icon: "number",
    },
    {
      name: "Complete",
      color: "#00DB58",
      array: [],
      icon: <CheckRoundedIcon fontSize="large" />,
    },
  ];

  const currentSection = sections[section];

  const disableBack = !moreSectionsBackward() && step === 0;
  const disableForward = !moreSectionsForward();

  const forward = () => {
    // attempt to move to next section
    if (step === currentSection.array.length - 1) {
      if (!moreSectionsForward()) return;

      setStep(0);
      nextSection();
      return;
    }

    setStep(step + 1);
  };

  const back = () => {
    // attempt to move to previous section
    if (step === 0) {
      if (!moreSectionsBackward()) return;

      setStep(sections[section - 1].array.length - 1);
      previousSection();
      return;
    }

    setStep(step - 1);
  };

  const cancel = () => {
    props.history.push("/");
  };

  const replay = () => {};

  if (!recipe) props.history.push("/");

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{
        padding: "1em",
        height: "100%",
      }}
    >
      <Grid item width="100%" container alignItems="center">
        <Grid item>
          <Avatar
            style={{
              backgroundColor: currentSection.color,
              width: "2em",
              height: "2em",
              fontSize: "2em",
            }}
            alt={`${currentSection.name} ${
              currentSection.icon === "number" ? step : ""
            }`}
          >
            {currentSection.icon === "number" ? (
              <Typography fontWeight="fontWeightBold" variant="h4">
                {step + 1}
              </Typography>
            ) : (
              currentSection.icon
            )}
          </Avatar>
        </Grid>

        <Grid
          item
          flexGrow={1}
          style={{ paddingLeft: "2em", paddingRight: "1em" }}
        >
          {
            <Slider
              value={step}
              max={currentSection.array.length - 1}
              step={1}
              marks
            />
          }
        </Grid>
      </Grid>

      <Grid item width="100%" marginTop="auto" marginBottom="auto">
        <Typography
          variant="h4"
          textAlign={!moreSectionsForward() ? "center" : "left"}
        >
          {!moreSectionsForward() ? "Complete!" : currentSection.array[step]}
        </Typography>
      </Grid>

      <Grid
        item
        width="100%"
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <IconButton onClick={back} disabled={disableBack}>
            <ArrowBackIosRounded
              fontSize="large"
              style={{ color: cyan[500] }}
            />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton onClick={cancel}>
            <ClearRounded fontSize="large" style={{ color: red[500] }} />
          </IconButton>
        </Grid>

        {/* <Grid item>
          <IconButton>
            <ReplayRounded fontSize="large" style={{ color: blueGrey[500] }} />
          </IconButton>
        </Grid> */}

        <Grid item>
          <IconButton onClick={forward} disabled={disableForward}>
            <ArrowForwardIosRounded
              fontSize="large"
              style={{ color: cyan[500] }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );

  return <pre>{JSON.stringify(props.location.state.recipe, null, 2)}</pre>;
};

export default Cook;
