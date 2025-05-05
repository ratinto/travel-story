
# TravelStory

TravelStory is a web application designed to let users create interactive travel journals. Users can freely place images and text on a full-screen canvas, save their work with smooth animations, and export it as an animated video or a downloadable PDF.

---

## Features

### 1. Travel Journal Canvas
- A blank canvas where users can:
  - **Upload Images**: Add photos to the canvas.
  - **Add Text Blocks**: Editable font size, color, and content.
  - **Drag-and-Drop Layout**: Freely position all elements across the canvas.

### 2. Save Animation
- On clicking "Save," an **anime.js animation** is triggered:
  - Animated progress bar.
  - Smooth fade or scale effects.
  - A confirmation message: "Journal saved successfully!"

### 3. Export Options
- **Generate Travel Video**:
  - Use **[Remotion.dev](https://remotion.dev)** to create a short (5–10 second) animated video.
  - Animates canvas elements (text + images) entering the frame with **fade-in** effects.
  - Automatically pulls data from `canvas-data.json`.
  - Generate the video using:
    ```bash
    npx remotion render remotion/index.ts TravelComp out/travel-journal.mp4
    ```
- **Export as PDF**:
  - Capture the current canvas layout and export it as a PDF file.

---

## Technical Stack

- **Frontend**: React, TypeScript, HTML, CSS, anime.js.
- **Video Generation**: [Remotion.dev](https://remotion.dev) for animated video exports.
- **PDF Export**: Canvas-to-PDF functionality.
- **Styling and Responsiveness**:
  - Fully responsive for 13”–15” laptop screens.
  - Smooth UI transitions with anime.js.

---

## Setup Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/ratinto/travel-story.git
cd travel-story
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm start
```

### 4. Build for Production
```bash
npm run build
```

### 5. Run Tests (if applicable)
```bash
npm test
```

---

## 🎬 Remotion Setup for Video Generation

1. **Install Remotion**:
   ```bash
   npm install remotion --save
   ```

2. **Create a `/remotion` Folder** and add the following files:

```
/remotion
├── Composition.tsx
├── Root.tsx
└── index.ts
```

### Composition.tsx
```tsx
import {interpolate, useCurrentFrame} from 'remotion';
import {Img} from 'remotion';
import {useEffect, useState} from 'react';

export const TravelComp = () => {
  const frame = useCurrentFrame();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/canvas-data.json')
      .then(res => res.json())
      .then(json => setData(json.elements));
  }, []);

  return (
    <>
      {data.map((el, index) => {
        if (el.type === 'text') {
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: el.position.x,
                top: el.position.y,
                fontSize: 40,
                opacity: interpolate(frame, [0, 30], [0, 1]),
              }}
            >
              {el.content}
            </div>
          );
        }
        if (el.type === 'image') {
          return (
            <Img
              key={index}
              src={el.url || el.src}
              style={{
                position: 'absolute',
                left: el.position.x,
                top: el.position.y,
                width: 200,
                height: 'auto',
                opacity: interpolate(frame, [0, 30], [0, 1]),
              }}
            />
          );
        }
        return null;
      })}
    </>
  );
};
```

### Root.tsx
```tsx
import {Composition} from 'remotion';
import {TravelComp} from './Composition';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="TravelComp"
        component={TravelComp}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
```

### index.ts
```ts
import {registerRoot} from 'remotion';
import {RemotionRoot} from './Root';

registerRoot(RemotionRoot);
```

### 🎥 Generate the Video
```bash
npx remotion render remotion/index.ts TravelComp out/travel-journal.mp4
```

---

## Hosted Demo

[View the live demo here](#)  
*Note: Replace this placeholder with your actual deployed link.*

---

## Contribution

Feel free to contribute by submitting issues or pull requests. For support, create an issue in this repo.

Happy journaling! 🗺️✨
