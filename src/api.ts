import { db } from "./global";
import { collection, getDocs } from "firebase/firestore";
import { z } from "zod";


const DateSchema = z
  .object({ seconds: z.number(), nanoseconds: z.number() })
  .transform(({ seconds }) => {
    return new Date(seconds * 1000);
  });

type DateSchema = z.infer<typeof DateSchema>;


const NoteSchema = z.object({
  title: z.string(),
  body: z.string(),
  created: DateSchema,
});
type NoteSchema = z.infer<typeof NoteSchema>;

export type Note = NoteSchema;

export const getNotes = async () => {
  const notesSnapshot = await getDocs(collection(db, "notes"));
  const notes = notesSnapshot.docs.map((doc) => {
    return NoteSchema.parse(doc.data());
  });
  return notes;
};
