import { CheckBox } from "@mui/icons-material";
import { Chip } from "@mui/joy";
import { useState } from "react";

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomColorPicker = () => {
  const color: ("danger" | "primary" | "success")[] = [
    "danger",
    "primary",
    "success",
  ];
  const index = randomInteger(0, 2);
  return color[index];
};

export type TagChipProp = {
  tag: string;
};

export const TagChip = ({ tag }: TagChipProp) => {
  const [variant, setVariant] = useState<"solid" | "soft">("soft");
  const [tagColor] = useState<"danger" | "primary" | "success">(
    randomColorPicker()
  );

  const changeVariant = () => {
    setVariant(variant === "soft" ? "solid" : "soft");
  };

  return (
    <Chip
      onClick={() => changeVariant()}
      color={tagColor}
      variant={variant}
      startDecorator={variant === "solid" && <CheckBox fontSize="small" />}
    >
      {tag}
    </Chip>
  );
};
