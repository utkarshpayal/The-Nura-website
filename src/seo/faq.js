/**
 * The FAQ page's questions. Shared with the FAQPage structured data
 * (src/seo/site.js), so what Google shows always matches the page.
 */
export const FAQ_GROUPS = [
  {
    heading: 'Getting started',
    items: [
      {
        q: 'Is Nura free?',
        a: 'Yes. Cycle tracking, predictions, daily insights, the AI health assistant (within daily limits), the community and all safety guidance are free forever. Nura Premium adds saved AI chats, document chat, doctor-ready reports and more, from ₹99 for 30 days or ₹799 for a year, paid ahead with no auto-renewal. Each of those features can also be bought on its own. See the pricing page for details.',
      },
      {
        q: 'Which devices are supported?',
        a: 'Android 10 and above is available now on Google Play. The iOS app is coming soon.',
      },
      {
        q: 'What languages does Nura support?',
        a: 'The app, AI chat, and report explanations work in 11+ languages, with voice input and text-to-speech so guidance isn’t locked behind English or literacy.',
      },
    ],
  },
  {
    heading: 'Health & AI',
    items: [
      {
        q: 'Can Nura replace a doctor?',
        a: 'No. Nura helps you understand your body and prepare for conversations with a clinician, and lets you book real consultations in-app — but it is not a substitute for professional medical advice, diagnosis, or treatment.',
      },
      {
        q: 'How accurate are the predictions?',
        a: 'Nura learns your personal rhythm over time, so forecasts for your next period, fertile window, and ovulation get more accurate the more you log. It also flags irregular cycles early so you know when to check in with a doctor.',
      },
      {
        q: 'What is the report chat?',
        a: 'You can securely upload lab results and prescriptions, and then ask questions about them in plain language. Nura summarizes reports and highlights values worth discussing with your clinician. Medical Document Vault & Chat is a Premium feature.',
      },
    ],
  },
  {
    heading: 'Privacy & data',
    items: [
      {
        q: 'Is my health data private?',
        a: 'Yes. Everything is encrypted in transit, your notes, chats and messages are encrypted in our database, and medical documents sit in private, encrypted storage. We never sell your data or use your cycle and symptom logs to target ads, and you choose exactly what to share, and with whom. See Security & Safety for the details.',
      },
      {
        q: 'Can I export or delete my data?',
        a: 'Anytime. You can export your health data from Settings, and permanently delete your account and associated data — typically processed within 30 days.',
      },
      {
        q: 'What does Partner Sync share?',
        a: 'Only what you explicitly choose. Partner Sync gives someone you invite gentle context and care reminders on a permission-based basis — never your raw data unless you turn that on. Partner Connect is a Premium feature.',
      },
    ],
  },
];
