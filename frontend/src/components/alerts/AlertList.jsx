import { useEffect, useState } from "react";
import { fetchAlerts } from "../../api/alert.api";
import AlertItem from "./AlertItem";

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts().then(setAlerts);
  }, []);

  return (
    <div>
      {alerts.map((alert) => (
        <AlertItem key={alert._id} alert={alert} />
      ))}
    </div>
  );
};

export default AlertList;
