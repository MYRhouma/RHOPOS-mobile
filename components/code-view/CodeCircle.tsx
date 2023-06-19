import React from "react";
import { Circle } from "tamagui";

interface Props {
  buffer: string;
  index: number;
  isCorrect: boolean;
}

const CodeCircle = ({ buffer, index, isCorrect }: Props) => {
  return (
    <Circle
      animation="bouncy"
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
