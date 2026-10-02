import { useState, useEffect } from "react";

const defaultImages = [
  { src: "/team-photo.jpeg", alt: "First Team in Action" },
  { src: "/dasara-champions.jpeg", alt: "Dasara Cup Champions" },
  { src: "/tournament-winners.jpeg", alt: "Tournament Winners" },
  { src: "/ksfa-stadium.jpeg", alt: "KSFA Stadium" },
  { src: "/c-division-prize.jpeg", alt: "C-Division League" },
];

export default function GalleryLightbox({ images = defaultImages }) {
  const [active, setActive] = useState(null);

  const close = () => setActive(null);
  const step = (dir) => {
    setActive((current) => (current + dir + images.length) % images.length);
  };

  useEffect(() => {
    if (active === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="gallery-lightbox-grid">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            className="gallery-lightbox-item"
            aria-label={`Open image: ${img.alt}`}
            onClick={() => setActive(i)}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            <span className="gallery-lightbox-zoom" aria-hidden="true">🔍</span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" onClick={close}>
          <button type="button" className="lightbox-close" aria-label="Close gallery" onClick={close}>
            ×
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
          >
            ←
          </button>
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={images[active].src} alt={images[active].alt} />
            <figcaption>{images[active].alt}</figcaption>
          </figure>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); step(1); }}
          >
            →
          </button>
          <div className="lightbox-counter">
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}