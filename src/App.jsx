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
        subhead: "Locker Up, Hassle-Free.",
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

  // ✅ Email details (default mail app via mailto)
  const toEmail = "jwanderlingh@wingsarena.com";
  const subject = "Locker Rental Request (Spring & Summer 2026)";
  const body =
    "Hi Jon,\n\nI’d like to reserve a Classic Locker for Spring & Summer 2026.\n\nName:\nPhone:\nEmail:\nPreferred start date:\n\nThanks!";

  const reserveEmailHref = `mailto:${toEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [paused, slides.length]);

  function goTo(i) {
    setActive(i);
  }

  return (
    <div className="page">
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
            <div className="pill">Wings Arena</div>
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
                <div className="mini-kicker">Spring Promo</div>
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
                <div className="mini-muted">Room for all your gear and more!</div>
              </div>
            </div>
          </div>

          {/* ✅ Arrows removed */}

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
          <div className="section-head-why">
            <h2>Why Rent a Locker?</h2>
            <p>
              Enable a smoother, quicker routine every visit—leave your gear
              where you need it next.
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

            {/* ✅ Hide on mobile only */}
            <div className="card mobile-hide-card">
              <div className="card-title">Be Ready Faster</div>
              <div className="card-body">
                Show up, gear up, and get on the ice—ideal for busy families,
                frequent skaters, and adult league players.
              </div>
            </div>

            {/* ✅ Hide on mobile only */}
            <div className="card mobile-hide-card">
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
            <p>6 Month Rental - First Month Free!</p>
          </div>

          <div className="pricing-wrap">
            <div className="pricing">
              <div className="pricing-top">
                <div className="pricing-badge">
                  Limited Availability
                  <span
                    className="availability-dot"
                    aria-hidden="true"
                    title="Limited availability"
                  />
                </div>
                <div className="pricing-title">Locker Rental</div>
                <div className="pricing-sub">{MONTHS} months</div>
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
                <a className="cta cta-wide" href={reserveEmailHref}>
                  Email Us To Reserve Your Locker!
                </a>

                <div className="fineprint">
                  Questions? Stop by the front desk or call us at 203-357-1055.
                </div>
              </div>
            </div>
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
    </div>
  );
}