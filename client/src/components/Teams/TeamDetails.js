import React, { useEffect, useState } from 'react';
import PlayersTable from '../Players/PlayersTable';
import { getPlayers } from '../../api/PlayerApi';


const TeamDetails = ({ team, onGoBack }) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlayers = async (e) => {    
            setLoading(true);
            setError('');
            setPlayers([]);
    
            try {
                const results = await getPlayers({ team: team.name });
                console.log(results);
                if (results.message === "Unauthorized") setError('Login to view players!');//TODO doesnt work yet, need to handle it
                else if (results.length === 0) {
                    setError('No players found.');
                } else {
                    setPlayers(results);
                }
            } catch (err) {
                setError('An error occurred while fetching players.');
            }
    
            setLoading(false);
        }

        fetchPlayers();
        window.scrollTo(0, 0);
    }, [team.name]);
    

    if (!team) return null;

    return (
        <div className="min-h-screen  p-6 md:pl-[180px] text-white">
        <button
            onClick={onGoBack}
            className="bg-white text-blue-600 px-4 py-2 rounded mb-6 hover:bg-gray-200 transition"
        >
            Go Back
        </button>

        <h1 className="text-3xl font-bold mb-4">{team.name}</h1>

        <img
            src={team.logo}
            alt={team.name}
            className="w-64 h-64 object-contain mb-6"
            onError={(e) => {
            e.target.src = '/teams/default.png';
            }}
        />

        {loading && <p className="text-gray-300 mb-4">Loading players...</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}

        {!loading && !error && <PlayersTable players={players} />}
        </div>
    );

};

export default TeamDetails;