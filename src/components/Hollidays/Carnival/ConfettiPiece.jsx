// ConfettiPiece.jsx
import "./confetti.css";
export default function ConfettiPiece({
  variant = "rect",
  color = "#ff4ecb",
  id = "confetti"
}) {

  const shapes = {

    rect: (
      <rect
        x="0"
        y="0"
        width="14"
        height="8"
        rx="1.5"
      />
    ),

    circle: (
      <circle
        cx="5"
        cy="5"
        r="5"
      />
    ),

    triangle: (
      <polygon
        points="0,10 10,0 20,10"
      />
    ),

    curve: (
      <path
        d="
          M0 6
          C4 0, 10 12, 14 6
          S22 0, 28 6
        "
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    )
  };

  return (
    <svg
      viewBox="0 0 20 20"
      width="100%"
      height="100%"
      fill={color}
      stroke={color}
      id={id}
    >
      {shapes[variant]}
    </svg>
  );
}
