import "./DashboardStats.css";

export default function DashboardStats({
available,
claimed,
total
}) {
  return (
    <div className="stats-grid">

      <div className="stat-card">
        <h3>Available</h3>
        <h1>{available}</h1>
      </div>

      <div className="stat-card">
        <h3>Claimed</h3>
        <h1>{claimed}</h1>
      </div>

      <div className="stat-card">
        <h3>Total Listings</h3>
        <h1>{total}</h1>
      </div>

    </div>
  );
}