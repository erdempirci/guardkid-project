// api/profile.js

// 20 Numune Token Havuzu ve Örnek Veri Tabanı
const database = {
  // Demo dolu profil (1. Numune)
  "k8M9x2P4": {
    childName: "Ali (6 Yaş)",
    bloodGroup: "A Rh+",
    allergies: "Penisilin, Yer Fıstığı (Anafilaksi)",
    chronicCondition: "Tip-1 Diyabet (İnsülin)",
    instruction: "Bilinç kapalıysa veya nefes darlığı varsa çantasındaki EpiPen'i (0.3mg) uyluk dış yanına uygulayın. Derhal 112'yi arayın.",
    medications: "Lantus İnsülin (Günde 1 kez)",
    motherPhone: "+905528326213",
    fatherPhone: "+905528326213"
  },
  // Kalan 19 token ilk başta boş (kayıt bekliyor)
  "v3N7q9L1": null, "j4R8w5T2": null, "m6B2y8K9": null, "p9X4z1V7": null,
  "c2L8n6Q3": null, "h5T1m9R4": null, "z7V3k8B2": null, "q1W9p4L6": null,
  "x8D5t2J7": null, "t3G7v9M1": null, "w6K2r8X4": null, "b9P4c1Z7": null,
  "f2N8y6H3": null, "r5J1d9K4": null, "y7M3x8P2": null, "l1T9w4V6": null,
  "d8B5q2L7": null, "g3R7n9T1": null, "n6V2m8B4": null
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // 1. GET: Paramedik veya Admin veriyi çekerken
  if (req.method === 'GET') {
    const token = req.query.token || "k8M9x2P4";
    
    // Geçersiz veya listede olmayan token sorgulanırsa
    if (!(token in database)) {
      return res.status(404).json({ error: "Geçersiz veya Kayıtsız Bileklik Kodu" });
    }

    const data = database[token] || {
      childName: "Henüz Kayıt Yapılmadı",
      bloodGroup: "-",
      allergies: "Belirtilmedi",
      chronicCondition: "Belirtilmedi",
      instruction: "Bu bileklik için henüz bir ebeveyn kaydı oluşturulmamıştır.",
      medications: "Yok",
      motherPhone: "",
      fatherPhone: ""
    };

    return res.status(200).json({ token, ...data });
  }

  // 2. POST: Ebeveyn admin panelinden güncelleme yaparken
  if (req.method === 'POST') {
    const { token, ...profileData } = req.body;

    if (!token || !(token in database)) {
      return res.status(400).json({ error: "Geçersiz Token" });
    }

    database[token] = profileData;
    return res.status(200).json({ success: true, token, data: database[token] });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
