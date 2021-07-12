import { Grid, IconButton, Zoom } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import {
  CheckRounded,
  ChevronLeftRounded,
  PhotoCameraRounded,
  ReplayRounded,
} from "@material-ui/icons";
import React, { useRef, useState, useCallback } from "react";

import Webcam from "react-webcam";

import useRecipeAPI from "../../hooks/useRecipeAPI";

const videoConstraints = {
  facingMode: "environment",
};

const Scan = (props) => {
  const webcamRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);
  const [mode, setMode] = useState("capture");

  const { identifyIngredients } = useRecipeAPI();

  const capture = useCallback(() => {
    const image = webcamRef.current.getScreenshot();

    setMode("captured");
    setScreenshot(image);
  }, [webcamRef, setScreenshot]);

  const confirm = () => {
    identifyIngredients(screenshot, (searchResults) => {
      props.history.push("/search", { searchResults });
    });
  };

  const redo = () => {
    setMode("capture");
  };

  return (
    <Grid container alignItems="center" width="100%" height="100%">
      {mode === "capture" && (
        <>
          <Grid item marginRight="auto" width="25em">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{ width: "100%", height: "100%", borderRadius: "2em" }}
            />
          </Grid>
          <Grid item>
            <IconButton style={{ padding: "0.75em" }} onClick={capture}>
              <PhotoCameraRounded fontSize="large" color="primary" />
            </IconButton>
          </Grid>
        </>
      )}

      {mode === "captured" && (
        <>
          <Grid item marginRight="auto" width="25em">
            <img
              src={screenshot}
              style={{ width: "100%", height: "100%", borderRadius: "2em" }}
            />
          </Grid>
          <Grid item container direction="column" width="4em">
            <Grid item>
              <IconButton style={{ padding: "0.75em" }} onClick={confirm}>
                <CheckRounded fontSize="large" style={{ color: green[500] }} />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton style={{ padding: "0.75em" }} onClick={redo}>
                <ReplayRounded fontSize="large" style={{ color: red[500] }} />
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Scan;
