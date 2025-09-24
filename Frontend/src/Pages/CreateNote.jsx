import React, { useState } from 'react';
import axios from 'axios';

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [note, setnote] = useState('');
  const [isCreating, setIsCreating] = useState(false)
 const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true)
    if (!title.trim() || !note.trim()) {
      toast.error('Please fill out all fields');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/notes', {
        title,
        note,
      });
      toast.success('Note created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note');
    }finally {}
    setIsCreating(false)
  };

  return (
    <div className="flex justify-center mt-12 min-h-screen">
        <div className='flex form flex-col bg-base-100 w-[500px] p-8 h-fit'>
      <h2 className="text-2xl header font-bold mb-4">Create a New Note</h2>
      <form onSubmit={handleSubmit} className="form space-y-4 min-h-0.5 w-fill">
        <div className='py-2'>
          <label className="block py-1 text-sm font-medium">Title</label>
          <input
            type="text"
            className="input input-primary w-full px-8 py-8 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
          />
        </div>
        <div>
          <label className="label text-sm font-medium">note</label>
          <textarea
            className="w-full textarea px-3 py-8 textarea-primary rounded-sm"
            value={note}
            onChange={(e) => setnote(e.target.value)}
            placeholder="Enter note"
            rows={5}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isCreating}
          className="w-full btn py-8 btn-secondary disabled:bg-[#666] disabled:text-[#444] rounded-2xl shadow-2xs shadow-amber-600"
        >
         {isCreating ? 'Creating a note...' : 'Create Note' }
        </button>
      </form>
      </div>
    </div>
  );
};

export default CreateNote;
