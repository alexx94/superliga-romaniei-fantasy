import { useState } from 'react';
import { getPlayers } from '../../api/PlayerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PlayersTable from '../../components/Players/PlayersTable';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-blue-500 px-4">
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

      <PlayersTable players = {players} />
    </div>
  );


};

export default Search;
  