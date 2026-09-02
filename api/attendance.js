// api/attendance.js
// GuardKid Çok Amaçlı Yoklama ve Giriş-Çıkış Kayıt Motoru

// Bellek içi öğrenci ve yoklama listesi (Canlıda DB'ye bağlanır)
const students = {
  "k8M9x2P4": { name: "Ali Yılmaz", class: "1-A", parentPhone: "+905528326213" },
  "a1B2c3D4": { name: "Zeynep Kaya", class: "1-A", parentPhone: "+905551112233" }
};

let attendanceLogs = [];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // 1. GET: Güncel Sınıf Yoklama Listesini Getir
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      logs: attendanceLogs,
      summary: {
        totalPresent: attendanceLogs.filter(l => l.type === 'IN').length
      }
    });
  }

  // 2. POST: NFC / QR Okutulduğunda Yoklama Yaz
  if (req.method === 'POST') {
    const { token, type = 'IN' } = req.body;

    if (!token) return res.status(400).json({ error: "Geçersiz Token" });

    const student = students[token] || { name: `Öğrenci (${token.substring(0,4)})`, class: "Genel" };
    const now = new Date();
    const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    const logEntry = {
      id: Date.now(),
      token: token,
      name: student.name,
      class: student.class,
      type: type, // IN: Giriş, OUT: Çıkış
      time: timeStr,
      timestamp: now.toISOString()
    };

    // Listenin başına ekle (en son okutulan en üstte)
    attendanceLogs.unshift(logEntry);

    // Veliye bildirim konsol çıktısı (İleride WhatsApp/SMS API)
    console.log(`📢 [VELİ BİLDİRİMİ]: ${student.name} saat ${timeStr} itibarıyla okula ${type === 'IN' ? 'giriş yaptı' : 'çıkış yaptı'}.`);

    return res.status(200).json({
      success: true,
      studentName: student.name,
      time: timeStr,
      type: type
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
