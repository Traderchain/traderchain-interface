import { useState, useEffect } from 'react';
import { VuiInput } from 'traderchain-ui';

export default function EditableText({ name, value, changeText }: any) {
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

  function handleKeyPress(e: any) {
    if (e.key === 'Enter') {
      submit();
    }
  }

  function submit() {
    setIsEditing(false);
    changeText(text);
  }

  return (
    <div>
      {isEditing ?
      <VuiInput id={`editable-text-${name}`} type="text" fontWeight="500" value={text} onChange={handleChange} onKeyDown={handleKeyPress} />
      : 
      <div onClick={handleEdit}>{text}</div>}
    </div>
  );
}
