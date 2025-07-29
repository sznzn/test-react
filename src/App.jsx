import Note from './components/Note'
import { useState, useEffect } from 'react'  
// import axios from 'axios'
import noteService from './services/notes.js'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center',
  }
  return (
    <div>
      <br />
      <p  style={footerStyle}><em>Example project for the course Full Stack Open 2025</em></p>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note ...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  const toggleImportanceOf = (id) => {
    
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService.update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      console.log('error', error)
      setErrorMessage(`Note '${note.content}' was already deleted from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
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
      .then(newNote => {
        // console.log('此处整个的response', response)
        setNotes(notes.concat(newNote))
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
      <Notification message={errorMessage} />
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
      <Footer />
    </div>
  )
}


export default App
