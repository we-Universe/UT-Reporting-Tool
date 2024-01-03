import React, { useState, useEffect } from 'react';
import { IconButton, TextareaAutosize, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Note = ({ notes, onChange }) => {
  const [currentNotes, setCurrentNotes] = useState([]);

  useEffect(() => {
    setCurrentNotes(notes);
  }, [notes]);

  const addNote = () => {
    const newNotes = [...currentNotes, { content: '' }];
    setCurrentNotes(newNotes);
    onChange(newNotes);
  };

  const handleNoteChange = (index, content) => {
    const updatedNotes = [...currentNotes];
    updatedNotes[index] = { ...updatedNotes[index], content };
    setCurrentNotes(updatedNotes);
    onChange(updatedNotes);
  };

  return (
    <Grid container spacing={1} alignItems="center">
      {currentNotes.map((note, index) => (
        <Grid item key={index}>
          <TextareaAutosize
            style={{ minHeight: '5rem', width: '20.7rem', fontSize: '14px', border: 'none', resize: 'none', color: '#0B3782' }}
            aria-label="minimum height"
            minRows={1}
            placeholder="Type your note here..."
            value={note.content}
            onChange={(e) => handleNoteChange(index, e.target.value)}
          />
        </Grid>
      ))}
      <Grid item>
        <IconButton onClick={addNote} color="primary">
          <AddIcon sx={{ color: '#0B3782' }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Note;