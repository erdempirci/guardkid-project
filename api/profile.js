// api/profile.js
// Demo için varsayılan medikal profil verisi
let medicalProfile = {
  childName: "Ali (6 Yaş)",
  bloodGroup: "A Rh+",
  allergies: "Penisilin, Fıstık (Anafilaksi)",
  chronicCondition: "Tip-1 Diyabet (İnsülin)",
  instruction: "Bilinç kapalıysa veya nefes darlığı varsa çantasındaki EpiPen oto-enjektörünü uyluk bölgesine uygulayın ve derhal 112'yi arayın.",
  medications: "Lantus İnsülin (Günde 1 kez)",
  token: "GK-8492",
  motherPhone: "+905528326213",
  fatherPhone: "+905528326213"
};

export default async function handler(req, res) {
  // CORS ayarları
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. Bilgileri Getir (Profile sayfası çağırır)
  if (req.method === 'GET') {
    return res.status(200).json(medicalProfile);
  }

  // 2. Bilgileri Güncelle (Ebeveyn Paneli çağırır)
  if (req.method === 'POST') {
    medicalProfile = { ...medicalProfile, ...req.body };
    return res.status(200).json({ success: true, message: "Medikal profil güncellendi", data: medicalProfile });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
