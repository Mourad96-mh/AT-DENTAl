const QRCode = require('qrcode')
const sharp = require('sharp')

const URL = 'https://at-dental.com/'
const SIZE = 560 // QR size
const PAD = 60
const W = SIZE + PAD * 2 // canvas width
const HEADER = 90 // space for brand title
const FOOTER = 150 // space for caption + url
const H = HEADER + SIZE + FOOTER

async function run() {
  // 1. QR as PNG buffer (white margin baked in)
  const qrBuf = await QRCode.toBuffer(URL, {
    width: SIZE,
    margin: 1,
    color: { dark: '#0d3b6e', light: '#ffffff' },
  })

  // 2. Text + frame overlay as SVG
  const cy = HEADER + SIZE // y where footer text starts
  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${W}" height="${H}" rx="28" fill="#ffffff"/>
    <rect x="8" y="8" width="${W - 16}" height="${H - 16}" rx="22"
          fill="none" stroke="#0d3b6e" stroke-width="6"/>
    <text x="${W / 2}" y="62" text-anchor="middle"
          font-family="Segoe UI, Arial, sans-serif" font-size="46" font-weight="800"
          fill="#0d3b6e">AT Dental</text>
    <text x="${W / 2}" y="${cy + 60}" text-anchor="middle"
          font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700"
          fill="#1a2b3c">Scannez pour visiter notre site</text>
    <text x="${W / 2}" y="${cy + 102}" text-anchor="middle"
          font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="600"
          fill="#00a3c4">at-dental.com</text>
  </svg>`

  // 3. Composite QR onto white canvas under the header
  await sharp(Buffer.from(svg))
    .composite([{ input: qrBuf, top: HEADER, left: PAD }])
    .png()
    .toFile('public/qr-code.png')

  console.log('Wrote public/qr-code.png', `${W}x${H}`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
