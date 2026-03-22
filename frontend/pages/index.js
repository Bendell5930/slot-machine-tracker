import { useEffect, useState } from "react";
import MachineCard from "../components/MachineCard";
import HeatMeter from "../components/HeatMeter";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const [machines, setMachines] = useState([]);
  const [heatmap, setHeatmap] = useState({});
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const [machinesRes, heatRes] = await Promise.all([
        fetch(`${API_URL}/machines`),
        fetch(`${API_URL}/machines/heatmap`),
      ]);
      const machinesData = await machinesRes.json();
      const heatData = await heatRes.json();
      setMachines(machinesData);
      setHeatmap(heatData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "32px", maxWidth: "960px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "8px" }}>🎰 Slot Machine Tracker</h1>
      <p style={{ color: "#718096", marginBottom: "32px" }}>
        Real-time activity heat map — refreshes every 10 seconds
      </p>

      {loading ? (
        <p>Loading machines…</p>
      ) : machines.length === 0 ? (
        <p>No machines found. Add some machines to your Supabase database.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "16px",
          }}
        >
          {machines.map((machine) => (
            <div key={machine.id}>
              <MachineCard machine={machine} heatScore={heatmap[machine.id] || 0} />
              <HeatMeter score={heatmap[machine.id] || 0} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
