import React from 'react';

const PlayersTable = ({ players }) => {
  if (!players || players.length === 0) {
    return null;
  }

  return (
    <table className="table-auto bg-white rounded-xl shadow-lg">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Team</th>
          <th className="px-4 py-2">Position</th>
          <th className="px-4 py-2">Nation</th>
          <th className="px-4 py-2">Age</th>
          <th className="px-4 py-2">Games</th>
          <th className="px-4 py-2">Goals</th>
          <th className="px-4 py-2">Assists</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.id} className="text-center text-black">
            <td className="px-4 py-2">{player.player}</td>
            <td className="px-4 py-2">{player.team}</td>
            <td className="px-4 py-2">{player.position}</td>
            <td className="px-4 py-2">{player.nation}</td>
            <td className="px-4 py-2">{player.age}</td>
            <td className="px-4 py-2">{player.games}</td>
            <td className="px-4 py-2">{player.goals}</td>
            <td className="px-4 py-2">{player.assists}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlayersTable;
