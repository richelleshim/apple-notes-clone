import useSWR from "swr";
import {
  getNotes,
  Note,
  createNote,
  Folder,
  getFolder,
  createFolder,
} from "./api";
import {
  Stack,
  Typography,
  Box,
  Chip,
  Checkbox,
  Button,
  Input,
  Textarea,
} from "@mui/joy";
import { useEffect, useState } from "react";
import {
  CheckBox,
  NoteAdd,
  EditNote,
  CreateNewFolder,
} from "@mui/icons-material";
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

// read note ✅

// next up:
// subscription SKIP
// select note editing ✅
// create new notes

// delete notes
// update notes

const x = [1, 2];

// const newNote = {
//   ...editNote,
//   tags: v
// }
//make it sorted by create Date ✅
//tags have new tagUpdate box....

// folders

const TagChip = ({ tag }: TagChipProp) => {
  const [variant, setVariant] = useState<"solid" | "soft">("soft");
  const [tagColor, setColor] = useState<"danger" | "primary" | "success">(
    randomColorPicker()
  );

  const changeVariant = () => {
    setVariant(variant === "soft" ? "solid" : "soft");
  };

  return (
    <Chip
      // for onclick you need it
      // because you don't want to call
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
      startDecorator={variant === "solid" && <CheckBox fontSize="sm" />}
      // startDecorator = {(variant === "solid" ? {<CheckBox fontSize = "sm"/>} : no
    >
      {tag}
    </Chip>
  );
};

export const App = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editNote, setEditNote] = useState<Note | null>(null);
  const [editTag, setEditTag] = useState<string>("");

  // const [selectedFolder, setSelectedFolder] = useState("Notes");
  // const [editFolder, setEditFolder] = useState<Folder | null>(null);

  const {
    data: notes,
    isLoading,
    isValidating,
    mutate,
  } = useSWR("notes", async () => {
    const notes = await getNotes();
    return notes;
  });

  // const {
  //   data: folder,
  // } = useSWR("folder", async () => {
  //   const folder = await getFolder();
  //   return folder;
  // });

  // when notes goes from undefined to array of notes
  // then we want to set selectedNote to the first note in the array
  useEffect(() => {
    if (notes)
      // typeguard
      setSelectedNote(notes[0]);
  }, [notes]);

  // useEffect(() => {
  //   if (tags)
  //     setEditTag()
  // })

  // you need a key here too :e(
  // inside this stac k<FKL :DDSvFDJKNSL: SORRY SORRY POO
  // no errors now :)
  // yay !

  return (
    <Stack direction="row" spacing={3}>
      {
      /* <Stack>
          <Button
            variant="soft"
            onClick={(() => {
              const newFolder: folder = {
              name: "",
              notes: [], 
              };
              setEditFolder(newFolder);
            })}> <CreateNewFolder/>
           </Button>
        </Stack>
        */
      }

      <Stack spacing={1}>
        <Button
          variant="soft"
          onClick={() => {
            const newNote: Note = {
              title: "",
              body: "",
              created: new Date(),
              image:
                "https://i.pinimg.com/736x/99/51/a8/9951a87de4d75916aeab4abf0817754d.jpg",
              tags: [],
            };
            setEditNote(newNote);
          }}
        >
          <EditNote />
        </Button>
        {notes &&
          notes.sort((a, b) => b.created.getTime() - a.created.getTime()) && //stack overflow...
          notes.map((note) => {
            return (
              <Button
                variant="soft"
                onClick={() => {
                  setSelectedNote(note);
                  setEditTag("");
                  setEditNote(null);
                }}
              >
                {note.title}
              </Button>
            );
          })}
      </Stack>
      {editNote ? (
        <Stack spacing={0.5}>
          <Input
            value={editNote.title}
            size="lg"
            onChange={(event) => {
              const text = event.target.value;
              const newEditNote: Note = {
                ...editNote,
                title: text,
              };
              setEditNote(newEditNote);
            }}
          />
          <Textarea
            value={editNote.body}
            minRows={4}
            onChange={(event) => {
              const text = event.target.value;
              const newEditNote: Note = {
                ...editNote,
                body: text,
              };
              setEditNote(newEditNote);
            }}
          />

          <Stack direction="row" spacing={2}>
            <Input>
              <Textarea
                value={editNote.tags}
                onChange={(event) => {
                  const newTag = event.target.value;
                  const newEditNote: Note = {
                    ...editNote,
                    tags: [newTag, ...editNote.tags],
                  };
                  setEditTag(newEditNote.tags[0]);
                }}
              />
            </Input>
            <Button
              variant="soft"
              onClick={() => {
              
                //   const newEditNote: Note = {
                //     ...editNote,
                //     tags: [newTag, ...editNote.tags],
                //   };
                //   setEditTag(newEditNote.tags[0]);
                // }
                // setEditNote(newEditNote);
                setEditTag("");
              }}
            >
              +tag
            </Button>
          </Stack>

          <Button
            onClick={async () => {
              await createNote(editNote), await mutate();
              setEditNote(null);
            }}
          >
            Save
          </Button>
        </Stack>
      ) : (
        selectedNote && (
          <Stack spacing={0.1}>
            <Typography level="body-xs" alignItems={"Center"}>
              {format(selectedNote.created, "MMM d, yyyy HH:mm:ss")}
            </Typography>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <Typography level="h3">{selectedNote.title}</Typography>
              {/* <Box border="1px solid black" borderRadius={5}>  */}
              <img
                src={selectedNote.image}
                alt="image"
                width="20px"
                height="20px"
              />
            </Stack>
            <Stack direction="row" spacing={0.5}>
              {selectedNote.tags.map((tag, tagIndex) => {
                // key goes inside the chip
                // ?
                return <TagChip key={tagIndex} tag={tag} />;
              })}
            </Stack>
            <Typography>{selectedNote.body}</Typography>
          </Stack>
        )
      )}
    </Stack>
  );
};

