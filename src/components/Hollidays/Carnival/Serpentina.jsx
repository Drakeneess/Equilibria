export default function Serpentina({
  variant = "main",
  color = "#c89b3c"
}) {

  const paths = {
    main: `
      M80 0
      C30 30, 30 70, 80 100
      C130 130, 130 170, 80 200
      C30 230, 30 270, 80 300
      C130 330, 130 370, 80 400
      L110 400
      C160 370, 160 330, 110 300
      C60 270, 60 230, 110 200
      C160 170, 160 130, 110 100
      C60 70, 60 30, 110 0
      Z
    `,
    soft: `
      M70 0
      C25 30, 25 70, 70 110
      C115 150, 115 190, 70 230
      L95 230
      C140 190, 140 150, 95 110
      C50 70, 50 30, 95 0
      Z
    `,
    fragment: `
      M70 0
      C30 25, 30 55, 70 75
      C110 95, 110 125, 70 145
      L95 145
      C135 125, 135 95, 95 75
      C55 55, 55 25, 95 0
      Z
    `
  };

  return (
    <svg
      viewBox="0 0 160 420"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
    >

      <defs>

        {/* 🌫️ Gradiente papel mate */}
        <linearGradient id={`paper-${variant}-${color}`} x1="0" y1="0" x2="1" y2="0">

          {/* Sombra lateral */}
          <stop offset="0%" stopColor="#b4b4b449" />

          {/* Color base con ligera variación */}
          <stop offset="15%" stopColor={color} />
          <stop offset="70%" stopColor={color} />

          {/* Decoloración leve */}
          <stop offset="96%" stopColor="#efefef70" />

          {/* Sombra opuesta */}
          <stop offset="100%" stopColor={color} />

        </linearGradient>

      </defs>

      <path
        d={paths[variant]}
        fill={`url(#paper-${variant}-${color})`}
      />

    </svg>
  );
}
