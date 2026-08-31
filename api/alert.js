export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { token, lat, lng, time } = req.body;
  console.log(`[ALARM] Token: ${token} | Konum: ${lat}, ${lng} | Saat: ${time}`);
  return res.status(200).json({ success: true, message: "Alarm kaydedildi" });
}
