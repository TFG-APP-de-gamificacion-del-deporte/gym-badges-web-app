import { useEffect, useState } from "react";

export default function useDefaultImage() {
  const [image, setImage] = useState("");

  useEffect(() => {
    const getImg = async () => {
      setImage(await generateDefaultImage());
    }
    getImg();
  }, []);

  return image;
} 

function generateDefaultImage() {
  const SIZE = 128;
  const ICON_ASPECT_RATIO = 448 / 512

  const iconHeight = SIZE * 0.6;
  const iconWidth = SIZE * 0.6 * ICON_ASPECT_RATIO;
  const dx = (SIZE - iconWidth) / 2
  const dy = (SIZE - iconHeight) / 2

  const canvas = document.createElement("canvas")
  canvas.width = SIZE;
  canvas.height = SIZE;
  
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return "";
  }

  const radius = SIZE / 2;

  // Paint background circle
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, Math.PI * 2, true); // Outer circle
  ctx.fillStyle = generateRandomColor();
  ctx.fill();

  const img = new Image();

  // Convert the SVG string into a Blob and create an object URL
  const svgBlob = new Blob([SVG_STRING], { type: "image/svg+xml" });
  const svgUrl = URL.createObjectURL(svgBlob);
  
  return new Promise<string>((resolve, reject) => {
    // Set the image source to the SVG URL
    img.src = svgUrl;
    
    img.onload = () => {
      // Draw icon
      ctx.drawImage(img, dx, dy, iconWidth, iconHeight);

      // Generate base64 image
      const dataURL = canvas.toDataURL("image/png");
      const image_b64 = dataURL.split(",")[1];  // Exclude the "data:image/*;base64," prefix
      
      resolve(image_b64);
    };

    img.onerror = (error) => {
      reject(new Error("Error loading the SVG"));
    };
  });
}

function generateRandomColor() {
  const red = [178, 22, 22];
  const purple = [140, 25, 231];
  
  // Random color between red and purple
  const pictureColor = [
    Math.floor(Math.random() * Math.abs(red[0] - purple[0]) + Math.min(red[0], purple[0])),
    Math.floor(Math.random() * Math.abs(red[1] - purple[1]) + Math.min(red[1], purple[1])),
    Math.floor(Math.random() * Math.abs(red[2] - purple[2]) + Math.min(red[2], purple[2])),
  ]
  
  return `rgb(${pictureColor[0]}, ${pictureColor[1]}, ${pictureColor[2]})`;
}

// eslint-disable-next-line quotes
const SVG_STRING = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>`
