import { Skeleton, Stack } from "@mui/material";
import React from "react";

function Skelly() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" sx={{ fontSize: "18px" }} animation="wave" />
      <Skeleton variant="text" sx={{ fontSize: "14px" }} animation="wave" />
      <div className="flex gap-3">
        <Skeleton variant="circular" width={40} height={40} animation="wave" />
        <div className="grid gap-1">
          <Skeleton
            variant="rectangular"
            width={90}
            height={15}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={60}
            height={10}
            animation="wave"
          />
        </div>
      </div>
    </Stack>
  );
}

export default function SkellyLoad() {
  return (
    <div className="grid gap-10">
      <Skelly />
      <Skelly />
      <Skelly />
      <Skelly />
      <Skelly />
    </div>
  );
}
