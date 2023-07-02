import React from "react";
import { Circle } from "tamagui";

interface Props {
  buffer: string;
  index: number;
  isIncorrect: boolean;
}

const CodeCircle = ({ buffer, index, isIncorrect }: Props) => {
  return (
    <Circle
      animation="quick"
      size="$1"
      style={{
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: buffer.length >= index ? "black" : "white",
      }}
      elevation={4}
    />
  );
};

export default CodeCircle;
