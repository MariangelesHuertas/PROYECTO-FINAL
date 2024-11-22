import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface props {
  mode?: 'createOffers' | 'killerQuestions',
  placeholder?: string,
  setFieldValue?: any
}

const Ckeditor: React.FC<props> = ({ 
  mode = 'createOffers', 
  placeholder,
  setFieldValue
}) => {
  const [text, setText] = useState(''); 

  const toolbarOptions = {
    createOffers: [
      [{ 'font': [] }, { 'align': [] }],
      [{ 'color': [] }, { 'background': [] }], 
      ['bold', 'italic', 'underline', 'strike'],  
      [{ 'list': 'bullet'}, { 'list': 'ordered' }],
      ['link', 'image', 'blockquote', 'code-block'],
      ['clean'], 
      [{ 'undo': 'undo' }, { 'redo': 'redo' }],
    ],
    killerQuestions: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'bullet'}, { 'list': 'ordered' }],
      ['link', 'image', 'blockquote']
    ],
  };

  const editorStyle = mode === 'createOffers' ? { height: '156px' } : {};

  return (
    <div>
      <ReactQuill 
        value={text}
        onChange={(e) => {         
          setText(e);
          setFieldValue("descripcion", e)
        }}
        modules={{
          toolbar: toolbarOptions[mode]
        }}
        placeholder={placeholder || "Ofrece información detallada y específica sobre los requerimientos del puesto..."}
        style={editorStyle}
      />
    </div>
  );
};

export default Ckeditor;
