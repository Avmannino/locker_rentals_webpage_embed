// src/App.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

import hero1 from "./assets/hero/locker-1.jpg";
import hero2 from "./assets/hero/locker-2.jpg";
import hero3 from "./assets/hero/locker-3.jpeg";

const MONTHLY_PRICE = 49.99;
const MONTHS = 6;
const TOTAL = 249.95;

function formatMoney(n) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function App() {
  const slides = useMemo(
    () => [
      {
        src: hero1,
        headline: "Locker Rentals Now Available!",
        subhead: "Rinkside convenience in a full-size locker.",
      },
      {
        src: hero2,
        headline: "Keep Your Gear Steps From the Ice",
        subhead:
          "Skip the back-and-forth. Store it once, grab it fast, hit the ice.",
      },
      {
        src: hero3,
        headline: "Secure. Monitored. Hassle-Free.",
        subhead:
          "Your equipment stays protected and ready—so you can focus on the game.",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  // ✅ Email chooser modal state
  const [emailOpen, setEmailOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Email details
  const toEmail = "jwanderlingh@wingsarena.com";
  const subject = "Locker Rental Request (Spring & Summer 2026)";
  const body =
    "Hi Jon,\n\nI’d like to reserve a Classic Locker for Spring & Summer 2026.\n\nName:\nPhone:\nEmail:\nPreferred start date:\n\nThanks!";

  const subjectEnc = encodeURIComponent(subject);
  const bodyEnc = encodeURIComponent(body);
  const toEnc = encodeURIComponent(toEmail);

  // Browser-based compose links (do NOT depend on OS default mail app)
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEnc}&su=${subjectEnc}&body=${bodyEnc}`;
  const outlookWebUrl = `https://outlook.office.com/mail/deeplink/compose?to=${toEnc}&subject=${subjectEnc}&body=${bodyEnc}`;
  const yahooUrl = `https://compose.mail.yahoo.com/?to=${toEnc}&subject=${subjectEnc}&body=${bodyEnc}`;

  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [paused, slides.length]);

  // Close modal on Escape
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setEmailOpen(false);
    }
    if (emailOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [emailOpen]);

  function goTo(i) {
    setActive(i);
  }

  function prev() {
    setActive((p) => (p - 1 + slides.length) % slides.length);
  }

  function next() {
    setActive((p) => (p + 1) % slides.length);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(toEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = toEmail;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }
  }

  return (
    <div className="page">
      {/* ✅ Removed top header/topbar entirely */}

      {/* HERO CAROUSEL */}
      <section
        className="hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="hero-frame">
          {slides.map((s, i) => (
            <div
              key={s.headline}
              className={`hero-slide ${i === active ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${s.src})` }}
              role="img"
              aria-label={s.headline}
            />
          ))}

          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="pill">Spring & Summer 2026</div>
            <h1 className="hero-title">{slides[active].headline}</h1>
            <p className="hero-subtitle">{slides[active].subhead}</p>

            <div className="hero-actions">
              <a className="cta" href="#pricing">
                Lock In Your Spot
              </a>
              <a className="ghost" href="#details">
                See Features
              </a>
            </div>

            <div className="hero-mini">
              <div className="mini-card">
                <div className="mini-kicker">Deal</div>
                <div className="mini-strong">First Month Free</div>
                <div className="mini-muted">
                  {formatMoney(MONTHLY_PRICE)}/month • {MONTHS} months
                </div>
              </div>
              <div className="mini-card">
                <div className="mini-kicker">Location</div>
                <div className="mini-strong">Rinkside Access</div>
                <div className="mini-muted">A few steps from the ice</div>
              </div>
              <div className="mini-card">
                <div className="mini-kicker">Size</div>
                <div className="mini-strong">Full-Size Lockers</div>
                <div className="mini-muted">Room for your full setup</div>
              </div>
            </div>
          </div>

          <button className="nav nav-left" onClick={prev} aria-label="Previous">
            ‹
          </button>
          <button className="nav nav-right" onClick={next} aria-label="Next">
            ›
          </button>

          <div className="dots" aria-label="Carousel navigation">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === active ? "is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="main">
        <section id="details" className="section">
          <div className="section-head">
            <h2>Why Rent a Locker?</h2>
            <p>
              Turn every visit into a smoother, faster routine—no more hauling
              gear in and out of the building.
            </p>
          </div>

          <div className="grid">
            <div className="card">
              <div className="card-title">Rinkside Convenience</div>
              <div className="card-body">
                Quick and easy access—your equipment is just a few steps away.
                Avoid lugging gear back and forth every session.
              </div>
            </div>

            <div className="card">
              <div className="card-title">Secure & Monitored</div>
              <div className="card-body">
                Your locker area is secure and monitored so you have peace of
                mind that your gear is kept safe.
              </div>
            </div>

            <div className="card">
              <div className="card-title">Full-Size Storage</div>
              <div className="card-body">
                Full-size lockers that fit your hockey setup—helmet, skates,
                pads, stick accessories, and more.
              </div>
            </div>

            <div className="card">
              <div className="card-title">Be Ready Faster</div>
              <div className="card-body">
                Show up, gear up, and get on the ice—ideal for busy families,
                frequent skaters, and adult league players.
              </div>
            </div>

            <div className="card">
              <div className="card-title">Keep Your Car Clean</div>
              <div className="card-body">
                Keep sweaty equipment out of your trunk. Store it properly and
                keep your ride (and home) fresher.
              </div>
            </div>

            <div className="card">
              <div className="card-title">Heated Lockers Coming Soon!</div>
              <div className="card-body">
                Heated lockers will be available soon, providing an extra layer
                of care for your gear during the colder months. Stay tuned for
                updates on this premium option!
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section">
          <div className="section-head">
            <h2>Pricing</h2>
            <p>Simple, season-ready pricing—built for Spring & Summer 2026.</p>
          </div>

          <div className="pricing-wrap">
            <div className="pricing">
              <div className="pricing-top">
                <div className="pricing-badge">First Month Free</div>
                <div className="pricing-title">Locker Rental</div>
                <div className="pricing-sub">
                  Covers Spring & Summer 2026 • {MONTHS} months
                </div>
              </div>

              <div className="pricing-price">
                <div className="price-big">{formatMoney(MONTHLY_PRICE)}</div>
                <div className="price-unit">/month</div>
              </div>

              <div className="pricing-line">
                <span>Term</span>
                <span>{MONTHS} months</span>
              </div>
              <div className="pricing-line">
                <span>First Month</span>
                <span className="good">FREE</span>
              </div>
              <div className="pricing-line">
                <span>Total (6-month term)</span>
                <span className="strong">{formatMoney(TOTAL)}</span>
              </div>

              <ul className="list">
                <li>Full-size, rinkside locker</li>
                <li>Secure and monitored</li>
                <li>Quick access for practices, games, and programs</li>
                <li>Perfect for frequent skaters and adult league players</li>
              </ul>

              <div className="pricing-actions">
                <button
                  type="button"
                  className="cta cta-wide"
                  onClick={() => setEmailOpen(true)}
                >
                  Email Us To Reserve Your Locker!
                </button>

                <div className="fineprint">
                  Questions? Stop by the front desk or call the rink.
                </div>
              </div>
            </div>

            <div className="finecard">
              <div className="finecard-title">Pricing Summary</div>
              <div className="finecard-row">
                <span>Promo</span>
                <span>First month free</span>
              </div>
              <div className="finecard-row">
                <span>Monthly</span>
                <span>{formatMoney(MONTHLY_PRICE)}/mo</span>
              </div>
              <div className="finecard-row">
                <span>Total (6-month term)</span>
                <span>{formatMoney(TOTAL)}</span>
              </div>
              <div className="finecard-row">
                <span>Season</span>
                <span>Spring & Summer 2026</span>
              </div>
              <div className="finecard-note">
                Lockers are limited—reserve early to secure rinkside storage for
                the season.
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Bottom pill banner: ONLY heated locker text */}
        <section className="section">
          <div className="banner banner-center">
            <div className="banner-cta-text">Heated Locker Option - Coming Soon!</div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>© {new Date().getFullYear()} Wings Arena</div>
          <div className="footer-links">
            <a href="#details">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#top" onClick={(e) => e.preventDefault()}>
              Top
            </a>
          </div>
        </div>
      </footer>

      {/* ✅ Email Service Chooser Modal */}
      {emailOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Choose email service"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setEmailOpen(false);
          }}
        >
          <div className="modal">
            <div className="modal-head">
              <div>
                <div className="modal-title">Email to Reserve</div>
                <div className="modal-sub">
                  Choose your email service to send a reservation request.
                </div>
              </div>
              <button
                type="button"
                className="modal-x"
                onClick={() => setEmailOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-email">
                To: <span className="mono">{toEmail}</span>
              </div>

              <div className="modal-actions">
                <a className="svc" href={gmailUrl} target="_blank" rel="noreferrer">
                  Gmail (web)
                </a>

                <a
                  className="svc"
                  href={outlookWebUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Outlook (web)
                </a>

                <a className="svc" href={yahooUrl} target="_blank" rel="noreferrer">
                  Yahoo Mail
                </a>

                <button type="button" className="svc ghostbtn" onClick={copyEmail}>
                  {copied ? "Copied!" : "Copy Email Address"}
                </button>
              </div>

              <div className="modal-note">
                If you prefer, you can also email manually and include:{" "}
                <span className="mono">{subject}</span>
              </div>
            </div>

            <div className="modal-foot">
              <button
                type="button"
                className="ghostbtn"
                onClick={() => setEmailOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}