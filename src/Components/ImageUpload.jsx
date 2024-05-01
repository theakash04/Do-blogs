import React, { forwardRef, useId } from "react";
import { styled, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisualHiddenInputBox = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "insert(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ImageUPload = forwardRef(function ImageUpload({ ...props }, ref) {

  const id = useId();
  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant=""
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{ border: "1.4px solid gray", padding: "10px 20px" }}
        ref={ref}
        {...props}
        id={id}
      >
        Add a cover image
        <VisualHiddenInputBox type="file" />
      </Button>
    </>
  );
});

export default ImageUPload