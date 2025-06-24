"use client";

import { useEffect, useRef } from "react";

const GlowCard = ({ children, identifier }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !containerRef.current ||
      !cardRef.current
    )
      return;

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const CARD = cardRef.current;
    const CONTAINER = containerRef.current;

    const restyle = () => {
      CONTAINER.style.setProperty("--gap", CONFIG.gap);
      CONTAINER.style.setProperty("--blur", CONFIG.blur);
      CONTAINER.style.setProperty("--spread", CONFIG.spread);
      CONTAINER.style.setProperty(
        "--direction",
        CONFIG.vertical ? "column" : "row"
      );
    };

    const update = (event) => {
      const bounds = CARD.getBoundingClientRect();

      const withinX =
        event.x > bounds.left - CONFIG.proximity &&
        event.x < bounds.right + CONFIG.proximity;
      const withinY =
        event.y > bounds.top - CONFIG.proximity &&
        event.y < bounds.bottom + CONFIG.proximity;

      CARD.style.setProperty("--active", withinX && withinY ? 1 : CONFIG.opacity);

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      let angle = (Math.atan2(event.y - centerY, event.x - centerX) * 180) / Math.PI;

      if (angle < 0) angle += 360;
      CARD.style.setProperty("--start", angle + 90);
    };

    // 💥 Verifica que estamos en un entorno con `document`
    if (typeof document !== "undefined") {
      document.body.addEventListener("pointermove", update, { passive: true });
    }

    restyle();
    update({ x: 0, y: 0 }); // Inicializa el efecto

    return () => {
      if (typeof document !== "undefined") {
        document.body.removeEventListener("pointermove", update);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`glow-container-${identifier} glow-container`}>
      <article
        ref={cardRef}
        className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}
      >
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
