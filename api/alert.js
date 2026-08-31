// api/alert.js (Doğrudan SMS Gönderimi)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { token, lat, lng } = req.body;

  const mapLink = lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : 'Konum paylasilmadi';
  const smsBody = `GuardKid ACIL: Cocugunuzun bilekligi okutuldu! Konum: ${mapLink}`;

  const userCode = "NETGSM_KULLANICI_ADI";
  const password = "NETGSM_SIFRE";
  const msgHeader = "GUARDKID"; // veya 850'li baslik
  const phone = "905528326213";

  const netgsmUrl = `https://api.netgsm.com.tr/sms/send/get/?usercode=${userCode}&password=${password}&gsmno=${phone}&message=${encodeURIComponent(smsBody)}&msgheader=${msgHeader}`;

  try {
    await fetch(netgsmUrl);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
