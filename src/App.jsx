import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Dial from "./components/Dial";
import ClaimButton from "./components/ClaimButton";
import Wallet from "./components/Wallet";

function App() {
  const [points, setPoints] = useState(0);
  const [lastClaim, setLastClaim] = useState(null);

  const handleClaim = () => {
    const now = Date.now();
    if (!lastClaim || now - lastClaim >= 4 * 60 * 60 * 1000) {
      setPoints(points + 10); // add 10 ROAR points
      setLastClaim(now);
    } else {
      alert("⏳ You can claim again after 4 hours!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      <Dial lastClaim={lastClaim} />
      <ClaimButton onClaim={handleClaim} />
      <Wallet points={points} />
    </div>
  );
}

export default App;
