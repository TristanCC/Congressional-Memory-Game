// MemberGrid.tsx
import React from 'react';
import { Member } from './types'; // Import the Member type from a common types file
import MemberCard from './MemberCard';

const MemberGrid: React.FC<{ members: Member[], gamePlaying:boolean }> = ({ members, gamePlaying }) => (
<div className='w-full h-full flex flex-wrap justify-center self-center p-4 max-w-screen-xl mt-16 '>
    {members.map((member) => (
      <MemberCard key={member.id} member={member} gamePlaying={gamePlaying} />
    ))}
  </div>
);

export default MemberGrid;


//grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]