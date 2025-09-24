
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'react-hot-toast';
import api from '../Utilitis';

const NoteCard = ({ note, setNotes }) => {


  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit(note);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete this note!")) return
      try {
        await api.delete(`/notes/${id}`)
        setNotes((prev) => prev.filter(note => note._id !== id))
        
        toast.success(`deleted successfully!`);
      } catch (error) {
        console.error('Error deleting note:', error);
        toast.error('Failed to delete note');
      }
    
  };

  

  return (
    <Link
          to={`/noteDetails/${note._id}`}
      className="card card-primary bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] cursor-pointer"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.note || note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">{formatDate(note.createdAt)}</span>
          <div className="flex items-center gap-1">
            <button onClick={handleEdit} className="btn btn-ghost btn-xs">
              <PenSquareIcon className="size-4" />
            </button>
            <button onClick={(e) => handleDelete(e, note._id)} className="btn btn-ghost btn-xs text-error">
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;