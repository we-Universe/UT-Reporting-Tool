import React, { useState } from 'react';

// material-ui
import { TextareaAutosize } from '@mui/material';

const NoteButton = () => {
  const [textareaValue, setTextareaValue] = useState('');

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  return (
    <>
      <TextareaAutosize
        style={{ minHeight: '5rem', width: '100%', fontSize: '14px' }}
        aria-label="minimum height"
        minRows={1}
        placeholder="Type your note here..."
        value={textareaValue}
        onChange={handleTextareaChange}
      />
    </>
  );
};

export default NoteButton;