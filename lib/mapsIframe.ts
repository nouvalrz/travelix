export function parseGoogleMapsIframeLatLng(
  iframeUrl: string
): { lat: number; lng: number } | null {
  try {
    const url = new URL(iframeUrl);

    // Case: /maps/embed?q=LAT,LNG
    const q = url.searchParams.get("q");

    if (q && /^[\d\.\-]+,[\d\.\-]+$/.test(q)) {
      const [lat, lng] = q.split(",").map(Number);

      return { lat, lng };
    }

    // Case: /maps/embed?pb=... and extract !2dLNG!3dLAT
    const pb = url.searchParams.get("pb");

    if (pb) {
      const match = pb.match(/!2d([-\d.]+)!3d([-\d.]+)/);

      if (match) {
        return {
          lat: parseFloat(match[2]),
          lng: parseFloat(match[1]),
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}
export function generateGoogleMapsIframeLatLng(
  lat: number,
  lng: number,
  zoom: number = 15
): string {
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return `<iframe width="100%" height="100%" frameborder="0" style="border:0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${src}"></iframe>`;
}
