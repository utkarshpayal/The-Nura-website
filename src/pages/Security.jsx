import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import useReveal from '../hooks/useReveal';
import useDocumentMeta from '../hooks/useDocumentMeta';

// Every claim here matches what the product actually does. The source of truth
// is period-buddy-be's docs/SECURITY.md; update both together, and never add a
// claim (end-to-end encryption, certifications, data residency) that the
// backend doc doesn't back up.

const icons = {
  lock: <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9Z" />,
  shield: <path d="M12 3L4 6.5V11C4 16 7.5 20 12 21.5C16.5 20 20 16 20 11V6.5L12 3Z" />,
  key: <><circle cx="8" cy="15" r="4" /><path d="M11 12l8-8M16 7l3 3" /></>,
  file: <><path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4Z" /><path d="M14 3v4h4" /></>,
  phone: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></>,
  eyeOff: <><path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" /><path d="M9.9 5.1A9.6 9.6 0 0 1 12 5c5 0 9 5 9 7a8.8 8.8 0 0 1-2.2 3M6.2 6.2C4.2 7.6 3 9.6 3 12c0 2 4 7 9 7a9.4 9.4 0 0 0 4.3-1" /></>,
  bell: <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2ZM10 20a2 2 0 0 0 4 0" />,
  devices: <><rect x="3" y="5" width="13" height="10" rx="1.5" /><rect x="17" y="9" width="4" height="10" rx="1" /><path d="M7 19h6" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  download: <path d="M12 15V3M12 15l-4-4M12 15l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />,
  trash: <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />,
  team: <><circle cx="9" cy="8" r="3.2" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20a6 6 0 0 1 12 0M15 20a4.5 4.5 0 0 1 6-4.2" /></>,
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />,
  alert: <><path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v4M12 17h.01" /></>,
};

const tones = {
  teal: { bg: 'var(--teal-tint)', fg: 'var(--teal)' },
  brand: { bg: 'var(--brand-tint)', fg: 'var(--brand-dark)' },
  accent: { bg: 'var(--accent-tint)', fg: 'var(--accent)' },
  amber: { bg: 'var(--amber-tint)', fg: 'var(--amber)' },
};

