import React, { useEffect, useState } from 'react';
import { getPlayers, updatePlayer } from '../api/PlayerApi';
import { PlayerSearchBar } from '../components/Players/PlayerSearchBar';
import { usePlayerSearch } from '../hooks/usePlayerSearch';
import { CustomButton } from '../components/Buttons/CustomButton';
import PlayersTable from '../components/Players/PlayersTable';

const Edit = () => {
  const { searchTerm, setSearchTerm, handleSearch, handleViewPlayers, players } = usePlayerSearch();

  // Buton View Players, Add Player, Search bar for player 
  // Modify player table to include a column Actions, where i have Edit, Delete buttons.

  // Edit, Add buttons will open a form, Add form will be empty so that you can add player's info
  // Edit form will have the current player details, and you just modify the fields
  // Save changes will call the backend depending on the case, to create a new player, or update that current player's info.
  // Delete button, will simply open a yes/no window or popup component, and then if yes it calls the deletePlayer using the id.

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-500 p-6 md:pl-[180px]">
      <h1 className="text-white text-3xl font-bold mb-8 justify-center items-center text-center">Edit players</h1>

      {/* Add, Edit, Delete will have their own separate window components that i insert after clicking their buttons */}
      
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8 px-4">

        <div className="flex gap-2">
          <CustomButton text="View Players" onClick={() => handleSearch(null, true)}/>
          <CustomButton text="Add Player" />
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
        <PlayersTable players={players} addActions='true' />
      </div>

    </div>
  );
};

export default Edit;