import { Routes, Route } from 'react-router-dom'
//import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import SongList from './pages/SongList.jsx'
import SongDetail from './pages/SongDetail.jsx'
import { getSongList } from './api/songApi'

function App() {
  // const [songs, setSongs] = useState([])

  // useEffect(() => {
  //   const fetchSongs = async () => {
  //     try {
  //       const data = await getSongList()
  //       setSongs(data)
  //     } catch (err) {
  //       console.error("Failed to fetch songs:", err)
  //     }
  //   }

  //   fetchSongs()
  // }, [])

  const { data: songs, isLoading, isError, error } = useQuery({
    queryKey: ['songs'],
    queryFn: getSongList
  })

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>
  }

  if (isError) {
    return <p className="text-center mt-10">오류 발생: {error.message}</p>
  }

  return (
    <Routes>
      <Route path="/" element={<SongList songs={songs} />} />
      <Route path="/song/:id" element={<SongDetail songs={songs} />} />
    </Routes>
  )
}

export default App
