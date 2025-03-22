"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { createNewDm } from './utils';
import { useRouter } from 'next/navigation';

interface CreateNewChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateNewChat = ({ isOpen, onClose }: CreateNewChatProps) => {
  const [chatTitle, setChatTitle] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatTitle(e.target.value);
  };
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log('Chat Title:', chatTitle);
    await createNewDm(chatTitle)

    setChatTitle('');

    onClose();
    router.refresh()
    
  };

  if (!isOpen) return null;

  return (
    <>
       <div className="fixed inset-0 bg-transparent z-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-semibold text-center mb-4">Create a New Chat</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="chat-title"
                className="block text-lg font-medium text-gray-700"
              >
                Chat Title:
              </label>
              <input
                type="text"
                id="chat-title"
                name="chat-title"
                value={chatTitle}
                onChange={handleInputChange}
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Create Chat
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 focus:outline-none"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewChat;
