import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

interface MessageComponentProps {
  message: { author: string; content: string };
}

const MessageComponent: React.FC<MessageComponentProps> = ({
  message,
}) => {

  const { user } = useContext(UserContext);

  return (
    /*   <div>
        {message.author === pseudo ? (
            <p style={{ textAlign: "right" }}>{message.content}</p>
        ) : (
            <p style={{ textAlign: "left" }}>{
                message.author ? (
                    <>{message.author} : {message.content}</>
                ) : (
                    <>{message.content}</>
                )
            
            }</p>
        )}
    </div> */

    <div className="flex items-start justify-end gap-2.5">
      <img
        className="w-8 h-8 rounded-full object-fill"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Jese image"
      />
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        {message.author === user?.username ? (
          <>
            <div className="flex items-center justify-end space-x-2 ">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {message.author}
              </span>
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              {message.content}
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {message.author}
              </span>
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              {message.content}
            </p>
          </>
        )}
      </div>

      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        data-dropdown-placement="bottom-start"
        className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
    </div>
  );
};

export default MessageComponent;
