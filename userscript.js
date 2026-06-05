// ==UserScript==
// @name         YouTube RPC Bridge
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Sends YouTube data and thumbnails to local Node.js RPC server
// @author       hellcat-xyz
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        if (window.location.pathname !== '/watch') return;

        const video = document.querySelector('video');
        if (!video || isNaN(video.duration) || document.querySelector('.ad-showing')) return;

        const titleEl = document.querySelector('h1.ytd-watch-metadata yt-formatted-string');
        let title = titleEl ? titleEl.innerText : document.title;
        title = title.replace(/^\(\d+\)\s+/, '').replace(' - YouTube', '').trim();

        const authorEl = document.querySelector('#upload-info ytd-channel-name a');
        const authorFallback = document.querySelector('link[itemprop="name"]');
        let author = authorEl ? authorEl.innerText : (authorFallback ? authorFallback.getAttribute('content') : "Unknown Creator");

        const urlParams = new URLSearchParams(window.location.search);
        const videoId = urlParams.get('v');

        if (!videoId || !title) return;

        fetch('http://localhost:3000/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                author: author,
                videoId: videoId,
                timeNow: Math.floor(video.currentTime),
                timeMax: Math.floor(video.duration),
                isPaused: video.paused
            })
        }).catch(() => {});
    }, 3000);
})();
