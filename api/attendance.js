<script>
  // 15 Kişilik Hazır Sınıf Kadrosu
  const roster = [
    {
      token: "k8M9x2P4",
      name: "Ali Yılmaz",
      meta: "No: 101 • Tip-1 Diyabet",
      photo: "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "z4P8m1X9",
      name: "Zeynep Kaya",
      meta: "No: 102 • Alerji Yok",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "b5T2w7K3",
      name: "Can Demir",
      meta: "No: 103 • Astım",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "m9Q1r6L4",
      name: "Elif Öztürk",
      meta: "No: 104 • Fıstık Alerjisi",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "c2V8n4B7",
      name: "Mert Çelik",
      meta: "No: 105 • Çölyak (Gluten)",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "d9X3p5M1",
      name: "Defne Şahin",
      meta: "No: 106 • Alerji Yok",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "e7L1k9W2",
      name: "Burak Arslan",
      meta: "No: 107 • Arı Alerjisi",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "f4H6j8Y3",
      name: "Selin Yıldız",
      meta: "No: 108 • Alerji Yok",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "g8N2v4T6",
      name: "Emre Koç",
      meta: "No: 109 • İnek Sütü Proteini",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "h1K5m7R9",
      name: "Ada Aydın",
      meta: "No: 110 • Alerji Yok",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "j3R7t9P2",
      name: "Kaan Güneş",
      meta: "No: 111 • Alerji Yok",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "k6W8y1B4",
      name: "Duru Aksoy",
      meta: "No: 112 • Yumurta Alerjisi",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "l2M4x6C8",
      name: "Kerem Tekin",
      meta: "No: 113 • Alerji Yok",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "n5V7b9D1",
      name: "Masal Polat",
      meta: "No: 114 • Alerji Yok",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    },
    {
      token: "p8Q2z4F6",
      name: "Efe Doğan",
      meta: "No: 115 • Kronik Bronşit",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      status: "absent",
      time: null
    }
  ];

  function renderList() {
    const list = document.getElementById('studentList');
    let present = 0;
    let absent = 0;

    list.innerHTML = roster.map(s => {
      if (s.status === 'present') present++;
      else absent++;

      return `
        <div class="student-card ${s.status === 'present' ? 'present' : ''}">
          <div class="student-info">
            <img src="${s.photo}" class="avatar">
            <div>
              <div class="name">${s.name}</div>
              <div class="meta">${s.meta}</div>
            </div>
          </div>
          <div>
            ${s.status === 'present' 
              ? `<span class="badge badge-present">✅ Geldi (${s.time})</span>` 
              : `<span class="badge badge-absent">❌ Gelmedi</span>`}
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('presentCount').innerText = present;
    document.getElementById('absentCount').innerText = absent;
  }

  function markAttendance(token) {
    if (!token) return;
    const student = roster.find(s => s.token.toLowerCase() === token.trim().toLowerCase());
    if (student) {
      const now = new Date();
      student.status = 'present';
      student.time = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
      renderList();
      document.getElementById('tokenInput').value = '';
      alert(`🔔 [VELİYE BİLDİRİM İLETİLDİ]\nSayın Veli, öğrenciniz ${student.name} saat ${student.time} itibarıyla okula giriş yapmıştır.`);
    } else {
      alert("Tanımsız bileklik token'ı!");
    }
  }

  function resetDemo() {
    roster.forEach(s => { s.status = 'absent'; s.time = null; });
    renderList();
  }

  function notifyParents() {
    const absents = roster.filter(s => s.status === 'absent').map(s => s.name);
    if (absents.length === 0) {
      alert("Tüm öğrenciler sınıfta!");
      return;
    }
    alert(`📲 Bildirim İletildi:\n${absents.length} adet gelmeyen öğrencinin velisine 'Öğrenciniz henüz okula giriş yapmadı' uyarısı başarıyla gönderildi.`);
  }

  async function startWebNFC() {
    if ("NDEFReader" in window) {
      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        alert("✅ NFC Tarayıcı Aktif!");
        ndef.onreading = event => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            const text = decoder.decode(record.data);
            const token = text.split('/').filter(Boolean).pop() || "k8M9x2P4";
            markAttendance(token);
          }
        };
      } catch (e) {
        alert("NFC Başlatılamadı: " + e.message);
      }
    } else {
      alert("Bu cihazda doğrudan Web NFC desteklenmiyor. Aşağıdaki kutudan token yazarak işlem yapabilirsiniz.");
    }
  }

  renderList();
</script>
