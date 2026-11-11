/* 以蛙之名呼唤我 · 动画脚本（一般不需要改；文字都在 content.js） */
(function () {
  "use strict";
  var C = window.NAIWA, S = C.scenes, R = C.rhythm;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var clamp = function (v, a, b) { a = a === undefined ? 0 : a; b = b === undefined ? 1 : b; return Math.max(a, Math.min(b, v)); };
  var out = function (v) { return 1 - Math.pow(1 - clamp(v), 3); };
  var smooth = function (v) { v = clamp(v); return v * v * (3 - 2 * v); };
  var inOut = function (v) { v = clamp(v); return v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2; };
  var spring = function (v) { v = clamp(v); return 1 - Math.exp(-7 * v) * Math.cos(10 * v); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var params = new URLSearchParams(location.search);
  var manual = params.has("manual");
  var reduced = params.has("reduced") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stageEl = $(".stage"), layersEl = $(".layers"), copiesEl = $(".copies"), chatEl = $(".chatstage");
  var navEl = $(".nav"), flashEl = $(".flash"), wipeEl = $(".wipe-line"), progressEl = $(".progress i"), railEl = $(".rail");

  /* ---------- 文案 ---------- */
  document.title = C.site.title + " · " + C.site.course;
  $("#brandTitle").textContent = C.site.title;
  $("#brandCourse").textContent = "· " + C.site.course;
  $("#moreLink").textContent = C.site.moreLink + " ↓";

  /* ---------- 时钟刻度 ---------- */
  var dial = $(".dial");
  for (var k = 0; k < 12; k++) { var tick = document.createElement("s"); tick.style.transform = "rotate(" + k * 30 + "deg)"; dial.appendChild(tick); }
  var hourHand = $(".dial .h"), minHand = $(".dial .m");
  var clockTime = $("#clockTime"), clockAp = $("#clockAp"), clockLabel = $("#clockLabel");
  var mins = S.map(function (s, i) { var p = s.time.split(":"); var m = (+p[0]) * 60 + (+p[1]); if (i > 0 && m < 0) m += 1440; return m; });
  for (var mi = 1; mi < mins.length; mi++) while (mins[mi] < mins[mi - 1]) mins[mi] += 1440;

  /* ---------- 建立每一幕 ---------- */
  function imgTag(src, alt, cls) { return '<img src="' + esc(src) + '" alt="' + esc(alt || "") + '"' + (cls ? ' class="' + cls + '"' : "") + ' decoding="async" draggable="false">'; }
  var scenes = S.map(function (s, i) {
    var o = { data: s, i: i, chat: s.type === "chat" };
    var L = document.createElement("div"); L.className = "layer"; L.dataset.scene = s.id;
    if (s.cutout && !reduced) {
      L.innerHTML = '<div class="tilt"><div class="imgbox">' + imgTag(s.cutoutBg, s.alt) + '</div></div>' +
        '<div class="cover-glow"><i></i></div>' +
        '<div class="depth-eng"><div class="eng">' + (s.eng || "") + '</div></div>' +
        '<div class="tilt fg"><div class="imgbox">' + imgTag(s.cutout, "") + '</div></div>';
      o.fg = L.querySelector(".tilt.fg"); o.fgBox = o.fg.querySelector(".imgbox");
      o.depth = L.querySelector(".depth-eng"); o.glow = L.querySelector(".cover-glow i");
      var g = o.glow; g.style.cssText = "position:absolute;left:0;top:0;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(255,230,170,.95),rgba(255,214,140,.35) 35%,transparent 68%)";
    } else {
      var inner = imgTag(s.image, s.alt);
      if (s.after) inner += imgTag(s.after, s.afterAlt, "after");
      L.innerHTML = '<div class="tilt"><div class="imgbox">' + inner + '</div></div>';
    }
    o.layer = L; o.tilt = L.querySelector(".tilt"); o.box = L.querySelector(".imgbox");
    o.afterImg = L.querySelector(".after");
    layersEl.appendChild(L);

    var cp = document.createElement("div"); cp.className = "copy" + (o.chat ? " is-chat" : "") + (i === 0 ? " is-cover" : "");
    var tag = i === 0 ? "h1" : "h2";
    var titleHtml = s.title.indexOf("|") >= 0 ? s.title.split("|").map(function (x) { return "<span>" + x + "</span>"; }).join("") : s.title;
    var html = "";
    if (s.eng && !(s.cutout && !reduced)) html += '<div class="eng" aria-hidden="true">' + s.eng + "</div>";
    html += '<div class="title"><div class="kicker">' + s.kicker + "</div><" + tag + ">" + titleHtml + "</" + tag + '><p class="sub">' + s.sub + "</p>" + (s.quote ? '<p class="quote">' + s.quote + "</p>" : "") + "</div>";
    if (o.chat && s.steps && s.steps.length) html += '<div class="steps">' + s.steps.map(function (t) { return "<div>" + t + '<span class="step-on">' + t + "</span></div>"; }).join("") + "</div>";
    if (o.chat) html += '<div class="endnote">' + esc(s.endnote || "") + "</div>";
    html += '<div class="foot"><div class="scroll"><i></i><span class="foot-text">' + esc(s.foot || "") + '</span></div><div class="pct"></div></div>';
    cp.innerHTML = html; copiesEl.appendChild(cp);
    o.copy = cp; o.title = cp.querySelector(".title");
    o.anim = [].concat(o.depth ? [] : [].slice.call(cp.querySelectorAll(".eng")), [].slice.call(cp.querySelectorAll(".title>*")), [].slice.call(cp.querySelectorAll(".steps,.foot")));
    o.footText = cp.querySelector(".foot-text"); o.pct = cp.querySelector(".pct"); o.endnote = cp.querySelector(".endnote");
    o.stepsOn = [].slice.call(cp.querySelectorAll(".step-on"));
    if (!o.chat) o.pct.innerHTML = s.pct ? "<span>" + esc(s.pct) + "</span>" : "";
    if (o.chat) buildChat(o);

    var b = document.createElement("button"); b.type = "button"; b.textContent = s.time; b.setAttribute("aria-label", s.time + " " + s.label);
    b.addEventListener("click", function () { scrollToY(o.holdStart + 2); }); railEl.appendChild(b); o.rail = b;
    return o;
  });

  /* ---------- 聊天：建立卡片 + 计算节奏 ---------- */
  function msgHtml(m) {
    var nm = m.name ? '<div class="nm">' + esc(m.name) + "</div>" : "";
    var body;
    if (m.sticker) body = imgTag(m.sticker, m.alt || "奶蛙表情", m.big ? "big" : "");
    else if (m.transfer) body = '<div class="xfer"><div class="ic">¥</div><div><b>' + esc(m.transfer) + "</b><small>" + esc(m.transferNote || "请收款") + '</small></div></div><div class="xft">微信转账</div>';
    else body = "<p>" + esc(m.text) + "</p>";
    return "<div>" + nm + body + "</div>";
  }
  function buildChat(o) {
    var s = o.data, t = .45, single = s.chats.length === 1;
    o.wide = single;
    o.segs = s.chats.map(function (ch, ci) {
      var seg = { data: ch, start: t, msgs: [] }, at = R.firstAt, prevLen = 0;
      ch.messages.forEach(function (m, j) {
        if (j > 0) at += R.gap + Math.min(1.2, Math.max(0, prevLen - 12) * R.perChar);
        else if (m.side !== "me") at += R.typing * .75;
        seg.msgs.push({ m: m, at: at, incoming: m.side !== "me" });
        prevLen = m.text ? m.text.length : 6;
      });
      seg.end = t + at + R.hold + .5; t = seg.end + .25;
      var w = document.createElement("div"); w.className = "cardwrap";
      w.innerHTML = '<div class="chat' + (single ? " wide" : "") + '"><div class="surface"></div><div class="hd"><span>‹</span><b>' + esc(ch.title) + '</b><span>···</span></div><div class="messages">' +
        ch.messages.map(function (m) { return '<div class="row ' + (m.side === "me" ? "me" : "") + '">' + msgHtml(m) + "</div>"; }).join("") +
        '</div><div class="typing-row"><div class="typing"><i></i><i></i><i></i></div></div></div>';
      chatEl.appendChild(w);
      seg.wrap = w; seg.card = w.firstChild; seg.surface = w.querySelector(".surface"); seg.body = w.querySelector(".messages");
      seg.rows = [].slice.call(w.querySelectorAll(".row")); seg.typing = w.querySelector(".typing-row"); seg.dots = [].slice.call(w.querySelectorAll(".typing i"));
      var sp = document.createElement("div"); sp.className = "spot";
      sp.style.background = "radial-gradient(ellipse " + (ch.spotW || 260) + "px 380px at " + ch.spotAt[0] + "px " + ch.spotAt[1] + "px,transparent 0%,transparent 55%,rgba(8,12,20,.55) 100%)";
      o.box.appendChild(sp); seg.spot = sp;
      var tg = document.createElement("div"); tg.className = "tag"; tg.textContent = ch.tag; tg.style.left = ch.tagAt[0] + "px"; tg.style.top = ch.tagAt[1] + "px";
      o.box.appendChild(tg); seg.tag = tg;
      return seg;
    });
    var lastEnd = o.segs[o.segs.length - 1].end;
    o.flashAt = lastEnd + .05; o.D = o.flashAt + 2.2;
    o.bounds = o.segs.map(function (sg, j) { return j < o.segs.length - 1 ? (sg.end + o.segs[j + 1].start) / 2 - .2 : o.flashAt - .2; });
    o.tAuto = 0;
  }

  /* ---------- 布局 ---------- */
  var HOLD = { cover: .7, ending: .85 }, TRANS = .9;
  var vw = 0, vh = 0, u = 1, mobile = false, storyEnd = 0, targets = [];
  function measureChat(o) {
    o.segs.forEach(function (sg) {
      sg.bodyTop = sg.body.offsetTop; sg.cardH = sg.card.offsetHeight;
      sg.rowGeo = sg.rows.map(function (r) { return [r.offsetTop, r.offsetHeight]; });
    });
  }

  /* ---------- 声音：消息提示音（用 Web Audio 现场合成，不含任何外部音频文件） ---------- */
  var sndOn = false, actx = null, lastDing = 0;
  function ding(incoming) {
    if (!sndOn || !actx) return;
    var now = actx.currentTime; if (now - lastDing < .09) return; lastDing = now;
    var out = actx.createGain(); out.gain.value = incoming ? .32 : .16; out.connect(actx.destination);
    var notes = incoming ? [[1046.5, 0], [1568, .075]] : [[1318.5, 0]];
    notes.forEach(function (n) {
      [1, 2.01].forEach(function (h, k) {
        var o = actx.createOscillator(), g = actx.createGain();
        o.type = "sine"; o.frequency.value = n[0] * h;
        var t = now + n[1], peak = k ? .18 : 1;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + .006);
        g.gain.exponentialRampToValueAtTime(.0008, t + (k ? .12 : .32));
        o.connect(g); g.connect(out); o.start(t); o.stop(t + .36);
      });
    });
  }
  var bufs = {}, bgmGain = null, bgmSrc = null, unlockEl = null;
  function loadBuf(name) {
    if (bufs[name]) return bufs[name];
    bufs[name] = fetch("assets/audio/" + name + ".wav?v=2").then(function (r) { return r.arrayBuffer(); })
      .then(function (ab) { return new Promise(function (ok, no) { actx.decodeAudioData(ab, ok, no); }); });
    return bufs[name];
  }
  function startBgm() {
    if (!actx) return;
    if (!bgmGain) { bgmGain = actx.createGain(); bgmGain.gain.value = 0; bgmGain.connect(actx.destination); }
    bgmGain.gain.setTargetAtTime(.38, actx.currentTime, .8);
    if (bgmSrc) return;
    bgmSrc = true;
    loadBuf("bgm").then(function (b) { var src = actx.createBufferSource(); src.buffer = b; src.loop = true; src.connect(bgmGain); src.start(); bgmSrc = src; }).catch(function () { bgmSrc = null; });
    loadBuf("morph");
  }
  function morphSfx() {
    if (!sndOn || !actx) return;
    loadBuf("morph").then(function (b) {
      var src = actx.createBufferSource(), g = actx.createGain(); g.gain.value = .7; src.buffer = b; src.connect(g); g.connect(actx.destination); src.start();
      if (bgmGain) { var n = actx.currentTime; bgmGain.gain.cancelScheduledValues(n); bgmGain.gain.setValueAtTime(bgmGain.gain.value, n); bgmGain.gain.linearRampToValueAtTime(.22, n + .25); bgmGain.gain.setTargetAtTime(.38, n + 1.4, .5); }
    });
  }
  (function () {
    var b = document.getElementById("sndBtn"); if (!b) return;
    b.addEventListener("click", function () {
      sndOn = !sndOn;
      if (sndOn) {
        try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) {}
        if (!unlockEl) { unlockEl = new Audio("assets/audio/silence.wav"); unlockEl.loop = true; unlockEl.setAttribute("playsinline", ""); }
        var pp = unlockEl.play(); if (pp && pp.catch) pp.catch(function () {});
      } else if (unlockEl) unlockEl.pause();
      if (sndOn) { var AC = window.AudioContext || window.webkitAudioContext; if (!actx && AC) actx = new AC(); if (actx && actx.state === "suspended") actx.resume(); }
      b.setAttribute("aria-pressed", sndOn ? "true" : "false"); b.setAttribute("aria-label", sndOn ? "关闭声音" : "打开声音");
      b.querySelector(".ic").textContent = sndOn ? "🔊" : "🔇";
      b.querySelector(".tx").textContent = sndOn ? "声音已开" : "开启声音";
      if (sndOn) { startBgm(); ding(true); } else if (actx) { bgmGain && bgmGain.gain.setTargetAtTime(0, actx.currentTime, .15); setTimeout(function () { if (!sndOn) actx.suspend(); }, 600); }
    });
  })();
  function layout() {
    vw = innerWidth; vh = stageEl.clientHeight || innerHeight;
    mobile = matchMedia("(max-width:760px), (max-aspect-ratio:4/5)").matches;
    u = mobile ? 1 : clamp(Math.min(vw / 1440, vh / 810), .55, 1.6);
    document.documentElement.style.setProperty("--u", u.toFixed(4));
    var y = 0; targets = [];
    scenes.forEach(function (o, i) {
      var hold = o.chat ? (o.D * (mobile ? .16 : .18)) : (HOLD[o.data.id] || .55);
      o.holdStart = y * vh; o.holdLen = hold * vh; y += hold;
      o.holdEnd = y * vh; o.trans = i < scenes.length - 1 ? TRANS * vh : 0; y += i < scenes.length - 1 ? TRANS : 0;
      o.transEnd = o.holdEnd + o.trans;
      targets.push(o.holdStart);
      if (o.chat) targets.push(o.holdStart + o.holdLen * .93);
    });
    storyEnd = scenes[scenes.length - 1].holdEnd;
    $("#story").style.height = (storyEnd + vh) + "px";
    scenes.forEach(function (o) {
      if (!o.chat) return;
      measureChat(o);
      o.segs.forEach(function (sg) {
        var w = o.wide ? 252 : 236, cu, left, top;
        if (mobile) {
          cu = clamp((vw - 44) / w, .82, 1.12);
          var tb = o.title.offsetTop + o.title.offsetHeight;
          cu = Math.min(cu, (vh - tb - 80) / sg.cardH);
          left = (vw - w * cu) / 2; top = tb + 18;
        } else {
          cu = u; left = (o.wide ? 470 : 440) * u; top = (o.wide ? 84 : 96) * u;
        }
        sg.cu = cu; sg.left = left; sg.top = top; sg.w = w;
        sg.wrap.style.transform = "translate(" + left.toFixed(1) + "px," + top.toFixed(1) + "px) scale(" + cu.toFixed(4) + ")";
      });
      if (mobile) o.endnote.style.cssText = "";
    });
  }

  /* ---------- 指针（鼠标跟随） ---------- */
  var target = null, ptr = [0, 0];
  addEventListener("mousemove", function (e) { if (!manual) target = [e.clientX / vw * 2 - 1, e.clientY / vh * 2 - 1]; }, { passive: true });
  document.addEventListener("mouseleave", function () { if (!manual) target = null; });

  /* ---------- 每帧渲染 ---------- */
  var lastT = null, Tnow = 0, forcedY = null;
  function imgMap(fx, top) {
    var s = Math.max(vw / 1440, vh / 810), oy;
    if (mobile) {
      // 手机竖屏：不再把横图放大到铺满整屏（只能看到人物局部），而是露出约一半画面、贴在屏幕下方，上方留给标题
      s = Math.min(vw / 700, vh / 810); oy = top ? vh * .1 : vh - 810 * s - vh * .04;
    }
    var ox = clamp(vw / 2 - fx * 1440 * s, vw - 1440 * s, 0); if (!mobile) oy = (vh - 810 * s) / 2;
    return { s: s, ox: ox, oy: oy };
  }
  function setBox(box, m) { box.style.transform = "translate3d(" + m.ox.toFixed(2) + "px," + m.oy.toFixed(2) + "px,0) scale(" + m.s.toFixed(5) + ")"; }
  function tiltTransform(i, mult, extraScale) {
    if (reduced) return "none";
    var T = Tnow, kb = 1 + .028 * (.5 + .5 * Math.sin(T * 2 * Math.PI / 13 + i * 1.7));
    var bx = Math.sin(T * .21 + i) * 6, by = Math.cos(T * .17 + i) * 4;
    var px = ptr[0] * mult, py = ptr[1] * mult;
    return "perspective(1600px) translate3d(" + (bx - px * 14).toFixed(2) + "px," + (by - py * 9).toFixed(2) + "px,0) rotateX(" + (-py * 1.1).toFixed(3) + "deg) rotateY(" + (px * 1.5).toFixed(3) + "deg) scale(" + (1.07 * kb * (extraScale || 1)).toFixed(4) + ")";
  }

  function transitionStyle(o, d) {
    var st = { o: 1, sc: 1, tx: 0, clip: "none", z: 1 };
    if (d > 0) {
      var p = d, type = o.data.transition;
      if (reduced) return st;
      if (type === "zoom") { st.o = 1 - smooth(p); st.sc = 1 + .3 * out(p); st.z = 2; }
      else if (type === "wipe") { st.tx = -.06 * vw * inOut(p); st.o = 1 - .35 * p; }
      else if (type === "pan") { st.tx = -.12 * vw * inOut(p); }
      else if (type === "iris") { st.sc = 1 + .1 * p; st.o = 1 - .45 * p; }
      else if (type === "dark") { st.o = 1 - smooth(p / .55); st.sc = 1 + .05 * p; st.z = 2; }
      else if (type === "dawn") { st.o = 1 - smooth(p / .6); st.sc = 1 + .14 * out(p); st.z = 2; }
    } else if (d < 0) {
      var q = 1 + d, prev = scenes[o.i - 1].data.transition;
      st.z = 2;
      if (reduced) { st.o = smooth(q); return st; }
      if (prev === "zoom") { st.sc = 1.2 - .2 * out(q); st.z = 1; }
      else if (prev === "wipe") { var e = inOut(q); st.clip = "inset(0 0 0 " + ((1 - e) * 100).toFixed(2) + "%)"; st.tx = .04 * vw * (1 - e); }
      else if (prev === "pan") { st.o = smooth(q * 1.15); st.tx = .12 * vw * (1 - inOut(q)); }
      else if (prev === "iris") { st.clip = "circle(" + (inOut(q) * 92).toFixed(2) + "% at 62% 46%)"; st.sc = 1.08 - .08 * out(q); }
      else if (prev === "dark") { st.o = smooth((q - .45) / .55); st.sc = 1.06 - .06 * out(q); }
      else if (prev === "dawn") { st.o = smooth((q - .4) / .6); st.sc = 1.1 - .1 * out(q); }
      else st.o = smooth(q);
    }
    return st;
  }

  function copyStyle(o, d) {
    var intro = o.i === 0 && !reduced;
    o.anim.forEach(function (el, k) {
      var op = 1, ty = 0;
      if (d > 0) { var q = clamp(d / .42 - k * .1); op = 1 - smooth(q); ty = -40 * out(q); }
      else if (d < 0) { var q2 = clamp((1 + d - .52 - k * .05) / .4); op = smooth(q2); ty = 40 * (1 - out(q2)); }
      if (intro) { var qi = out((Tnow - .15 - k * .12) / 1.1); op *= clamp((Tnow - .15 - k * .12) / .6); ty += 30 * (1 - qi); }
      if (reduced) ty = 0;
      el.style.opacity = op.toFixed(3); el.style.transform = ty ? "translate3d(0," + (ty * (mobile ? .7 : u)).toFixed(2) + "px,0)" : "none";
    });
  }

  function renderChat(o, t, live) {
    var s = o.data, segs = o.segs, n = segs.length;
    var weights = [];
    for (var j = 0; j <= n; j++) {
      var a = j === 0 ? 1 : smooth((t - o.bounds[j - 1]) / .45), b = j === n ? 1 : 1 - smooth((t - o.bounds[j]) / .45);
      weights.push(a * b);
    }
    o.stepsOn.forEach(function (el, j) { var w = weights[Math.min(j, n)] || 0; el.style.opacity = w.toFixed(3); el.parentNode.style.transform = "translateX(" + (w * 3).toFixed(2) + "px)"; });
    var labels = segs.map(function (sg, j) { return n > 1 ? "消息 " + (j + 1) + " / " + n + " · " + s.pct : s.pct; }).concat([s.pctAfter]);
    if (o.pct.childElementCount !== labels.length) o.pct.innerHTML = labels.map(function (l) { return "<span>" + esc(l) + "</span>"; }).join("");
    [].forEach.call(o.pct.children, function (sp, j) { var w = weights[j]; sp.style.opacity = w.toFixed(3); sp.style.transform = "translateY(" + ((1 - w) * 5).toFixed(2) + "px)"; });
    var afterP = smooth((t - o.flashAt - .15) / .3);
    o.footText.textContent = afterP > .5 ? s.footAfter : s.foot;
    if (o.afterImg) o.afterImg.style.opacity = afterP.toFixed(3);
    o.endnote.style.opacity = (out((t - o.flashAt - .35) / .45) * (live ? 1 : 0)).toFixed(3);
    var m = o.map;
    segs.forEach(function (sg, i) {
      var a = t - sg.start, enter = out(a / .7), exit = out((t - (sg.end - .48)) / .48);
      var visible = clamp(a / .18) * (1 - exit) * (live ? 1 : 0), k = reduced ? 1 : spring(a / .85), flight = (1 - enter) + exit;
      sg.spot.style.opacity = (clamp(a / .5) * (1 - smooth((t - sg.end + .35) / .6))).toFixed(3);
      sg.tag.style.opacity = (visible * out(a / .6)).toFixed(3); sg.tag.style.transform = "translateY(" + (8 * (1 - enter)).toFixed(2) + "px)";
      if (visible <= .001) { sg.wrap.style.visibility = "hidden"; return; }
      sg.wrap.style.visibility = "visible";
      var vx = m.ox + sg.data.from[0] * m.s, vy = m.oy + sg.data.from[1] * m.s;
      var dx = (vx - (sg.left + sg.w * sg.cu / 2)) / sg.cu, dy = (vy - (sg.top + 74 * sg.cu)) / sg.cu;
      var tiltX = -ptr[1] * 5, tiltY = ptr[0] * 6;
      sg.card.style.opacity = visible.toFixed(3);
      sg.card.style.transform = reduced ? "none" :
        "translate3d(" + (dx * flight).toFixed(2) + "px," + (dy * flight).toFixed(2) + "px," + (-420 * flight).toFixed(2) + "px) rotateX(" + (27 * flight + tiltX * (1 - flight)).toFixed(3) + "deg) rotateY(" + (sg.data.yaw * flight + tiltY * (1 - flight)).toFixed(3) + "deg) rotateZ(" + (-7 * flight).toFixed(3) + "deg) scale(" + ((.3 + .7 * k) * (1 - .65 * exit)).toFixed(4) + ")";
      sg.surface.style.setProperty("--shine", (Math.sin(Tnow * .7 + i) * 85).toFixed(1) + "px");
      var bottom = 57, typingAt = -1;
      sg.rows.forEach(function (row, j) {
        var msg = sg.msgs[j], age = a - msg.at, p = clamp(age / .32);
        if (age >= 0 && age < .25 && live && !row._dinged) { row._dinged = true; ding(msg.incoming); }
        if (age < 0) row._dinged = false;
        row.style.opacity = reduced ? (age >= 0 ? 1 : 0) : clamp(age / .15).toFixed(3);
        row.style.transform = reduced ? "none" : "translateY(" + (12 * (1 - out(p))).toFixed(2) + "px) scale(" + (.82 + .18 * spring(p)).toFixed(4) + ")";
        if (age >= 0) bottom = sg.bodyTop + sg.rowGeo[j][0] + sg.rowGeo[j][1] + 14;
        if (msg.incoming && age < 0 && age > -R.typing) typingAt = j;
      });
      sg.typing.style.opacity = typingAt >= 0 ? 1 : 0;
      if (typingAt >= 0) { var top = sg.bodyTop + sg.rowGeo[typingAt][0]; sg.typing.style.top = top + "px"; bottom = top + 43; }
      sg.dots.forEach(function (dot, j) { var wv = Math.sin(Tnow * 13 - j * 1.1); dot.style.transform = "translateY(" + (-Math.max(0, wv) * 3).toFixed(2) + "px)"; dot.style.opacity = (.4 + .6 * Math.max(0, wv)).toFixed(3); });
      sg.surface.style.transform = "scaleY(" + Math.min(1, bottom / sg.cardH).toFixed(4) + ")";
    });
    if (live && t >= o.flashAt && t < o.flashAt + .6 && !o._morphed) { o._morphed = true; morphSfx(); }
    if (t < o.flashAt - .1) o._morphed = false;
    var fl = t >= o.flashAt && t < o.flashAt + .5 ? Math.sin((t - o.flashAt) / .5 * Math.PI) * .94 : 0;
    return reduced ? 0 : fl * (live ? 1 : 0);
  }

  function render(T, y) {
    var dt = lastT === null ? 0 : clamp(T - lastT, 0, .1); lastT = T; Tnow = T;
    var tg = target || (reduced ? [0, 0] : [Math.sin(T * .5) * .35, Math.cos(T * .4) * .22]);
    var f = 1 - Math.exp(-dt * 5); if (lastT === T && dt === 0 && !manual) f = 1;
    ptr[0] += (tg[0] - ptr[0]) * f; ptr[1] += (tg[1] - ptr[1]) * f;

    var docH = document.documentElement.scrollHeight - vh;
    progressEl.style.transform = "scaleX(" + clamp(y / Math.max(1, docH)).toFixed(4) + ")";
    var pos = scenes.length - 1;
    for (var i = 0; i < scenes.length; i++) {
      var o = scenes[i];
      if (y < o.holdEnd) { pos = i; break; }
      if (y < o.transEnd) { pos = i + (y - o.holdEnd) / o.trans; break; }
    }
    // 时钟
    var ci = Math.floor(pos), cp = pos - ci, mNow = ci >= mins.length - 1 ? mins[mins.length - 1] : mins[ci] + (mins[ci + 1] - mins[ci]) * inOut(cp);
    if (reduced) mNow = mins[Math.round(pos)] || mins[mins.length - 1];
    hourHand.style.transform = "rotate(" + (mNow * .5).toFixed(2) + "deg)";
    minHand.style.transform = "rotate(" + (mNow * 6).toFixed(2) + "deg)";
    var mr = Math.round(mNow), hh = Math.floor(mr / 60) % 24, mm = mr % 60;
    var ts = (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
    if (clockTime.textContent !== ts) clockTime.textContent = ts;
    var ap = hh < 12 ? "AM" : "PM"; if (clockAp.textContent !== ap) clockAp.textContent = ap;
    var lb = S[Math.min(S.length - 1, cp > .5 ? ci + 1 : ci)].label; if (clockLabel.textContent !== lb) clockLabel.textContent = lb;
    var nearest = Math.round(pos);
    scenes.forEach(function (o, j) { o.rail.classList.toggle("on", j === nearest); });

    var flash = 0, wipeOp = 0, wipeX = 0;
    scenes.forEach(function (o, j) {
      var d = pos - j, show = d > -1 && d < 1;
      // 聊天时间轴：进入后自动播放，滚动也能推进/跳过
      if (o.chat) {
        if (y < o.holdStart - vh * .3) o.tAuto = 0;
        else if (y > o.holdEnd + 2) o.tAuto = o.D;
        else if (y >= o.holdStart - 2) o.tAuto = Math.min(o.D, o.tAuto + dt);
        var tScroll = clamp((y - o.holdStart) / (o.holdLen * .9)) * o.D;
        o.t = Math.max(o.tAuto, tScroll);
      }
      o.layer.style.visibility = show ? "visible" : "hidden";
      o.copy.style.visibility = show ? "visible" : "hidden";
      if (!show) { if (o.chat) o.segs.forEach(function (sg) { sg.wrap.style.visibility = "hidden"; }); return; }
      var st = transitionStyle(o, d);
      o.layer.style.opacity = st.o.toFixed(3); o.layer.style.zIndex = st.z;
      o.layer.style.clipPath = st.clip; o.layer.style.webkitClipPath = st.clip;
      o.layer.style.transform = (st.tx || st.sc !== 1) ? "translate3d(" + st.tx.toFixed(2) + "px,0,0) scale(" + st.sc.toFixed(4) + ")" : "none";
      if (d < 0 && scenes[j - 1].data.transition === "wipe" && !reduced) { var e = inOut(1 + d); wipeOp = Math.sin((1 + d) * Math.PI); wipeX = (1 - e) * vw + st.tx; }
      if (d < 0 && scenes[j - 1].data.transition === "dawn" && !reduced) flash = Math.max(flash, .38 * Math.sin((1 + d) * Math.PI));
      // 图片位置（手机上对准人物）
      var fx = o.data.focus || .5;
      if (o.chat && mobile) {
        var n = o.segs.length, t = o.t, acc = 0, wsum = 0;
        o.segs.forEach(function (sg, k2) { var w = (k2 === 0 ? 1 : smooth((t - o.bounds[k2 - 1]) / .45)) * (1 - smooth((t - o.bounds[k2]) / .45)); acc += w * sg.data.spotAt[0] / 1440; wsum += w; });
        var wa = smooth((t - o.bounds[n - 1]) / .45); acc += wa * (o.data.afterFocus || fx); wsum += wa; fx = acc / Math.max(.0001, wsum);
      }
      var m = imgMap(fx, o.i === 0); o.map = m;
      setBox(o.box, m);
      o.tilt.style.transform = tiltTransform(j, 1);
      if (o.fg) {
        setBox(o.fgBox, m);
        var px = ptr[0], py = ptr[1], T2 = Tnow;
        o.fg.style.transform = "perspective(1400px) translate3d(" + (px * 16 + Math.sin(T2 * .6) * 3).toFixed(2) + "px," + (py * 8 + Math.sin(T2 * 1.1) * 4).toFixed(2) + "px,0) rotateY(" + (px * 5).toFixed(3) + "deg) rotateX(" + (-py * 3).toFixed(3) + "deg) scale(" + (1.07 * (1 + .012 * Math.sin(T2 * 1.1))).toFixed(4) + ")";
        o.fg.style.transformOrigin = (m.ox + 1100 * m.s) + "px " + (m.oy + 700 * m.s) + "px";
        o.depth.style.transform = "translate3d(" + (-px * 6).toFixed(2) + "px," + (-py * 4).toFixed(2) + "px,0)";
        var gx = (ptr[0] * .5 + .5) * vw, gy = (ptr[1] * .5 + .5) * vh;
        o.glow.style.transform = "translate3d(" + (gx - 450).toFixed(1) + "px," + (gy - 450).toFixed(1) + "px,0)";
        var depthEng = o.depth.firstChild, qe = out((Tnow - .1) / 1.2);
        depthEng.style.opacity = (clamp(1 - Math.max(0, d) / .5) * qe).toFixed(3);
      }
      copyStyle(o, d);
      if (o.chat) flash = Math.max(flash, renderChat(o, o.t, Math.abs(d) < .5 || (d < 0 && o.t > 0)));
    });
    flashEl.style.opacity = flash.toFixed(3);
    navEl.classList.toggle("solid", y > storyEnd + vh * .5);
    wipeEl.style.opacity = wipeOp.toFixed(3); wipeEl.style.transform = "translate3d(" + wipeX.toFixed(1) + "px,0,0)";
  }

  /* ---------- 平滑跳转（键盘 / 右侧刻度） ---------- */
  function scrollToY(y) { window.scrollTo({ top: Math.max(0, y), behavior: reduced ? "auto" : "smooth" }); }
  addEventListener("keydown", function (e) {
    if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
    var y = scrollY, down = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey), up = e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey);
    if (!down && !up) return;
    if (y > storyEnd + 4 && !(up && y < storyEnd + vh * 1.2)) return;
    var t = null;
    if (down) { for (var i = 0; i < targets.length; i++) if (targets[i] > y + 4) { t = targets[i]; break; } if (t === null) t = storyEnd + vh; }
    else { for (var j = targets.length - 1; j >= 0; j--) if (targets[j] < y - 4) { t = targets[j]; break; } if (t === null) t = 0; }
    e.preventDefault(); scrollToY(t + (down ? 2 : 0));
  });

  /* ---------- 故事后的资料区 ---------- */
  function ph(text) { return '<div class="ph"><b>待补充</b>' + esc(text || "这一部分的内容还没交，交了之后填到 content.js 里。") + "</div>"; }
  function paras(arr) { return (arr || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join(""); }
  function cite(s) { return esc(s).replace(/\[(\d+)\]/g, '<a class="bcite" href="#bref-$1">[$1]</a>'); }
  function linkify(s) { return esc(s).replace(/(https:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>'); }
  function strip(list, alt, empty, cls) {
    if (!list || !list.length) return ph(empty);
    return '<div class="carousel"><button class="cz prev" type="button" aria-label="上一张">‹</button><button class="cz next" type="button" aria-label="下一张">›</button><div class="strip' + (cls ? " " + cls : "") + '">' + list.map(function (it, i) {
      var src = typeof it === "string" ? it : it.src, cap = typeof it === "string" ? "" : (it.caption || "");
      return '<figure class="shot"><img src="' + esc(src) + '" alt="' + esc(cap || alt + " " + (i + 1)) + '" loading="lazy" data-zoom>' + (cap ? "<figcaption>" + esc(cap) + "</figcaption>" : "") + "</figure>";
    }).join("") + "</div></div>";
  }
  function pend(list) { return list && list.length ? '<ul class="notes">' + list.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : ""; }
  function head(sec, id, label) {
    var pill = sec.status ? '<span class="pending-pill">' + esc(sec.status) + "</span>" : "";
    return '<div class="kicker">' + esc(label) + "</div><h3>" + esc(sec.title) + pill + "</h3>";
  }
  function buildMore() {
    var A = C.intro, B = C.theory, V = C.videos, D = C.emoji, E = C.evidence, F = C.journal, Z = C.closing;
    var h = '<div class="wrap">';
    h += '<header class="more-head reveal"><div class="kicker">资料 · 分析 · 分工</div><h2>奶蛙的情绪价值<br><span class="gold">从哪来？</span></h2><p>' + esc(C.site.subtitle) + "。下面是我们每一部分的材料和分析。</p>" +
      '<nav class="toc"><a href="#sec-intro">奶蛙是什么</a><a href="#sec-theory">理论</a><a href="#sec-videos">视频</a><a href="#sec-emoji">表情包</a><a href="#sec-evidence">使用场景</a><a href="#sec-journal">期刊</a><a href="#sec-closing">结语</a><a href="#sec-team">小组成员</a></nav></header>';
    // A
    h += '<section class="blk reveal" id="sec-intro">' + head(A, "intro", "01") + (A.blocks && A.blocks.length ? A.blocks.map(function (b, bi) {
      var o = '<div class="ablk"><h4 class="ah">' + esc(b.title) + "</h4>";
      if (b.paragraphs) o += '<div class="atext">' + paras(b.paragraphs) + "</div>";
      if (b.points) o += '<div class="grid g2" style="margin-top:20px">' + b.points.map(function (pt, i) { return '<div class="card"><div class="num">0' + (i + 1) + "</div><h4>" + esc(pt.title) + "</h4><p>" + esc(pt.text) + "</p></div>"; }).join("") + "</div>";
      if (b.figures) o += '<div class="afigs">' + b.figures.map(function (f) {
        var imgs = (f.group || [f.src]).map(function (src) { return '<img src="' + esc(src) + '" alt="' + esc(f.caption) + '" loading="lazy" data-zoom>'; }).join("");
        return '<figure class="afig' + (f.group ? " grp" : "") + '"><div class="aimgs">' + imgs + "</div><figcaption>" + esc(f.caption) + "</figcaption></figure>";
      }).join("") + "</div>";
      return o + "</div>";
    }).join("") : (A.paragraphs && A.paragraphs.length ? '<div class="lead">' + paras(A.paragraphs) + "</div>" : ph(A.lead))) + "</section>";
    // B
    h += '<section class="blk reveal" id="sec-theory">' + head(B, "theory", "02") + '<div class="grid g3">' + B.cards.map(function (c, i) {
      return '<div class="card"><div class="num">0' + (i + 1) + "</div><h4>" + esc(c.title) + "</h4>" + (c.hint ? '<p class="emotion">' + esc(c.hint) + "</p>" : "") + (c.text ? "<p>" + cite(c.text) + "</p>" : "") + "</div>";
    }).join("") + "</div>" +
      (B.lead ? '<p class="lead blead">' + cite(B.lead) + "</p>" : "") +
      (B.blocks || []).map(function (bk) {
        return '<div class="ablk"><h4 class="ah">' + esc(bk.title) + "</h4>" + (bk.paras || []).map(function (p) { return "<p>" + cite(p) + "</p>"; }).join("") + "</div>";
      }).join("") +
      (B.refs && B.refs.length ? '<div class="jref bref"><b>参考资料</b>' + B.refs.map(function (r) {
        return '<p id="bref-' + esc(r.n) + '">' + linkify(r.text) + "</p>";
      }).join("") + "</div>" : "") + "</section>";
    // C
    h += '<section class="blk reveal" id="sec-videos">' + head(V, "videos", "03") + '<p class="lead">' + esc(V.intro) + '</p><div class="grid" style="margin-top:40px;gap:44px">' + V.items.map(function (it, i) {
      var player = it.video ? '<video class="vplayer" controls playsinline preload="metadata"' + (it.poster ? ' poster="' + esc(it.poster) + '"' : "") + ' aria-label="' + esc(it.title) + '"><source src="' + esc(it.video) + '" type="video/mp4"></video>' : '<div class="poster">' + ph("视频文件待补充。") + "</div>";
      return '<article class="video">' + player + '<div><div class="emotion">视频 0' + (i + 1) + "</div><h4 style=\"margin-top:10px\">" + esc(it.title) + "</h4><p>" + esc(it.text) + "</p></div></article>";
    }).join("") + '</div><p style="margin-top:40px" class="lead">' + esc(V.conclusion) + "</p>" + (V.sources && V.sources.length ? '<div class="vsrc"><h4>视频来源</h4><ul>' + V.sources.map(function (x) { return '<li>' + esc(x.label) + ' · <a href="' + esc(x.url) + '" target="_blank" rel="noopener">打开链接 ↗</a></li>'; }).join("") + "</ul></div>" : "") + pend(V.pending) + "</section>";
    // D
    h += '<section class="blk reveal" id="sec-emoji">' + head(D, "emoji", "04") +
      '<div class="ablk"><h4 class="ah">' + esc(D.h1) + '</h4>' + paras(D.myth) + '</div>' +
      '<div class="ablk"><h4 class="ah">' + esc(D.h2) + '</h4><p>' + esc(D.lead) + '</p><div class="grid g2" style="margin-top:20px">' + D.items.map(function (it, i) {
      return '<article class="card emo"><figure style="margin:0"><img src="' + esc(it.image) + '" alt="' + esc(it.title) + '" data-zoom loading="lazy"><figcaption class="dcap">图' + "一二三四".charAt(i) + ' · ' + esc(D.imgNote) + '</figcaption></figure><div><h4>' + (i + 1) + '. ' + esc(it.title) + '</h4><div class="emotion">' + esc(it.emotion) + "</div><dl><dt>外延</dt><dd>" + esc(it.denotation) + "</dd><dt>内涵</dt><dd>" + esc(it.connotation) + "</dd><dt>使用</dt><dd>" + esc(it.usage) + "</dd></dl></div></article>";
    }).join("") + '</div></div>' +
      '<div class="ablk"><h4 class="ah">' + esc(D.h3) + '</h4><p>' + esc(D.summary) + '</p><div class="grid g3" style="margin-top:20px">' + D.values.map(function (v, i) {
      return '<div class="card"><div class="num">0' + (i + 1) + "</div><h4>" + esc(v.title) + "</h4><p>" + esc(v.text) + "</p></div>";
    }).join("") + '</div></div>' +
      '<div class="ablk"><h4 class="ah">' + esc(D.h4) + '</h4>' + paras(D.conclusion) + '</div>' + pend(D.pending) + "</section>";
    // E
    h += '<section class="blk reveal" id="sec-evidence">' + head(E, "evidence", "05") + '<p class="lead">' + esc(E.lead) + '</p><div class="grid g3" style="margin-top:36px">' + E.scenes.map(function (s) {
      return '<div class="card use"><img src="' + esc(s.sticker) + '" alt="' + esc(s.name) + '" loading="lazy"><div><div class="rel">' + esc(s.relation) + " · " + esc(s.feeling) + "</div><h4 style=\"margin-bottom:6px\">" + esc(s.name) + "</h4><p style=\"font-size:14px\">" + esc(s.text) + "</p></div></div>";
    }).join("") + '</div><h4 style="margin:50px 0 18px">网友怎么说</h4><div class="quotes">' + E.comments.map(function (c) {
      return "<blockquote>「" + esc(c.text) + "」<small>" + esc(c.likes) + " · " + esc(c.note) + "</small>" + (c.screenshot ? imgTag(c.screenshot, c.text) : "") + "</blockquote>";
    }).join("") + '</div><h4 style="margin:50px 0 18px">' + esc(E.chatShotsTitle || "聊天里的奶蛙") + "</h4>" + strip(E.chatShots, "聊天截图", "聊天截图待补充。", "tall") +
      '<h4 style="margin:50px 0 10px">' + esc(E.offlineTitle) + "</h4>" + (E.offlineLead ? '<p style="margin-bottom:18px">' + esc(E.offlineLead) + "</p>" : "") + strip(E.offline, "线下奶蛙", "线下照片待补充。") +
      '<h4 style="margin:40px 0 18px">' + esc(E.commentsTitle) + "</h4>" + strip(E.commentImages, "评论与弹幕", "评论与弹幕截图待补充。", "tall") +
      '<div style="margin-top:40px"><div><h4 class="ivh">小访谈</h4><div class="quotes" style="max-width:820px">' + E.interviews.map(function (q) { return "<blockquote style=\"font-size:17px\">「" + esc(q) + "」</blockquote>"; }).join("") + "</div>" + (E.interviewImages && E.interviewImages.length ? '<div class="iv">' + E.interviewImages.map(function (it) { return '<figure class="shot"><img src="' + esc(it.src) + '" alt="' + esc(it.caption) + '" loading="lazy" data-zoom><figcaption>' + esc(it.caption) + "</figcaption></figure>"; }).join("") + "</div>" : "") + "</div></div></section>";
    // F
    var hasPaper = F.paperTitle;
    h += '<section class="blk reveal" id="sec-journal">' + head(F, "journal", "06") + (hasPaper ? '<div class="jpaper"><div class="jt">' + esc(F.paperTitle) + '</div>' + (F.paperZh ? '<div class="jz">' + esc(F.paperZh) + '</div>' : "") + '<div class="ja">' + esc(F.authors) + '</div></div>' : ph("论文题名、作者和出处待补充。")) +
      (F.contrast && F.contrast.length ? '<div class="jvs">' + F.contrast.map(function (c) { return '<div class="jc"><b>' + esc(c.label) + '</b><span class="eg">' + esc(c.eg) + '</span><span>' + esc(c.line) + '</span></div>'; }).join('<div class="jx">vs</div>') + '</div>' : "") +
      (F.blocks || []).map(function (bk) { return '<div class="ablk"><h4>' + esc(bk.title) + '</h4>' + paras(bk.paras) + '</div>'; }).join("") +
      (F.citation ? '<p class="jref"><b>参考文献</b><br>' + esc(F.citation) + '</p>' : "") + "</section>";
    // 结论
    var concl = esc(Z.conclusion);
    (Z.highlights || []).forEach(function (w) { concl = concl.split(esc(w)).join('<span class="gold">' + esc(w) + "</span>"); });
    h += '<section class="blk closing reveal" id="sec-closing"><div class="kicker">' + esc(Z.kicker || "07 · 结语") + "</div><h3>" + esc(Z.title) + '</h3><p class="closing-text">' + concl + "</p></section>";
    var TM = C.team;
    h += '<section class="blk team" id="sec-team"><div class="kicker reveal">' + esc(TM.kicker) + '</div><h3 class="reveal">' + esc(TM.title) + '</h3><ol class="members">' + TM.members.map(function (m, i) {
      return '<li class="member reveal" style="transition-delay:' + (i % 3) * 0.08 + 's"><span class="mnum">0' + (i + 1) + '</span><b class="mname">' + esc(m.name) + '</b><span class="mrole">' + esc(m.role) + '</span><p>' + esc(m.detail) + "</p></li>";
    }).join("") + "</ol></section>";
    h += "</div>";
    var TH = C.thanks;
    h += '<section class="thanks" id="sec-thanks" aria-label="' + esc(TH.line1 + " " + TH.line2) + '"><div class="thanks-bg" style="background-image:url(' + esc(TH.image) + ')"></div><div class="thanks-in reveal"><div class="kicker">' + esc(C.site.title) + " · " + esc(C.site.course) + '</div><h2><span class="t1">' + esc(TH.line1) + '</span><span class="t2">' + esc(TH.line2) + '</span></h2><p>' + esc(C.site.subtitle) + '</p></div><footer>' + (TH.disclaimer ? '<span class="disc">' + esc(TH.disclaimer) + '</span><br>' : "") + (function () {
      var parts = [];
      if (Z.references) parts.push(esc(Z.references).replace(/[。．.\s；;]+$/g, ""));
      if (D.sourceLinks && D.sourceLinks.length) parts.push('奶蛙表情包图片：小红书用户笔记（' + D.sourceLinks.map(function (x) { return '<a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.label) + '</a>'; }).join("、") + '）');
      return parts.join("；");
    })() + ' · <a href="#top">回到开头 ↑</a></footer></section>';
    h = '<div class="more-bg" aria-hidden="true"></div>' + h;
    $("#more").innerHTML = h;
  }
  buildMore();

  /* 渐显 */
  var reveals = [].slice.call(document.querySelectorAll(".reveal"));
  if (manual || reduced || !("IntersectionObserver" in window)) reveals.forEach(function (el) { el.classList.add("in"); });
  else { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -10% 0px" }); reveals.forEach(function (el) { io.observe(el); }); }

  /* 看大图 */
  var lb = $(".lightbox"), lbImg = lb.querySelector("img");
  document.addEventListener("click", function (e) {
    var im = e.target.closest && e.target.closest("[data-zoom]");
    if (im) { lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt; lb.hidden = false; return; }
    if (!lb.hidden && (e.target === lb || e.target.tagName === "BUTTON")) lb.hidden = true;
  });
  addEventListener("keydown", function (e) { if (e.key === "Escape") lb.hidden = true; });
  document.addEventListener("click", function (e) {
    var bt = e.target.closest && e.target.closest(".cz"); if (!bt) return;
    var st = bt.parentNode.querySelector(".strip"), f = st.querySelector(".shot");
    var step = f ? f.getBoundingClientRect().width + 20 : st.clientWidth * .8;
    st.scrollBy({ left: bt.classList.contains("next") ? step : -step, behavior: "smooth" });
  });
  $("#moreLink").addEventListener("click", function (e) { e.preventDefault(); scrollToY($("#more").offsetTop); });

  /* ---------- 启动 ---------- */
  var lastW = 0, lastH = 0;
  function onResize() { var w = innerWidth, h = stageEl.clientHeight; if (w !== lastW || Math.abs(h - lastH) > 120) { lastW = w; lastH = h; layout(); } }
  addEventListener("resize", onResize);
  var storyImgs = [].slice.call(document.querySelectorAll(".stage img"));
  window.__ready = Promise.race([Promise.all([document.fonts ? document.fonts.ready : 0].concat(storyImgs.map(function (im) { return im.decode ? im.decode().catch(function () {}) : 0; }))), new Promise(function (r) { setTimeout(r, 2500); })]).then(function () {
    onResize(); layout(); render(0, scrollY);
    document.documentElement.classList.add("ready");
    if (!manual) {
      // 平滑滚动：画面跟着一个"缓动后的滚动位置"走，鼠标滚轮一格一格的跳动不会直接变成画面跳帧
      var t0 = performance.now(), sy = scrollY, lastNow = t0;
      (function tick(now) {
        var dts = Math.min(.1, Math.max(0, (now - lastNow) / 1000)); lastNow = now;
        var ty = scrollY, gap = ty - sy;
        if (reduced || Math.abs(gap) > vh * 4) sy = ty; else { sy += gap * (1 - Math.exp(-dts * 9)); if (Math.abs(ty - sy) < .3) sy = ty; }
        render((now - t0) / 1000, sy); requestAnimationFrame(tick);
      })(t0);
    }
  });
  onResize();
  /* 录制预览用：window.__frame({y, T, mx, my}) */
  window.__frame = function (o) {
    if (o.mx !== undefined && o.mx !== null) target = [o.mx, o.my]; else target = null;
    document.documentElement.scrollTop = o.y; render(o.T, o.y);
  };
  window.__info = function () { return { vh: vh, storyEnd: storyEnd, more: $("#more").offsetTop, docH: document.documentElement.scrollHeight, scenes: scenes.map(function (o) { return { id: o.data.id, holdStart: o.holdStart, holdEnd: o.holdEnd, transEnd: o.transEnd, D: o.D || 0, segs: o.segs ? o.segs.map(function (s) { return [s.start, s.end]; }) : null, flashAt: o.flashAt || 0 }; }) }; };
})();
