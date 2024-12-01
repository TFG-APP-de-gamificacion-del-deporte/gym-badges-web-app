"use client";

import { RefObject, useEffect, useRef } from "react";
import styles from "./badge-tree.module.scss"

type Node = {
  id?: number,  // If no id, its a root node (name: chest, arms, core...)
  name: string,
  children: Node[],

  width?: number,
  ref?: RefObject<HTMLDivElement>,
}

function computeWidth(node: Node) {
  if (node.children.length === 0) {
    node.width = 1;
    return 1
  }

  let width = 0;
  let depth = 0;
  for (const child of node.children) {
    const cWidth = computeWidth(child);
    width += cWidth;
    depth = Math.max(depth);
  }
  node.width = width;

  return width;
}

function createBadges(node: Node, col: number, row: number) {
  const badgeRef = useRef<HTMLDivElement>(null); 
  
  const currentBadge = (
    <div 
      className={node.id ? styles.badge : styles.category} 
      style={{ gridColumnStart: col, gridRowStart: row }}
      ref={badgeRef}
      key={node.id || node.name}
    >
      {node.id 
        ? <img src={`/badge-icons/${node.id}.svg`} alt={node.id.toString()} draggable={false}/>
        : <h2>{node.name[0].toLocaleUpperCase() + node.name.slice(1)}</h2>
      }
    </div>
  )

  node.ref = badgeRef;  // Save ref to draw lines later

  let badges = [currentBadge];
  
  let childCol = col - (node.width as number);
  
  for (const child of node.children) {
    childCol += child.width as number;  // Make room on the left
    badges.push(...createBadges(child, childCol, row + 1));
    childCol += child.width as number;  // Make room on the right
  }

  return badges;
}

function drawLines(node: Node, canvasCtx: CanvasRenderingContext2D) {
  if (!node.ref?.current) {
    return;
  }

  const badge = node.ref.current;
  
  // Get bottom center coords of parent badge
  const x = badge.offsetLeft + badge.offsetWidth / 2;
  const y = badge.offsetTop + badge.offsetHeight - 1;

  for (const child of node.children) {
    if (!child.ref?.current) { return }
    const childBadge = child.ref.current;

    // Get top center coords of parent badge
    const childX = childBadge.offsetLeft + childBadge.offsetWidth / 2;
    const childY = childBadge.offsetTop;

    // Draw line
    canvasCtx.beginPath();
    canvasCtx.moveTo(x, y);
    canvasCtx.lineTo(childX, childY);
    canvasCtx.stroke();

    drawLines(child, canvasCtx);
  }
}

export default function BadgeTree({ tree }: { tree: Node }) {
  const width = computeWidth(tree);
  const cols = width * 2;
  
  const badgeDivs = createBadges(tree, cols / 2, 1);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) { return }
    const canvas = canvasRef.current;

    // Set canvas size to its css size (100% width and height)
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) { return }

    // Set lines style
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgba(255, 255, 255, 0.5)";

    drawLines(tree, canvasCtx);
  }, [])

  return (
    <div className={styles.tree}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
      <div className={styles.grid} style={{gridTemplateColumns: `repeat(${cols}, 1fr)`}}>
        {badgeDivs}
      </div>
    </div>
  )
}