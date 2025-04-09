import React, { useEffect, useState } from "react";
import Map from "../assets/Map.svg?react";
import Display from "./Display";
import levels from "../CONSTANTS/LEVELS";

function MapContainer() {
  const [hoveredIslandId, setHoveredIslandId] = useState(null);

  const handleMouseEnter = (event) => {
    const islandId = parseInt(event.target.id.slice(-1));
    setHoveredIslandId(islandId);
    event.target.style.opacity = 0.5;

    const roads = document.querySelectorAll(`[id^='road']`);
    roads.forEach((road, index) => {
      const roadId = index + 1;
      if (roadId <= islandId) {
        road.style.stroke = "red";
      } else {
        road.style.stroke = "lightgray";
      }
    });
  };

  const handleMouseLeave = (event) => {
    setHoveredIslandId(null);
    event.target.style.opacity = 0;

    const roads = document.querySelectorAll(`[id^='road']`);
    roads.forEach((road) => {
      road.style.stroke = "lightgray";
    });
  };

  useEffect(() => {
    const islands = [...document.querySelectorAll(`[id^='island']`)];
    const roads = [...document.querySelectorAll(`[id^='road']`)];

    roads.forEach((road) => {
      road.style.stroke = "lightgray";
      road.style.transition = "stroke 0.3s ease";
    });

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
