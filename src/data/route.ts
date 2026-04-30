// Approximate coordinates: Konya -> Beyşehir -> Derebucak -> Demirkapı Tüneli -> Taşağıl -> Serik -> Belek (Innvista Hotels)
export const STATIC_ROUTE: [number, number][] = [
  [37.87135, 32.48464], // Konya
  [37.6710, 31.7240],   // Beyşehir
  [37.3710, 31.4280],   // Derebucak
  [37.2800, 31.3500],   // Demirkapı Tüneli (Kuzey girişi)
  [37.2200, 31.3200],   // Gembos ovası geçişi
  [36.9370, 31.2580],   // Taşağıl (D400'e bağlantı noktası)
  [36.9157, 31.1118],   // Serik
  [36.8601, 31.0094],   // Innvista Hotels Belek
];

export const ROUTE_START = STATIC_ROUTE[0];
export const ROUTE_END = STATIC_ROUTE[STATIC_ROUTE.length - 1];
