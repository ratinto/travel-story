import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import SaveAnimation from './components/SaveAnimation';



function App() {
  const [elements, setElements] = useState([]);
  const [textInput, setTextInput] = useState('');

  const getRandomPosition = () => {
    const x = Math.floor(Math.random() * 500);
    const y = Math.floor(Math.random() * 300);
    return { x, y };
  };

  const handleAddText = () => {
    if (!textInput.trim()) return;
    const position = getRandomPosition();
    setElements([
      ...elements,
      { type: 'text', content: textInput, position, nodeRef: React.createRef() },
    ]);
    setTextInput('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const position = getRandomPosition();
      setElements([
        ...elements,
        { type: 'image', url: reader.result, position, nodeRef: React.createRef() },
      ]);
    };
    reader.readAsDataURL(file);
  };

  const handleDragStop = (e, data, index) => {
    setElements((prevElements) =>
      prevElements.map((el, idx) =>
        idx === index
          ? {
              ...el,
              position: { x: data.x, y: data.y },
            }
          : el
      )
    );
  };



  return (
    <>
    {/* <SaveAnimation /> */}

      <Toolbar
        textInput={textInput}
        setTextInput={setTextInput}
        handleAddText={handleAddText}
        handleImageUpload={handleImageUpload}
      />
      <Canvas elements={elements} handleDragStop={handleDragStop} />
      
      
    </>
  );
}

export default App;