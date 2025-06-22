// "@mapbox/mapbox-gl-geocoder": "5.0.3",
// "mapbox-gl": "3.12.0"

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const TOKEN =
  "pk.eyJ1Ijoibm91dmFscnoiLCJhIjoiY2xnamhwdjhyMHI2cDNxbnZ6OW5oc2d0NSJ9.EnL9_Z49uEAmotdB2FGCBA";

export default function MapWithSearchAndAddress() {
  const mapDiv = useRef(null);
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lng: 106.8, lat: -6.2 });
  const [currentAddress, setCurrentAddress] = useState("Memuat alamat...");

  const reverseGeocode = async (lng, lat) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${TOKEN}`
      );
      const data = await res.json();
      if (data.features?.length > 0) {
        setCurrentAddress(data.features[0].place_name);
      } else {
        setCurrentAddress("Alamat tidak ditemukan");
      }
    } catch (err) {
      setCurrentAddress("Gagal mengambil alamat");
      console.error("Reverse geocoding error:", err);
    }
  };

  useEffect(() => {
    if (!mapDiv.current) return;

    mapboxgl.accessToken = TOKEN;

    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [center.lng, center.lat],
      zoom: 12,
    });

    mapRef.current = map;

    const geocoder = new MapboxGeocoder({
      accessToken: TOKEN,
      mapboxgl,
      marker: false,
      placeholder: "Cari lokasi...",
    });

    map.addControl(geocoder, "top-left");

    geocoder.on("result", (e) => {
      const [lng, lat] = e.result.center;
      map.flyTo({ center: [lng, lat], zoom: 14 });
      setCenter({ lng, lat });
      reverseGeocode(lng, lat);
    });

    map.on("moveend", () => {
      const c = map.getCenter();
      setCenter({ lng: c.lng, lat: c.lat });
      reverseGeocode(c.lng, c.lat);
    });

    reverseGeocode(center.lng, center.lat);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div ref={mapDiv} style={{ width: "100%", height: "100%" }} />

      {/* Marker + alamat */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        qwe
      >
        <img
          src="https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png"
          width={30}
          height={40}
          alt="Pin tengah"
        />
        <div
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            marginTop: "8px",
            maxWidth: "260px",
            boxShadow: "0 0 4px rgba(0,0,0,0.2)",
          }}
        >
          {currentAddress}
        </div>
      </div>
    </div>
  );
}
