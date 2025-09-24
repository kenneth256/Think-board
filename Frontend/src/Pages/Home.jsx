import React, {useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import RateLimitedUI from '../components/RateLimit'
import axios from 'axios';
import { PulseLoader } from "react-spinners";
import NoteCard from '../components/Card';
import api, { getDetails } from '../Utilitis';
import NotFound from '../components/NotFound';

const Home = () => {
    const [data, setData] = useState([]);
    const [isRateLimit, setIsRateLimit] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const res = await api.get("/notes");
                setData(res.data);
                console.log("Notes fetched:", res.data);
            } catch (error) {
                console.error("Error fetching notes:", error.message);
                if (error.response?.status === 429) { // Fixed: use === instead of =
                    setIsRateLimit(true);
                } else {
                    toast.error('Failed to fetch Notes');
                } 
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    const handleDelete = async (noteId) => {
        try {
            await api.delete(`/notes/${noteId}`);
            setData(prevData => prevData.filter(note => note._id !== noteId));
            toast.success('Note deleted successfully!');
        } catch (error) {
            console.error('Error deleting note:', error);
            toast.error('Failed to delete note');
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className='items-center min-h-screen p-4 flex justify-center'>
                    <p className='text-center text-primary py-20 flex items-center gap-2'>
                        <PulseLoader size={8} color="currentColor" />
                        Loading....
                    </p>
                </div>
            );
        }

        if (isRateLimit) {
            return <RateLimitedUI />;
        }

        if (data && data?.length > 0) {
            return (
                <div className='w-full px-4 mt-4'>
                    <div className='grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {data.map((note) => (
                            <NoteCard 
                                key={note._id}
                                note={note}  
                                setNotes={setData}
                            />
                        ))}
                    </div>
                </div>
            );
        }

        return <NotFound />;
    };

    return (
        <div className='flex flex-col min-h-screen w-full mx-auto'>
            {renderContent()}
        </div>
    );
};

export default Home;