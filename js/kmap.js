/**
 * ==========================================================================
 * MK SISTEM DIGITAL - ITERA
 * Week 4 Engine: Karnaugh Map (K-Map) Solver & Visualizer
 * ==========================================================================
 * Mengimplementasikan materi Pertemuan 4 ITERA:
 * - K-Map 2-Variabel (A, B)
 * - K-Map 3-Variabel (AB x C)
 * - K-Map 4-Variabel (AB x CD)
 * - Format Urutan Kode Gray: 00, 01, 11, 10 (hanya 1-bit berubah)
 * - Grouping pangkat dua (1, 2, 4, 8, 16) dengan Wrap-Around (pinggir berputar)
 * - Kondisi Don't Care (X) untuk memaksimalkan ukuran kelompok
 * - Presets dari Slide Kuliah ITERA:
 *   1. 2-Var Slide 09: Q = AB + A'B + AB' -> Q = A + B
 *   2. 3-Var Slide 10: Q = ABC' + AB'C' + AB'C + ABC -> Q = A
 *   3. 3-Var Slide 11 (Latihan 1): Q = AB' + A'B' -> Q = B'
 *   4. 3-Var Slide 11 (Latihan 2): Q = m(1,3,5,6,7) -> Q = AB + C
 *   5. 4-Var Slide 13: Q = m(5,7,13,15) -> Q = BD
 *   6. 4-Var Slide 14-16: Sistem Sensor Keamanan Gedung -> Q = D + AC + BC
 *   7. Don't Care Slide 17
 *   8. 4-Var Slide 18: Sistem Gerbang Parkir Otomatis -> F = AB C' + D
 */

