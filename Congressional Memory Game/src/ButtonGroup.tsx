// ButtonGroup.tsx
import React from 'react';

interface ButtonGroupProps {
  onAllClick: () => void;
  onSenatorClick: () => void;
  onHouseClick: () => void;
  gamePlaying:boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ onAllClick, onSenatorClick, onHouseClick, gamePlaying }) => (
  <div className='flex self-center gap-4 items-center mt-4'>
    <button onClick={onAllClick}>All Members</button>
    <button onClick={onSenatorClick}>Senate</button>
    <button onClick={onHouseClick}>House</button>
  </div>
);

export default ButtonGroup;
