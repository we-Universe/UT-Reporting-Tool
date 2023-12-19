import React, { useState } from 'react';
import { IconButton, TextareaAutosize, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const NoteButton = () => {
  const [textareas, setTextareas] = useState(['']); 

  const addTextarea = () => {
    setTextareas([...textareas, '']);
  };

  const handleTextareaChange = (index, value) => {
    const updatedTextareas = [...textareas];
    updatedTextareas[index] = value;
    setTextareas(updatedTextareas);
  };

  return (
    <Grid container spacing={1} alignItems="center">
      {textareas.map((value, index) => (
        <Grid item key={index}>
          <TextareaAutosize
            style={{ minHeight: '5rem', width: '20.7rem', fontSize: '14px', border: 'none', resize: 'none' }}
            aria-label="minimum height"
            minRows={1}
            placeholder="Type your note here..."
            value={value}
            onChange={(e) => handleTextareaChange(index, e.target.value)}
          />
        </Grid>
      ))}
      <Grid item>
        <IconButton onClick={addTextarea} color="primary">
          <AddIcon sx={{ color: "#0B3782" }}/>
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default NoteButton;