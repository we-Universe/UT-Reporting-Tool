import React, { useState, useEffect } from 'react';
import { IconButton, TextareaAutosize, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const NoteButton = ({ value }) => {
  const [textareas, setTextareas] = useState(Array.isArray(value) ? value : [value]); 

  const addTextarea = () => {
    setTextareas([...textareas, '']);
  };

  const handleTextareaChange = (index, value) => {
    const updatedTextareas = [...textareas];
    updatedTextareas[index] = value;
    setTextareas(updatedTextareas);
  };

  useEffect(() => {
    if (typeof value === 'string') {
      setTextareas(value.split('\n'));
    } else {
      setTextareas(value || ['']);
    }
  }, [value]);

  return (
    <Grid container spacing={1} alignItems="center">
      {textareas.map((textarea, index) => (
        <Grid item key={index}>
          <TextareaAutosize
            style={{ minHeight: '5rem', width: '20.7rem', fontSize: '14px', border: 'none', resize: 'none', color: "#0B3782" }}
            aria-label="minimum height"
            minRows={1}
            placeholder="Type your note here..."
            value={textarea}
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