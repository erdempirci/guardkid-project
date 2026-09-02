// api/attendance.js
// Okul Yoklama Listesi

const students = {
  "k8M9x2P4": { 
    name: "Ali Yılmaz", 
    class: "1-A", 
    photo: "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80" 
  }
};

let attendanceLogs = [];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, logs: attendanceLogs });
  }

  if (req.method === 'POST') {
    const { token, type = 'IN' } = req.body;
    if (!token) return res.status(400).json({ error: "Token Eksik" });

    const student = students[token] || { 
      name: `Öğrenci (${token.substring(0,4)})`, 
      class: "Genel",
      photo: "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80" 
    };

    const now = new Date();
    const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    const logEntry = {
      id: Date.now(),
      token: token,
      name: student.name,
      class: student.class,
      photo: student.photo,
      type: type,
      time: timeStr
    };

    attendanceLogs.unshift(logEntry);

    return res.status(200).json({
      success: true,
      studentName: student.name,
      time: timeStr
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
