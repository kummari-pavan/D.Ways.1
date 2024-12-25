// import React, { useState } from 'react';

// const ChatbotUI = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');
//     const [generatedImage, setGeneratedImage] = useState('');

//     const sendMessage = async () => {
//         if (!input.trim()) return; // Prevent sending empty messages

//         const userMessage = { text: input, sender: 'user' };
//         setMessages([...messages, userMessage]);

//         try {
//             const response = await fetch('http://localhost:5000/api/shop/generate-image', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ prompt: input }),
//             });
//             const data = await response.json();
//             const botMessage = { text: 'Image generated!', sender: 'bot' };
//             setMessages([...messages, userMessage, botMessage]);
//             setGeneratedImage(data.image); // Assuming `data.image` contains the image URL
//             // <img src="data:image/jpeg;base64, <base64-encoded-data>" />
//         } catch (error) {
//             setMessages([...messages, userMessage, { text: 'Error generating image', sender: 'bot' }]);
//         }
//         setInput('');
//     };

//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Left Section: Image Display */}
//             <div className="w-1/2 flex justify-center items-center bg-gray-200 border-r">
//                 {generatedImage ? (
//                     <img src={generatedImage} alt="Generated" className="max-w-full max-h-full rounded-lg shadow-lg" />
//                 ) : (
//                     <div className="text-gray-500 text-center">
//                         <p className="text-lg">Your generated image will appear here</p>
//                     </div>
//                 )}
//             </div>

//             {/* Right Section: Chatbot */}
//             <div className="w-1/2 flex flex-col">
//                 {/* Chat Messages */}
//                 <div className="flex-grow overflow-y-auto p-6 bg-white">
//                     <div className="space-y-4">
//                         {messages.map((msg, index) => (
//                             <div
//                                 key={index}
//                                 className={`p-3 rounded-lg ${
//                                     msg.sender === 'user'
//                                         ? 'bg-black text-white self-end'
//                                         : 'bg-gray-200 text-gray-700 self-start'
//                                 }`}
//                             >
//                                 {msg.text}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Input Section */}
//                 <div className="p-4 bg-gray-100 border-t sticky bottom-0">
//                     <div className="flex">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         placeholder="Enter your customization request..."
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                                 sendMessage();
//                             }
//                         }}
//                         className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
//                     />
//                         <button
//                             onClick={sendMessage}
//                             className="ml-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
//                         >
//                             Send
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatbotUI;

import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa'; // You need to install react-icons


const ChatbotUI = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return; // Prevent sending empty messages

        const userMessage = { text: input, sender: 'user' };
        setMessages([...messages, userMessage]);

        try {
            const response = await fetch('http://localhost:5000/api/shop/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input }),
            });
            const data = await response.json();

            const botMessage = { text: 'Image generated!', sender: 'bot' };
            setMessages([...messages, userMessage, botMessage]);

            // Assuming data.image contains the base64 image string
            setGeneratedImage(`data:image/png;base64,${data.image}`); // Update with base64 format
        } catch (error) {
            setMessages([...messages, userMessage, { text: 'Error generating image', sender: 'bot' }]);
        }
        setInput('');
    };

    const downloadImage = () => {
        // Create a temporary link to download the base64 image
        const link = document.createElement('a');
        link.href = generatedImage; // The base64 image
        link.download = 'generated_image.png'; // Name of the image file
        link.click(); // Trigger the download
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Section: Image Display */}
            <div className="w-1/2 flex justify-center items-center bg-gray-200 border-r">
                {generatedImage ? (
                    <div className="relative w-80 h-80">
                        <img
                            src={generatedImage}
                            alt="Generated"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                        {/* Download Icon Overlay */}
                        <button
                            onClick={downloadImage}
                            className="absolute top-2 right-2 p-2 bg-black text-white rounded-full hover:bg-gray-800"
                        >
                            <FaDownload size={24} />
                        </button>
                    </div>
                ) : (
                    <div className="text-gray-500 text-center">
                        <p className="text-lg">Your generated image will appear here</p>
                    </div>
                )}
            </div>

            {/* Right Section: Chatbot */}
            <div className="w-1/2 flex flex-col">
                {/* Chat Messages */}
                <div className="flex-grow overflow-y-auto p-6 bg-white">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg ${
                                    msg.sender === 'user'
                                        ? 'bg-black text-white self-end'
                                        : 'bg-gray-200 text-gray-700 self-start'
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Input Section */}
                <div className="p-4 bg-gray-100 border-t sticy bottom-0 mb-16">
                    <div className="flex ">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter your customization request..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    sendMessage();
                                }
                            }}
                            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                        />
                        <button
                            onClick={sendMessage}
                            className="ml-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotUI;
