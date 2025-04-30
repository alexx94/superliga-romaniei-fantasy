import React, { useState, useEffect } from 'react';
import PlayerFormModal from './PlayerFormModal';

const PlayersTable = ({ players, addActions = 'false', onEdit, onDelete }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!players || players.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className={`${ isMobile ? "bg-transparent" : "bg-white" } table-auto w-full rounded-xl shadow-lg`}>
        {/* Table Header */}
        <thead className={`${isMobile ? 'hidden' : 'table-header-group'}`}>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Team</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Nation</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Games</th>
            <th className="px-4 py-2">Goals</th>
            <th className="px-4 py-2">Assists</th>
            {addActions === 'true' && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className={`${isMobile ? 'flex flex-col gap-4 p-2' : ''} font-semibold`}>
          {players.map((player, index) => (
            <tr
              key={player.id}
              className={`text-black ${isMobile ? 'bg-white rounded-lg shadow-md p-4 text-left flex flex-col' : 'text-center'}`}
            >
              {/* Name */}
              <td className={`px-4 py-2 ${isMobile ? 'block text-left border-b' : ''}`}>
                {isMobile && <span className="font-bold">Name: </span>}
                {player.player}
              </td>

              {/* Team */}
              <td className={`px-4 py-2 ${isMobile ? 'block text-left border-b' : ''}`}>
                {isMobile && <span className="font-bold">Team: </span>}
                {player.team}
              </td>

              {/* Position */}
              {!isMobile && (
                <td className="px-4 py-2">
                  {player.position}
                </td>
              )}

              {/* Nation */}
              {!isMobile && (
                <td className="px-4 py-2">
                  {player.nation}
                </td>
              )}

              {/* Age */}
              <td className={`px-4 py-2 ${isMobile ? 'block text-left border-b' : ''}`}>
                {isMobile && <span className="font-bold">Age: </span>}
                {player.age}
              </td>

              {/* Games */}
              <td className={`px-4 py-2 ${isMobile ? 'block text-left border-b' : ''}`}>
                {isMobile && <span className="font-bold">GP: </span>}
                {player.games}
              </td>

              {/* Goals */}
              <td className={`px-4 py-2 ${isMobile ? 'block text-left border-b' : ''}`}>
                {isMobile && <span className="font-bold">G: </span>}
                {player.goals}
              </td>

              {/* Assists */}
              <td className={`px-4 py-2 ${isMobile ? 'block text-left border-b' : ''}`}>
                {isMobile && <span className="font-bold">A: </span>}
                {player.assists}
              </td>

              {/* Actions */}
              {addActions === 'true' && (
                <td className={`px-4 py-2 ${isMobile ? 'block text-left' : ''}`}>
                  {isMobile && <span className="font-bold">Actions: </span>}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      onClick={() => onEdit(player, index)}
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      onClick={() => onDelete(player)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersTable;
