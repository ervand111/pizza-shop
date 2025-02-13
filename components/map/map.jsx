"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const DynamicMap = dynamic(() => import("./MapComponent"), { ssr: false });

const Map = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <DynamicMap /> : <p>Loading map...</p>;
};

export default Map;
