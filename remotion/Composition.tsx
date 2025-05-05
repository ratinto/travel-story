import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';
import data from './data/canvas-data.json';
import React from 'react';

export const MyComposition = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {data.elements.map((el, index) => {
        const fadeInDuration = 15; // Duration to fade in
        const delay = index * 10; // Stagger the fade-in for each element

        const style = {
          position: 'absolute',
          left: el.position.x,
          top: el.position.y,
          opacity: interpolate(frame - delay, [0, fadeInDuration], [0, 1]),
        };

        if (el.type === 'text') {
          return (
            <div key={index} style={{ ...style, fontSize: 32 }}>
              {el.content}
            </div>
          );
        }

        if (el.type === 'image') {
          return (
            <Img
              key={index}
              src={el.url || el.src}
              style={{ ...style, width: 200, height: 'auto' }}
            />
          );
        }

        return null;
      })}
    </AbsoluteFill>
  );
};
