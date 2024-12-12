"use client";

import styles from "./badge-viewer.module.scss";
import { useRef, useState, MouseEvent } from "react";
import BadgeTree from "@/components/badge-viewer/badge-tree/badge-tree";

import badges from "@/static/badges.json" assert { type: "json" };


export default function BadgeViewer() {
  const divRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({
      left: 0,
      top: 0,
      x: -1,
      y: -1,
    });
  
    const handleMouseDown = (e: MouseEvent) => {
      const div = divRef.current;
      if (!div) { return }
      
      setDragging(true);
      setStartPos({
        left: div.scrollLeft,
        top: div.scrollTop,
        x: e.clientX,
        y: e.clientY,
      });
      div.style.cursor = "grabbing";
    };
  
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) { return }
      const div = divRef.current;
      if (!div) { return }
  
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
  
      div.scrollTop = startPos.top - dy;
      div.scrollLeft = startPos.left - dx;
      div.style.userSelect = "none";
    };
  
    const handleMouseUp = () => {
      const div = divRef.current;
      if (!div) return
  
      div.style.cursor = "default";
      div.style.removeProperty("user-select");
      setDragging(false);
    };

  return (
    <div 
      className={styles.viewer}
      ref={divRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      { badges.map((tree, i) => <BadgeTree tree={tree} key={`tree_${i}`}/>) }
    </div>
  )
}