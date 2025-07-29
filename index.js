// import './index.css';

import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('.'))
let notes = [
{
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
},
{
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
},
{
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
}
]


app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id);
    
    const note = notes.find(note => note.id === id)

    if(note) {
        response.json(note)
    } else {
        response.status(404)
        response.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>404 - Note Not Found</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background: #1a1a1a;
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .error-container {
                        text-align: center;
                        animation: fadeIn 1s ease-in;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .error-code {
                        font-size: 8em;
                        color: #ff6b6b;
                        margin: 0;
                        animation: pulse 2s infinite;
                    }
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
                    .error-message {
                        font-size: 1.5em;
                        margin: 20px 0;
                    }
                    .back-btn {
                        display: inline-block;
                        padding: 15px 30px;
                        background: #ff6b6b;
                        color: white;
                        text-decoration: none;
                        border-radius: 25px;
                        transition: all 0.3s ease;
                    }
                    .back-btn:hover {
                        background: #ff5252;
                        transform: translateY(-2px);
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1 class="error-code">404</h1>
                    <h2>Note Not Found</h2>
                    <p class="error-message">The note with ID <strong>${id}</strong> doesn't exist.</p>
                    <a href="/" class="back-btn">← Go Back Home</a>
                </div>
            </body>
            </html>
        `)
    }

    
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    
    const body = request.body
    if(!body.content) { 
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        content: body.content,      
        important: body.important || false,
        date: new Date().toISOString(),
        id: generateId()
    }
    notes = notes.concat(note)
    response.json(note)
})

app.put('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const body = request.body
    const note = notes.find(note => note.id === id)
    if(note) {
        const updatedNote = {
            ...note,
            content : body.content || note.content,
            important : body.important !== undefined ? !note.important : note.important,
            date: body.date || note.date
        }
        notes = notes.map(n => n.id === id ? updatedNote : n)
        response.json(updatedNote)
    } else {
        response.status(404).end()
    }
})


app.get('*', (req, res) => {
  res.sendFile('./index.html')
})

const PORT = process.env.PORT || 3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`)