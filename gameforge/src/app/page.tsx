// GameForge (c) 2024 Andrew Woo
// License: MIT

import Suggestion from "./components/suggestion";
import TriTravelers from "./components/tritravelers";

// import css
import "./css/fonts.css";
import "./css/tritravelers.css";

export default function Home() {
  return (
    <main className="bg-black h-screen">
      <div className="relative overflow-hidden h-full">
        <TriTravelers />
        <p className="relative bops-one text-4xl m-4">GameForge</p>
        <div className="relative flex flex-col items-center justify-center">
          <p className="bops-one text-2xl mt-20 mb-10">
            Create a game...
          </p>
        </div>

        <div className="relative flex justify-around">
          <Suggestion section="Genre" />
          <Suggestion section="Theme" />
          <Suggestion section="Goal" />
        </div>

        {/* Button to Scroll Down */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-5">
          <a href="#about" className="flex flex-col items-center justify-center">
            <svg className="w-6 h-6 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
            </svg>
            <p className="text-white font-mono">Scroll Down</p>
          </a>
        </div>
      </div>
      <div id="about" className="w-screen h-screen bg-gray-800 flex flex-col">
        <div className="m-auto">
          <h1 className="pl-5 bops-one text-5xl">About GameForge</h1>
          <br></br>
          <p className="w-4/6 pl-5"> 
          GameForge was developed as part of the &quot;A Tool for Generating Concepts&quot; assignment at 
          GeorgiaTech&apos;s Computer Science Special Topics: Creative Design Practice (CS 8803 CDP) 
          course. The objective of the assigment was to create a webpage that loads words or phrases 
          from three categories into a phrase or sentence that expresses a novel idea.
          </p>
          <br></br>
          <p className="w-4/6 pl-5">
            I decided to create a web app that would generate topics for game jams. I took inspiration
            from the Ludum Dare&apos;s approach for their game james, where users are given a theme to create
            a game from scratch. I wanted to make a &quot;theme generator&quot; that would give users inspiration
            for developing new games.
          </p>
          <br></br>
          <p className="w-4/6 pl-5">
            The web app is built using Next.js and Tailwind CSS. The source code is available on GitHub,
            licensed under the MIT license, and hosted on Vercel. This app uses OpenAI&apos;s GPT-4 generative 
            AI model to generate the suggestions for genre, theme, and goal. Further, DALL-E 3 is used to 
            generate the images based on the suggestions.
          </p>
          <br></br>
          <p className="w-4/6 pl-5">
            I hope you enjoy using GameForge and I hope it inspires you to create new games!
          </p>
          <br></br>
          <p className="w-4/6 pl-5 text-right">- Signed, <br></br> Andrew Woo</p>
        </div>
      </div>
    </main>
  );
}
