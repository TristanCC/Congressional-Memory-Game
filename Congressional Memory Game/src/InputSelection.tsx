// InputSection.tsx
import React from 'react';

interface InputSectionProps {
  inputNumber: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartClick: () => void;
  gamePlaying:boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ inputNumber, onInputChange, onStartClick, gamePlaying }) => (
  <div className={`items-center self-center p-2 flex gap-4 bg-[#242424] rounded-2xl justify-center ${gamePlaying? 'invisible':'visible'}`}>
    <h3>How many people?</h3>
    <input
      type="text"
      className='p-4 rounded-lg w-16'
      placeholder='12'
      value={inputNumber}
      onChange={onInputChange}
    />
    <button onClick={onStartClick}>Start</button>
  </div>
);

export default InputSection;
