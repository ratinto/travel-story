import React from 'react';
import DraggableElement from './DraggableElement';

function Canvas({ elements, handleDragStop }) {
  return (
    <div
      id="canvas"
      style={{
        marginTop: '20px',
        width: '93%',
        height: '90vh',
        border: '2px dashed gray',
        position: 'relative',
        backgroundColor: "#fbf5f1",
        marginLeft:'auto',
        marginRight:"auto",
      }}
    >
      {elements.map((element, index) => (
        <DraggableElement
          key={index}
          element={element}
          index={index}
          handleDragStop={handleDragStop}
        />
      ))}
    </div>
  );
}

export default Canvas;
