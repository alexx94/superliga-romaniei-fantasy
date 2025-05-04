import React, { useEffect, useState } from 'react';
import { getPlayers, updatePlayer, deletePlayer } from '../api/PlayerApi';
import { PlayerSearchBar } from '../components/Players/PlayerSearchBar';
import { usePlayerSearch } from '../hooks/usePlayerSearch';
import { CustomButton } from '../components/Buttons/CustomButton';
import PlayersTable from '../components/Players/PlayersTable';
import PlayerFormModal from '../components/Players/PlayerFormModal';
import ConfirmDialog from '../components/Dialogs/ConfirmDialog';

const Edit = () => {
  const { searchTerm, setSearchTerm, handleSearch, players, setPlayers } = usePlayerSearch();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);

  const handleAdd = () => {
    setSelectedPlayer(null);
    setShowModal(true);
  };

  const handleEdit = (player, index) => {
    console.log('Editing player at index: ', index);
    setSelectedPlayer(player);
    setShowModal(true);
  }

  const handleDelete = (player) => {
    setPlayerToDelete(player);
    setDeleteModalOpen(true);
  }

  const handleConfirmDelete = async () => {
    
    let data;
    if (playerToDelete != null) {
      data = await deletePlayer(playerToDelete.id);
      if (data) {
        console.log(`Player ${playerToDelete?.player} deleted`);
        setPlayers((prevPlayers) => prevPlayers.filter(p => p.id !== playerToDelete.id));
      } 
    } 
    else {
      console.error('Failed to delete player.');
    }
    
    setDeleteModalOpen(false);
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
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
        <PlayersTable players={players} addActions='true' onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {showModal && (
        <PlayerFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          player={selectedPlayer}
          onSave={(savedPlayer) => {
            setPlayers((prevPlayers) => {
              let isNewPlayer = true;
              const updatedPlayers = prevPlayers.map((p) => {
                if (p.id === savedPlayer[0].id) {
                  isNewPlayer = false;
                  return savedPlayer[0];
                }
                return p;
              });

            
              if (isNewPlayer) updatedPlayers.push(savedPlayer[0]);
              return updatedPlayers;
              
            });
            console.log('Saved player:', savedPlayer);
            setShowModal(false);
          }}
        />
      )}

      <ConfirmDialog 
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete ${playerToDelete?.player}?`}
        confirmText="Yes"
        cancelText="No"

        //TODO: Handle after confirmation, to also include table update, just as we did previously on form
      />

    </div>
  );
};

export default Edit;