import React from 'react';
import { Member } from './types'; // Import the Member type from a common types file
import MemberCard from './MemberCard';

const MemberGrid: React.FC<{ members: Member[], gamePlaying: boolean, onClickCard: (member: Member) => void }> = ({ members, gamePlaying, onClickCard }) => (
  <div className='w-full h-full flex flex-wrap justify-center self-center p-4 max-w-screen-xl mt-20 '>
    {members.map((member) => (
      <MemberCard key={member.id} member={member} gamePlaying={gamePlaying} handleCardClick={onClickCard} />
    ))}
  </div>
);

export default MemberGrid;
