import React from 'react';
import DraggableElement from './DraggableElement';

function Canvas({ elements, handleDragStop }) {
  return (
    <div
      id="canvas"
      style={{
        marginTop: '40px',
        width: '93%',
        height: '90vh',
        border: '2px dashed gray',
        position: 'relative',
        backgroundColor: '#fbf5f1',
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
        marginLeft: 'auto',
        marginRight: 'auto',
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
