import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { VuiBox, VuiTypography } from 'traderchain-ui';

export default function EditableTextarea({ name, value, changeText }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value || '');

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  function handleChange(e: any) {
    setText(e.target.value);
  }

  function submit() {
    setIsEditing(false);
    changeText(text);
  }

  return (
    <VuiBox>
      {isEditing ?
      <VuiBox>
        <TextField id={`editable-textarea-${name}`} variant="outlined" multiline value={text} onChange={handleChange} sx={{ width: "100%" }} />
        <Button variant="outlined" size="small" endIcon={<CheckIcon />} onClick={submit}>Confirm</Button>
      </VuiBox>
      :       
      <VuiTypography color="text" height="180px" variant="h6" onClick={handleEdit} sx={{ lineHeight: "150%" }}>{text}</VuiTypography>
      }
    </VuiBox>
  );
}
