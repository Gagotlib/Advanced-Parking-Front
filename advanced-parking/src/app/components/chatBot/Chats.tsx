import React, { useState, useEffect, useRef } from 'react';

interface Props {
  userResponse: string;
  botResponse: {
    purpose: string;
    message: string;
    options?: string[];
    sender: string;
  };
  sendUserResponse: string;
  optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface MessagesInfo {
  purpose?: string;
  message: string;
  options?: string[];
  sender: string;
}

const Chats: React.FC<Props> = ({ userResponse, botResponse, sendUserResponse, optionClick }) => {
  const [messages, setMessages] = useState<MessagesInfo[]>([]);
  const dummyRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // stacking up messages
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          purpose: "introduction",
          message:
            "Hi there. If you're here, that means you're someone that likes anticipate to parking finding related problems. We are like you. Tell me, what's your name?",
          sender: "bot"
        }
      ]);
    } else {
      let tempArray = [...messages];
      tempArray.push({ message: sendUserResponse, sender: "user" });
      setMessages(tempArray);

      setTimeout(() => {
        let temp2 = [...tempArray];
        temp2.push(botResponse);
        setMessages(temp2);
      }, 1000);
    }
  }, [sendUserResponse, botResponse]);

  // enable autoscroll after each message
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({
        top: bodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  return (
		<div ref={bodyRef} className='flex-1 overflow-y-auto max-h-90'>
			{messages.map((chat, index) => (
				<div key={index} className={`flex flex-col items-${chat.sender === 'user' ? 'end' : 'start'} mb-2`}>
					<div className={`p-2 max-w-md mx-2 ${chat.sender === 'user' ? 'bg-blue-300 rounded-lg self-end text-black' : 'bg-gray-300 rounded-lg self-start text-black'}`}>
						<p>{chat.message}</p>
					</div>
					{chat.options && (
						<div className='flex flex-col mt-2'>
							{chat.options.map((option) => (
								<p onClick={optionClick} data-id={option} key={option} className={`p-2 border rounded-md border-gray-400 cursor-pointer bg-gray-100 text-gray-900`}>
									{option}
								</p>
							))}
						</div>
					)}
				</div>
			))}
			<div ref={dummyRef}></div>
		</div>
	)
};

export default Chats;
