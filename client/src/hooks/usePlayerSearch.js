import { useState } from "react";
import { getPlayers } from "../api/PlayerApi";

export const usePlayerSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // search with input (searchbar)
    const handleSearch = async (e, fetchAll = false) => {
        if (e) e.preventDefault();
        
        const params = fetchAll ? {} : {name: searchTerm.trim()};

        if (!fetchAll && !searchTerm.trim()) return;
    
        setLoading(true);
        setError('');
        setPlayers([]);
    
        try {
          const results = await getPlayers(params);
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

    return {
        searchTerm,
        setSearchTerm,
        handleSearch,
        players,
        error,
        loading,
      };
}