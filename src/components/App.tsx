import { EditNote } from "@mui/icons-material";
import { Stack, Button } from "@mui/joy";
import { useState, useEffect, useMemo } from "react";
import { Note, createNote, useSubscribeNotes } from "../api.ts";
import { filterUndefined, sortBy } from "../utils/array.ts";
import { CreateNoteForm } from "./CreateNoteForm.tsx";
import { NoteDisplay } from "./NoteDisplay.tsx";

const getFoldersFromNotes = (notes: Note[]) => {
  const folders = filterUndefined(
    notes.map((note) => {
      return note.folder;
    })
  );

  const sortedFolders = sortBy(folders, (folder) => {
    return folder;
  });

  const folderSet = new Set(sortedFolders);

  return [...folderSet.values()];
};

export const App = () => {
  const notes = useSubscribeNotes();

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const shownNotes = useMemo(() => {
    if (notes === null) return null;

    const sortedNotes = sortBy(
      notes,
      (note) => {
        return note.created;
      },
      { reverse: true }
    );

    return sortedNotes.filter(
      (note) => (note.folder ?? null) === selectedFolder
    );
  }, [notes, selectedFolder]);

  useEffect(() => {
    if (shownNotes === null) return;

    if (shownNotes.length === 0) {
       setSelectedFolder(null)
       return
    }

    const existingNote =
      selectedNote === null
        ? null
        : shownNotes.find((note) => note.id === selectedNote.id);

    const newSelectedNote =
      existingNote === null || existingNote === undefined
        ? shownNotes[0]
        : existingNote;

    setSelectedNote(newSelectedNote);
  }, [shownNotes]);

  if (shownNotes === null || notes === null) return null;

  const folderOptions = getFoldersFromNotes(notes);

  return (
    <Stack direction="row" spacing={3}>
      <Stack spacing={2}>
        <Button
          variant={selectedFolder === null ? "outlined" : "soft"}
          onClick={() => {
            setSelectedFolder(null);
            setIsCreatingNote(false);
          }}
        >
          Notes
        </Button>
        {folderOptions.map((folder) => {
          return (
            <Button
              variant={selectedFolder === folder ? "outlined" : "soft"}
              onClick={() => {
                setSelectedFolder(folder);
                setIsCreatingNote(false);
              }}
            >
              {folder}
            </Button>
          );
        })}
      </Stack>
      <Stack spacing={2}>
        <Button
          variant="soft"
          onClick={() => {
            setIsCreatingNote(true);
          }}
        >
          <EditNote />
        </Button>
        {shownNotes.map((note) => {
          return (
            <Button
              variant="soft"
              onClick={() => {
                setSelectedNote(note);
                setIsCreatingNote(false);
              }}
            >
              {note.title}
            </Button>
          );
        })}
      </Stack>
      {isCreatingNote ? (
        <CreateNoteForm
          initialNote={{
            title: "",
            body: "",
            created: new Date(),
            image: "",
            tags: [],
            folder: selectedFolder ?? undefined,
          }}
          onSave={(editNote) => {
            createNote(editNote);
            setIsCreatingNote(false);
          }}
        />
      ) : (
        selectedNote && <NoteDisplay note={selectedNote} />
      )}
    </Stack>
  );
};
