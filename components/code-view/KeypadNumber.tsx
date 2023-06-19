import React from "react";
import { Button, H3 } from "tamagui";

interface Props {
  content: string;
  onPress: () => void;
}

const KeypadNumber = ({ content, onPress }: Props) => {
  return (
    <Button
      themeInverse
      style={{
        width: 80,
        height: 80,
      }}
      onPress={onPress}
    >
      <H3>{content}</H3>
    </Button>
  );
};

export default KeypadNumber;
