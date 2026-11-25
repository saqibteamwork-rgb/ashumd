// commands/download.js
'use strict';

/**
 * Universal Auto-Downloader
 * Automatically inspects the URL and downloads from YouTube, Instagram, TikTok, Facebook, CapCut, etc.
 */

async function downloadCommand(sock, from, msg, args = []) {
    const url = args[0]?.trim();
    if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
        return await sock.sendMessage(from, {
            text:
`╭━━━〔 ⚡ *UNIVERSAL DOWNLOADER* ⚡ 〕━━━┈⊷
┃ 📥 *Supported Platforms:*
┃ • YouTube (Video & Audio)
┃ • TikTok (No watermark)
┃ • Instagram (Reels & Posts)
┃ • Facebook (HD Video)
┃ • CapCut Templates
┃
┃ 📌 *Usage:*
┃ 👉 *.dl <any media link>*
┃ 👉 *.download <any media link>*
┃
┃ 💡 *Example:*
┃ .dl https://youtube.com/watch?v=...
┃ .dl https://vt.tiktok.com/...
┃ .dl https://instagram.com/reel/...
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
    }

    const lower = url.toLowerCase();

    if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
        const { ytmp4Command } = require('./yt');
        return await ytmp4Command(sock, from, msg, args);
    } else if (lower.includes('tiktok.com') || lower.includes('douyin.com')) {
        const tiktokCommand = require('./tiktok');
        return await tiktokCommand(sock, from, msg, url);
    } else if (lower.includes('instagram.com')) {
        const instagramCommand = require('./instagram');
        return await instagramCommand(sock, from, msg, url);
    } else if (lower.includes('facebook.com') || lower.includes('fb.watch')) {
        const facebookCommand = require('./facebook');
        return await facebookCommand(sock, from, msg, url);
    } else if (lower.includes('capcut.com')) {
        const { capcutCommand } = require('./capcut');
        return await capcutCommand(sock, from, msg, args);
    } else {
        // Fallback: try YouTube downloader or report
        try {
            const { ytmp4Command } = require('./yt');
            return await ytmp4Command(sock, from, msg, args);
        } catch {
            return await sock.sendMessage(from, {
                text: "❌ Yeh link support nahi hua. Direct specific command try karein: `.ytmp4`, `.ig`, `.tiktok`, `.fb`."
            }, { quoted: msg });
        }
    }
}

module.exports = { downloadCommand };
