import { Stack, Input, Textarea, Button, Box } from "@mui/joy";
import { NoteSchema } from "../api";
import { TagChip } from "./TagChip";
import { useState } from "react";

type CreateNoteFormProp = {
  //put a question mark if it's existence is questionable
  //to be or to not be -victorlin
  initialNote: NoteSchema;
  onSave: (editNote: NoteSchema) => void;
};

export const CreateNoteForm = ({ onSave, initialNote }: CreateNoteFormProp) => {
  const [editNote, setEditNote] = useState<NoteSchema>(initialNote);
  const [editTag, setEditTag] = useState<string>("");

  return (
    <Box>
      <Stack spacing={0.5} pt={5}>
        <Input
          value={editNote.folder}
          placeholder="Folder"
          size="sm"
          onChange={(event) => {
            const {value} = event.target
            const folder = value === "" ? undefined : value;
            
            const newEditNote = {
              ...editNote,
              folder,
            };

            setEditNote(newEditNote);
          }}
        />
        <Stack direction="row" spacing={0.5}>
          <Input
            placeholder="Title"
            value={editNote.title}
            size="lg"
            onChange={(event) => {
              const text = event.target.value;
              const newEditNote = {
                ...editNote,
                title: text,
              };
              setEditNote(newEditNote);
            }}
          />
          <Input
            value={editNote.image}
            placeholder="URL"
            size="sm"
            onChange={(event) => {
              const url = event.target.value;
              const newEditNote = {
                ...editNote,
                image: url,
              };
              setEditNote(newEditNote);
            }}
          />
        </Stack>

        <Textarea
          value={editNote.body}
          placeholder="Text"
          minRows={4}
          onChange={(event) => {
            const text = event.target.value;
            const newEditNote = {
              ...editNote,
              body: text,
            };
            setEditNote(newEditNote);
          }}
        />
        <Stack direction="row" spacing={2}>
          {editNote.tags.map((tag, tagIndex) => {
            return <TagChip key={tagIndex} tag={tag} />;
          })}
          <Input
            placeholder="tags"
            value={editTag}
            onChange={(event) => {
              const newEditTag = event.target.value;
              setEditTag(newEditTag);
            }}
          />
          <Button
            variant="soft"
            onClick={() => {
              const newEditNote = {
                ...editNote,
                tags: [...editNote.tags, editTag],
              };
              setEditNote(newEditNote);
              setEditTag("");
            }}
          >
            +tag
          </Button>
        </Stack>
        <Button
          onClick={() => {
            onSave(editNote);
          }}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};
