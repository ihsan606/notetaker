import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import {
  tokyoNightStorm,
} from "@uiw/codemirror-theme-tokyo-night-storm";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <>
      <div className="card mt-1 border-2 border-gray-100 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-2">
            <input
              placeholder="Note Title"
              className="input input-lg w-full border-3 border-dashed border-sky-500 font-medium"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              type="text"
            />
          </h2>
          <CodeMirror
            theme={tokyoNightStorm}
            value={code}
            width="100%"
            height="30vh"
            minWidth="100%"
            minHeight="30vh"
            extensions={[langs.tsx()]}
            onChange={(value) => setCode(value)}
            className="border border-gray-300"
          />
        </div>
        <div className="card-actions justify-end">
          <button
            type="button"
            className="btn btn-primary mb-5 mx-8"
            onClick={() =>{
              onSave({ title, content: code });
              setCode("")
              setTitle("")
            }}
            disabled={title.trim().length === 0 && code.trim().length === 0}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
