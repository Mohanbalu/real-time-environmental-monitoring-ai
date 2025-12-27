import { useEffect } from "react";
import socket from "../sockets/socket";

const useSocket = (event, handler) => {
  useEffect(() => {
    socket.on(event, handler);
    return () => socket.off(event, handler);
  }, [event, handler]);
};

export default useSocket;
