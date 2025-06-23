import SidebarPanel from "@/components/SidebarPanel";
import React, { useEffect, useRef, useState } from 'react';

export default function AmbientPanel() {
    const [ambientPanel, setAmbientPanel] = useState('');
    const canvasRef = useRef(null);
    const animationRef = useRef(null); // shared cleanup ref

    useEffect(() => {
        const fetchData = async () => {
            const s_res = await fetch('/api/getsettings');
            const data = await s_res.json();
            setAmbientPanel(data.visual_panel || '');
        };
        fetchData();
    }, []);

    // Map effect name to function
    const effects = {
        'Bouncy Ball': (ctx, width, height) => {
            let x = 20, y = 20, dx = 2, dy = 2, radius = 10;

            const draw = () => {
                ctx.clearRect(0, 0, width, height);
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = '#66ccff';
                ctx.fill();

                x += dx;
                y += dy;
                if (x + radius > width || x - radius < 0) dx *= -1;
                if (y + radius > height || y - radius < 0) dy *= -1;

                animationRef.current = requestAnimationFrame(draw);
            };
            draw();
        },
        'Lightning': (ctx, width, height) => {
            const draw = () => {
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, width, height);
                ctx.strokeStyle = 'white';
                ctx.lineWidth = Math.random() * 2 + 1;

                ctx.beginPath();
                let x = width / 2;
                let y = 0;
                ctx.moveTo(x, y);
                for (let i = 0; i < 20; i++) {
                    x += (Math.random() - 0.5) * 40;
                    y += height / 20;
                    ctx.lineTo(x, y);
                }
                ctx.stroke();

                animationRef.current = setTimeout(draw, 200 + Math.random() * 800);
            };
            draw();
        },
		'Shapes': (ctx, width, height) => {
			const drawShape = () => {
				ctx.clearRect(0, 0, width, height);

				const shapeType = ['circle', 'rect', 'triangle'][Math.floor(Math.random() * 3)];
				const color = `hsl(${Math.random() * 360}, 80%, 60%)`;
				ctx.strokeStyle = color;
				ctx.lineWidth = 2;

				const x = Math.random() * width;
				const y = Math.random() * height;
				const size = 30 + Math.random() * 50;

				ctx.beginPath();
				if (shapeType === 'circle') {
					ctx.arc(x, y, size / 2, 0, Math.PI * 2);
				} else if (shapeType === 'rect') {
					ctx.rect(x - size / 2, y - size / 2, size, size);
				} else if (shapeType === 'triangle') {
					ctx.moveTo(x, y - size / 2);
					ctx.lineTo(x - size / 2, y + size / 2);
					ctx.lineTo(x + size / 2, y + size / 2);
					ctx.closePath();
				}

				ctx.stroke();
				animationRef.current = setTimeout(drawShape, 1000);
			};

			drawShape();
		}
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !effects[ambientPanel]) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear previous effect
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            clearTimeout(animationRef.current);
        }

        effects[ambientPanel](ctx, width, height);

        return () => {
            cancelAnimationFrame(animationRef.current);
            clearTimeout(animationRef.current);
        };
    }, [ambientPanel]);

    return (
        <SidebarPanel>
            {effects[ambientPanel] && (
                <canvas
                    ref={canvasRef}
                    width={200}
                    height={200}
                    className="border border-gray-300 rounded bg-black"
                />
            )}
        </SidebarPanel>
    );
}