/*

stuff that i don't like... 
  all the cells change when i click it...
  every time i click, the cells change colors again 

/*
CHAT LOG ------------------
are you giving yourself more extra credit lmao 
LMAO i just want it to look pretty !! :')
ok sg hf ✨
✨✨✨✨✨✨✨✨ tyty !! also... very very VERY appreciated the twinkles !!!!!! ✨✨✨✨✨✨✨✨ 
lol
you can do multiline comments :) ☝️🤓 so no more double dash
stfu ☝️🤓
LMASFK

also here's some cool themes you can try: https://medium.com/quick-code/the-best-vs-code-themes-2022-9e9b648c4596
we never need messenger again
LMAO
and no deleting for u HHQHAHHAHAHAHAH
OOPS 
victor... where am i going wrong... nothing's showing up :'(

you are doing a map but forgetting the key :)
oh agh
clicking works now! woohoo
*/

// ??
// we'll go over it tmrw :)
// it should work now

// oh you need to make sure hooks are inside the react component
// so its complaining because this hook is outsie of the App
// ah okie !!

/*
       .''.      .        *''*    :_\/_:     . 
      :_\/_:   _\(/_  .:.*_\/_*   : /\ :  .'.:.'.
  .''.: /\ :   ./)\   ':'* /\ * :  '..'.  -=:o:=-
 :_\/_:'.:::.    ' *''*    * '.\'/.' _\(/_'.':'.'
 : /\ : :::::     *_\/_*     -= o =-  /)\    '  *
  '..'  ':::'     * /\ *     .'/.\'.   '
      *            *..*         :
jgs     *
        *

                        _,.------....___,.' ',.-.
                     ,-'          _,.--"        |
                   ,'         _.-'              .
                  /   ,     ,'                   `
                 .   /     /                     ``.
                 |  |     .                       \.\
       ____      |___._.  |       __               \ `.
     .'    `---""       ``"-.--"'`  \               .  \
    .  ,            __               `              |   .
    `,'         ,-"'  .               \             |    L
   ,'          '    _.'                -._          /    |
  ,`-.    ,".   `--'                      >.      ,'     |
 . .'\'   `-'       __    ,  ,-.         /  `.__.-      ,'
 ||:, .           ,'  ;  /  / \ `        `.    .      .'/
 j|:D  \          `--'  ' ,'_  . .         `.__, \   , /
/ L:_  |                 .  "' :_;                `.'.'
.    ""'                  """""'                    V
 `.                                 .    `.   _,..  `
   `,_   .    .                _,-'/    .. `,'   __  `
    ) \`._        ___....----"'  ,'   .'  \ |   '  \  .
   /   `. "`-.--"'         _,' ,'     `---' |    `./  |
  .   _  `""'--.._____..--"   ,             '         |
  | ." `. `-.                /-.           /          ,
  | `._.'    `,_            ;  /         ,'          .
 .'          /| `-.        . ,'         ,           ,
 '-.__ __ _,','    '`-..___;-...__   ,.'\ ____.___.'

        WOAH WOAH WOAH WOAH 
       real vscode pet to keep you company :)
       i'm amazed and blown away
       bulbasaur's the only pokemon i know other than pikachu LMAO
       btw I drew that of course :^)
       
       HAHA... wait rlly ?
       ofc not stupid

       ADNAD OOPSIES... i never underestimate any of your coding / computer skills 
       
       
        nopenopnoenopnoennopenonopenoep bybybyybyeybyeybyeybeybyebyeybeybyebyey
        bruinbot is up again! and it shouldn't crash any more :^)

        WHAT ! SLAY ! the power of victor lin and his  🛷🛷🛷🛷🛷🛷🛷🛷🛷🛷🛷c🛷🛷🛷omputer !! >>>>>> 
        this is way more fun than imessage lol ☝️🤓
        are you satisfied or you got more improvements✨✨✨
          when i click on it... it's changing the variant of ALL of the chips not just that one 
          so i think i just want to change it to change the singular chip 
          ooh that's a tough one. You'll need to make a separate component for the chip. And that component will need its own useState, so that every chip has its own variant state.1
          we can also just do this tmrw if you can't figure it out
          but feel free to try
          will be very impressed

          ah OKOK !!!! this is so fun though !!  will do !! 💪💪💪
        i agree LMAO 

        wait install this thing. literally make it messenger 
        https://marketplace.visualstudio.com/items?itemName=bierner.emojisense

        then you can do cmd + i
        and pick an emoji! 🥳🥳🥳🥳
        😲
        WHAT WOAH 
        IMPRESSED MIND BLOWN 🤯
        THIS IS COOL 

        ok I'm going to go do other stuff now, but feel free to message
        gl!

        THANK YOUU !!! 🫶🫶🫶
        💖
🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯
now i just have to get it to only change THAT chip when i click ! 
  */
