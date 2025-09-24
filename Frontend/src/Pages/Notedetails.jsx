import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../Utilitis';
import toast from 'react-hot-toast';
import { CircleStopIcon, Loader2 } from 'lucide-react';
import RateLimitedUI from '../components/RateLimit';


const Notedetails =  () => {
  const [isFetching, setIsFetching] = useState(false)
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState('')
   const {id} = useParams();
   const [isRateLimit, setIsRateLimit] = useState(false)
   const navigate = useNavigate()

   const update = async(e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put(`/notes/${id}`, {
        title,
        note: content
      })
      toast.success('Note updated successfully!');
      navigate('/');
    } catch (error) {
      console.log(error)
    } finally {
      setSaving(false)
    }

   }

   useEffect(() => {
    const fetchNote = async() => {
        if (!id) return; 
        setIsFetching(true);
    try {
      const result = await api.get(`/notes/${id}`)
      setContent(result.data.note || '')
      setTitle(result.data.title)
      setIsFetching(false)
    } catch (error) {
      console.log(error)
      if(error.response.status === 429) {
        setIsRateLimit(true)
      }
    } finally {
      setIsFetching(false)
    }
  }
  fetchNote()
   }, [id])

   let cont;

   if(isFetching) {
    cont =<div className="flex min-h-screen  items-center justify-center">  <Loader2 className='size-7 animate-spin text-primary' /></div>
   } else if(isRateLimit)  {
    cont = <RateLimitedUI />
   } else {
    cont = <div className='flex flex-col mt-4 min-h-screen items-center'>
      <form onSubmit={update} className='bg-amber-950 w-3/4 h-[85%] form rounded-sm p-8 form flex gap-4 flex-col items-center '>
       <label className='label text-secondary content-center flex justify-center w-full'> Edit note : {title} </label>
        <div className='flex flex-col w-full'>
          <label className='label text-primary'>Title</label>
          <input value={title} className='input text-accent' onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='flex flex-col w-full h-full'>
          <label className='label'>Note</label>
          <textarea className='textarea rounded-b-sm h-[150px] text-accent' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button className='btn w-full btn-secondary py-2' type='submit'> {setSaving ? 'Saving...' : "Save changes" }</button>
      </form>

    </div>
   }

  return (
   
   
  <>
    {cont}
  
</>

    
  )
}

export default Notedetails