import type { CSSProperties } from "react";
/** Abstract dimensional artwork, not a project screenshot or measured data. */
export function ProjectArtwork({ index = 0 }: { index?: number }) {
  const variant = index % 3;
  return (
    <div className={`project-artwork artwork-${variant}`} aria-hidden="true">
      {variant === 0 ? (
        <div className="billing-art">
          {Array.from({ length: 7 }, (_, i) => (
            <i key={i} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
      ) : variant === 1 ? (
        <div className="signal-art">
          {Array.from({ length: 19 }, (_, i) => (
            <i
              key={i}
              style={{
                height: `${25 + Math.sin(i * 0.7) * 20 + Math.sin(i * 0.3) * 55}%`,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="arch-art">
          <i />
          <i />
          <i />
          <i />
        </div>
      )}
    </div>
  );
}
