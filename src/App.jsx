import { useEffect, useRef, useState } from "react";
import { caseStudy, contact, faqs, hero, problems, runLines, services, steps, tools } from "./content.js";
import { useInView, usePrefersReducedMotion, useScrollProgress } from "./hooks.js";

function Badge({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2 4 6.5v8.2C4 22 9.2 27.8 16 30c6.8-2.2 12-8 12-15.3V6.5z" fill="var(--amber)" />
      <path d="m10.5 16 3.8 3.8 7.2-7.6" fill="none" stroke="var(--night)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="m3.5 8.2 3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="brand" aria-label="QACops home">
          <Badge />
          <span>QACops</span>
        </a>
        <nav className="nav-links" aria-label="Main">
          <a href="#services">Services</a>
          <a href="#process">How it works</a>
          <a href="#faq">Questions</a>
        </nav>
        <a href="#audit" className="btn btn-amber btn-sm">Free QA audit</a>
      </div>
    </header>
  );
}

const glyph = { meta: "›", pass: "✓", flaky: "!", fail: "✗" };
const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function RunPanel() {
  const reduced = usePrefersReducedMotion();
  const [run, setRun] = useState(0);
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle, running, alarm, done
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    if (reduced) {
      setShown(runLines.length);
      setPhase("done");
      return;
    }
    setShown(0);
    setPhase("running");
    const timers = [];
    let t = run === 0 ? 1400 : 400;
    runLines.forEach((line, i) => {
      t += line.kind === "meta" ? 300 : line.kind === "fail" ? 1300 : line.kind === "flaky" ? 1100 : 700;
      timers.push(
        setTimeout(() => {
          setShown(i + 1);
          if (line.kind === "fail") setPhase("alarm");
        }, t)
      );
    });
    timers.push(setTimeout(() => setPhase("done"), t + 1700));
    return () => timers.forEach(clearTimeout);
  }, [run, reduced]);

  useEffect(() => {
    if (phase !== "running") return;
    const id = setInterval(() => setSpin((s) => (s + 1) % SPINNER.length), 80);
    return () => clearInterval(id);
  }, [phase]);

  const pending = phase === "running" && shown < runLines.length ? runLines[shown] : null;
  const progress = phase === "done" ? 1 : shown / (runLines.length + 1);
  const failed = shown === runLines.length;

  return (
    <figure className={`run phase-${phase}`} aria-label="Example nightly regression run">
      <div className="run-head">
        <span className="run-lights" aria-hidden="true"><i /><i /><i /></span>
        <span className="run-title">nightly regression on your pipeline</span>
        <span className={`run-status ${phase === "done" ? "is-done" : ""}`}>
          <span className="dot" aria-hidden="true" />
          {phase === "done" ? "complete" : "running"}
        </span>
        <span className="run-bar" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </div>

      <div className="run-body" aria-live="polite">
        {runLines.slice(0, shown).map((line, i) => (
          <div key={`${run}-${i}`} className={`run-line k-${line.kind}`}>
            <span className="g">{glyph[line.kind]}</span>
            <span className="t">{line.text}</span>
            {line.time && <span className="ms">{line.time}</span>}
            {line.note && <span className="note">{line.note}</span>}
          </div>
        ))}
        {pending && pending.kind !== "meta" && (
          <div className="run-line k-pending">
            <span className="g">{SPINNER[spin]}</span>
            <span className="t">{pending.text}</span>
          </div>
        )}
        {phase === "done" && (
          <div className="run-line k-summary">
            <span className="g">›</span>
            <span className="t">48 specs, 47 passed, 1 filed in 6m 12s</span>
          </div>
        )}
      </div>

      {failed && <div className="stamp" aria-hidden="true">Filed #2214</div>}

      <figcaption className="run-foot">
        <span>Reviewed by a human before anything is filed.</span>
        <span className="who">{contact.onDuty}, on duty</span>
        <button className="replay" onClick={() => setRun((r) => r + 1)} disabled={phase !== "done"}>
          Run it again
        </button>
      </figcaption>
    </figure>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker">A small QA crew, on your side</p>
          <h1 className="hero-title">
            {hero.title.map((line, i) => (
              <span className="line" key={line}>
                <span style={{ animationDelay: `${120 + i * 110}ms` }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="lede">{hero.lede}</p>
          <div className="hero-actions">
            <a href="#audit" className="btn btn-amber">Get a free QA audit</a>
            <a href="#services" className="btn btn-ghost">See what we cover</a>
          </div>
          <ul className="promises">
            {hero.promises.map((p) => (
              <li key={p}><Check />{p}</li>
            ))}
          </ul>
        </div>
        <RunPanel />
      </div>
    </section>
  );
}

function Tape() {
  const row = [...tools, ...tools];
  return (
    <div className="tape" aria-label={`Tools we work with: ${tools.join(", ")}`}>
      <div className="tape-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="tape-set" key={copy}>
            {row.map((t, i) => (
              <span key={`${copy}-${i}`} className="tape-item">
                {t}
                <svg width="14" height="14" viewBox="0 0 32 32"><path d="M16 2 4 6.5v8.2C4 22 9.2 27.8 16 30c6.8-2.2 12-8 12-15.3V6.5z" fill="currentColor" /></svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Problem() {
  return (
    <section className="section problem">
      <div className="wrap problem-grid">
        <h2 className="h2">Quality slips quietly. Then it slips in production.</h2>
        <div className="problem-list">
          {problems.map((p) => (
            <div className="problem-item" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const s = services[active];

  const onKey = (e) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + services.length) % services.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="section services" id="services">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">Everything between “works on my machine” and a clean release</h2>
          <p className="sub">Take the whole lifecycle, or just the piece you're missing.</p>
        </div>
        <div className="svc">
          <div className="svc-list" role="tablist" aria-orientation="vertical" onKeyDown={onKey}>
            {services.map((item, i) => (
              <button
                key={item.name}
                ref={(el) => (tabs.current[i] = el)}
                role="tab"
                id={`svc-tab-${i}`}
                aria-selected={i === active}
                aria-controls="svc-panel"
                tabIndex={i === active ? 0 : -1}
                className={`svc-tab ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(i)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="svc-panel" id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${active}`}>
            <div className="svc-card" key={active}>
              <h3>{s.name}</h3>
              <p>{s.body}</p>
              <p className="svc-gets-title">What lands on your side</p>
              <ul>
                {s.gets.map((g) => (
                  <li key={g}><Check />{g}</li>
                ))}
              </ul>
              <a href="#audit" className="link">Talk to us about this</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const [ref, progress] = useScrollProgress();
  return (
    <section className="section process" id="process">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">Four weeks from audit to a suite that runs itself</h2>
        </div>
        <ol className="steps" ref={ref}>
          <span className="steps-rail" aria-hidden="true">
            <span className="steps-fill" style={{ transform: `scaleX(${progress})` }} />
          </span>
          {steps.map((st, i) => {
            const reached = progress >= (i / (steps.length - 1)) * 0.97;
            return (
              <li key={st.name} className={`step ${reached ? "is-reached" : ""}`}>
                <span className="step-num" aria-hidden="true">{i + 1}</span>
                <span className="step-when">{st.when}</span>
                <h3>{st.name}</h3>
                <p>{st.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Tools() {
  const [ref, inView] = useInView(0.35);
  const nodes = [
    { name: "Your repo", body: "Tests are committed next to your code." },
    { name: "Your pipeline", body: "They run on every pull request." },
    { name: "Your tracker", body: "Bugs arrive with a trace, a video and repro steps." },
  ];
  return (
    <section className="section tools">
      <div className="wrap tools-grid">
        <div>
          <h2 className="h2">We work inside your tools, not beside them</h2>
          <p className="sub">No new dashboard for your team to learn. You keep working where you already work, and we show up there.</p>
          <ul className="chips">
            {tools.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <div className={`flow ${inView ? "is-in" : ""}`} ref={ref}>
          {nodes.map((n, i) => (
            <div className="flow-node" key={n.name} style={{ transitionDelay: `${i * 260}ms` }}>
              <strong>{n.name}</strong>
              <span>{n.body}</span>
              {i < nodes.length - 1 && <i className="flow-link" style={{ transitionDelay: `${i * 260 + 200}ms` }} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  if (!caseStudy.published) return null;
  return (
    <section className="section">
      <div className="wrap case">
        <h2 className="h2">{caseStudy.client}</h2>
        <p className="sub">{caseStudy.summary}</p>
        <p>{caseStudy.story}</p>
        <div className="case-stats">
          {caseStudy.stats.map((st) => (
            <div key={st.label}><strong>{st.value}</strong><span>{st.label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="wrap faq-grid">
        <h2 className="h2">Questions we get on the first call</h2>
        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={f.q}>
                <button aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className="plus" aria-hidden="true" />
                </button>
                <div className="faq-a" id={`faq-${i}`} role="region">
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Audit() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Free QA audit for ${data.get("company") || "our team"}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Repo or product link: ${data.get("link")}`,
      "",
      data.get("pain"),
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="audit" id="audit">
      <div className="wrap audit-grid">
        <div className="audit-copy">
          <h2 className="audit-title">Start with a free QA audit</h2>
          <p>
            Send us your repo and your last three releases. In five working days you get a written read on coverage gaps,
            flaky areas and the fastest path to automation. It's yours to keep either way.
          </p>
          <p className="audit-mail">
            Rather write it yourself? <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
        {sent ? (
          <div className="audit-form audit-sent" role="status">
            <Badge size={40} />
            <h3>Your request is ready to send</h3>
            <p>Your email app should have opened with everything filled in. Hit send there and we'll reply within one working day.</p>
            <button className="btn btn-night" onClick={() => setSent(false)}>Edit the request</button>
          </div>
        ) : (
          <form className="audit-form" onSubmit={onSubmit}>
            <div className="field-row">
              <label>
                <span>Your name</span>
                <input name="name" required autoComplete="name" />
              </label>
              <label>
                <span>Company</span>
                <input name="company" required autoComplete="organization" />
              </label>
            </div>
            <label>
              <span>Repo or product link</span>
              <input name="link" type="url" placeholder="https://" />
            </label>
            <label>
              <span>What keeps breaking?</span>
              <textarea name="pain" rows="4" placeholder="Checkout fails after every release, our suite is flaky, nobody owns QA…" />
            </label>
            <button type="submit" className="btn btn-night">Request my free audit</button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <a href="#top" className="brand"><Badge size={22} /><span>QACops</span></a>
        <p>QA and automation for teams shipping faster than they can test.</p>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <small>© {new Date().getFullYear()} QACops</small>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#services">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <Tape />
        <Problem />
        <Services />
        <Process />
        <Tools />
        <CaseStudy />
        <Faq />
        <Audit />
      </main>
      <Footer />
    </>
  );
}
