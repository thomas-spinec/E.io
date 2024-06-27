import React from 'react'

interface MessageComponentProps {
    message: { author: string; content: string };
    pseudo: string;
}

const MessageComponent: React.FC<MessageComponentProps> = ({message, pseudo}) => {
  return (
    <div>
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
    </div>
  )
}

export default MessageComponent;