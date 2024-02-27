import Suggestion from "./components/suggestion";

// import css
import "./css/fonts.css";

export default function Home() {
  return (
    <main>
      <p className="bops-one text-4xl m-4">GameForge</p>
      <div className="flex flex-col items-center justify-center">
        <p className="bops-one text-2xl mt-20 mb-20">
          Create a game...
        </p>
      </div>

      <div className="flex justify-around">

        <Suggestion section="Genre" />
        <Suggestion section="Theme" />
        <Suggestion section="Goal" />
      </div>
    </main>
  );
}
