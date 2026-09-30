import { useState } from "react";
import LandingPage from "./components/LandingPage";
import TransitionOverlay from "./components/TransitionOverlay";
import MainPage from "./components/MainPage";

type Stage = "landing" | "transitioning" | "main";

export default function App() {
  const [stage, setStage] = useState<Stage>("landing");

  return (
    <div className="min-h-screen w-full bg-black">
      {stage === "landing" && <LandingPage onSuccess={() => setStage("transitioning")} />}
      {stage === "transitioning" && (
        <>
          <LandingPage onSuccess={() => {}} />
          <TransitionOverlay onComplete={() => setStage("main")} />
        </>
      )}
      {stage === "main" && <MainPage />}
    </div>
  );
}
