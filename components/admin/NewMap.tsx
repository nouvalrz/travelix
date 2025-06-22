"use client";

import React, { useEffect, useRef, useState } from "react";
import Map, { MapRef, ViewStateChangeEvent } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { Listbox, ListboxItem } from "@heroui/listbox";

import { generateGoogleMapsIframeLatLng } from "@/lib/mapsIframe";

export type Coordinate = { lat: number; lng: number };

type MapPickerProps = {
  initialCoordinate?: Coordinate;
  onCoordinateChangeToGMaps: (mapsUrl: string) => void;
};

const MapPicker = ({
  initialCoordinate = { lng: 115.2126, lat: -8.6705 },
  onCoordinateChangeToGMaps,
}: MapPickerProps) => {
  const MAPBOX_TOKEN =
    "pk.eyJ1Ijoibm91dmFscnoiLCJhIjoiY2xnamhwdjhyMHI2cDNxbnZ6OW5oc2d0NSJ9.EnL9_Z49uEAmotdB2FGCBA";
  const mapRef = useRef<MapRef | null>(null);
  const [query, setQuery] = useState<string>("");
  const [skipFetch, setSkipFetch] = useState<boolean>(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (skipFetch) {
      setSkipFetch(false);

      return;
    }

    const fetchPlaces = async () => {
      if (!query) {
        setResults([]);

        return;
      }

      // const res = await fetch(
      //   `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      //     query
      //   )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`
      // );

      // const data = await res.json();

      // setResults(data.features);
      const res = await fetch("https://api.placekit.co/search", {
        method: "POST",
        headers: {
          "x-placekit-api-key":
            "pk_QwMP4jBiRl6Y5j8XCFjW3j105488pvgmsdbCFHUYFoY=",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          maxResults: 5,
        }),
      });

      const data = await res.json();

      setResults(data.results);
    };

    const debounce = setTimeout(fetchPlaces, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleResultClick = (location: any) => {
    const { lng, lat } = location;

    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: 15,
      duration: 1000,
    });

    setSkipFetch(true);
    setQuery(location.name);

    setResults([]);
  };

  const handleMoveEnd = (e: ViewStateChangeEvent) => {
    const lat = e.viewState.latitude;
    const lng = e.viewState.longitude;

    const iframe = generateGoogleMapsIframeLatLng(lat, lng);

    onCoordinateChangeToGMaps(iframe);
  };

  useEffect(() => {
    const iframe = generateGoogleMapsIframeLatLng(
      initialCoordinate.lat,
      initialCoordinate.lng
    );

    onCoordinateChangeToGMaps(iframe);
  }, []);

  return (
    <div className="w-full h-full relative rounded-lg overflow-clip">
      <div className="max-w-sm w-full absolute top-5 left-5 z-20">
        <Input
          isClearable
          label="Search location"
          startContent={<Search className="size-5" />}
          value={query}
          onValueChange={setQuery}
        />
      </div>
      <div className="z-20 absolute max-w-sm w-full top-20 left-5">
        {results.length > 0 && (
          <div className="bg-white p-3 rounded-lg">
            <Listbox items={results}>
              {(item) => (
                <ListboxItem
                  key={item.coordinates}
                  onPress={() => handleResultClick(item)}
                >
                  <p>
                    <span className="font-semibold">{item.name}</span>,{" "}
                    {item.city}, {item.administrative}
                  </p>
                </ListboxItem>
              )}
            </Listbox>
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Marker"
          height={40}
          src="https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png"
          width={30}
        />
      </div>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: initialCoordinate.lng,
          latitude: initialCoordinate.lat,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMoveEnd={handleMoveEnd}
      />
    </div>
  );
};

export default MapPicker;
