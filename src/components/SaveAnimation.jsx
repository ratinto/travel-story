import { animate, createSpring } from "animejs";
import React, { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";

function SaveAnimation() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setSaved(false);

    animate(".save-button", {
      scale: [
        { to: 0.95, duration: 100 },
        { to: 1, duration: 200, easing: createSpring({ stiffness: 400 }) },
      ],
    });

    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 5000);
  };

  useEffect(() => {
    if (saving) {
      try {
        animate(".progress-bar", {
          width: ["0%", "100%"],
          duration: 5000,
          easing: "inOut(2)",
        });

        animate(".progress-bar", {
          scaleX: [
            { to: 1.1, duration: 100 },
            { to: 1, duration: 200, easing: createSpring({ stiffness: 300 }) },
          ],
          delay: 2000,
        });
      } catch (error) {
        console.error("Error animating progress bar:", error);
      }
    }
  }, [saving]);

  useEffect(() => {
    if (saved) {
      try {
        animate(".success-message", {
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [
            { to: 1.25, duration: 200, ease: "inOut(3)" },
            { to: 1, ease: createSpring({ stiffness: 300 }) },
          ],
        });

        const timeout = setTimeout(() => {
          setSaved(false);
        }, 3000);

        return () => clearTimeout(timeout);
      } catch (error) {
        console.error("Error animating success message:", error);
      }
    }
  }, [saved]);

  return (
    <div
      style={{ textAlign: "center", marginTop: "40px", position: "relative" }}
    >
      <button
        onClick={handleSave}
        disabled={saving}
        className="save-button"
        style={{
          background: "#e74c3c",
          border: "none",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        <FaSave color="white" />
        {/* {saving ? "Saving..." : "Save"} */}
      </button>

      {saving && (
        <div
          className="overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(5px)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            className="progress-bar"
            style={{
              width: "0%",
              height: "10px",
              backgroundColor: "#4caf50",
              borderRadius: "5px",
              transition: "width 0.3s ease",
              maxWidth: "60%",
            }}
          ></div>
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            Saving your story...
          </p>
        </div>
      )}

      {saved && (
        <p
          className="success-message"
          style={{
            opacity: 0,
            transform: "scale(0.8)",
            position: "fixed",
            top: "50%",
            left: "50%",
            backgroundColor: "#d4edda",
            padding: "20px 30px",
            borderRadius: "10px",
            color: "#155724",
            fontWeight: "bold",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            zIndex: 10000,
          }}
        >
          ✅ Journal saved successfully!
        </p>
      )}
    </div>
  );
}

export default SaveAnimation;
