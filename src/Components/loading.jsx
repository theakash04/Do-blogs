import React from "react";
import "ldrs/trefoil";

function Loading() {
  return (
    <div
      className="w-screen h-screen flex absolute bg-black/30 backdrop-blur-sm items-center justify-center"
      style={{ zIndex: "100" }}
    >
      <l-trefoil
        size="60"
        speed="1.5"
        color="blue"
        stroke={4}
        stroke-length={0.15}
        bg-opacity={0.1}
      ></l-trefoil>
    </div>
  );
}

export default Loading;
