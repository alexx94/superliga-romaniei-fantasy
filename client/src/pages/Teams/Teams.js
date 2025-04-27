import React, { useState } from 'react';
import teamsData from '../../data/teams.json';
import TeamCard from '../../components/Teams/TeamCard';
import TeamDetails from '../../components/Teams/TeamDetails';

const Teams = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamClick = (team) => setSelectedTeam(team);
  const handleGoBack = () => setSelectedTeam(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-500 p-6 md:pl-[180px]">
      {!selectedTeam ? (
        <>
          <h1 className="text-white text-3xl font-bold mb-8 text-center">Superliga Teams</h1>

          <div className="pl-4 pr-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamsData.teams.map((team) => (
              <TeamCard key={team.name} team={team} onClick={() => handleTeamClick(team)} />
            ))}
          </div>
        </>
      ) : (
        <TeamDetails team={selectedTeam} onGoBack={handleGoBack} />
      )}
    </div>
  );
};

export default Teams;
