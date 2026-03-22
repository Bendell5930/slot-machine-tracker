export default function HeatMeter({ score, max = 10 }) {
  const pct = Math.min((score / max) * 100, 100);
  const color =
    pct > 70 ? "#e53e3e" : pct > 40 ? "#dd6b20" : "#38a169";

  return (
    <div style={{ width: "100%", marginTop: "8px" }}>
      <div
        style={{
          height: "12px",
          borderRadius: "6px",
          background: "#e2e8f0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            transition: "width 0.4s ease",
          }}
        />
      </div>
      <p style={{ fontSize: "0.75rem", color: "#718096", marginTop: "4px" }}>
        Activity: {score} / {max}
      </p>
    </div>
  );
}
