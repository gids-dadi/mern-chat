import { useEffect } from "react";

export default function Chat() {
  useEffect(() => {
    new WebSocket("ws://localhost:5000");
  }, []);
  return (
    <div className="flex h-screen">
      <div className="bg-white w-1/3">contact</div>
      <div className="bg-blue-50 w-2/3 p-2 flex flex-col justify-between">
        <div>messages</div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message here"
            className="bg-white border p-2 flex-grow rounded-sm"
          />
          <button className="bg-blue-500 p-2 text-white rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
