import React, { useEffect, useState } from "react";
import Map from "../assets/Map.svg?react";
import Display from "./Display";
import levels from "../CONSTANTS/LEVELS";

function MapContainer() {
  const [hoveredIslandId, setHoveredIslandId] = useState(null);

  const handleMouseEnter = (event) => {
    setHoveredIslandId(event.target.id.slice(-1));
    event.target.style.opacity = 0.5;
  };

  const handleMouseLeave = (event) => {
    setHoveredIslandId(null);
    event.target.style.opacity = 0;
  };

  useEffect(() => {
    const islands = [...document.querySelectorAll(`[id^='island']`)];

    islands.forEach((island) => {
      island.addEventListener("mouseenter", handleMouseEnter);
      island.addEventListener("mouseleave", handleMouseLeave);
      island.style.opacity = 0;
    });

    return () => {
      islands.forEach((island) => {
        island.removeEventListener("mouseenter", handleMouseEnter);
        island.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div>
      <div style={{ width: "100vw" }} className="map-container">
        <Map width="90%" height="auto" />
      </div>
      {hoveredIslandId !== null && (
        <Display
          id={hoveredIslandId}
          description={levels[hoveredIslandId]?.description}
          position={hoveredIslandId === "4" ? "right" : "left"}
          title={levels[hoveredIslandId].title}
        />
      )}
    </div>
  );
}

export default MapContainer;
