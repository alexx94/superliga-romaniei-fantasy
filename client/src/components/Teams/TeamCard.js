import React from "react";

const TeamCard = ({ team, onClick }) => {
  return (
    <div
      className="relative group cursor-pointer bg-blue-500 hover:bg-indigo-900 p-4 rounded-lg shadow-md overflow-hidden transition-all flex flex-col items-center"
      onClick={() => onClick(team)}
    >
      {/* Team Logo */}
      <img
        src={team.logo}
        alt={team.name}
        className="w-full h-48 object-contain p-6 transition-opacity duration-300 group-hover:opacity-20"
        onError={(e) => { e.target.src = '/teams/default.png'; }}
      />

      {/* Text Section */}
      <div className="relative w-full flex flex-col items-center mt-4 group-hover:opacity-20">
        {/* Team Name (default, below the image) */}
        <h2 className="text-white text-lg font-bold">
          {team.name}
        </h2>
      </div>

      {/* View Team Button (centered on hover) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-xl font-bold">View Team</span>
      </div>
    </div>
  );
};

export default TeamCard;
