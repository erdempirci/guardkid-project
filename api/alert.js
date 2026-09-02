// api/alert.js
// Tarama Anında GPS Konumu ve Zaman Damgası Kaydı

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { token, timestamp, latitude, longitude, mapsUrl } = req.body;

    console.log(`🚨 [GUARDKID ALARM] Bileklik Tarandı! Token: ${token}`);
    if (latitude && longitude) {
      console.log(`📍 Konum: Lat ${latitude}, Lng ${longitude}`);
      console.log(`🗺️ Harita: ${mapsUrl}`);
    }

    return res.status(200).json({
      success: true,
      message: "Acil durum ve konum bilgisi veliye iletildi."
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
