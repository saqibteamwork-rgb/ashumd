'use strict';

const fs = require('fs');
const path = require('path');
const settings = require('../settings');

async function ownerCommand(sock, from, msg) {
    const rawNumber = settings.ownerNumber && !settings.ownerNumber.includes('nmbr') && !settings.ownerNumber.includes('HERE')
        ? settings.ownerNumber.replace(/[^0-9]/g, '')
        : '923468616487';

    const formattedNumber = rawNumber.length >= 10 
        ? `+${rawNumber.slice(0, 2)} ${rawNumber.slice(2, 5)} ${rawNumber.slice(5)}`
        : `+${rawNumber}`;

    const websiteUrl = settings.websiteUrl || 'https://ashumd.vercel.app';
    const pairingSiteUrl = 'https://ashumd.vercel.app';

    const ownerText =
`╭━━━〔 🌸 💖 *ASHU — BOT OWNER* 💖 🌸 〕━━━┈⊷
┃ 👑 *Name:* ${settings.ownerName || 'Ashu'} 🌸
┃ 🤖 *Engine:* ${settings.botName} · v2.0 Premium
┃ 🌐 *Status:* Active & Online 24/7 ✨
┃ 💖 *Aesthetic:* Floral & Hearts Vibe 🌷
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━┈⊷

⚡ *DIRECT ACTIONS (TAP TO OPEN)* ⚡

🔗 *Pairing & Dashboard Website:*
${pairingSiteUrl}

📢 *Official Channel:*
${settings.channelLink || 'https://whatsapp.com/channel/0029VbDzLTD1iUxe8Hsv1D0M'}

↩ *Main Commands Menu:*
.menu

───────────────────────
🌸 💖 *Crafted with Love for ASHU MD* 💖 🌸`;

    const channelContext = {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: settings.newsletterJid || '120363431913895899@newsletter',
            newsletterName: settings.botName || 'Mr SAQIB',
            serverMessageId: 1
        }
    };

    let imagePayload = null;
    const localImgPath = path.join(__dirname, '..', 'data', 'mrsaqib_preview.png');
    if (fs.existsSync(localImgPath)) {
        try { imagePayload = fs.readFileSync(localImgPath); } catch {}
    }
    if (!imagePayload && settings.menuImage) {
        const trimmed = settings.menuImage.trim();
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
            imagePayload = { url: trimmed };
        } else if (fs.existsSync(trimmed)) {
            imagePayload = fs.readFileSync(trimmed);
        }
    }

    try {
        if (imagePayload) {
            await sock.sendMessage(from, { image: imagePayload, caption: ownerText, contextInfo: channelContext }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { text: ownerText, contextInfo: channelContext }, { quoted: msg });
        }
    } catch (err) {
        console.error('[ownerCommand] Send failed:', err.message);
        await sock.sendMessage(from, { text: ownerText }, { quoted: msg }).catch(() => {});
    }
}

module.exports = ownerCommand;
