/* ============================================================
   Redigit Softwares — minimal vanilla JS
   No dependencies. Progressive enhancement only: the page is
   fully readable and the form works even if this file fails.
   ============================================================ */
(function () {
    "use strict";

    var root = document.documentElement;
    var STORAGE_KEY = "redigit-theme";

    /* ---- Theme toggle -------------------------------------- */
    var toggle = document.querySelector(".theme-toggle");

    function currentTheme() {
        return root.getAttribute("data-theme") === "light" ? "light" : "dark";
    }

    function syncToggleState() {
        if (!toggle) return;
        // aria-pressed = "is light mode active"
        toggle.setAttribute("aria-pressed", String(currentTheme() === "light"));
    }

    function setTheme(theme) {
        root.setAttribute("data-theme", theme);
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
        syncToggleState();
    }

    if (toggle) {
        syncToggleState();
        toggle.addEventListener("click", function () {
            setTheme(currentTheme() === "light" ? "dark" : "light");
        });
    }

    // Follow system changes only while the user hasn't chosen explicitly.
    try {
        var mq = window.matchMedia("(prefers-color-scheme: light)");
        var onSystemChange = function (e) {
            var saved = null;
            try { saved = localStorage.getItem(STORAGE_KEY); } catch (err) {}
            if (!saved) setTheme(e.matches ? "light" : "dark");
        };
        if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
        else if (mq.addListener) mq.addListener(onSystemChange); // older Safari
    } catch (e) {}

    /* ---- Header scrolled state ----------------------------- */
    function updateHeader() {
        document.body.classList.toggle("scrolled", window.scrollY > 8);
    }
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    /* ---- Reveal on scroll ---------------------------------- */
    var revealEls = document.querySelectorAll(".reveal");
    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || !("IntersectionObserver" in window)) {
        revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
        var io = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                // gentle stagger for siblings in the same grid
                var siblings = Array.prototype.slice.call(el.parentNode.children);
                var idx = siblings.indexOf(el);
                el.style.setProperty("--reveal-delay", Math.min(idx, 5) * 0.07 + "s");
                el.classList.add("is-visible");
                obs.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

        revealEls.forEach(function (el) { io.observe(el); });
    }

    /* ---- Contact form (AJAX enhancement) ------------------- */
    var form = document.querySelector(".contact-form");
    if (form) {
        var status = form.querySelector(".form-status");

        var showStatus = function (message, ok) {
            if (!status) return;
            status.textContent = message;
            status.className = "form-status " + (ok ? "is-success" : "is-error");
            status.hidden = false;
        };

        form.addEventListener("submit", function (e) {
            // Don't hijack until a real key is present — until then let the
            // native POST happen so the setup is obvious during testing.
            var key = form.querySelector('input[name="access_key"]');
            if (!key || key.value.indexOf("PLACEHOLDER") !== -1) {
                return; // native submit -> you'll see the "invalid key" page = reminder to set it up
            }

            e.preventDefault();
            var button = form.querySelector('button[type="submit"]');
            var original = button ? button.textContent : "";
            if (button) { button.disabled = true; button.textContent = "Sending…"; }

            fetch(form.action, {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: new FormData(form)
            })
                .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
                .then(function (r) {
                    if (r.ok) {
                        showStatus("Thanks — your message is on its way. We'll be in touch soon.", true);
                        form.reset();
                    } else {
                        showStatus((r.data && r.data.message) || "Something went wrong. Please email us directly.", false);
                    }
                })
                .catch(function () {
                    showStatus("Network error. Please email us directly at hello@redigit.io.", false);
                })
                .finally(function () {
                    if (button) { button.disabled = false; button.textContent = original; }
                });
        });
    }
})();
