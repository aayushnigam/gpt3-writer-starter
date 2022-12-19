import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer </title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Get Direct Advice from Elon Musk: Unlock the Secrets of Success from the World's Most Innovative Entrepreneur</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write anything you wanna discuss with Elon Musk .Tap into the Mind of Elon Musk: Learn How to Achieve Success from the Visionary Entrepreneur </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="Hey! Elon Musk this side.Ask me ?" className="prompt-box" value={userInput} onChange={onUserChangedText} />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"

          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
          </div>*/}
    </div> 
  );
};

const firebaseConfig = {
  apiKey: "AIzaSyAyyoVFlNM73l5z5z85790KS5i8tQtG_Kc",
  authDomain: "chat-with-elon.firebaseapp.com",
  projectId: "chat-with-elon",
  storageBucket: "chat-with-elon.appspot.com",
  messagingSenderId: "898675009182",
  appId: "1:898675009182:web:539edf8d478f6c07e33d8f",
  measurementId: "G-PF0KVQV9RJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default Home;
