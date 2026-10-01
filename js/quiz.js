/**
 * ==========================================================================
 * MK SISTEM DIGITAL - ITERA
 * Quiz & Interactive Exercise Engine
 * ==========================================================================
 * Mengintegrasikan soal latihan dari slide perkuliahan Minggu 1 & 2
 * serta generator latihan mandiri tak terbatas.
 */

const QuizEngine = {
  // Soal Kurikulum Resmi dari Slide ITERA
  officialExercisesWeek1: [
    {
      id: 'w1_q1',
      badge: 'Modul Minggu 1 - Slide 37',
      question: 'Konversikan bilangan desimal <strong>258₁₀</strong> ke Heksadesimal dan Oktal menggunakan metode Central Binary!',
      inputs: [
        { label: 'Biner (Central):', key: 'biner', placeholder: 'contoh: 100000010', expected: '100000010' },
        { label: 'Heksadesimal (Basis 16):', key: 'hex', placeholder: 'contoh: 102', expected: '102' },
        { label: 'Oktal (Basis 8):', key: 'oct', placeholder: 'contoh: 402', expected: '402' }
      ],
      solutionText: `
<strong>Langkah Penyelesaian Metode Central Biner:</strong>
1. 258₁₀ ke Biner:
   258 = 256 + 2 = (1 × 2⁸) + (1 × 2¹) = 1 0000 0010₂
2. Biner ke Heksadesimal (Grouping 4-bit dari LSB):
   0001 0000 0010₂
   • 0001₂ = 1₁₆
   • 0000₂ = 0₁₆
   • 0010₂ = 2₁₆
   → Hasil: <strong>102₁₆</strong>
3. Biner ke Oktal (Grouping 3-bit dari LSB):
   100 000 010₂
   • 100₂ = 4₈
   • 000₂ = 0₈
   • 010₂ = 2₈
   → Hasil: <strong>402₈</strong>
`
    },
    {
      id: 'w1_q2',
      badge: 'Modul Minggu 1 - Slide 35 & 36',
      question: 'Konversikan pecahan desimal <strong>0.625₁₀</strong> ke format Biner, Heksadesimal, dan Oktal!',
      inputs: [
        { label: 'Biner (Central):', key: 'biner', placeholder: 'contoh: 0.101', expected: '0.101' },
        { label: 'Heksadesimal:', key: 'hex', placeholder: 'contoh: 0.A', expected: '0.A' },
        { label: 'Oktal:', key: 'oct', placeholder: 'contoh: 0.5', expected: '0.5' }
      ],
      solutionText: `
<strong>Langkah Penyelesaian:</strong>
1. Perkalian berulang dengan 2:
   • 0.625 × 2 = 1.25 → simpan 1
   • 0.25 × 2 = 0.5 → simpan 0
   • 0.5 × 2 = 1.0 → simpan 1
   → Biner: <strong>0.101₂</strong>
2. Biner ke Hex (Grouping 4-bit pecahan ke kanan, tambah 0 di belakang):
   0.101₂ = 0.1010₂
   • 1010₂ = A₁₆ → Hasil: <strong>0.A₁₆</strong>
3. Biner ke Oktal (Grouping 3-bit pecahan ke kanan):
   0.101₂ (pas 3 bit)
   • 101₂ = 5₈ → Hasil: <strong>0.5₈</strong>
`
    },
    {
      id: 'w1_q3',
      badge: 'Modul Minggu 1 - Slide 32',
      question: 'Konversikan bilangan desimal <strong>7562₁₀</strong> ke bilangan Heksadesimal!',
      inputs: [
        { label: 'Heksadesimal:', key: 'hex', placeholder: 'contoh: 1DA8', expected: '1DA8' }
      ],
      solutionText: `
<strong>Pembagian berulang dengan 16:</strong>
• 7562 ÷ 16 = 472 sisa 10 (A)
• 472 ÷ 16 = 29 sisa 8
• 29 ÷ 16 = 1 sisa 13 (D)
• 1 ÷ 16 = 0 sisa 1
Baca sisa dari bawah ke atas: <strong>1DA8₁₆</strong>
`
    }
  ],

  officialExercisesWeek2: [
    {
      id: 'w2_q1',
      badge: 'Modul Minggu 2 - Slide 23 & 24 (Latihan 1.1)',
      question: 'Tuliskan representasi <strong>-58₁₀</strong> dalam format 8-bit Two\'s Complement (C2), serta bentuk Oktal dan Hexadesimalnya!',
      inputs: [
        { label: '8-bit C2:', key: 'c2', placeholder: 'contoh: 11000110', expected: '11000110' },
        { label: 'Heksadesimal (0x..):', key: 'hex', placeholder: 'contoh: C6 atau 0xC6', expected: 'C6' }
      ],
      solutionText: `
<strong>Algoritma 3 Langkah 2\'s Complement:</strong>
1. 58 dalam 8-bit biner = 0011 1010₂
2. Inversi semua bit (NOT) = 1100 0101₂
3. Tambah 1 pada LSB = <strong>1100 0110₂</strong>
4. Dalam Hex: 1100₂ = C₁₆, 0110₂ = 6₁₆ → <strong>0xC6</strong>
`
    },
    {
      id: 'w2_q2',
      badge: 'Modul Minggu 2 - Slide 23 & 24 (Latihan 1.2)',
      question: 'Hitung nilai desimal dari bilangan 8-bit Two\'s Complement: <strong>1011 1111₂</strong>!',
      inputs: [
        { label: 'Nilai Desimal:', key: 'dec', placeholder: 'contoh: -65', expected: '-65' }
      ],
      solutionText: `
<strong>Menggunakan Cara Cepat Modul:</strong>
• Nilai Unsigned (U) = 128 + 32 + 16 + 8 + 4 + 2 + 1 = 191₁₀
• Karena MSB = 1 (negatif), nilai = -(2⁸ - U)
• 256 - 191 = 65
→ Nilai desimal = <strong>-65₁₀</strong>
`
    },
    {
      id: 'w2_q3',
      badge: 'Modul Minggu 2 - Slide 23 & 24 (Latihan 1.3)',
      question: 'Hitung operasi pengurangan <strong>75 - 103</strong> dalam 8-bit C2 via penjumlahan [A + C2(B)]!',
      inputs: [
        { label: 'C2 dari 103 (8-bit):', key: 'c2_b', placeholder: 'contoh: 10011001', expected: '10011001' },
        { label: 'Hasil Desimal:', key: 'result', placeholder: 'contoh: -28', expected: '-28' }
      ],
      solutionText: `
<strong>Langkah Perhitungan Aritmatika C2:</strong>
1. Nilai A = +75 = 0100 1011₂
2. Nilai B = +103 = 0110 0111₂
   C2 dari B (-103) = NOT(0110 0111) + 1 = 1001 1000 + 1 = <strong>1001 1001₂</strong>
3. Penjumlahan:
     0100 1011₂ (+75)
   + 1001 1001₂ (-103)
   ------------------
     1110 0100₂
4. Evaluasi hasil 1110 0100₂:
   U = 128 + 64 + 32 + 4 = 228
   Nilai = -(256 - 228) = <strong>-28₁₀</strong>
`
    },
    {
      id: 'w2_q4',
      badge: 'Modul Minggu 2 - Slide 25 & 26 (Latihan 2)',
      question: 'Tuliskan bilangan desimal <strong>-25₁₀</strong> dalam: a) Sign-Magnitude (8-bit) dan b) 1\'s Complement (8-bit)!',
      inputs: [
        { label: 'Sign-Magnitude (SM):', key: 'sm', placeholder: 'contoh: 10011001', expected: '10011001' },
        { label: '1\'s Complement (C1):', key: 'c1', placeholder: 'contoh: 11100110', expected: '11100110' }
      ],
      solutionText: `
<strong>Langkah:</strong>
1. +25 dalam 8-bit = 0001 1001₂
2. Sign-Magnitude (SM): Ubah MSB menjadi 1:
   <strong>1001 1001₂</strong>
3. 1's Complement (C1): Inversi semua bit dari +25:
   NOT(0001 1001) = <strong>1110 0110₂</strong>
`
    }
  ],

  // Soal Kurikulum Resmi dari Slide Pertemuan 3 ITERA
  officialExercisesWeek3: [
    {
      id: 'w3_q1',
      badge: 'Modul Minggu 3 - Slide 14 (Latihan 1)',
      question: 'Sederhanakan ekspresi logika berikut menggunakan hukum Aljabar Boolean:<br>a) Ubah ke bentuk SOP: <strong>(A + B + C)(Ā + B + C)</strong><br>b) Ubah ke bentuk POS: <strong>A·C̄ + A·B·C</strong>',
      inputs: [
        { label: 'Bentuk SOP (a):', key: 'sop', placeholder: 'contoh: B + C', expected: 'B+C' },
        { label: 'Bentuk POS (b):', key: 'pos', placeholder: 'contoh: A(B + C\')', expected: 'A(B+C\')' }
      ],
      solutionText: `
<strong>Langkah Penyelesaian (Slide 14):</strong>
1. Ubah ke bentuk SOP:
   (A + B + C)(Ā + B + C)
   Misalkan X = B + C, maka:
   (X + A)(X + Ā) = X·X + X·Ā + X·A + A·Ā
                  = X + X(A + Ā) + 0
                  = X + X(1) = X
   Substitusi kembali X: <strong>B + C</strong>

2. Ubah ke bentuk POS:
   A·C̄ + A·B·C
   • Faktorkan A: A(C̄ + B·C)
   • Gunakan hukum distributif: (C̄ + B)(C̄ + C) = (C̄ + B)(1) = B + C̄
   → Hasil: <strong>A(B + C')</strong>
`
    },
    {
      id: 'w3_q2',
      badge: 'Modul Minggu 3 - Slide 15 (Contoh)',
      question: 'Sederhanakan ekspresi logika 3-variabel berikut dengan hukum Aljabar Boolean: <strong>Y = ĀBC + ABC</strong>',
      inputs: [
        { label: 'Hasil Penyederhanaan:', key: 'result', placeholder: 'contoh: BC', expected: 'BC' }
      ],
      solutionText: `
<strong>Langkah Penyelesaian (Slide 15):</strong>
Y = ĀBC + ABC
Faktorkan variabel bersama BC:
Y = (Ā + A)BC
Karena Ā + A = 1 (Hukum Komplemen):
Y = (1)BC = <strong>BC</strong>
`
    },
    {
      id: 'w3_q3',
      badge: 'Modul Minggu 3 - Slide 18 (Latihan 3 Rangkaian Kombinasi)',
      question: 'Diberikan rangkaian kombinasi dengan input A dan B:<br>• Gerbang NAND menghasilkan sinyal C = (A·B)\'<br>• Gerbang XOR menghasilkan sinyal D = A ⊕ B<br>• Sinyal C dan D masuk ke gerbang XNOR menghasilkan Q.<br>Tentukan nilai keluaran <strong>Q saat A=1, B=1</strong> dan sebutkan <strong>satu gerbang logika tunggal</strong> yang setara untuk menggantikan seluruh rangkaian tersebut!',
      inputs: [
        { label: 'Nilai Q (saat A=1, B=1):', key: 'q_val', placeholder: '0 atau 1', expected: '1' },
        { label: 'Gerbang Tunggal Ekivalen:', key: 'gate_name', placeholder: 'contoh: OR', expected: 'OR' }
      ],
      solutionText: `
<strong>Langkah Analisis & Tabel Kebenaran (Slide 18):</strong>
1. Saat A = 1, B = 1:
   • C = NAND(1, 1) = (1·1)' = 0
   • D = XOR(1, 1) = 1 ⊕ 1 = 0
   • Q = XNOR(C, D) = (0 ⊕ 0)' = 1

2. Tabel Kebenaran Lengkap:
   • A=0, B=0 → C=1, D=0 → Q = (1 ⊕ 0)' = 0
   • A=0, B=1 → C=1, D=1 → Q = (1 ⊕ 1)' = 1
   • A=1, B=0 → C=1, D=1 → Q = (1 ⊕ 1)' = 1
   • A=1, B=1 → C=0, D=0 → Q = (0 ⊕ 0)' = 1
   Output Q bernilai 1 jika salah satu atau kedua input bernilai 1 (0, 1, 1, 1).
   Maka, rangkaian dapat diganti dengan <strong>Gerbang OR (A + B)</strong> tunggal!
`
    },
    {
      id: 'w3_q4',
      badge: 'Modul Minggu 3 - Slide 19 (Latihan 4)',
      question: 'Rangkaian: Gerbang AND menghasilkan sinyal C = A·B, gerbang OR menghasilkan sinyal D = A+B. Sinyal C dan D masuk ke gerbang XOR menghasilkan keluaran Q. Tuliskan <strong>persamaan aljabar Boolean</strong> paling sederhana untuk keluaran Q!',
      inputs: [
        { label: 'Persamaan Logika Q:', key: 'result', placeholder: 'contoh: A ^ B atau A XOR B', expected: 'A^B' }
      ],
      solutionText: `
<strong>Langkah Pembuktian Aljabar Boolean (Slide 19):</strong>
Q = C ⊕ D = (A·B) ⊕ (A + B)
Gunakan definisi XOR: X ⊕ Y = X̄Y + XȲ
Q = (A·B)'(A + B) + (A·B)(A + B)'
  = (Ā + B̄)(A + B) + (AB)(Ā·B̄)   [Hukum De Morgan]
  = (ĀA + ĀB + B̄A + B̄B) + 0
  = (0 + ĀB + AB̄ + 0)
  = ĀB + AB̄ = <strong>A ⊕ B (Gerbang XOR)</strong>
`
    }
  ],

  // Soal Kurikulum Resmi dari Slide Pertemuan 4 ITERA
  officialExercisesWeek4: [
    {
      id: 'w4_q1',
      badge: 'Modul Minggu 4 - Slide 11 & 12 (Latihan 1 K-Map 2-Var)',
      question: 'Sederhanakan ekspresi logika <strong>Q = AB\' + A\'B\'</strong> menggunakan prinsip pengelompokan K-Map 2 variabel!',
      inputs: [
        { label: 'Hasil Penyederhanaan:', key: 'result', placeholder: 'contoh: B\'', expected: 'B\'' }
      ],
      solutionText: `
<strong>Penyelesaian Menggunakan K-Map (Slide 12):</strong>
1. Isi sel K-Map 2 variabel:
   • AB' (A=1, B=0) bernilai 1
   • A'B' (A=0, B=0) bernilai 1
2. Keduanya berada pada kolom B=0 dan membentuk kelompok ukuran 2 sel (2x1).
3. Karena variabel A berubah (0 dan 1), sedangkan B bernilai tetap 0 (B'):
   → Hasil: <strong>Q = B'</strong>
`
    },
    {
      id: 'w4_q2',
      badge: 'Modul Minggu 4 - Slide 11 & 12 (Latihan 2 K-Map 3-Var)',
      question: 'Sederhanakan fungsi Boolean: <strong>Q = A\'B\'C + A\'BC + AB\'C + ABC + ABC\'</strong> menggunakan K-Map 3 variabel!',
      inputs: [
        { label: 'Ekspresi SOP Sederhana:', key: 'result', placeholder: 'contoh: AB + C', expected: 'AB+C' }
      ],
      solutionText: `
<strong>Penyelesaian Menggunakan K-Map 3 Variabel (Slide 12):</strong>
1. Minterm yang bernilai 1:
   • A'B'C (m1), A'BC (m3), AB'C (m5), ABC (m7), ABC' (m6)
2. Pengelompokan:
   • Kelompok 1: 4 sel pada baris C=1 (m1, m3, m5, m7) → variabel A dan B berubah, menyisakan <strong>C</strong>.
   • Kelompok 2: 2 sel pada kolom AB=11 (m7, m6) → variabel C berubah, menyisakan <strong>AB</strong>.
3. Gabungkan kedua kelompok:
   → Hasil: <strong>Q = AB + C</strong>
`
    },
    {
      id: 'w4_q3',
      badge: 'Modul Minggu 4 - Slide 13 (K-Map 4-Variabel)',
      question: 'Sederhanakan fungsi Boolean 4 variabel: <strong>Q = A\'BC\'D + ABC\'D + A\'BCD + ABCD</strong> menggunakan K-Map!',
      inputs: [
        { label: 'Hasil Penyederhanaan:', key: 'result', placeholder: 'contoh: BD', expected: 'BD' }
      ],
      solutionText: `
<strong>Penyelesaian (Slide 13):</strong>
1. Minterm: m5 (0101), m13 (1101), m7 (0111), m15 (1111).
2. Keempat minterm membentuk kelompok persegi 2x2 (ukuran 4) di kolom CD=01 & 11, dan baris AB=01 & 11.
3. Variabel A berubah (0 dan 1) serta C berubah (0 dan 1).
   Variabel yang tetap konstan adalah B=1 dan D=1.
4. Hasil: <strong>Q = BD</strong>
`
    },
    {
      id: 'w4_q4',
      badge: 'Modul Minggu 4 - Slide 14-16 (Studi Kasus Sistem Sensor ITERA)',
      question: 'Sebuah gedung memiliki 4 sensor: Pintu (A), Jendela (B), Gerak (C), dan Asap (D). Alarm menyala jika: pintu terbuka & ada gerakan (AC), jendela terbuka & ada gerakan (BC), atau ada asap (D). Tentukan ekspresi Boolean minimum dari sistem alarm menggunakan K-Map 4 variabel!',
      inputs: [
        { label: 'Ekspresi Alarm Minimum:', key: 'result', placeholder: 'contoh: D + AC + BC', expected: 'D+AC+BC' }
      ],
      solutionText: `
<strong>Penyelesaian Studi Kasus Sistem Keamanan Gedung (Slide 15-16):</strong>
1. Fungsi awal dari deskripsi sensor: Q(A, B, C, D) = AC + BC + D
2. Minterm aktif (11 minterm):
   • Asap (D=1): m1, m3, m5, m7, m9, m11, m13, m15 (8 minterm)
   • Pintu + Gerak (A=1, C=1): m10, m11, m14, m15
   • Jendela + Gerak (B=1, C=1): m6, m7, m14, m15
   Q = Σm{1, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15}
3. Masukkan ke K-Map 4x4 dan kelompokkan:
   • Kelompok 1 (8 sel pada kolom CD=01 & 11) → <strong>D</strong>
   • Kelompok 2 (4 sel: m10, m11, m14, m15) → <strong>AC</strong>
   • Kelompok 3 (4 sel: m6, m7, m14, m15) → <strong>BC</strong>
4. Hasil fungsi minimum: <strong>Q(A, B, C, D) = D + AC + BC</strong>
`
    },
    {
      id: 'w4_q5',
      badge: 'Modul Minggu 4 - Slide 18 (Latihan 2 Gerbang Parkir Otomatis)',
      question: 'Gerbang parkir otomatis memiliki 4 sensor: A (kartu valid), B (kendaraan di depan), C (kapasitas parkir penuh, 1=penuh), D (tombol darurat, 1=aktif). Gerbang terbuka (F=1) jika kendaraan ada di depan DAN kartu valid DAN kapasitas belum penuh, ATAU tombol darurat ditekan. Tentukan ekspresi logika gerbang terbuka!',
      inputs: [
        { label: 'Fungsi Gerbang (F):', key: 'result', placeholder: 'contoh: ABC\' + D', expected: 'ABC\'+D' }
      ],
      solutionText: `
<strong>Penyelesaian (Slide 18):</strong>
1. Analisis kondisi:
   • Kondisi 1: Kendaraan ada (B=1) dan kartu valid (A=1) dan kapasitas belum penuh (C=0, komplemen C̄ / C') → A·B·C'
   • Kondisi 2: Tombol darurat ditekan (D=1) → D
2. Hubungkan kedua kondisi dengan operasi OR (+):
   Hasil: <strong>F = A·B·C' + D</strong> (atau D + ABC')
`
    }
  ],

  /**
   * Render Soal ke Kontainer DOM
   */
  renderQuizList(containerId, exercises) {
    const container = document.getElementById(containerId);
    if (!container || !exercises) return;

    container.innerHTML = exercises.map(ex => `
      <div class="quiz-card" id="card_${ex.id}">
        <div class="quiz-question-header">
          <span class="quiz-badge">${ex.badge}</span>
        </div>
        <p class="quiz-question-text">${ex.question}</p>

        <div class="quiz-input-group">
          ${ex.inputs.map(inp => `
            <div style="display:flex; flex-direction:column; gap:4px; flex:1; min-width:180px;">
              <label style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">${inp.label}</label>
              <input type="text" class="quiz-input" id="inp_${ex.id}_${inp.key}" placeholder="${inp.placeholder}">
            </div>
          `).join('')}
          <button class="quiz-btn" onclick="QuizEngine.checkAnswer('${ex.id}')">Periksa</button>
        </div>

        <div class="quiz-feedback-box" id="feedback_${ex.id}"></div>
        <button class="quiz-solution-toggle" onclick="QuizEngine.toggleSolution('${ex.id}')">👁️ Tampilkan Pembahasan Lengkap</button>
        <div class="quiz-solution-content" id="solution_${ex.id}">${ex.solutionText}</div>
      </div>
    `).join('');
  },

  /**
   * Helper Normalisasi Ekspresi Boolean
   */
  normalizeExpr(str) {
    if (!str) return '';
    return str
      .toUpperCase()
      .replace(/['’`]/g, "'")
      .replace(/[ĀĀ]/g, "A'")
      .replace(/[B̄B̄]/g, "B'")
      .replace(/[C̄C̄]/g, "C'")
      .replace(/[D̄D̄]/g, "D'")
      .replace(/[⊕\^]/g, '^')
      .replace(/XOR/g, '^')
      .replace(/·|\*/g, '')
      .replace(/\s+/g, '')
      .replace(/^0X|^0O/, '');
  },

  /**
   * Evaluasi Jawaban Pengguna
   */
  checkAnswer(exId) {
    let allEx = [
      ...this.officialExercisesWeek1,
      ...this.officialExercisesWeek2,
      ...(this.officialExercisesWeek3 || []),
      ...(this.officialExercisesWeek4 || [])
    ];
    let ex = allEx.find(e => e.id === exId);
    if (!ex) return;

    let isAllCorrect = true;
    let errors = [];

    ex.inputs.forEach(inp => {
      let elem = document.getElementById(`inp_${ex.id}_${inp.key}`);
      let userRaw = elem ? elem.value : '';
      let userNorm = this.normalizeExpr(userRaw);
      let expNorm = this.normalizeExpr(inp.expected);

      // Support alternative sums order e.g. "B+C" vs "C+B", "AB+C" vs "C+AB", "D+AC+BC"
      let isMatch = userNorm === expNorm;

      if (!isMatch && expNorm.includes('+')) {
        let userTerms = userNorm.split('+').sort().join('+');
        let expTerms = expNorm.split('+').sort().join('+');
        if (userTerms === expTerms) isMatch = true;
      }

      if (!isMatch && expNorm.includes('^')) {
        let userTerms = userNorm.split('^').sort().join('^');
        let expTerms = expNorm.split('^').sort().join('^');
        if (userTerms === expTerms) isMatch = true;
      }

      // Check for XOR synonyms
      if (!isMatch && (expNorm === 'A^B' || expNorm === 'XOR')) {
        if (userNorm === 'A^B' || userNorm === 'XOR' || userNorm === 'AXORB' || userNorm === "A'B+AB'") {
          isMatch = true;
        }
      }

      // Check for OR gate synonym
      if (!isMatch && expNorm === 'OR') {
        if (userNorm === 'OR' || userNorm === 'A+B' || userNorm === 'GERBANGOR') {
          isMatch = true;
        }
      }

      if (!isMatch) {
        isAllCorrect = false;
        errors.push(`${inp.label} jawaban Anda belum tepat.`);
      }
    });

    let fb = document.getElementById(`feedback_${ex.id}`);
    let card = document.getElementById(`card_${ex.id}`);

    if (isAllCorrect) {
      fb.className = 'quiz-feedback-box correct';
      fb.innerHTML = '🎉 <strong>Luar Biasa!</strong> Jawaban Anda benar sesuai kaidah logika digital!';
      if (card) card.classList.add('solved-correct');
    } else {
      fb.className = 'quiz-feedback-box wrong';
      fb.innerHTML = `⚠️ <strong>Masih ada yang keliru:</strong><br>${errors.join('<br>')}<br><em>Periksa kembali penulisan persamaan atau klik tombol di bawah untuk melihat pembahasan lengkap.</em>`;
      if (card) card.classList.remove('solved-correct');
    }
  },

  /**
   * Toggle Pembahasan
   */
  toggleSolution(exId) {
    let sol = document.getElementById(`solution_${exId}`);
    if (!sol) return;
    sol.classList.toggle('show');
  }
};

window.QuizEngine = QuizEngine;
