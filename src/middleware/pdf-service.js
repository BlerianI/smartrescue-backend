import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* =================================================
   ES MODULE __dirname FIX
   ================================================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =================================================
   ASSETS HELPERS
   ================================================= */

const colors = {
  red: '#e13738',
  dark: '#1c1c1e', // Apple Dark Gray
  gray: '#8e8e93', // Apple Gray
  lightGray: '#f2f2f7', // Apple System Gray 6
  white: '#ffffff',
  blue: '#007aff',
};

const getLogoPath = () =>
  path.join(
    __dirname,
    '../../../smartrescue-frontends/smartrescue_front_main/public/Logo1000x350.png'
  );

async function fetchAvatarBuffer(url) {
  if (!url) return null;
  try {
    const response = await fetch(url);
    if (response.ok) {
      return Buffer.from(await response.arrayBuffer());
    }
  } catch (err) {
    console.log('Avatar fetch error:', err.message);
  }
  return null;
}

/* =================================================
   PDF BUILDER MAIN
   ================================================= */

export async function buildPDF(res, payload = {}) {
  // Create Document
  const doc = new PDFDocument({
    size: [419, 298], // A6 Landscape approx
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    autoFirstPage: true,
  });

  doc.pipe(res);

  // Pre-fetch Avatar once
  const avatarBuffer = await fetchAvatarBuffer(payload.avatar_url);
  const logoPath = getLogoPath();
  const logoExists = fs.existsSync(logoPath);

  renderDesign1(doc, payload, avatarBuffer, logoPath, logoExists);

  doc.end();
}

/* =================================================
   DESIGN 1: MODERN CARD (Refined Layout)
   ================================================= */
function renderDesign1(doc, payload, avatarBuffer, logoPath, logoExists) {
  const { width, height } = doc.page;

  // Background
  doc.rect(0, 0, width, height).fill(colors.lightGray);

  // Card Container
  const margin = 15;
  const cardX = margin;
  const cardY = margin;
  const cardW = width - margin * 2;
  const cardH = height - margin * 2;
  const cardRadius = 16;

  // Draw Card Shadow (Simulated with simple offset rect usually, but PDFKit shadow is limited)
  // Just draw the card white
  doc.roundedRect(cardX, cardY, cardW, cardH, cardRadius).fill(colors.white);
  doc.save(); // Clip context
  doc.roundedRect(cardX, cardY, cardW, cardH, cardRadius).clip();

  // Header inside Card
  const headerH = 60;
  doc.rect(cardX, cardY, cardW, headerH).fill(colors.red);

  // Avatar
  const avSize = 44;
  const avX = cardX + 15;
  const avY = cardY + (headerH - avSize) / 2;

  doc.circle(avX + avSize / 2, avY + avSize / 2, avSize / 2).fill(colors.white);
  if (avatarBuffer) {
    doc.save();
    doc.circle(avX + avSize / 2, avY + avSize / 2, avSize / 2).clip();
    doc.image(avatarBuffer, avX, avY, { width: avSize, height: avSize });
    doc.restore();
  }

  // Name
  doc
    .fillColor(colors.white)
    .font('Helvetica-Bold')
    .fontSize(18)
    .text(
      `${payload.first_name || ''} ${payload.last_name || ''}`,
      avX + avSize + 12,
      cardY + 22 // vertically centered roughly
    );

  // Logo
  if (logoExists) {
    const lW = 80;
    const lH = 28;
    const lX = cardX + cardW - lW - 15;
    const lY = cardY + (headerH - lH) / 2;
    doc.roundedRect(lX - 4, lY - 4, lW + 8, lH + 8, 5).fill(colors.white);
    doc.image(logoPath, lX, lY, { width: lW });
  }

  // Body Content
  const contentY = cardY + headerH + 10; // Tight top margin
  const colGap = 20;
  const colW = (cardW - 30 - colGap) / 2; // 30 = left/right padding inside card
  const lx = cardX + 15;
  const rx = lx + colW + colGap;

  let ly = contentY;
  let ry = contentY;

  // --- Row 1: Address vs Medications ---
  const row1H = 50;
  drawLabelValue(doc, 'Adresse', `${payload.street || ''} ${payload.house_number || ''}, ${payload.postal_code || ''} ${payload.city || ''}`, lx, ly, colors.dark, colors.gray, colW);
  drawLabelValue(doc, 'Medikamente', payload.medications, rx, ry, colors.dark, colors.gray, colW);

  ly += row1H;
  ry += row1H;

  // --- Row 2: Birthdate vs Conditions ---
  const row2H = 40;
  drawLabelValue(doc, 'Geburtsdatum', payload.birthdate, lx, ly);
  drawLabelValue(doc, 'Krankheiten', payload.conditions, rx, ry, colors.dark, colors.gray, colW);

  ly += row2H;
  ry += row2H;

  // --- Row 3: Combined Bio Data (Blood/Height/Weight) vs Allergies ---
  const bioString = `${payload.blood_type || '-'}  •  ${payload.height ? payload.height + ' cm' : '-'}  •  ${payload.weight ? payload.weight + ' kg' : '-'}`;

  const row3H = 40;
  drawLabelValue(doc, 'Blutgruppe / Größe / Gewicht', bioString, lx, ly);
  drawLabelValue(doc, 'Allergien', payload.allergies, rx, ry, colors.dark, colors.gray, colW);

  ly += row3H;
  ry += row3H;

  // --- Row 4: Emergency Contact (Name Left / Phone Right) ---
  const row4H = 35;

  // Highlight Box Logic
  // A bit of padding horizontally and vertically to make it look like a section
  // Spanning (cardW - 30) = full internal width
  const highlightH = row4H + 10;
  const highlightY = ly - 5;

  doc.roundedRect(lx - 10, highlightY, cardW - 10, highlightH, 6).fill(colors.lightGray);

  const emName = `${payload.emergency_first_name || ''} ${payload.emergency_last_name || ''}`;
  drawLabelValue(doc, 'Notfallkontakt', emName, lx, ly);
  drawLabelValue(doc, 'Telefon', payload.phone_number, rx, ry, colors.dark, colors.gray, colW);

  ly += row4H + 10; // Extra spacing for footer
  ry += row4H + 10;

  const contentEndY = Math.max(ly, ry);

  // --- Footer: Last Updated ---
  const footerY = contentEndY + 2;
  // Divider Line
  doc
    .moveTo(lx, footerY)
    .lineTo(lx + cardW - 30, footerY)
    .lineWidth(0.5)
    .strokeColor(colors.gray)
    .stroke();

  // Date Text
  const dateStr = new Date().toLocaleDateString('de-DE'); // e.g. 10.2.2026
  doc
    .fillColor(colors.gray)
    .font('Helvetica')
    .fontSize(8)
    .text(`Zuletzt aktualisiert am: ${dateStr}`, lx, footerY + 6, {
      align: 'center',
      width: cardW - 30,
    });

  doc.restore(); // End Card Clip
}


/* =================================================
   UTILS
   ================================================= */
function drawLabelValue(doc, label, value, x, y, labelColor = colors.dark, valueColor = colors.gray, width = 200) {
  doc.fillColor(labelColor).font('Helvetica-Bold').fontSize(9).text(label, x, y);
  doc.fillColor(valueColor).font('Helvetica').fontSize(10).text(value || '-', x, y + 12, { width });
}
