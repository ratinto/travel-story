import { Composition } from 'remotion';
import { MyComposition } from './Composition';
import React from 'react';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
