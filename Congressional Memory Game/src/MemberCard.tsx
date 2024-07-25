// MemberCard.tsx
import React from 'react';
import { Member } from './types'; // Import the Member type from a common types file

const MemberCard: React.FC<{ member: Member }> = ({ member }) => (
  <div
    key={member.id}
    className={`card w-[200px] h-[320px] scale-75 hover:scale-105 hover:z-0 z-0 transition-all shadow-lg items-center flex flex-col p-4 rounded-lg border-2 bg-neutral-900 ${member.partyName === "Democratic" ? "border-blue-600" : member.partyName === "Republican" ? "border-red-600" : "border-green-600"}`}
  >
    {member.depiction ? (
      <div className='w-full h-[180px] flex items-center justify-center overflow-hidden'>
        <img
          src={member.depiction.imageUrl}
          alt={member.name}
          className='w-full h-full object-cover'
        />
      </div>
    ) : (
      <div className='w-full h-[180px] flex justify-center items-center bg-gray-200'>
        <span className='text-gray-500'>No Image</span>
      </div>
    )}
    <h2 className='mt-2 text-center font-semibold text-lg border-b-2'>{member.name}</h2>
    <h2 className='mt-2 text-center'>{member.partyName}</h2>
    <h2 className='mt-2 text-center'>{`${member.state}(${member.district === undefined ? "N/A" : member.district})`}</h2>
  </div>
);

export default MemberCard;
