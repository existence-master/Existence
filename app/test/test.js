"use client";

import { useEffect, useState } from "react";

const test = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.pageX;
      const y = event.pageY;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Access mousePosition.x and mousePosition.y in your component */}
      <p>Mouse X: {mousePosition.x}</p>
      <p>Mouse Y: {mousePosition.y}</p>

      {/* Render the glow effect div */}
      <div
        className="glow-effect"
        style={{
          position: "absolute",
          top: mousePosition.y,
          left: mousePosition.x,
          width: "20px", // Adjust width and height as needed
          height: "20px",
          borderRadius: "50%", // Makes the div circular
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust glow color and opacity as needed
          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.5)", // Adjust glow effect as needed
          pointerEvents: "none", // Ensures the div does not intercept mouse events
          zIndex: 9999, // Ensures the div appears on top of other elements
        }}
      />
    </div>
  );
};

export default test;
