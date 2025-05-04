import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const PlayerSearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
    return (
        <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-full shadow-md mb-6 p-2 w-full max-w-md"
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
    );
};