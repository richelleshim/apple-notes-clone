import { Note } from "@mui/icons-material";
import { db } from "./global";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { z } from "zod";
import { useEffect, useState } from "react";
import { secondsInHour } from "date-fns/constants";

const DateSchema = z
  .object({ seconds: z.number(), nanoseconds: z.number() })
  .transform(({ seconds }) => {
    return new Date(seconds * 1000);
  });

type DateSchema = z.infer<typeof DateSchema>;

export const NoteSchema = z.object({
  title: z.string(),
  body: z.string(),
  created: DateSchema,
  image: z.string(),
  tags: z.array(z.string()),
  folder: z.optional(z.string()),
});

export type NoteSchema = z.infer<typeof NoteSchema>;

export type Note = NoteSchema & { id: string };

export const getNotes = async () => {
  const notesSnapshot = await getDocs(collection(db, "notes"));
  const notes = notesSnapshot.docs.map((doc) => {
    return NoteSchema.parse(doc.data());
  });
  return notes;
};

export const createNote = async (note: NoteSchema) => {
  await addDoc(collection(db, "notes"), note);
};

export const deleteNote = async (noteId: string) => {
  await deleteDoc(doc(db, "notes", noteId));
};
export const updateNote = async (noteId: string, note: NoteSchema) => {
  await updateDoc(doc(db, "notes", noteId), note);
};

export const useSubscribeNotes = () => {
  const [notes, setNotes] = useState<Note[] | null>(null);

  useEffect(() => {
    onSnapshot(collection(db, "notes"), (snapshot) => {
      const newNotes = snapshot.docs.map((doc) => {
        console.log(doc.id);
        const noIDNote = NoteSchema.parse(doc.data());
        const noteWithId: Note = {
          ...noIDNote,
          id: doc.id,
        };
        return noteWithId;
      });
      setNotes(newNotes);
    });
  }, []);

  return notes;
};

// export type Folder = FolderSchema;

// export const getFolder = async() => {
//   const folderSnapshot = await getDocs(collection(db, "folder"));
//   const folder = folderSnapshot.docs.map((doc) => {
//     return FolderSchema.parse(doc.data());
//   });
//   return folder;
// }

// export const createFolder = async (folder: Folder) => {
//   await addDoc(collection(db, "folder"), folder);
// };