const sections = [
  {
    id: 'encryption',
    title: 'Encryption',
    intro: 'Your data is encrypted on the way to us and while it is stored.',
    tone: 'teal',
    items: [
      {
        icon: 'lock',
        title: 'Encrypted in transit',
        body: 'Every connection, from the app to our servers and from our servers to the database, uses TLS (HTTPS). Nothing travels in plain text.',
      },
      {
        icon: 'key',
        title: 'Your private words, encrypted with AES-256',
        body: 'The things you write in your own words are encrypted field by field in our database: AI chats, notes on your cycle log, messages with your partner, buddy or doctor, text read from your documents, screening summaries and check-in call summaries.',
      },
      {
        icon: 'shield',
        title: 'The rest, protected at rest',
        body: 'Dates, flow, symptoms and moods are stored so predictions and trends can work. They sit in an encrypted database, only our servers can reach it, and they are never sold or used for ads.',
      },
      {
        icon: 'file',
        title: 'Medical documents stay private',
        body: 'Lab reports and prescriptions go to private, encrypted storage that is never public. Each time you open one, the app gets a link that stops working after 10 minutes, and PDFs open on your phone, never in an online viewer.',
      },
    ],
  },
  {
    id: 'phone',
    title: 'On your phone',
    intro: 'Protection that works even when someone else is holding your phone.',
    tone: 'brand',
    items: [
      {
        icon: 'lock',
        title: 'App Lock',
        body: 'Lock Nura behind a PIN, Face ID or fingerprint, separate from your phone lock.',
      },
      {
        icon: 'phone',
        title: 'Sign-in kept in the secure keystore',
        body: 'Your sign-in and your setup answers are kept in the phone’s secure keystore (iOS Keychain, Android Keystore), on this device only and never in backups.',
      },
      {
        icon: 'eyeOff',
        title: 'No screenshots of sensitive screens',
        body: 'Screenshots and screen recordings are blocked on your documents, AI chats, tracker, day log and partner and doctor chats. On iPhone the app is blurred in the app switcher. You can turn both off.',
      },
      {
        icon: 'bell',
        title: 'Quiet lock-screen notifications',
        body: 'By default your lock screen only says “You have a new update”. The details stay inside the app.',
      },
    ],
  },
  {
    id: 'account',
    title: 'Your account',
    intro: 'You can always see where you are signed in, and end it.',
    tone: 'accent',
    items: [
      {
        icon: 'devices',
        title: 'See every signed-in device',
        body: 'Privacy & security lists every phone that is signed in. Sign one out, or sign out everywhere at once. Changing your password does the same.',
      },
      {
        icon: 'shield',
        title: 'Guarded against password guessing',
        body: 'After 5 wrong passwords in a row the account is locked for 15 minutes, and sign-in is rate limited.',
      },
      {
        icon: 'bell',
        title: 'New sign-in alerts',
        body: 'We email you when your account is used on a new device, so you notice if it wasn’t you.',
      },
      {
        icon: 'key',
        title: 'Strong passwords only',
        body: 'Passwords must meet clear strength rules, and we only ever store a one-way hash of them, never the password itself.',
      },
    ],
  },
  {
    id: 'control',
    title: 'Your choices',
    intro: 'Your data, your call. Every one of these is in the app, no email needed.',
    tone: 'teal',
    items: [
      {
        icon: 'spark',
        title: 'AI only if you want it',
        body: 'Switch AI features off and nothing of yours is sent to our AI provider. Your existing chats stay in the app.',
      },
      {
        icon: 'trash',
        title: 'Auto-delete AI chats',
        body: 'Choose to keep AI and document chats, or have them deleted after 30 days, 90 days or a year.',
      },
      {
        icon: 'download',
        title: 'Download everything',
        body: '“Download my data” gives you a copy of everything we hold about you, in one file.',
      },
      {
        icon: 'user',
        title: 'Delete your account',
        body: 'Delete account (in Profile) signs you out and hides you from others straight away. Your account and data are erased for good 30 days later.',
      },
    ],
  },
  {
    id: 'team',
    title: 'Inside Nura',
    intro: 'Our own team works under strict limits too.',
    tone: 'amber',
    items: [
      {
        icon: 'team',
        title: 'Staff don’t see your health records',
        body: 'Our admin tools show a person’s profile and how many records they have, never the records themselves. Every time staff open someone’s account, it is logged.',
      },
      {
        icon: 'lock',
        title: 'Two-step sign-in for staff',
        body: 'Staff and doctors confirm every sign-in with a second code, and staff sessions end after 12 hours.',
      },
      {
        icon: 'key',
        title: 'Secrets kept out of code',
        body: 'Encryption keys and passwords live in a managed secrets vault, not in our code or on laptops. Our code is regularly scanned for leaked secrets and vulnerable dependencies.',
      },
      {
        icon: 'shield',
        title: 'Logs that don’t reveal you',
        body: 'Our server logs hide passwords and keys, mask emails and phone numbers, and never record what you write.',
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safety',
    intro: 'Health information you can trust, with guard rails where they matter.',
    tone: 'brand',
    items: [
      {
        icon: 'alert',
        title: 'Urgent symptoms flagged',
        body: 'If you describe signs that could need urgent help, such as very heavy bleeding, fainting or thoughts of self-harm, Nura AI tells you to contact emergency care or a clinician now.',
      },
      {
        icon: 'heart',
        title: 'Information, not a diagnosis',
        body: 'Nura AI shares general health education. It never diagnoses, and points you to a clinician for anything that sounds concerning. Consultations are with verified gynaecologists.',
      },
      {
        icon: 'user',
        title: 'Built with young users in mind',
        body: 'We don’t track how anyone under 18 uses the app, and the Sex & Intimacy chat topic is for adults only.',
      },
      {
        icon: 'team',
        title: 'Sharing is always your choice',
        body: 'Partner Sync and Bestie Circles only show what you choose to share, and you can disconnect or leave at any time.',
      },
    ],
  },
];

function Card({ item, tone }) {
  const t = tones[tone];
  return (
    <div className="card" style={{ padding: 26 }}>
      <div className="icon-tile" style={{ background: t.bg, marginBottom: 14 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.fg} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {icons[item.icon]}
        </svg>
      </div>
      <h3 style={{ font: 'var(--t-title)', color: 'var(--ink)', margin: '0 0 8px' }}>{item.title}</h3>
      <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: 0 }}>{item.body}</p>
    </div>
  );
}

function Section({ section }) {
  const [ref, inView] = useReveal();
  return (
    <section id={section.id} ref={ref} className={`reveal ${inView ? 'in' : ''} container`} style={{ maxWidth: 960, padding: '36px 32px' }}>
      <h2 style={{ font: 'var(--t-h3)', color: 'var(--ink)', margin: '0 0 6px' }}>{section.title}</h2>
      <p style={{ font: 'var(--t-body)', color: 'var(--ink-3)', margin: '0 0 22px' }}>{section.intro}</p>
      <div className="grid-clean-2">
        {section.items.map((item) => (
          <Card key={item.title} item={item} tone={section.tone} />
        ))}
      </div>
    </section>
  );
}

export default function Security() {
  useDocumentMeta(
    'Security & Safety | Nura',
    'How Nura protects your health data: encryption, App Lock, private documents, sign-in protection, AI controls and what our own team can and cannot see.',
  );
  const [refStats, inStats] = useReveal();

  return (
    <div className="page">
      <Nav />

      <PageHero
        eyebrow="Security & safety"
        title="How we keep your health data safe"
        subtitle="Cycle, symptom and sexual health data is some of the most personal information there is. Here is exactly how we protect it, in plain words."
      />

      <div ref={refStats} className={`reveal ${inStats ? 'in' : ''} container`} style={{ maxWidth: 960, padding: '40px 32px 12px' }}>
        <div className="grid-clean-3">
          {[
            ['AES-256', 'Encryption for your notes, chats and messages'],
            ['10 min', 'Life of every private document link'],
            ['0', 'Health records sold or used for ads'],
          ].map(([stat, label]) => (
            <div key={label} className="card" style={{ padding: 24, textAlign: 'center' }}>
              <div style={{ font: 'var(--t-h2)', color: 'var(--brand)' }}>{stat}</div>
              <div style={{ font: 'var(--t-label-sm)', color: 'var(--ink-3)', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {sections.map((s) => (
        <Section key={s.id} section={s} />
      ))}

      {/* Being specific about the limits is part of earning trust. */}
      <div className="container" style={{ maxWidth: 960, padding: '36px 32px' }}>
        <div className="card" style={{ padding: 28, background: 'var(--line-2)' }}>
          <h2 style={{ font: 'var(--t-h4)', color: 'var(--ink)', margin: '0 0 10px' }}>What we don’t claim</h2>
          <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-2)', margin: 0 }}>
            Nura is not end-to-end encrypted. Our servers decrypt your data to show it back to you and to run the features you
            use, such as predictions and, if you turn it on, Nura AI. That is why we limit who and what can reach it, as described
            above. We don’t claim certifications we don’t hold.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 960, padding: '12px 32px 88px' }}>
        <div className="grid-clean-2">
          <div className="card" style={{ padding: 28 }}>
            <h2 style={{ font: 'var(--t-h4)', color: 'var(--ink)', margin: '0 0 10px' }}>If something goes wrong</h2>
            <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: 0 }}>
              If a security incident affects your data, we will tell you and the Data Protection Board of India, as India’s
              Digital Personal Data Protection Act requires, and explain what happened and what we changed.
            </p>
          </div>
          <div className="card" style={{ padding: 28 }}>
            <h2 style={{ font: 'var(--t-h4)', color: 'var(--ink)', margin: '0 0 10px' }}>Found a security issue?</h2>
            <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-3)', margin: 0 }}>
              Please tell us privately at <a href="mailto:hello@thenura.care?subject=Security%20report" style={{ fontWeight: 700 }}>hello@thenura.care</a> with
              “Security report” in the subject, and give us time to fix it before sharing it publicly. We reply to every report.
            </p>
          </div>
        </div>
        <p style={{ font: 'var(--t-body-sm)', color: 'var(--ink-4)', marginTop: 28, textAlign: 'center' }}>
          More detail in our <Link to="/privacy" style={{ fontWeight: 700 }}>Privacy page</Link> and{' '}
          <Link to="/data-protection" style={{ fontWeight: 700 }}>Health Data Protection Notice</Link>. Last updated September 30, 2026.
        </p>
      </div>

      <Footer />
    </div>
  );
}
