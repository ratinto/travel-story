import React, { useState } from "react";
import { FaPlus, FaImage, FaFont, FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import SaveAnimation from "./SaveAnimation";

function Toolbar({
  textInput,
  setTextInput,
  handleAddText,
  handleImageUpload,
  elements,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - toolbarPosition.x,
      y: e.clientY - toolbarPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setToolbarPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const exportToPDF = () => {
    const canvasElement = document.getElementById("canvas");

    html2canvas(canvasElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdfWidth = 595;
      const pdfHeight = 842;

      const pdf = new jsPDF({
        unit: "px",
        format: [pdfWidth, pdfHeight],
      });

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const scaleX = pdfWidth / canvasWidth;
      const scaleY = pdfHeight / canvasHeight;

      const scale = Math.min(scaleX, scaleY);

      const imgWidth = canvasWidth * scale;
      const imgHeight = canvasHeight * scale;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      pdf.save("canvas-content.pdf");
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        left: "50%",

        background: "#FBF5F1",
        borderRadius: "100px",
        padding: "1px",
        paddingRight:"16px",
        paddingLeft:'16px',
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        display: "flex",
        gap: "20px",
        alignItems: "center",

        zIndex: 9999,
        transform: `translate(${toolbarPosition.x}px, ${toolbarPosition.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaFont color="#C3C9CE" title="Enter Text" />
        <textarea
          placeholder="Enter text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          rows={2}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #555",
            outline: "none",
            background: "#2b2b2b",
            color: "white",
            resize: "none",
          }}
        />

        <button
          onClick={handleAddText}
          style={{
            background: "#4CAF50",
            border: "none",
            padding: "10px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          title="Add Text"
        >
          <FaPlus color="white" />
        </button>
      </div>
      <label
        htmlFor="imageUpload"
        style={{
          background: "#2196F3",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        title="Upload Image"
      >
        <FaImage color="white" />
      </label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      <div style={{ position: "relative", top: "-20px" }}>
        <SaveAnimation />
      </div>

      <button
        onClick={exportToPDF}
        style={{
          background: "#e74c3c",
          border: "none",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        title="Export to PDF"
      >
        <FaFilePdf color="white" />
      </button>
    </div>
  );
}

export default Toolbar;
