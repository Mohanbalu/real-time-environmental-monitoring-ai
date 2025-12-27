const AlertItem = ({ alert }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "8px", marginBottom: "6px" }}>
      <div>{new Date(alert.createdAt).toLocaleString()}</div>
      <div>{alert.reasons.join(", ")}</div>
    </div>
  );
};

export default AlertItem;
