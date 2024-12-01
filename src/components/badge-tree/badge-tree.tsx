"use client";

import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./badge-tree.module.scss"
import { GiAbdominalArmor, GiAngelWings, GiBiceps, GiLegArmor, GiShoulderArmor, GiTimeTrap, GiTwoShadows } from "react-icons/gi";

type Node = {
  id?: number,  // If no id, it's a root node (name: chest, arms, core...)
  name: string,
  children: Node[],

  width?: number,
  ref?: RefObject<HTMLButtonElement>,
}

interface Badge {
  id: number,
  name: string,
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

const categoryIcons = new Map([
  ["chest", <GiShoulderArmor className={styles.chest}/>],
  ["arms", <GiBiceps/>],
  ["back", <GiAngelWings/>],
  ["legs", <GiLegArmor/>],
  ["core", <GiAbdominalArmor/>],
  ["consistency", <GiTimeTrap/>],
  ["social", <GiTwoShadows/>],
])

function createBadges(node: Node, col: number, row: number) {
  const badgeRef = useRef<HTMLButtonElement>(null); 

  const currentBadge = (
    <button 
      className={node.id ? styles.badge : styles.category} 
      style={{ gridColumnStart: col, gridRowStart: row }}
      ref={badgeRef}
      key={node.id || node.name}
      // @ts-ignore
      popovertarget="badge_menu"
    >
      {/* TOOLTIP */}
      {node.id && <span className={styles.tooltip}>{node.name}</span>}

      {node.id 
        // BADGE 
        ? <img src={`/badge-icons/${node.id}.svg`} alt={node.id.toString()} draggable={false}/>
        // CATEGORY
        : <div>
          {categoryIcons.get(node.name)}
          <h2>{node.name[0].toLocaleUpperCase() + node.name.slice(1)}</h2>
        </div> 
      }
    </button>
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

function addClickHandlers(node: Node, setBadgeOnMenu: Dispatch<SetStateAction<Badge | undefined>>) {
  if (!node.ref?.current) { return }

  if (node.id !== undefined) {
    node.ref.current.onclick = () => {
      setBadgeOnMenu({ id: node.id as number, name: node.name });
    }
  }

  for (const child of node.children) {
    addClickHandlers(child, setBadgeOnMenu);
  }
}

export default function BadgeTree({ tree }: { tree: Node }) {
  const width = computeWidth(tree);
  const cols = width * 2;
  
  const badges = createBadges(tree, cols / 2, 1);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [badgeOnMenu, setBadgeOnMenu] = useState<Badge>();
  addClickHandlers(tree, setBadgeOnMenu);

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
  }, [badges])

  return (
    <div className={styles.tree}>
      <div className={styles.badge_menu} id="badge_menu" popover="auto">
        {/* <img src={`/badge-icons/${badgeOnMenu?.id}.svg`} alt={badgeOnMenu?.id.toString()} draggable={false}/> */}
        {/* <h3>{badgeOnMenu?.name}</h3> */}
        MENU
      </div>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
      <div className={styles.grid} style={{gridTemplateColumns: `repeat(${cols}, 1fr)`}}>
        {badges}
      </div>
    </div>
  )
}