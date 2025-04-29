import React from 'react';
import { Dialog } from '@headlessui/react';
import PlayerFormFields from './PlayerFormFields';
import PlayerFormFooter from './PlayerFormFooter';
import usePlayerForm from '../../hooks/usePlayerForm';

export default function PlayerFormModal({ isOpen, onClose, player, onSave }) {
    const {
        formData,
        handleChange,
        handleSubmit,
        handleCancel,
        handleMultiSelect,
        error,
    } = usePlayerForm({ player, onClose, onSave });

    console.log('GICUUUU') ;

    return (
        <Dialog open={isOpen} onClose={handleCancel} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Dialog.Panel className="bg-white p-6 rounded-xl w-[90%] max-w-md space-y-4">
            <Dialog.Title className="text-xl font-semibold">
              {player ? 'Edit Player' : 'Add New Player'}
            </Dialog.Title>
    
            <PlayerFormFields 
                formData={formData} 
                handleChange={handleChange} 
                handleMultiSelect={handleMultiSelect}
            />
    
            <PlayerFormFooter
              onCancel={handleCancel}
              onSubmit={handleSubmit}
              error={error}
            />
          </Dialog.Panel>
        </Dialog>
    );

}

