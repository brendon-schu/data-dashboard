
import SidebarPanel from "@/components/SidebarPanel";

{/*
export default function AnimatedDecoratoin() {
    return (
        <SidebarPanel>
        moving stuff goes here
        </SidebarPanel>
    );
}
*/}

import React, { useEffect, useRef } from 'react';

export default function AmbientToy() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = canvas.width;
    const height = canvas.height;

    // Simple bouncing dot
    let x = 20, y = 20, dx = 2, dy = 2, radius = 10;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#66ccff';
      ctx.fill();

      // Move
      x += dx;
      y += dy;

      // Bounce
      if (x + radius > width || x - radius < 0) dx *= -1;
      if (y + radius > height || y - radius < 0) dy *= -1;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
	<SidebarPanel>
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      className="border border-gray-300 rounded bg-black"
    />
	</SidebarPanel>
  );
}

