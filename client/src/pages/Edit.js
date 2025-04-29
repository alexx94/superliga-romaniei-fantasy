import React, { useEffect, useState } from 'react';
import { getPlayers, updatePlayer } from '../api/PlayerApi';
import { PlayerSearchBar } from '../components/Players/PlayerSearchBar';
import { usePlayerSearch } from '../hooks/usePlayerSearch';
import { CustomButton } from '../components/Buttons/CustomButton';
import PlayersTable from '../components/Players/PlayersTable';
import PlayerFormModal from '../components/Players/PlayerFormModal';

const Edit = () => {
  const { searchTerm, setSearchTerm, handleSearch, handleViewPlayers, players } = usePlayerSearch();

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    setSelectedPlayer(null);
    setShowModal(true);
  };

  const handleEdit = (player) => {
    setSelectedPlayer(player);
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-500 p-6 md:pl-[180px]">
      <h1 className="text-white text-3xl font-bold mb-8 justify-center items-center text-center">Edit players</h1>

      {/* Add, Edit, Delete will have their own separate window components that i insert after clicking their buttons */}
      
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8 px-4">

        <div className="flex gap-2">
          <CustomButton text="View Players" onClick={() => handleSearch(null, true)}/>
          <CustomButton text="Add Player" onClick={handleAdd} />
        </div>

        <div className="w-full max-w-md">
          <PlayerSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
        </div>

      </div>

      {/* Player Table custom with Action column for edit/delete */}
      <div className='flex justify-center ml-4'>
        <PlayersTable players={players} addActions='true' onEdit={handleEdit} />
      </div>

      {showModal && (
        <PlayerFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          player={selectedPlayer}
          onSave={(savedPlayer) => {
            // TODO: I can update table to include this too
            console.log('Saved player:', savedPlayer);
            setShowModal(false);
          }}
        />
      )}

    </div>
  );
};

export default Edit;