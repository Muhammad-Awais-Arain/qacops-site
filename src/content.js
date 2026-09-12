// All site copy lives here so it can be edited without touching layout code.

export const contact = {
  email: "agha@qacops.com",
  site: "qacops.com",
  onDuty: "Agha Tayyab",
};

export const hero = {
  title: ["Catch flaws", "before they", "catch you."],
  lede:
    "We're the testing team you'd hire if hiring weren't slow. Automated suites, hands on QA, documentation and release sign off, handled end to end in your repo by people you can message directly.",
  promises: ["Tests live in your repo", "Runs on your CI", "Sign off on every release"],
};

// Each line of the hero test run. `kind` drives colour, `note` is the indented follow up.
export const runLines = [
  { kind: "meta", text: "checkout main@a91f3c, 3 shards" },
  { kind: "pass", text: "auth / sign up with email", time: "1.2s" },
  { kind: "pass", text: "billing / upgrade to Pro", time: "2.8s" },
  { kind: "pass", text: "checkout / apply coupon at cart", time: "3.1s" },
  { kind: "flaky", text: "dashboard / filters persist on reload", time: "4.4s", note: "retried once, passed, flagged for review" },
  { kind: "fail", text: "settings / delete account confirm", time: "2.0s", note: "filed #2214 with trace and video" },
];

export const problems = [
  {
    title: "Testing is the first thing to slip",
    body: "When the roadmap tightens, the suite goes stale, the test plan goes unwritten, and regressions reach production.",
  },
  {
    title: "Hiring QA takes months",
    body: "And one hire still leaves you without automation, tooling or a coverage strategy behind them.",
  },
  {
    title: "So we take the whole job",
    body: "An embedded crew from week one: suites written and maintained, runs triaged, releases signed off.",
  },
];

export const services = [
  {
    name: "Automated end to end suites",
    body: "Playwright or Cypress suites built on your critical flows, kept green as the product moves.",
    gets: ["Suites for your signup, billing and core flows", "Page objects and fixtures your devs can extend", "Flaky tests fixed at the cause, not retried forever"],
  },
  {
    name: "Manual and exploratory QA",
    body: "Human passes on new features, edge cases and the paths no script thinks to take.",
    gets: ["Session notes for every exploratory pass", "A device and browser matrix you agree on", "Findings ranked by what users would hit first"],
  },
  {
    name: "Test strategy and documentation",
    body: "Test plans, coverage maps and runbooks written down, so QA survives people leaving.",
    gets: ["A coverage map tied to features, not files", "Release checklists and runbooks", "An onboarding doc for your next engineer"],
  },
  {
    name: "CI/CD test integration",
    body: "Suites wired into your pipeline, so every PR is gated and every failure traces back to a commit.",
    gets: ["Sharded runs that fit your pipeline budget", "PR gates with readable failure summaries", "Reports and traces attached to every run"],
  },
  {
    name: "API and load testing",
    body: "Contract, integration and load coverage on your services before traffic finds the ceiling.",
    gets: ["Contract tests for your public endpoints", "k6 or JMeter profiles shaped on real traffic", "Access checks across roles and tenants"],
  },
  {
    name: "Mobile app testing",
    body: "iOS and Android coverage on real devices, automated where it pays and manual where it doesn't.",
    gets: ["Runs on real devices, not only emulators", "A store release checklist", "Crashes reproduced with clear steps"],
  },
  {
    name: "Bug triage and reporting",
    body: "Failures reproduced, deduplicated and filed with video, trace and severity. Not screenshots in Slack.",
    gets: ["Every ticket carries repro steps, video and trace", "Duplicates merged before they reach you", "Severity your PM can actually plan around"],
  },
  {
    name: "Release and regression sign off",
    body: "A full regression pass and a written go or no go before every release.",
    gets: ["A regression pass scoped to what changed", "Written sign off with known risks listed", "Hotfix verification the same day"],
  },
  {
    name: "QA team as a service",
    body: "An embedded QA function on retainer: standups, sprint planning, real ownership. No hiring cycle.",
    gets: ["A named lead in your Slack and standups", "QA planned sprint by sprint", "A monthly quality report for leadership"],
  },
];

export const steps = [
  { name: "Audit", when: "Week 1", body: "We read the codebase, the pipeline and the last releases, then write down where quality actually leaks." },
  { name: "Plan", when: "Weeks 1 to 2", body: "A coverage map and a prioritised strategy: what gets automated first, what stays manual, what gets dropped." },
  { name: "Build", when: "Weeks 2 to 4", body: "Suites written in your repo, running in your CI, with documentation your team can pick up on their own." },
  { name: "Run", when: "Ongoing", body: "We own the runs, the triage and the release sign off from there, and report back every sprint." },
];

export const tools = ["Playwright", "Cypress", "Selenium", "Postman", "k6", "JMeter", "GitHub Actions", "Jira", "Linear", "TestRail", "Allure"];

// Set `published: true` and fill in real numbers once a client agrees to be named.
// The section stays hidden until then so no invented results ever go live.
export const caseStudy = {
  published: false,
  client: "Client name",
  summary: "Fintech dashboard, 11 person team",
  story: "What was breaking, what we automated, and what changed after.",
  stats: [
    { value: "", label: "Regression time" },
    { value: "", label: "Flows covered" },
    { value: "", label: "Escaped bugs" },
  ],
};

export const faqs = [
  { q: "How small is too small?", a: "Three engineers and a product is enough. Below that, the audit is usually more useful than a retainer, and we'll tell you so." },
  { q: "Do you work in our repo?", a: "Yes. Tests live with your code under your license, in your CI. If we part ways, everything stays with you." },
  { q: "Who owns the tests we pay for?", a: "You do, entirely: code, documentation and tooling config. There's no proprietary runner you have to keep renting." },
  { q: "How fast do we see something running?", a: "The first automated flows are usually green in your pipeline within two weeks of kickoff." },
  { q: "Can you cover just one gap?", a: "Yes. Plenty of teams start with regression sign off or a documentation pass and grow from there." },
];
