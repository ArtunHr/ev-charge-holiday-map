export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function calculateRouteDistance(points: [number, number][]): number {
  let d = 0;
  for (let i = 0; i < points.length - 1; i++) {
    d += getDistanceFromLatLonInKm(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]);
  }
  return Math.round(d);
}

// Calculates distance from the start of the route to the nearest point on the route for a given station
export function getDistanceToStationAlongRoute(stationLat: number, stationLon: number, routePoints: [number, number][]): number {
  if (routePoints.length === 0) return 0;
  
  let minDistanceToRoute = Infinity;
  let nearestSegmentIndex = 0;
  
  // Find the closest point or segment on the route to the station
  // For simplicity, we just find the closest point in the route coordinate array.
  for (let i = 0; i < routePoints.length; i++) {
    const dist = getDistanceFromLatLonInKm(stationLat, stationLon, routePoints[i][0], routePoints[i][1]);
    if (dist < minDistanceToRoute) {
      minDistanceToRoute = dist;
      nearestSegmentIndex = i;
    }
  }

  // Calculate cumulative distance up to that closest point
  let cumulativeDistance = 0;
  for (let i = 0; i < nearestSegmentIndex; i++) {
    cumulativeDistance += getDistanceFromLatLonInKm(routePoints[i][0], routePoints[i][1], routePoints[i+1][0], routePoints[i+1][1]);
  }
  
  return Math.round(cumulativeDistance);
}
