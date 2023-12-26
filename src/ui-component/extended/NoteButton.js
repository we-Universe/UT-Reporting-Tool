import React, { useState } from 'react';
import { IconButton, TextareaAutosize, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const NoteButton = ({ notes, onChange }) => {
  const [currentNotes, setCurrentNotes] = useState(notes);

  const addNote = () => {
    setCurrentNotes((prevNotes) => [...prevNotes, { text: '' }]);
  };

  const handleNoteChange = (index, text) => {
    setCurrentNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes[index] = { ...updatedNotes[index], text };
      return updatedNotes;
    });
    onChange([...currentNotes]);
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
            value={note.text}
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

export default NoteButton;
