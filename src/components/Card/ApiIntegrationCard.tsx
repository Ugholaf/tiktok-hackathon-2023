import { useState } from 'react';

const ApiIntegrationCard = () => {

const [generatedAPI, setGeneratedAPI] = useState('');

const handleButtonClick = () => {
    // Generate the API
    const generatedAPI = generateAPI();
    // Set the generated API to the state
    setGeneratedAPI(generatedAPI);
};
const handleCopyClick = () => {
    // Copy the API key to clipboard
    navigator.clipboard.writeText(generatedAPI);
  };
  
const generateAPI = () => {
    // Implement your logic to generate the API here
    // Return the generated API
    return 'Generated API';
};

  return (
    <div className="flex flex-col rounded-xl py-6 px-6 md:px-11 my-6 gap-8 self-stretch items-center w-full shadow-md bg-white">
        <div className="flex flex-col items-center gap-2 justify-start"> {/*Header Text Class*/}
        <p className="text-2xl font-bold border-b-2 border-red-500">Business Tools</p>
        </div>

        <div className="flex flex-col items-start gap-1/8 self-stretch"> {/*Paragraph Text Class items-start means align to left*/}
            <p className="text-base font-bold text-left">Get started with TMoney APIs</p>
            <p className="text-base text-left">TMoney APIs use REST, authenticate with OAuth 2.0 access tokens, 
            and return HTTP response codes and responses encoded in JSON. </p>
        </div>

        <div className="flex flex-col items-start gap-1/8 self-stretch"> {/*Paragraph Text Class items-start means align to left*/}
            <p className="text-base font-bold text-left">Generate SECRET API</p>
            <p className="text-base text-left">Do not share this API with anyone, it is tied to your business account. </p>
            <div className="flex flex-row items-center gap-2 py-3 self-stretch">
                <button onClick={handleButtonClick} className="bg-red-600 text-white px-4 py-2 rounded">Generate API</button>
                <div className="bg-gray-100 p-4 py-2 rounded flex-grow flex items-center justify-between">
                    <input type="text" value={generatedAPI} readOnly className="w-full bg-transparent border-none" />
                    <span onClick={handleCopyClick} className="text-gray-600 cursor-pointer">&#128203;</span>
                </div>
            </div>
        </div>

        <div className="flex flex-col items-start gap-1/8 self-stretch"> {/*Paragraph Text Class items-start means align to left*/}
            <p className="text-base font-bold text-left">How to use the API</p>
            <p className="text-base text-left">Step 1: Add API Key to header file </p>
            <p className="text-base text-left">Step 2: add payment amount and currency </p>
            <p className="text-base text-left">Step 3: Send request</p>
        </div>


    </div>
  )
}
export default ApiIntegrationCard