/* ==========================================================================
   Origin Dentals — site behaviour
   No dependencies. Everything degrades to plain links/forms without JS.
   ========================================================================== */
(function () {
  'use strict';

  var WA_NUMBER = '919092543740';
  var TZ = 'Asia/Kolkata';
  // 0 = Sunday … 6 = Saturday; hours in 24h decimal
  var HOURS = { 0: [9, 13], 1: [8, 21], 2: [8, 21], 3: [8, 21], 4: [8, 21], 5: [8, 21], 6: [8, 21] };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- header shadow ---------- */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- desktop dropdowns ---------- */
  var toggles = $$('[data-dropdown]');
  function closeAll(except) {
    toggles.forEach(function (b) {
      if (b === except) return;
      b.setAttribute('aria-expanded', 'false');
      var m = document.getElementById(b.getAttribute('aria-controls'));
      if (m) m.classList.remove('is-open');
    });
  }
  toggles.forEach(function (btn) {
    var menu = document.getElementById(btn.getAttribute('aria-controls'));
    var li = btn.parentElement;
    var set = function (open) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (menu) menu.classList.toggle('is-open', open);
    };
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') !== 'true';
      closeAll(btn); set(open);
    });
    if (window.matchMedia('(hover: hover)').matches) {
      var t;
      li.addEventListener('mouseenter', function () { clearTimeout(t); closeAll(btn); set(true); });
      li.addEventListener('mouseleave', function () { t = setTimeout(function () { set(false); }, 160); });
    }
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.nav-links')) closeAll(); });

  /* ---------- mobile drawer ---------- */
  var drawer = $('#drawer');
  var opener = $('.menu-toggle');
  function setDrawer(open) {
    if (!drawer || drawer.classList.contains('is-open') === open) return;
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (opener) opener.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { var f = $('.drawer-close', drawer); if (f) f.focus(); } else if (opener) opener.focus();
  }
  if (opener) opener.addEventListener('click', function () { setDrawer(true); });
  $$('[data-drawer-close]').forEach(function (el) { el.addEventListener('click', function () { setDrawer(false); }); });
  $$('#drawer a').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });

  /* ---------- open now (clinic time, not visitor time) ---------- */
  function clinicNow() {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    var get = function (t) { return (parts.filter(function (p) { return p.type === t; })[0] || {}).value; };
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day: day, t: +get('hour') + (+get('minute')) / 60 };
  }
  function fmt(h) {
    var hh = Math.floor(h), mm = Math.round((h - hh) * 60), ap = hh >= 12 ? 'PM' : 'AM';
    var h12 = hh % 12 || 12;
    return h12 + (mm ? ':' + String(mm).padStart(2, '0') : '') + ' ' + ap;
  }
  function openStatus() {
    var n = clinicNow(), h = HOURS[n.day];
    if (n.t >= h[0] && n.t < h[1]) return { open: true, text: 'Open now · until ' + fmt(h[1]) };
    if (n.t < h[0]) return { open: false, text: 'Closed · opens ' + fmt(h[0]) + ' today' };
    var next = (n.day + 1) % 7;
    return { open: false, text: 'Closed · opens ' + fmt(HOURS[next][0]) + (next === 0 ? ' Sunday' : ' tomorrow') };
  }
  var st = openStatus();
  $$('[data-open-badge]').forEach(function (el) { el.textContent = st.text; el.classList.toggle('is-open', st.open); });
  var today = clinicNow().day;
  $$('[data-day]').forEach(function (row) { if (+row.getAttribute('data-day') === today) row.classList.add('is-today'); });

  /* ---------- tabs (symptom finder, patient stories) ---------- */
  $$('[data-tabs]').forEach(function (box) {
    var tabs = $$('[role="tab"]', box);
    if (!tabs.length) return;
    function show(tab, focus, user) {
      var panel;
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) { p.hidden = !on; if (on) panel = p; }
      });
      if (focus) tab.focus();
      // on narrow screens the panel sits below the list; bring it into view if it is out of sight
      if (user && panel && window.innerWidth <= 900) {
        var r = panel.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.7 || r.bottom < 80) panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t, false, true); });
      t.addEventListener('keydown', function (e) {
        var j = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (j === undefined) return;
        e.preventDefault();
        show(tabs[(j + tabs.length) % tabs.length], true, false);
      });
    });
    show(tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0], false, false);
  });

  /* ---------- videos ---------- */
  // The hero shows its poster at once; the video is fetched only after the page has finished
  // loading, so it never competes with the content. Phones get a lighter portrait cut, and
  // nothing is fetched with reduced motion, Data Saver or a 2G connection.
  var hero = $('[data-hero-video]');
  if (hero) {
    var conn = navigator.connection || {};
    var skipVideo = reduceMotion || conn.saveData || /2g/.test(conn.effectiveType || '');
    var startHero = function () {
      var phone = window.matchMedia('(max-width: 640px)').matches && hero.getAttribute('data-src-phone');
      hero.src = hero.getAttribute(phone ? 'data-src-phone' : 'data-src');
      var play = function () { hero.play().catch(function () {}); };
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) { es.forEach(function (e) { e.isIntersecting ? play() : hero.pause(); }); }, { threshold: 0.15 }).observe(hero);
      } else play();
    };
    var whenIdle = function (fn) { if ('requestIdleCallback' in window) requestIdleCallback(fn, { timeout: 2000 }); else setTimeout(fn, 200); };
    if (!skipVideo) {
      if (document.readyState === 'complete') whenIdle(startHero);
      else window.addEventListener('load', function () { whenIdle(startHero); });
    }
  }
  $$('[data-lazy-video]').forEach(function (v) {
    var btn = v.parentElement.querySelector('.video-btn');
    var label = btn && btn.querySelector('[data-label]');
    var playIcon = btn && btn.querySelector('.ic-play');
    var pauseIcon = btn && btn.querySelector('.ic-pause');
    var loaded = false;
    var load = function () { if (loaded) return; loaded = true; v.src = v.getAttribute('data-src'); };
    var sync = function () {
      if (!btn) return;
      var playing = !v.paused;
      if (label) label.textContent = playing ? 'Pause' : 'Play the clip';
      if (playIcon) playIcon.hidden = playing;
      if (pauseIcon) pauseIcon.hidden = !playing;
    };
    v.addEventListener('play', sync); v.addEventListener('pause', sync);
    if (btn) btn.addEventListener('click', function () { load(); v.paused ? v.play().catch(function () {}) : v.pause(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { load(); if (!reduceMotion) v.play().catch(function () {}); }
          else if (loaded) v.pause();
        });
      }, { rootMargin: '200px 0px', threshold: 0.25 }).observe(v);
    }
  });

  /* ---------- booking ---------- */
  var form = $('#bookForm');
  var modal = $('#bookModal');
  function setModal(open) {
    if (!modal || modal.classList.contains('is-open') === open) return;
    modal.classList.toggle('is-open', open);
    modal.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { var b = $('.modal-card .btn', modal); if (b) b.focus(); }
  }
  $$('[data-modal-close]').forEach(function (el) { el.addEventListener('click', function () { setModal(false); }); });

  if (form) {
    // earliest date = today in clinic time
    var minDate = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    if (form.elements.date) form.elements.date.min = minDate;

    // prefill from links such as index.html?service=implants#book, or from the quick booking bar
    var prefill = function (params) {
      ['service', 'doctor'].forEach(function (k) {
        var v = params.get(k), sel = form.elements[k];
        if (v && sel && $$('option', sel).some(function (o) { return o.value === v; })) sel.value = v;
      });
      var dt = params.get('date');
      if (dt && /^\d{4}-\d{2}-\d{2}$/.test(dt) && dt >= minDate) form.elements.date.value = dt;
    };
    prefill(new URLSearchParams(location.search));

    var goToForm = function (focusName) {
      var sec = $('#book');
      if (!sec) return;
      sec.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', location.pathname + location.search + '#book');
      if (focusName) setTimeout(function () { form.elements.name.focus({ preventScroll: true }); }, reduceMotion ? 0 : 700);
    };

    var quick = $('#quickBook');
    if (quick) {
      if (quick.elements.date) quick.elements.date.min = minDate;
      quick.addEventListener('submit', function (e) {
        e.preventDefault();
        prefill(new URLSearchParams(new FormData(quick)));
        goToForm(true);
      });
    }

    // booking links that point at this same page: fill the form in place instead of reloading
    var samePage = function (p) { return p.replace(/index\.html$/, ''); };
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href*="#book"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var url = new URL(a.getAttribute('href'), location.href);
      if (samePage(url.pathname) !== samePage(location.pathname)) return;
      e.preventDefault();
      prefill(url.searchParams);
      goToForm(false);
    });

    var rules = {
      name: function (v) { return v.trim().length >= 2 || 'Please tell us your name.'; },
      phone: function (v) { var digits = v.replace(/[^\d]/g, ''); return (digits.length >= 10 && digits.length <= 15) || 'Please enter a phone number we can call.'; },
      date: function (v) { return (!!v && v >= minDate) || 'Please pick today or a later date.'; },
      slot: function () { return !!form.querySelector('input[name="slot"]:checked') || 'Please choose a time of day.'; }
    };
    function check(name) {
      var field = form.querySelector('[data-field="' + name + '"]');
      var el = form.elements[name];
      var res = rules[name](el && el.value !== undefined ? el.value : '');
      if (field) {
        field.classList.toggle('has-error', res !== true);
        var e = field.querySelector('.err'); if (e && res !== true) e.textContent = res;
      }
      return res === true;
    }
    Object.keys(rules).forEach(function (n) {
      var el = form.elements[n];
      if (!el) return;
      (el.length && !el.tagName ? Array.prototype.slice.call(el) : [el]).forEach(function (x) {
        x.addEventListener('change', function () { check(n); });
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = Object.keys(rules).map(check).every(Boolean);
      if (!ok) { var first = form.querySelector('.has-error input, .has-error select'); if (first) first.focus(); return; }
      var f = form.elements;
      var opt = function (sel) { return sel.options[sel.selectedIndex].text; };
      var slot = form.querySelector('input[name="slot"]:checked');
      var when = new Date(f.date.value + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
      var data = {
        name: f.name.value.trim(), phone: f.phone.value.trim(),
        service: opt(f.service), doctor: opt(f.doctor), when: when + ' · ' + slot.value,
        note: (f.note && f.note.value.trim()) || ''
      };
      $('#sumName').textContent = data.name;
      $('#sumService').textContent = data.service;
      $('#sumDoctor').textContent = data.doctor;
      $('#sumWhen').textContent = data.when;
      var msg = 'Hello Origin Dentals, I would like to book a visit.\n' +
        'Name: ' + data.name + '\nPhone: ' + data.phone + '\nTreatment: ' + data.service +
        '\nDentist: ' + data.doctor + '\nWhen: ' + data.when + (data.note ? '\nNote: ' + data.note : '');
      $('#waSend').href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
      setModal(true);
      form.reset();
      if (form.elements.date) form.elements.date.min = minDate;
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeAll(); setDrawer(false); setModal(false);
  });

  /* ---------- footer year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
