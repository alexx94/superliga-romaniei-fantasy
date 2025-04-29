import { useState } from 'react';
import { createPlayer, updatePlayer } from '../api/PlayerApi'; // your API handler

export default function usePlayerForm({ player, onClose, onSave }) {
  const [formData, setFormData] = useState(player || {
    player: '',
    age: '',
    team: '',
    position: '',
    nation: '',
    games: '',
    games_starts: '',
    minutes: '',
    goals: '',
    assists: '',
    goals_pens: '',
    pens_made: '',
    cards_yellow: '',
    cards_red: '',
  });

  console.log(player);

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (selected) => {
    setFormData((prev) => ({ ...prev, position: selected.join(',') }));
  };

  const handleSubmit = async () => {
    if (!formData.player || !formData.team || !formData.age) {
      setError('Name, Team, and Age are required.');
      return;
    }

    // Convert number fields to integers
    const cleanedData = { ...formData };
    const numericKeys = ['age', 'games', 'game_starts', 'minutes', 'goals', 'assists', 'goals_pens', 'pens_made', 'cards_yellow', 'cards_red'];
    Object.keys(cleanedData).forEach((key) => {
        if (cleanedData[key] === '' || cleanedData[key] === null) {
          delete cleanedData[key];  // Delete empty string fields
        } else if (numericKeys.includes(key)) {
          cleanedData[key] = parseInt(cleanedData[key]);  // Parse numeric fields
        }
      });

    try {
      setError(null);
      const data = player
      console.log(data)
        ? await updatePlayer(player.id, cleanedData)
        : await createPlayer(cleanedData);

      onSave(data);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save player.');
    }
  };

  const handleCancel = () => {
    setError(null);
    onClose();
  };

  return {
    formData,
    handleChange,
    handleMultiSelect,
    handleSubmit,
    handleCancel,
    error,
  };
}
