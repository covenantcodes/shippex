import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface UpperLogoPartProps extends SvgProps {
  width?: number;
  height?: number;
  fill?: string;
}

const UpperLogoPart: React.FC<UpperLogoPartProps> = (props) => {
  return (
    <Svg
      width={props.width || 127}
      height={props.height || 102}
      viewBox="0 0 37 12"
      fill="none"
      {...props}
    >
      <Path
        d="M36.114 0c0 3.311-1.344 6.31-3.518 8.484a11.956 11.956 0 01-8.28 3.513H0L12.055 0h24.059z"
        fill={props.fill || "#2F50C1"}
      />
    </Svg>
  );
};

export default UpperLogoPart;
