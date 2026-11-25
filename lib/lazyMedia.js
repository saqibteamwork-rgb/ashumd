'use strict';

let _sharp = null;
let _ffmpeg = null;
let _ffmpegPath = null;
let _cheerio = null;
let _webpmux = null;
let _qrcode = null;

function getSharp() {
    if (!_sharp) {
        const s = require('sharp');
        try {
            s.cache(false);
            s.concurrency(1);
        } catch (_) {}
        _sharp = s;
    }
    return _sharp;
}

function getFfmpegPath() {
    if (_ffmpegPath !== null) return _ffmpegPath;
    let p = null;
    try { p = require('ffmpeg-static'); } catch (_) {}
    try {
        const fs = require('fs');
        if (!p || !fs.existsSync(p)) {
            p = require('@ffmpeg-installer/ffmpeg').path || 'ffmpeg';
        }
    } catch (_) {
        p = p || 'ffmpeg';
    }
    _ffmpegPath = p || 'ffmpeg';
    return _ffmpegPath;
}

function getFfmpeg() {
    if (!_ffmpeg) {
        const ff = require('fluent-ffmpeg');
        const bin = getFfmpegPath();
        if (bin) {
            try { ff.setFfmpegPath(bin); } catch (_) {}
        }
        _ffmpeg = ff;
    }
    return _ffmpeg;
}

function getCheerio() {
    return _cheerio || (_cheerio = require('cheerio'));
}

function getWebpmux() {
    return _webpmux || (_webpmux = require('node-webpmux'));
}

function getQRCode() {
    if (_qrcode === undefined || _qrcode === null) {
        try { _qrcode = require('qrcode'); } catch (_) { _qrcode = false; }
    }
    return _qrcode || null;
}

module.exports = {
    getSharp,
    getFfmpeg,
    getFfmpegPath,
    getCheerio,
    getWebpmux,
    getQRCode
};
