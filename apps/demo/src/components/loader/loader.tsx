import {
  Box,
  CircularProgress,
  type CircularProgressProps,
} from "@mui/material";
import { type FC } from "react";

const CONTAINER_SX = {
  display: "grid",
  placeContent: "center",
  width: "100%",
  height: "100%",
} as const;

type LoaderProps = {
  /**
   * CircularProgress size in pixels.
   */
  size?: number;
  /**
   * CircularProgress color (uses MUI CircularProgress color prop)
   */
  color?: CircularProgressProps["color"];
  /**
   * Accessible label
   */
  ariaLabel?: string;
};

/**
 * Display a progress spinner for at a specified time period.
 *
 * @param {LoaderProps} options Loader options
 *  minDuration: How many milliseconds to at least show the loader for.
 */
const Loader: FC<LoaderProps> = ({
  size = 90,
  color = "primary",
  ariaLabel = "Loading",
}) => {
  return (
    <Box
      sx={CONTAINER_SX}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={ariaLabel}
    >
      <CircularProgress color={color} size={size} />
    </Box>
  );
};

export default Loader;
