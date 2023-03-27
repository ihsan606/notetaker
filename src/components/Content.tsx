import { useSession } from "next-auth/react";
import { useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import { NoteEditor } from "./NoteEditor";
import { NoteCard } from "./NoteCard";

type Topic = RouterOutputs["topic"]["getAll"][0];
type Note = RouterOutputs["note"]["getAll"][0];

const Content = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const { data: sessionData } = useSession();
  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  return (
    <>
     <div className="alert alert-warning shadow-lg w-80 absolute right-0 z-30 mt-5">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Buat dulu topik catatan kamu hehe</span>
        </div>
      </div>
      <ul className="menu rounded-box menu-horizontal mx-5 mt-5 gap-4 bg-base-100 p-2">
        {topics?.map((topic) => (
          <li key={topic.id}>
            <a
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                setSelectedTopic(topic);
                console.log(selectedTopic);
              }}
            >
              {topic.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="divider">Create Your Notes Here</div>
      <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
        <div className="px-2">
          <input
            type="text"
            placeholder="Type here"
            className="input-bordered input w-full max-w-xs"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createTopic.mutate({
                  title: e.currentTarget.value,
                });
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
        <div className="col-span-3">
          <NoteEditor
            onSave={({ title, content }) => {
              void createNote.mutate({
                title,
                content,
                topicId: selectedTopic?.id ?? "",
              });
            }}
          />

          <div>
            {notes?.map((note: Note) => (
              <div key={note.id} className="mt-4">
                <NoteCard
                  note={note}
                  key={note.id}
                  onDelete={() => void deleteNote.mutate({ id: note.id })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
