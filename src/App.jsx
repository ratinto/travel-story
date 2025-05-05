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



  const handleExport = () => {
    const cleanedElements = elements.map(({ nodeRef, ...rest }) => rest);
  
    const canvasData = {
      elements: cleanedElements,
    };
  
    const blob = new Blob([JSON.stringify(canvasData, null, 2)], {
      type: "application/json",
    });
  
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "canvas-data.json";
    link.click();
  
    alert("File downloaded. Now place it inside remotion/data/");
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
      
      <div style={{
            opacity: 100,
            transform: "scale(0.8)",
            position: "fixed",
            top: "90%",
            left: "85%",
            backgroundColor: "#d4edda",
            padding: "20px 30px",
            borderRadius: "10px",
            color: "#155724",
            fontWeight: "bold",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            zIndex: 10000,
          }}>
      <button style={{border:"none", background:"transparent", color:'grey',fontSize:'15px'}} onClick={handleExport}>Export Canvas to Video</button>
    </div>
    </>
  );
}

export default App;