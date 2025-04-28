import { useState } from 'react';
import { getPlayers } from '../../api/PlayerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PlayersTable from '../../components/Players/PlayersTable';
import { PlayerSearchBar } from '../../components/Players/PlayerSearchBar';
import { usePlayerSearch } from '../../hooks/usePlayerSearch';

const Search = () => {
  const { searchTerm, setSearchTerm, handleSearch, players, error, loading } = usePlayerSearch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-blue-500 px-4">
      <PlayerSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      {loading && <p className="text-gray-600 mb-4">Loading...</p>}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <PlayersTable players = {players} />
    </div>
  );


};

export default Search;
  