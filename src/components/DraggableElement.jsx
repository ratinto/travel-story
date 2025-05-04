import React from 'react';
import Draggable from 'react-draggable';

function DraggableElement({ element, index, handleDragStop }) {
  return (
    <Draggable
      key={index}
      position={element.position}
      onStop={(e, data) => handleDragStop(e, data, index)}
      nodeRef={element.nodeRef}
      bounds="parent"
    >
      {element.type === 'text' ? (
        <div
          ref={element.nodeRef}
          style={{
            fontSize: '18px',
            background: 'white',
            padding: '5px 10px',
            border: '1px solid #ccc',
            cursor: 'move',
            userSelect: 'none',
            position: 'absolute',
          }}
        >
          {element.content}
        </div>
      ) : (
        <img
          ref={element.nodeRef}
          src={element.url}
          alt="uploaded"
          style={{
            maxWidth: '100px',
            cursor: 'move',
            border: '1px solid #ccc',
            position: 'absolute',
          }}
        />
      )}
    </Draggable>
  );
}

export default DraggableElement;