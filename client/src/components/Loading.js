import { Grid } from "@material-ui/core";
import Lottie from "react-lottie";
import loadingAnimation from "../animations/loading.json";

import LogoHeader from "./LogoHeader";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Grid
      container
      direction="column"
      height="100%"
      alignItems="center"
      spacing={4}
    >
      <Grid item>
        <LogoHeader />
      </Grid>
      <Grid item style={{ marginTop: "2em" }}>
        <Lottie options={defaultOptions} width={300} height={200} />
      </Grid>
    </Grid>
  );
};

export default Loading;
