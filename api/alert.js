// api/alert.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { token, lat, lng, time } = req.body;

  const mapLink = (lat && lng) 
    ? `https://maps.google.com/?q=${lat},${lng}` 
    : 'Konum izni verilmedi';

  // Telefonunuza gelecek bildirim başlığı ve metni
  try {
    // ntfy.sh üzerinden anlık telefon push bildirimi tetikle
    await fetch('https://ntfy.sh/guardkid_onur_alarm_987', {
      method: 'POST',
      body: `🚨 Çocuğunuz Ali'nin bilekliği okutuldu!\n📍 Harita Konumu: ${mapLink}\n🏷 Kod: ${token}`,
      headers: {
        'Title': '🚨 ACIL DURUM: BİLEKLİK OKUTULDU!',
        'Priority': 'urgent', // Telefon kilitliyken bile sesli/yüksek öncelikli çalar
        'Tags': 'warning,sos'
      }
    });

    return res.status(200).json({ success: true, message: 'Alarm veliye iletildi.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
