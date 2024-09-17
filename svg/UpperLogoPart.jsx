import * as React from "react";
import Svg, { Path } from "react-native-svg";

function UpperLogoPart(props) {
  return (
    <Svg
      width={127}
      height={102}
      viewBox="0 0 37 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M36.114 0c0 3.311-1.344 6.31-3.518 8.484a11.956 11.956 0 01-8.28 3.513H0L12.055 0h24.059z"
        fill="#2F50C1"
      />
    </Svg>
  );
}

export default UpperLogoPart;
