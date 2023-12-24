import useSWR from "swr";
import { getNotes } from "./api";
import { Stack, Typography, Box, Chip, Checkbox } from "@mui/joy";
import { useState } from "react";
import { CheckBox } from "@mui/icons-material";

import { format } from "date-fns";

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

type TagChipProp = {
  tag: string;
};


// usestate color, initialize using randomcolorpicker
// never setColor
// [color, setColor]

const TagChip = ({ tag }: TagChipProp) => {
  const [variant, setVariant] = useState<"solid" | "soft">("soft");
  const [tagColor, setColor] = useState<"danger" | "primary" | "success">(randomColorPicker());

  const changeVariant = () => {
    setVariant(variant === "soft" ? "solid" : "soft");
  };


  return (
    <Chip
      // for onclick you need it
      // because you don't want to call change variant until after they click
      // oohh okok... wait but my screen is still blank ?
      onClick={() => changeVariant()}
      // over here
      // actually never mind it was right before LOL
      color={tagColor}
      // you can just use variatn here
      // this is why I was using the "primary" | "success" |
      // variant is a string, but not all strings are variants. so you need to specify that it can only be "solid" | "soft"
      // uh might go over this tmrw, but it works for now
      variant={variant}

      startDecorator = {variant === "solid" && (
         <CheckBox fontSize = "sm"/>
      )}
      // startDecorator = {(variant === "solid" ? {<CheckBox fontSize = "sm"/>} : no
    >
      {tag}
    </Chip>
  );
};

export const App = () => {
  const {
    data: notes,
    isLoading,
    isValidating,
  } = useSWR("notes", async () => {
    const notes = await getNotes();
    return notes;
  });

  if (notes === undefined) return null;
  return (
    <Stack spacing={3}>
      {notes.map((note, noteIndex) => {
        // you need a key here too :(
        // inside this stac k<FKL :DDSvFDJKNSL: SORRY SORRY POO
        // no errors now :)
        //yay !
        return (
          <Stack spacing={0.1} key={noteIndex}>
            <Typography level="body-xs" alignItems={"Center"}>
              {format(note.created, "MMM d, yyyy HH:mm:ss")}
            </Typography>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <Typography level="h3">{note.title}</Typography>
              {/* <Box border="1px solid black" borderRadius={5}>  */}
              <img src={note.image} alt="image" width="20px" height="20px" />
            </Stack>
            <Stack direction="row" spacing={0.5}>
              {note.tags.map((tag, tagIndex) => {
                // key goes inside the chip
                // ?
                return <TagChip key={tagIndex} tag={tag} />;
              })}
            </Stack>
            <Typography>{note.body}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

