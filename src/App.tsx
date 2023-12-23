import useSWR from "swr";
import { getNotes } from "./api";
import { Stack, Typography } from "@mui/joy";
import { format } from "date-fns";

const fetcher = async () => {
  const notes = await getNotes();
  return notes;
};

// tile: [title] body: [body]
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
      {notes.map((note) => {
        return (
          <Stack spacing={0.1}>
            <Typography level="body-xs" alignItems={"Center"}>
              {format(note.created, "MMM d, yyyy HH:mm:ss")}
            </Typography>
            <Stack direction="column">
            <Typography level="h3">{note.title}</Typography>
            <img src={note.image()} alt="image"></img>
            </Stack>
            <Typography> {note.body} </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};
