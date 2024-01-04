import { Stack, Button, Typography } from "@mui/joy";
import { format } from "date-fns";
import { Note, deleteNote, updateNote } from "../api";
import { TagChip } from "./TagChip";
import { useState } from "react";
import { CreateNoteForm } from "./CreateNoteForm";

type NoteDisplayProps = {
  note: Note;
};

export const NoteDisplay = ({ note,  }: NoteDisplayProps) => {
  const [editMode, setEditMode] = useState(false);
  if (editMode)
    return (
      <Stack spacing={0.1} width="100%">
        <Stack direction="row" justifyContent="end" spacing={1}>
          <Button
            color="primary"
            variant="soft"
            onClick={() => {
              setEditMode(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
        <CreateNoteForm
          initialNote={note}
          onSave={(editNote) => {
            {
              updateNote(note.id, editNote);
              setEditMode(false);
            }
          }}
        />
      </Stack>
    );

  return (
    <Stack spacing={0.1} width="100%">
      <Stack direction="row" justifyContent="end" spacing={1}>
        <Button
          color="primary"
          variant="soft"
          onClick={() => {
            setEditMode(true);
          }}
        >
          {" "}
          Edit{" "}
        </Button>
        <Button
          color="danger"
          onClick={() => {
            deleteNote(note.id);
          }}
        >
          Delete
        </Button>
      </Stack>
      <Typography level="body-xs" alignItems={"Center"}>
        {format(note.created, "MMM d, yyyy HH:mm:ss")}
      </Typography>
      <Stack direction="row" alignItems={"center"} spacing={1}>
        <Typography level="h3">{note.title}</Typography>
        {note.image && <img src={note.image} alt="image" width="20px" height="20px" />}
      </Stack>
      <Stack direction="row" spacing={0.5}>
        {note.tags.map((tag, tagIndex) => {
          return <TagChip key={tagIndex} tag={tag} />;
        })}
      </Stack>
      <Typography>{note.body}</Typography>
    </Stack>
  );
};
