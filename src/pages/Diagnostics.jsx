import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import useReveal from '../hooks/useReveal';
import useDocumentMeta from '../hooks/useDocumentMeta';

/* ---------------------------------------------------------------------- */
/* Data                                                                    */
/* ---------------------------------------------------------------------- */

const journeySteps = [
  {
    label: "Women's Health Concern",
    blurb: 'A symptom, a question, or a routine check',
    icon: <path d="M12 21s-7-4.35-9.5-8.5C.7 8.8 2.6 5 6.3 5c1.9 0 3.3 1 3.7 2.3C10.4 6 11.8 5 13.7 5c3.7 0 5.6 3.8 3.8 7.5C15 16.65 12 21 12 21Z" />,
  },
  {
    label: 'Nura Assessment',
    blurb: 'Your cycle history and symptoms, reviewed together',
    icon: (
      <>
        <path d="M12 3C7 3 3 6.6 3 11c0 2.4 1.2 4.6 3.2 6.1L5.5 21l4.2-1.8c.7.1 1.5.2 2.3.2 5 0 9-3.6 9-8s-4-8.4-9-8.4Z" />
        <path d="M8.5 11h7M8.5 14h4.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: 'Diagnostic Pathway',
    blurb: 'A clinically designed path to the right tests',
    icon: (
      <>
        <circle cx="6" cy="6" r="2.4" />
        <circle cx="18" cy="18" r="2.4" />
        <path d="M8.2 7.2c2 1.5 3 3 3.8 4.8.8 1.8 1.8 3.3 3.8 4.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: 'Home Sample Collection',
    blurb: 'Booked at a time that works for you',
    icon: (
      <>
        <path d="M4 11.5 12 5l8 6.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
      </>
    ),
  },
  {
    label: 'Partner Lab',
    blurb: 'Processed by trusted diagnostic partners',
    icon: (
      <>
        <path d="M10 3h4M10.5 3v5.2L6 17a2 2 0 0 0 1.8 2.9h8.4A2 2 0 0 0 18 17l-4.5-8.8V3" strokeLinejoin="round" />
        <path d="M8 15h8" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: 'Digital Results',
    blurb: 'Delivered straight into Nura',
    icon: (
      <>
        <path d="M7 17.5a4 4 0 0 1 .6-7.96A5 5 0 0 1 17.3 11 3.8 3.8 0 0 1 17 18.5H7.5Z" strokeLinejoin="round" />
        <path d="M12 12v6M9.5 15.5 12 13l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: 'Easy-to-Understand Report',
    blurb: 'Plain language, not just numbers',
    icon: (
      <>
        <path d="M6 3.5h9l3 3v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
        <path d="M8.5 12.2 10.3 14l3.7-4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: 'Gynaecologist Consultation',
    blurb: 'Discuss results with a real clinician',
    icon: (
      <>
        <path d="M9 3v4a3 3 0 0 0 6 0V3" strokeLinecap="round" />
        <path d="M6 3v5a6 6 0 0 0 12 0V3" strokeLinecap="round" />
        <path d="M12 14v3a4 4 0 0 0 4 4h1" strokeLinecap="round" />
        <circle cx="18" cy="20.2" r="1.3" />
      </>
    ),
  },
  {
    label: 'Follow-up Care',
    blurb: 'A plan that continues, not a one-off visit',
    icon: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2.2" />
        <path d="M4 9.5h16M8 3v3.4M16 3v3.4" strokeLinecap="round" />
        <path d="M9 14.5l2 2 4-4.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

/*
 * One restrained tint for the whole set — these five cards are peers, not
 * distinct categories, so a rainbow per card would be decorative noise
 * rather than signal. Color is spent deliberately elsewhere on this page
 * (the report's status pill, the safety-note amber) where it means something.
 */
const concernPathways = [
  {
    title: 'Irregular periods',
    body: 'A pathway built around unpredictable cycles, connecting your logged cycle history to the hormonal and pelvic health checks it points toward.',
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.4" />
        <path d="M3.5 9.5h17M7.5 3v3.4M16.5 3v3.4" strokeLinecap="round" />
        <path d="M12 13.2v3.2M10.5 14.7h3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'PCOS evaluation',
    body: 'A structured look at the symptom patterns and markers commonly associated with PCOS, to help you and your gynaecologist decide what to check next.',
    icon: (
      <>
        <circle cx="9" cy="9" r="3.2" />
        <circle cx="15.5" cy="15.5" r="2.4" />
        <path d="M11.2 11.2l2.3 2.3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Heavy periods & fatigue',
    body: 'A pathway for heavy flow and persistent tiredness, designed to connect the dots between symptoms that often get investigated separately.',
    icon: <path d="M12 21s-6.5-6.4-6.5-11A6.5 6.5 0 0 1 12 3.5 6.5 6.5 0 0 1 18.5 10c0 4.6-6.5 11-6.5 11Z" strokeLinejoin="round" />,
  },
  {
    title: 'Thyroid & menstrual health',
    body: 'Because thyroid function and cycle regularity are closely linked, this pathway looks at both together instead of in isolation.',
    icon: (
      <>
        <path d="M9 4a3 3 0 0 0-3 3v1a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V7a3 3 0 0 0-3-3" strokeLinecap="round" />
        <circle cx="8.6" cy="15.5" r="2.4" />
        <circle cx="15.4" cy="15.5" r="2.4" />
      </>
    ),
  },
  {
    title: "Women's preventive health",
    body: 'Routine, proactive checks for reproductive and general wellbeing, so awareness comes before a problem, not after one.',
    icon: <path d="M12 20.5s-7.5-4-9-10C1.9 5.8 4.4 3 7.6 3.5 9.3 3.8 10.6 5 12 6.5 13.4 5 14.7 3.8 16.4 3.5 19.6 3 22.1 5.8 21 10.5c-1.5 6-9 10-9 10Z" strokeLinejoin="round" />,
  },
];

const fragmented = [
  'A symptom noted at home, forgotten by the next appointment',
  'A lab visit that has no idea about your cycle or symptom history',
  'A report full of reference ranges and abbreviations, with no one to ask',
  'Starting the story over with every new doctor you see',
];

const connectedPoints = [
  'One assessment that already knows your cycle and symptom history',
  'A pathway matched to your concern, not a generic panel',
  'Results that land inside the app you already track in',
  'A gynaecologist who sees the full picture before you even speak',
];

const trendPoints = [
  { x: 30, y: 58, label: 'Mar', value: '3.6' },
  { x: 130, y: 46, label: 'Jun', value: '4.1' },
  { x: 230, y: 22, label: 'Now', value: '4.8' },
];
const trendLine = trendPoints.map((p) => `${p.x},${p.y}`).join(' ');

const careFlowSteps = ['Report', 'Gynaecologist', 'Care Plan', 'Follow-up'];

const recordSources = [
  {
    title: 'Cycle History',
    icon: <path d="M12 21s-7-4.35-9.5-8.5C.7 8.8 2.6 5 6.3 5c1.9 0 3.3 1 3.7 2.3C10.4 6 11.8 5 13.7 5c3.7 0 5.6 3.8 3.8 7.5C15 16.65 12 21 12 21Z" strokeLinejoin="round" />,
  },
  {
    title: 'Symptoms & Logs',
    icon: <path d="M8 10h8M8 14h5M5 20l1.5-3.2A6 6 0 1 1 12 19a6 6 0 0 1-3.2-.9L5 20Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Medical Documents',
    icon: <path d="M4 19V6a2 2 0 0 1 2-2h11l3 3v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" strokeLinejoin="round" />,
  },
  {
    title: 'Lab Results',
    icon: (
      <>
        <path d="M10 3h4M10.5 3v5.2L6 17a2 2 0 0 0 1.8 2.9h8.4A2 2 0 0 0 18 17l-4.5-8.8V3" strokeLinejoin="round" />
        <path d="M8 15h8" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Consultations',
    icon: (
      <>
        <path d="M9 3v4a3 3 0 0 0 6 0V3" strokeLinecap="round" />
        <path d="M6 3v5a6 6 0 0 0 12 0V3" strokeLinecap="round" />
      </>
    ),
  },
];

const aiDoes = [
  'Explains medical terminology and lab values in plain language',
  'Summarizes reports and highlights what has changed over time',
  'Helps you prepare questions to bring to your gynaecologist',
];

const clinicianDoes = [
  'Diagnoses medical conditions',
  'Prescribes treatment or medication',
  'Makes clinical decisions about your care',
];

/* ---------------------------------------------------------------------- */
/* Small building blocks                                                  */
/* ---------------------------------------------------------------------- */

/**
 * Plain (non-animated) section heading — every call site already sits inside
 * its own outer `reveal` wrapper, so this doesn't run a second, redundant
 * IntersectionObserver/fade of its own (which produced a faint double-fade
 * as the two independently-timed transitions settled a few frames apart).
 */
function SectionIntro({ eyebrow, title, body, max = 620 }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: max, margin: '0 auto 44px' }}>
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</div>}
      <h2 style={{ font: 'var(--t-h2)', color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>{title}</h2>
      {body && <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', margin: 0 }}>{body}</p>}
    </div>
  );
}

function FlowChevron() {
  return (
    <svg className="mini-flow-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, alignSelf: 'center', margin: '0 2px' }}>
      <path d="M9 5l7 7-7 7" stroke="var(--ink-4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * A single step's icon medallion — shared between the mobile rail and the
 * desktop grid so both stay visually identical, just rearranged.
 */
function JourneyMedallion({ index }) {
  const step = journeySteps[index];
  return (
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: '50%',
        background: 'var(--surface)',
        border: '1.5px solid var(--accent-tint)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: -6,
          right: -6,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: 'var(--accent)',
          color: '#fff',
          font: 'var(--t-micro)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {index + 1}
      </span>
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" aria-hidden="true">
        {step.icon}
      </svg>
    </div>
  );
}

/**
 * The 9-step journey diagram — the visual centerpiece of the page.
 * Two renderings of the same 9 steps, toggled by CSS media query (never
 * both in layout at once): a vertical connected rail on mobile (reads
 * top-to-bottom identically at any narrow width), and a fixed 3×3 grid on
 * desktop, connected row-by-row with a horizontal rail instead of wasting
 * most of a wide screen on one narrow column. 9 is deliberately chosen to
 * be 3-divisible so the desktop grid always lands as a clean 3×3 — never a
 * short last row.
 */
function JourneyDiagram() {
  const rows = [journeySteps.slice(0, 3), journeySteps.slice(3, 6), journeySteps.slice(6, 9)];

  return (
    <>
      {/* Mobile / tablet — vertical rail */}
      <div
        className="journey-mobile"
        role="list"
        aria-label="The Nura Diagnostics journey, from concern to follow-up care"
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        {journeySteps.map((step, i) => {
          const isLast = i === journeySteps.length - 1;
          return (
            <div key={step.label} role="listitem" style={{ display: 'flex', gap: 18 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <JourneyMedallion index={i} />
                {!isLast && (
                  <div
                    aria-hidden="true"
                    style={{ width: 2, flex: '1 1 auto', minHeight: 28, margin: '4px 0', background: 'linear-gradient(var(--accent-tint), var(--teal-tint))' }}
                  />
                )}
              </div>
              <div style={{ paddingTop: 8, paddingBottom: isLast ? 0 : 26 }}>
                <div style={{ font: 'var(--t-title-sm)', color: 'var(--ink)', marginBottom: 3 }}>{step.label}</div>
                <div style={{ font: 'var(--t-caption)', color: 'var(--ink-3)' }}>{step.blurb}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop — 3×3 grid, connected left-to-right within each row */}
      <div
        className="journey-desktop"
        role="list"
        aria-label="The Nura Diagnostics journey, from concern to follow-up care"
      >
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="journey-row">
            {row.map((step, colIndex) => {
              const globalIndex = rowIndex * 3 + colIndex;
              const isLastInRow = colIndex === row.length - 1;
              return (
                <div key={step.label} role="listitem" className="journey-step">
                  {!isLastInRow && <div aria-hidden="true" className="journey-connector" />}
                  <JourneyMedallion index={globalIndex} />
                  <div style={{ marginTop: 14, maxWidth: 200 }}>
                    <div style={{ font: 'var(--t-title-sm)', color: 'var(--ink)', marginBottom: 3 }}>{step.label}</div>
                    <div style={{ font: 'var(--t-caption)', color: 'var(--ink-3)' }}>{step.blurb}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

function MiniFlow({ items }) {
  return (
    <div className="mini-flow" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
      {items.map((label, i) => (
        <div key={label} className="mini-flow-item">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 999,
              padding: '10px 18px',
              font: 'var(--t-label-sm)',
              color: 'var(--ink)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {label}
          </span>
          {i < items.length - 1 && <FlowChevron />}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Page                                                                    */
/* ---------------------------------------------------------------------- */

export default function Diagnostics() {
  useDocumentMeta(
    "Nura Diagnostics: Women's Health Diagnostics & Home Sample Collection | Nura",
    'Nura Diagnostics connects women’s health concerns to clinically designed diagnostic pathways, home sample collection, easy-to-understand lab reports, and gynaecologist consultations, all inside one connected health record.'
  );

  const [refFrag, inFrag] = useReveal();
  const [refPathways, inPathways] = useReveal();
  const [refHome, inHome] = useReveal();
  const [refReport, inReport] = useReveal();
  const [refCare, inCare] = useReveal();
  const [refRecord, inRecord] = useReveal();
  const [refAi, inAi] = useReveal();
  const [refCta, inCta] = useReveal();

  return (
    <div className="page">
      <Nav />

      {/* HERO */}
      <div className="container" style={{ padding: '76px 32px 8px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>Nura Diagnostics · Coming soon</div>
        <h1 style={{ font: 'var(--t-display)', color: 'var(--ink)', margin: '0 auto 18px', maxWidth: 760, letterSpacing: '-0.02em' }}>
          From concern to clarity to care.
        </h1>
        <p style={{ font: 'var(--t-lead)', color: 'var(--ink-3)', margin: '0 auto 32px', maxWidth: 600 }}>
          Connect your women's health journey, from symptoms and diagnostics to reports and gynaecological care, all in one place.
        </p>
        <a href="#journey" className="btn btn-brand" style={{ padding: '15px 28px' }}>
          Explore Nura
        </a>
        <p style={{ font: 'var(--t-caption)', color: 'var(--ink-4)', margin: '18px 0 0' }}>
          Now taking shape across the Nura platform, rolling out in phases.
        </p>
      </div>

      {/* SECTION 2 — FRAGMENTED VS CONNECTED + JOURNEY DIAGRAM */}
      <div ref={refFrag} className={`reveal ${inFrag ? 'in' : ''}`} style={{ padding: '72px 0 8px' }}>
        <div className="container">
          <SectionIntro
            eyebrow="Why Nura Diagnostics"
            title="The healthcare journey shouldn't be fragmented"
            body="A symptom, a lab visit, and a doctor's appointment usually happen in three different places that never talk to each other. Nura connects them into one continuous journey."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, marginBottom: 56 }}>
            <div className="card" style={{ padding: 30 }}>
              <div style={{ font: 'var(--t-micro)', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 18 }}>
                A typical fragmented experience
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {fragmented.map((f) => (
                  <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M6 6l12 12M18 6L6 18" stroke="var(--ink-4)" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 30, borderColor: 'var(--brand-tint-2)' }}>
              <div style={{ font: 'var(--t-micro)', color: 'var(--brand-dark)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 18 }}>
                The connected Nura experience
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {connectedPoints.map((f) => (
                  <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M4 12.5L9.5 18L20 6" stroke="var(--teal)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ font: 'var(--t-label)', color: 'var(--ink)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* THE JOURNEY — visual centerpiece */}
        <div id="journey" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '72px 32px', scrollMarginTop: 76 }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 44px' }}>
              <h3 style={{ font: 'var(--t-h3)', color: 'var(--ink)', margin: '0 0 10px' }}>One journey, nine steps, zero gaps</h3>
              <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: 0 }}>
                Every step below feeds the next, and every step is remembered by the one after it.
              </p>
            </div>
            <JourneyDiagram />
          </div>
        </div>
      </div>

      {/* SECTION 3 — CONCERN-BASED PATHWAYS */}
      <div ref={refPathways} className={`reveal ${inPathways ? 'in' : ''} container`} style={{ padding: '72px 32px' }}>
        <SectionIntro
          eyebrow="Concern-based pathways"
          title="Diagnostics, designed around women's health"
          body="Instead of a generic panel, Nura starts from what's actually going on and points toward a pathway built for it."
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 18 }}>
          {concernPathways.map((p) => (
            <div key={p.title} className="card card-hover" style={{ padding: 26, flex: '0 1 260px', maxWidth: 320 }}>
              <div className="icon-tile" style={{ background: 'var(--brand-tint)', marginBottom: 16 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-dark)" strokeWidth="1.7" aria-hidden="true">
                  {p.icon}
                </svg>
              </div>
              <h3 style={{ font: 'var(--t-title)', color: 'var(--ink)', margin: '0 0 8px' }}>{p.title}</h3>
              <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4 — HOME COLLECTION */}
      <div ref={refHome} className={`reveal ${inHome ? 'in' : ''}`} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '72px 32px' }}>
        <div className="container">
          <SectionIntro
            eyebrow="Home sample collection"
            title="Healthcare comes to your home"
            body="Book a convenient time and a trained collector comes to you, your sample is processed by a trusted diagnostic lab partner, and the result lands back inside Nura, no separate portal to check."
          />
          <div style={{ marginBottom: 32 }}>
            <MiniFlow items={['Home Sample Collection', 'Partner Lab', 'Digital Report']} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {['Scheduled around you', 'Verified collectors', 'Trusted lab partners', 'Tracked end to end'].map((t) => (
              <span
                key={t}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 999,
                  padding: '8px 16px',
                  font: 'var(--t-label-sm)',
                  color: 'var(--ink-2)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5 — REPORT MOCKUP */}
      <div ref={refReport} className={`reveal ${inReport ? 'in' : ''} container`} style={{ padding: '72px 32px' }}>
        <SectionIntro
          eyebrow="Easy-to-understand reports"
          title="Don't just receive a report. Understand it."
          body="Every result comes with the number, the range it's compared against, and what it actually means for you, explained in plain language."
        />
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div className="card" style={{ padding: 28, boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
              <div>
                <div style={{ font: 'var(--t-title-sm)', color: 'var(--ink)' }}>Thyroid Panel</div>
                <div style={{ font: 'var(--t-caption)', color: 'var(--ink-4)' }}>TSH · Collected 14 Aug 2026</div>
              </div>
              <span style={{ font: 'var(--t-micro)', color: 'var(--amber)', background: 'var(--amber-tint)', borderRadius: 999, padding: '5px 12px', whiteSpace: 'nowrap' }}>
                Slightly elevated
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span style={{ font: 'var(--t-h2)', color: 'var(--ink)' }}>4.8</span>
              <span style={{ font: 'var(--t-label-sm)', color: 'var(--ink-4)' }}>mIU/L</span>
            </div>
            <div style={{ font: 'var(--t-caption)', color: 'var(--ink-4)', marginBottom: 18 }}>Reference range: 0.4 – 4.0 mIU/L</div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ font: 'var(--t-micro)', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 8 }}>
                In plain language
              </div>
              <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)', margin: 0 }}>
                Your TSH is a little above the typical range, which can be linked to cycle changes, fatigue, or mood. It's usually not urgent, but worth discussing with a gynaecologist.
              </p>
            </div>

            <div style={{ marginBottom: 22 }}>
              <div style={{ font: 'var(--t-micro)', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 10 }}>
                Trend over time
              </div>
              <svg width="100%" height="90" viewBox="0 0 260 90" role="img" aria-label="TSH trend rising from 3.6 in March to 4.8 now">
                <line x1="16" y1="72" x2="252" y2="72" stroke="var(--line)" strokeWidth="1" />
                <polyline points={trendLine} fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {trendPoints.map((p) => (
                  <g key={p.label}>
                    <circle cx={p.x} cy={p.y} r="4" fill="var(--surface)" stroke="var(--teal)" strokeWidth="2.5" />
                    <text x={p.x} y="86" textAnchor="middle" fontSize="9" fill="var(--ink-4)" fontFamily="Nunito Sans, sans-serif" fontWeight="600">
                      {p.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <Link to="/download" className="btn btn-brand" style={{ width: '100%' }}>
              Discuss with a Gynaecologist
            </Link>
          </div>
          <p style={{ font: 'var(--t-caption)', color: 'var(--ink-4)', textAlign: 'center', margin: '16px 0 0' }}>
            Illustrative example. Real reports vary by test and lab partner.
          </p>
        </div>
      </div>

      {/* SECTION 6 — RESULTS TO CARE */}
      <div ref={refCare} className={`reveal ${inCare ? 'in' : ''}`} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '72px 32px' }}>
        <div className="container">
          <SectionIntro
            eyebrow="From results to care"
            title="Results should lead to care"
            body="Your gynaecologist reviews your relevant cycle history, symptoms, medical documents, and diagnostic results together, then recommends the right next step, whether that's a treatment discussion, further investigation, or a follow-up plan."
          />
          <MiniFlow items={careFlowSteps} />
        </div>
      </div>

      {/* SECTION 7 — CONNECTED HEALTH RECORD */}
      <div ref={refRecord} className={`reveal ${inRecord ? 'in' : ''} container`} style={{ padding: '72px 32px' }}>
        <SectionIntro
          eyebrow="One connected record"
          title="One connected health record"
          body="Cycle history, symptoms, medical documents, lab results, and consultations, converging into a single, continuous picture of your health."
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '18px 28px', maxWidth: 700, margin: '0 auto 6px' }}>
          {recordSources.map((s) => (
            <div key={s.title} style={{ textAlign: 'center', flex: '0 1 120px' }}>
              <div className="icon-tile" style={{ background: 'var(--surface)', border: '1px solid var(--line)', margin: '0 auto 10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="1.6" aria-hidden="true">
                  {s.icon}
                </svg>
              </div>
              <div style={{ font: 'var(--t-title-sm)', color: 'var(--ink-2)' }}>{s.title}</div>
            </div>
          ))}
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ margin: '4px auto 4px', display: 'block' }}>
          <path d="M12 5v13M6 13l6 6 6-6" stroke="var(--ink-4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ maxWidth: 560, margin: '0 auto', background: 'var(--brand-tint)', borderRadius: 'var(--radius-lg)', padding: '26px 30px', textAlign: 'center' }}>
          <div style={{ font: 'var(--t-title)', color: 'var(--brand-dark)', marginBottom: 6 }}>Your Nura Health Record</div>
          <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)', margin: 0 }}>
            One continuous history of you, so every conversation with a doctor starts with context, not from zero.
          </p>
        </div>
      </div>

      {/* SECTION 8 — AI ASSISTS, CLINICIANS DECIDE */}
      <div ref={refAi} className={`reveal ${inAi ? 'in' : ''}`} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '72px 32px' }}>
        <div className="container">
          <SectionIntro eyebrow="Our safety philosophy" title="AI assists. Clinicians decide." max={640} />
          <div style={{ display: 'flex', gap: 10, background: 'rgba(180,121,15,0.08)', border: '1px solid rgba(180,121,15,0.22)', borderRadius: 14, padding: 16, maxWidth: 720, margin: '0 auto 36px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M12 3l9 4.5v5c0 5-3.6 8.7-9 9.5-5.4-.8-9-4.5-9-9.5v-5L12 3Z" stroke="var(--amber)" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M12 8v5.5M12 16.5v.1" stroke="var(--amber)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <p style={{ font: 'var(--t-label-sm)', color: '#7A5209', margin: 0 }}>
              Nura's AI helps you understand your body and your results. It does not diagnose conditions or prescribe treatment, that's always a licensed clinician's role.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, maxWidth: 820, margin: '0 auto' }}>
            <div className="card" style={{ padding: 28 }}>
              <div style={{ font: 'var(--t-micro)', color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 16 }}>
                What Nura AI does
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {aiDoes.map((t) => (
                  <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M4 12.5L9.5 18L20 6" stroke="var(--teal)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 28 }}>
              <div style={{ font: 'var(--t-micro)', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 16 }}>
                What only a clinician does
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {clinicianDoes.map((t) => (
                  <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9Z" stroke="var(--ink-4)" strokeWidth="1.7" strokeLinejoin="round" />
                    </svg>
                    <span style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div ref={refCta} className={`reveal ${inCta ? 'in' : ''}`} style={{ background: 'var(--surface-dark)', padding: '80px 32px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <h2 style={{ font: 'var(--t-h2)', color: '#fff', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
            From concern to clarity to care.
          </h2>
          <p style={{ font: 'var(--t-body)', color: 'rgba(255,255,255,0.65)', margin: '0 0 32px' }}>
            Experience the future of connected women's healthcare with The Nura.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14 }}>
            <Link to="/download" className="btn btn-brand" style={{ padding: '15px 26px' }}>
              Download the app
            </Link>
            <Link to="/contact" className="btn btn-ghost-light" style={{ padding: '15px 26px' }}>
              Talk to our team
            </Link>
          </div>
        </div>
      </div>

      <Newsletter
        title="Get notified as Nura Diagnostics rolls out"
        subtitle="Be the first to know when home sample collection and diagnostic pathways reach your area."
      />

      <Footer />
    </div>
  );
}
