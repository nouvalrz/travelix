export function parseGoogleMapsIframeLatLng(
  iframeHtml: string
): { lat: number; lng: number } | null {
  try {
    const srcMatch = iframeHtml.match(/src=['"]([^'"]+)['"]/);

    if (!srcMatch || !srcMatch[1]) return null;

    const url = new URL(srcMatch[1]);

    const q = url.searchParams.get("q");

    if (q && /^[\d\.\-]+,[\d\.\-]+$/.test(q)) {
      const [lat, lng] = q.split(",").map(Number);

      return { lat, lng };
    }

    const pb = url.searchParams.get("pb");

    if (pb) {
      const latMatch = pb.match(/!3d([-\d.]+)/);
      const lngMatch = pb.match(/!2d([-\d.]+)/);

      if (latMatch && lngMatch) {
        return {
          lat: parseFloat(latMatch[1]),
          lng: parseFloat(lngMatch[1]),
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