const KMapEngine = {
  // Current settings
  numVars: 4, // 2, 3, or 4
  
  // Storage for cell values: minterm index -> 0, 1, or 'X'
  cells: {},

  // Colors for group overlays
  GROUP_COLORS: [
    { border: '#06b6d4', bg: 'rgba(6, 182, 212, 0.18)', name: 'Cyan' },
    { border: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.18)', name: 'Purple' },
    { border: '#10b981', bg: 'rgba(16, 185, 129, 0.18)', name: 'Emerald' },
    { border: '#f59e0b', bg: 'rgba(245, 158, 11, 0.18)', name: 'Amber' },
    { border: '#f43f5e', bg: 'rgba(244, 63, 94, 0.18)', name: 'Rose' },
    { border: '#3b82f6', bg: 'rgba(59, 130, 246, 0.18)', name: 'Blue' }
  ],

  init() {
    this.resetCells(this.numVars);
  },

  resetCells(vars = 4) {
    this.numVars = vars;
    this.cells = {};
    const totalCells = Math.pow(2, vars);
    for (let i = 0; i < totalCells; i++) {
      this.cells[i] = 0;
    }
  },

  toggleCell(mIndex) {
    const curr = this.cells[mIndex];
    if (curr === 0) {
      this.cells[mIndex] = 1;
    } else if (curr === 1) {
      this.cells[mIndex] = 'X';
    } else {
      this.cells[mIndex] = 0;
    }
  },

  setCellValue(mIndex, val) {
    this.cells[mIndex] = val;
  },

  /**
   * Set Preset Sesuai Slide Perkuliahan ITERA
   */
  loadPreset(presetName) {
    switch (presetName) {
      case '2var_slide09':
        // Q = AB + A'B + AB' -> minterm: m3, m2, m1 (atau A=1,B=1; A=0,B=1; A=1,B=0)
        this.resetCells(2);
        this.setCellValue(1, 1); // A=0, B=1 (A'B)
        this.setCellValue(2, 1); // A=1, B=0 (AB')
        this.setCellValue(3, 1); // A=1, B=1 (AB)
        break;

      case '3var_slide10':
        // Q = ABC' + AB'C' + AB'C + ABC
        // AB=11, C=0 (m6); AB=10, C=0 (m4); AB=10, C=1 (m5); AB=11, C=1 (m7)
        this.resetCells(3);
        this.setCellValue(4, 1); // 100
        this.setCellValue(5, 1); // 101
        this.setCellValue(6, 1); // 110
        this.setCellValue(7, 1); // 111
        break;

      case '3var_slide11_lat1':
        // Q = AB' + A'B' -> B'
        // AB=10 (m4, m5) dan AB=00 (m0, m1)
        this.resetCells(3);
        this.setCellValue(0, 1); // 000
        this.setCellValue(1, 1); // 001
        this.setCellValue(4, 1); // 100
        this.setCellValue(5, 1); // 101
        break;

      case '3var_slide11_lat2':
        // Q = A'B'C + A'BC + AB'C + ABC + ABC' -> Q = AB + C
        // m1, m3, m5, m7, m6
        this.resetCells(3);
        this.setCellValue(1, 1);
        this.setCellValue(3, 1);
        this.setCellValue(5, 1);
        this.setCellValue(6, 1);
        this.setCellValue(7, 1);
        break;

      case '4var_slide13':
        // Q = A'BC'D + ABC'D + A'BCD + ABCD -> Q = BD
        // m5 (0101), m13 (1101), m7 (0111), m15 (1111)
        this.resetCells(4);
        this.setCellValue(5, 1);
        this.setCellValue(7, 1);
        this.setCellValue(13, 1);
        this.setCellValue(15, 1);
        break;

      case '4var_slide14_sensor':
        // Sistem Keamanan Gedung 4 Sensor: Q = D + AC + BC
        // m(1, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15)
        this.resetCells(4);
        [1, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15].forEach(m => this.setCellValue(m, 1));
        break;

      case '4var_slide17_dontcare':
        // Slide 17 Don't Care condition
        this.resetCells(3);
        this.setCellValue(0, 'X');
        this.setCellValue(2, 'X');
        this.setCellValue(6, 1);
        this.setCellValue(4, 1);
        this.setCellValue(3, 1);
        this.setCellValue(7, 1);
        this.setCellValue(5, 1);
        break;

      case '4var_slide18_parkir':
        // Gerbang Parkir Otomatis: F = A·B·C' + D
        // Sensor A, B, C, D: D=1 -> (1,3,5,7,9,11,13,15); A=1, B=1, C=0 -> m(12, 13)
        // Gabungan minterm: 1, 3, 5, 7, 9, 11, 12, 13, 15
        this.resetCells(4);
        [1, 3, 5, 7, 9, 11, 12, 13, 15].forEach(m => this.setCellValue(m, 1));
        break;

      default:
        this.resetCells(this.numVars);
    }
  },

  /**
   * Mengubah susunan Baris & Kolom ke Minterm Index
   */
  getMintermIndex(rowGray, colGray, numVars) {
    if (numVars === 2) {
      // rowGray = A (0 or 1), colGray = B (0 or 1)
      return (rowGray << 1) | colGray;
    } else if (numVars === 3) {
      // rowGray = C (0 or 1), colGray = AB (00=0, 01=1, 11=3, 10=2)
      // Representasi biner: A B C = (AB << 1) | C
      return (colGray << 1) | rowGray;
    } else if (numVars === 4) {
      // rowGray = AB (0..3), colGray = CD (0..3)
      // Representasi biner: A B C D = (AB << 2) | CD
      return (rowGray << 2) | colGray;
    }
    return 0;
  },

  /**
   * Gray Code Map for Grid Dimensions
   */
  getGridDimensions(vars) {
    if (vars === 2) {
      return {
        rowVars: 'A',
        colVars: 'B',
        rows: [{ gray: 0, label: '0' }, { gray: 1, label: '1' }],
        cols: [{ gray: 0, label: '0' }, { gray: 1, label: '1' }]
      };
    } else if (vars === 3) {
      return {
        rowVars: 'C',
        colVars: 'AB',
        rows: [{ gray: 0, label: '0' }, { gray: 1, label: '1' }],
        cols: [
          { gray: 0, label: '00' },
          { gray: 1, label: '01' },
          { gray: 3, label: '11' },
          { gray: 2, label: '10' }
        ]
      };
    } else {
      // 4 vars
      return {
        rowVars: 'AB',
        colVars: 'CD',
        rows: [
          { gray: 0, label: '00' },
          { gray: 1, label: '01' },
          { gray: 3, label: '11' },
          { gray: 2, label: '10' }
        ],
        cols: [
          { gray: 0, label: '00' },
          { gray: 1, label: '01' },
          { gray: 3, label: '11' },
          { gray: 2, label: '10' }
        ]
      };
    }
  },

  /**
   * K-Map Solver & Grouping Engine
   * Menemukan Essential Prime Implicants dan Minimal SOP
   */
  solve() {
    const vars = this.numVars;
    const totalCells = Math.pow(2, vars);
    const minterms = [];
    const dontCares = [];

    for (let i = 0; i < totalCells; i++) {
      if (this.cells[i] === 1) minterms.push(i);
      else if (this.cells[i] === 'X') dontCares.push(i);
    }

    if (minterms.length === 0) {
      return {
        expression: '0',
        minterms: [],
        dontCares: dontCares,
        groups: [],
        allOnes: false
      };
    }

    if (minterms.length + dontCares.length === totalCells) {
      return {
        expression: '1',
        minterms: minterms,
        dontCares: dontCares,
        groups: [{ cells: Array.from({ length: totalCells }, (_, i) => i), term: '1', size: totalCells }],
        allOnes: true
      };
    }

    // Grid coordinates
    const dim = this.getGridDimensions(vars);
    const numRows = dim.rows.length;
    const numCols = dim.cols.length;

    // Helper map: (r, c) -> mIndex
    const gridToM = [];
    for (let r = 0; r < numRows; r++) {
      gridToM[r] = [];
      for (let c = 0; c < numCols; c++) {
        const m = this.getMintermIndex(dim.rows[r].gray, dim.cols[c].gray, vars);
        gridToM[r][c] = m;
      }
    }

    // Check possible rectangular group sizes (powers of 2)
    // For 4-var: 16, 8 (4x2, 2x4), 4 (4x1, 1x4, 2x2), 2 (2x1, 1x2), 1 (1x1)
    // For 3-var: 8, 4 (2x2, 1x4), 2 (2x1, 1x2), 1
    // For 2-var: 4, 2 (2x1, 1x2), 1
    const groupShapes = [];
    const maxArea = totalCells;
    const allowedAreas = [16, 8, 4, 2, 1].filter(a => a <= maxArea);

    for (const area of allowedAreas) {
      for (let h = 1; h <= numRows; h *= 2) {
        if (area % h === 0) {
          const w = area / h;
          if (w <= numCols && (w & (w - 1)) === 0) {
            groupShapes.push({ h, w, area });
          }
        }
      }
    }

    // Find all valid candidate groups
    const candidateGroups = [];

    for (const shape of groupShapes) {
      const { h, w, area } = shape;
      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          // Check cells with wrap-around
          const cellList = [];
          let allMatch = true;
          let hasMinterm = false;

          for (let dr = 0; dr < h; dr++) {
            const curR = (r + dr) % numRows;
            for (let dc = 0; dc < w; dc++) {
              const curC = (c + dc) % numCols;
              const m = gridToM[curR][curC];
              const val = this.cells[m];
              if (val !== 1 && val !== 'X') {
                allMatch = false;
                break;
              }
              if (val === 1) hasMinterm = true;
              cellList.push(m);
            }
            if (!allMatch) break;
          }

          if (allMatch && hasMinterm) {
            // Sort to ensure unique signature
            cellList.sort((a, b) => a - b);
            const key = cellList.join(',');
            if (!candidateGroups.some(g => g.key === key)) {
              const term = this.termFromCells(cellList, vars);
              candidateGroups.push({
                key,
                cells: cellList,
                term,
                area,
                h, w,
                startR: r,
                startC: c
              });
            }
          }
        }
      }
    }

    // Filter prime implicants (groups not strictly contained within another larger group)
    const primeImplicants = candidateGroups.filter(g1 => {
      return !candidateGroups.some(g2 => {
        if (g2.area <= g1.area) return false;
        return g1.cells.every(c => g2.cells.includes(c));
      });
    });

    // Greedy cover selection: Find minimum set of prime implicants covering all minterms
    const uncovered = new Set(minterms);
    const chosenGroups = [];

    // Step 1: Essential Prime Implicants
    for (const m of minterms) {
      const covering = primeImplicants.filter(g => g.cells.includes(m));
      if (covering.length === 1) {
        const epi = covering[0];
        if (!chosenGroups.some(cg => cg.key === epi.key)) {
          chosenGroups.push(epi);
          epi.cells.forEach(c => uncovered.delete(c));
        }
      }
    }

    // Step 2: Cover remaining uncovered minterms greedily
    while (uncovered.size > 0) {
      let bestPI = null;
      let maxCovers = -1;

      for (const pi of primeImplicants) {
        if (chosenGroups.some(cg => cg.key === pi.key)) continue;
        const count = pi.cells.filter(c => uncovered.has(c)).length;
        if (count > maxCovers) {
          maxCovers = count;
          bestPI = pi;
        }
      }

      if (!bestPI || maxCovers === 0) break;
      chosenGroups.push(bestPI);
      bestPI.cells.forEach(c => uncovered.delete(c));
    }

    // Sort terms for clean representation
    chosenGroups.sort((a, b) => a.term.length - b.term.length || a.term.localeCompare(b.term));

    // Assign distinct color to each chosen group
    chosenGroups.forEach((g, idx) => {
      g.color = this.GROUP_COLORS[idx % this.GROUP_COLORS.length];
    });

    const expr = chosenGroups.map(g => g.term).join(' + ') || '0';

    return {
      expression: expr,
      minterms,
      dontCares,
      groups: chosenGroups
    };
  },

  /**
   * Derive Boolean product term from list of minterms
   */
  termFromCells(cells, numVars) {
    if (cells.length === Math.pow(2, numVars)) return '1';

    const varNames = ['A', 'B', 'C', 'D'].slice(0, numVars);
    let termParts = [];

    for (let bitIdx = 0; bitIdx < numVars; bitIdx++) {
      // bitIdx 0 is MSB (A), bitIdx 1 is B, etc.
      const shift = numVars - 1 - bitIdx;
      const firstBit = (cells[0] >> shift) & 1;
      let isConstant = true;

      for (let i = 1; i < cells.length; i++) {
        const bit = (cells[i] >> shift) & 1;
        if (bit !== firstBit) {
          isConstant = false;
          break;
        }
      }

      if (isConstant) {
        const vName = varNames[bitIdx];
        termParts.push(firstBit === 1 ? vName : `${vName}'`);
      }
    }

    return termParts.join('') || '1';
  }
};

window.KMapEngine = KMapEngine;
