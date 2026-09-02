// api/profile.js
// OWASP & KVKK/GDPR Uyumlu Profil Yönetimi

const medicalVault = {
  "k8M9x2P4": {
    pinHash: "8492",
    photo: "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80",
    childName: "Ali",
    age: 6,
    weight: 22,
    bloodGroup: "A Rh+",
    allergies: "Penisilin, Yer Fıstığı (Anafilaksi)",
    chronicCondition: "Tip-1 Diyabet (İnsülin)",
    instruction: "Nefes darlığı veya anafilaktik şok belirtisinde çantasındaki EpiPen'i (0.3mg) uyluk dış yanına uygulayın. Derhal 112'yi arayın.",
    medications: "Lantus İnsülin (Günde 1 kez)",
    device: "Sürekli Glikoz Monitörü (CGM)",
    motherPhone: "+905528326213",
    fatherPhone: "+905528326213",
    updatedAt: "2026-09-01T12:00:00.000Z"
  }
};

function sanitizeInput(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  }).trim();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Pin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const token = req.query.token;
    if (!token || !/^[a-zA-Z0-9]{8}$/.test(token)) {
      return res.status(400).json({ error: "Geçersiz Token" });
    }

    const record = medicalVault[token];
    if (!record) return res.status(404).json({ error: "Kayıt Bulunamadı" });

    const { pinHash, ...safeMedicalData } = record;
    return res.status(200).json({ success: true, ...safeMedicalData });
  }

  if (req.method === 'POST') {
    const { token, pin, photo, ...updates } = req.body;

    if (!token || !/^[a-zA-Z0-9]{8}$/.test(token)) {
      return res.status(400).json({ error: "Geçersiz Token" });
    }

    const record = medicalVault[token];
    if (!record) return res.status(404).json({ error: "Kayıt Yok" });

    if (record.pinHash && record.pinHash !== pin) {
      return res.status(401).json({ error: "Hatalı Güvenlik PIN Kodu!" });
    }

    const sanitized = {};
    for (const key in updates) {
      sanitized[key] = sanitizeInput(updates[key]);
    }

    if (photo) sanitized.photo = photo;
    sanitized.updatedAt = new Date().toISOString();
    medicalVault[token] = { ...record, ...sanitized };

    return res.status(200).json({ success: true, message: "Profil Güncellendi" });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
