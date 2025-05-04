import React, { useState } from 'react';
import anime from 'animejs';

function SaveButton() {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setSaving(true);
    setMessage('Saving your story...');

    // Trigger anime.js animation
    anime({
      targets: '#save-animation',
      width: ['0%', '100%'], // Animate the width of the progress bar
      easing: 'easeInOutQuad',
      duration: 2000, // Animation duration in milliseconds
      complete: () => {
        setSaving(false);
        setMessage('Journal saved successfully!');
      },
    });
  };

  return (
    <div>
      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: saving ? 'not-allowed' : 'pointer',
        }}
      >
        {saving ? 'Saving...' : 'Save'}
      </button>

      <div
        style={{
          marginTop: '20px',
          width: '100%',
          height: '10px',
          backgroundColor: '#e0e0e0',
          borderRadius: '5px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          id="save-animation"
          style={{
            height: '100%',
            backgroundColor: '#4CAF50',
            width: '0%', // Initial width
            transition: 'width 0.3s ease',
          }}
        ></div>
      </div>

      {message && (
        <p
          style={{
            marginTop: '10px',
            color: saving ? '#007BFF' : '#4CAF50',
            fontWeight: 'bold',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default SaveButton;