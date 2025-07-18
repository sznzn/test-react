import Note from './components/Note'
import { useState, useEffect } from 'react'  
import axios from 'axios'
import noteService from './services/notes.js'



const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note ...')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
  }, [])
  const toggleImportanceOf = (id) => {
    
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService.update(id, changedNote)
    .then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
    .catch(error => {
      console.log('更新笔记出现了问题put', error)
    })
  }

  // console.log('render', notes.length, 'notes')


  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    noteService
      .create(noteObject)
      .then(response => {
        // console.log('此处整个的response', response)
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
      .catch(error => {
        console.log('问题出现了', error)
      })
    
    setNewNote('')
  }
  
  

  const handleNoteChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }

  
    
    
  

  return(
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => 
          <Note key={note.id} note={note} />
        )}
      </ul>

    <h2>Notes to show important</h2>
    <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
    <ul>
      {notesToShow.map((note) => 
        <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
      )}
    </ul>

  
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default App
