"use client";

import { RefObject, useEffect, useRef } from "react";
import styles from "./badge-tree.module.scss"
import { GiAbdominalArmor, GiAngelWings, GiBiceps, GiLegArmor, GiShoulderArmor, GiTimeTrap, GiTwoShadows } from "react-icons/gi";
import Badge from "@/components/badge/badge";
import useMobileScreen from "@/utils/useMobileScreen";
import { BadgeInfo } from "@/api/models";

interface Node extends BadgeInfo {
  children: Node[],
  width?: number,
  ref?: RefObject<HTMLDivElement>,
}

const categoryIcons = new Map([
  ["chest", <GiShoulderArmor className={styles.chest} key=""/>],
  ["arms", <GiBiceps key=""/>],
  ["back", <GiAngelWings key=""/>],
  ["legs", <GiLegArmor key=""/>],
  ["core", <GiAbdominalArmor key=""/>],
  ["consistency", <GiTimeTrap key=""/>],
  ["social", <GiTwoShadows key=""/>],
])

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

function drawLines(node: Node, canvasCtx: CanvasRenderingContext2D) {
  if (!node.ref?.current) {
    return;
  }

  const nodeDiv = node.ref.current;
  
  // Get bottom center coords of parent badge
  const x = nodeDiv.offsetLeft + nodeDiv.offsetWidth / 2;
  const y = nodeDiv.offsetTop + nodeDiv.offsetHeight - 1;

  for (const child of node.children) {
    if (!child.ref?.current) { return }
    const childNodeDiv = child.ref.current;

    // Get top center coords of parent badge
    const childX = childNodeDiv.offsetLeft + childNodeDiv.offsetWidth / 2;
    const childY = childNodeDiv.offsetTop;

    // Draw line
    canvasCtx.beginPath();
    canvasCtx.moveTo(x, y);
    canvasCtx.lineTo(childX, childY);
    canvasCtx.stroke();

    drawLines(child, canvasCtx);
  }
}

export default function BadgeTree({ tree, addTopFeatsMode=false }: { tree: Node, addTopFeatsMode?: boolean }) {

  function createNodes(node: Node, col: number, row: number) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const nodeRef = useRef<HTMLDivElement>(null); 
  
    const nodeDiv = (
      <div className={styles.node} style={{ gridColumnStart: col, gridRowStart: row }} ref={nodeRef} key={node.id || node.name}>
        { node.id > 0
          ? <Badge badgeInfo={node} addTopFeatsMode={addTopFeatsMode} tooltip={!addTopFeatsMode}/>
          : <div className={styles.category}>
              {categoryIcons.get(node.name)}
              <h2>{node.name[0].toLocaleUpperCase() + node.name.slice(1)}</h2>
            </div>
        }
      </div>
    )
  
    node.ref = nodeRef;  // Save ref to draw lines later
  
    let nodes = [nodeDiv];
    
    let childCol = col - (node.width as number);
    
    for (const child of node.children) {
      childCol += child.width as number;  // Make room on the left
      child.parentAchieved = node.achieved
      node.childAchieved = node.childAchieved || child.achieved
      nodes.push(...createNodes(child, childCol, row + 1));
      childCol += child.width as number;  // Make room on the right
    }
  
    return nodes;
  }

  const width = computeWidth(tree);
  const cols = width * 2;
  
  const nodeDivs = createNodes(tree, cols / 2, 1);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isMobile = useMobileScreen();
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
  }, [isMobile, tree])  // Re-draw lines when layout changes

  return (
    <div className={styles.tree}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
      <div className={styles.grid} style={{gridTemplateColumns: `repeat(${cols}, 1fr)`}}>
        {nodeDivs}
      </div>
    </div>
  )
}