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
After saving, users can:
- **Generate Travel Video**:
  - Use **Remotion.dev** to create a short (5–10 second) animated video.
  - Animates canvas elements (text + images) entering the frame with motion effects.
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

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ratinto/travel-story.git
   cd travel-story
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```


---

## Hosted Demo

[View the live demo here](#)  
*https://travel-story-eight.vercel.app/*

---

## Approach

This project focuses on providing an intuitive and interactive design experience for users. Key principles include:

1. **Scalability**: Designed to handle various canvas layouts and export formats.
2. **Performance**: Optimized for smooth animations and quick response times.
3. **Accessibility**: Usable across a range of laptop resolutions and screen sizes.

---

Feel free to contribute to this project by submitting issues or pull requests! For any questions or support, please get in touch via the Issues section.

Happy journaling!