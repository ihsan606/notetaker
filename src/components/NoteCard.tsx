import { useState } from "react";
import { RouterOutputs } from "~/utils/api";
import ReactMarkdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";
import { langs, loadLanguage } from "@uiw/codemirror-extensions-langs";
import {
  tokyoNightStorm,
} from "@uiw/codemirror-theme-tokyo-night-storm";
type Note = RouterOutputs["note"]["getAll"][0];
export const NoteCard = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => void;
}) => {
  const [isExpended, setExpended] = useState<boolean>(true);

  return (
    <>
      <div className="border-3 card my-2 border border-gray-200">
        <div className="card-body">
          <div
            className={`collapse-arrow ${
              isExpended ? "collapse-open" : ""
            } collapse`}
            onClick={() => setExpended(!isExpended)}
          >
            <div className="font-semi collapse-title text-xl">{note.title}</div>
            <div className="collapse-content">
              <article className="prose lg:prose-xl">
                <CodeMirror
                  theme={tokyoNightStorm}
                  value={note.content}
                  width="100%"
                  height="30vh"
                  minWidth="100%"
                  minHeight="30vh"
                  className="border border-gray-300"
                />
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
