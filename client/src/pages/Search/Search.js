import { useState } from 'react';
import { getPlayers } from '../../api/PlayerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    setPlayers([]);

    try {
      const results = await getPlayers({ name: searchTerm.trim() });
      if (results.length === 0) {
        setError('No players found.');
      } else {
        setPlayers(results);
      }
    } catch (err) {
      setError('An error occurred while fetching players.');
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-full shadow-md p-2 w-full max-w-md mb-6"
      >
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 rounded-full outline-none text-gray-700"
        />
        <button type="submit" className="text-blue-600 px-4">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>

      {loading && <p className="text-gray-600 mb-4">Loading...</p>}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {players.length > 0 && (
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
              <tr key={player.id} className="text-center border-b">
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
      )}
    </div>
  );


};

export default Search;
  