export default function MachineCard({ machine, heatScore }) {
  const intensity = Math.min(heatScore || 0, 10);
  const bgColor = `rgba(255, ${Math.round(255 - intensity * 20)}, 0, ${0.2 + intensity * 0.08})`;

  return (
    <div
      style={{
        background: bgColor,
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        minWidth: "120px",
      }}
    >
      <h3 style={{ margin: "0 0 8px" }}>Machine {machine.id}</h3>
      <p style={{ margin: 0, fontSize: "0.85rem", color: "#555" }}>
        {machine.name || "Slot Machine"}
      </p>
      <p style={{ margin: "8px 0 0", fontWeight: "bold" }}>
        Heat: {heatScore || 0}
      </p>
    </div>
  );
}
