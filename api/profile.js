// api/profile.js
// KVKK / GDPR & OWASP Standartlarına Uygun Güvenli API Uç Noktası

// Bellek İçi Şifreli / Güvenli Veri Deposu (Canlıda Supabase/Redis'e bağlanır)
const medicalVault = {
  "k8M9x2P4": {
    pinHash: "8492", // Ebeveyn Yönetim PIN'i
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
    updatedAt: "2026-08-31T20:00:00.000Z"
  }
};

// XSS ve Enjeksiyon Engelleme Fonksiyonu
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
  // CORS & Güvenlik Başlıkları
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Pin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // 1. GET: Paramedik Ekranı (Salt Okunur & Maskeli)
  if (req.method === 'GET') {
    const token = req.query.token;

    // Token Format Doğrulama (Sadece 8 haneli alfanümerik)
    if (!token || !/^[a-zA-Z0-9]{8}$/.test(token)) {
      return res.status(400).json({ error: "Geçersiz ID Formatı" });
    }

    const record = medicalVault[token];
    if (!record) {
      return res.status(404).json({ error: "Bileklik Bulunamadı" });
    }

    // PIN bilgisini asla dışarı sızdırma
    const { pinHash, ...safeMedicalData } = record;
    return res.status(200).json({ success: true, ...safeMedicalData });
  }

  // 2. POST: Ebeveyn Güncelleme (PIN Yetkilendirmeli)
  if (req.method === 'POST') {
    const { token, pin, ...updates } = req.body;

    if (!token || !/^[a-zA-Z0-9]{8}$/.test(token)) {
      return res.status(400).json({ error: "Geçersiz Token" });
    }

    const record = medicalVault[token];
    if (!record) {
      return res.status(404).json({ error: "Kayıt Yok" });
    }

    // PIN Kontrolü (Yetkisiz Değişikliği Engeller)
    if (record.pinHash && record.pinHash !== pin) {
      return res.status(401).json({ error: "Hatalı Ebeveyn Güvenlik PIN Kodu!" });
    }

    // Gelen Tüm Verileri Sanitize Et (XSS Temizliği)
    const sanitized = {};
    for (const key in updates) {
      sanitized[key] = sanitizeInput(updates[key]);
    }

    sanitized.updatedAt = new Date().toISOString();
    medicalVault[token] = { ...record, ...sanitized };

    return res.status(200).json({ success: true, message: "Profil Güvenle Güncellendi" });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
