import React from 'react';

interface ScoreProps {
    score: number;
    highScore: number;
    gamePlaying: boolean;
}   

const Score: React.FC<ScoreProps> = ({score, highScore, gamePlaying}) => (
    <>
    <div className={`${gamePlaying? 'visible':'invisible'} fixed right-72 gap-8 top-4 z-30 w-12 flex items-center`}>
        <h2 className='bg-[#121212]  rounded-xl p-2 text-3xl font-bold'>{score}</h2>
        <h2 className='bg-[#121212]  rounded-xl p-2 text-3xl font-bold'>{highScore}</h2>
    </div>
    </>
  );
  
  export default Score;