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
    let isChanged = false; 
    const cleanedData = {};
    const numericKeys = ['age', 'games', 'game_starts', 'minutes', 'goals', 'assists', 'goals_pens', 'pens_made', 'cards_yellow', 'cards_red'];
    const requiredKeys = ['player', 'team', 'age'];
    for (const key in  formData) {
      if (key === 'id') continue; // exclude id from the form

      let originalValue;
      if (player) originalValue = player[key] ?? '';
      else originalValue = '';
      const currentValue = formData[key];

      if (currentValue === '' || currentValue === null) continue;

      if (requiredKeys.includes(key)) {
        cleanedData[key] = numericKeys.includes(key) ? parseInt(currentValue) : currentValue;
        if (`${currentValue}` !== `${originalValue}`) isChanged = true;
        continue;
      }

      if (`${currentValue}` !== `${originalValue}`) {
        cleanedData[key] = numericKeys.includes(key) ? parseInt(currentValue) : currentValue;
        isChanged = true;
      }
      
    }

    try {
      setError(null);
      console.log("hello", cleanedData);
      let data;
      if (player == null) data = await createPlayer(cleanedData);
      else {
        if (!isChanged) {
          onClose();
          return;
        }
        data = await updatePlayer(player.id, cleanedData);

      }

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