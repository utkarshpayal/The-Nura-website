// What /pricing shows before (or without) the live prices from the backend's
// GET /api/subscriptions/pricing. Mirrors the backend's utils/pricing.js
// PRICING_2026; the live response always wins. The founding-member offer is
// never shown from here: only when the backend says it's switched on.

export const FALLBACK_PRICING = {
  currency: 'INR',
  tax: { ratePercent: 18, pricesIncludeTax: true },
  premium: {
    features: [
      { key: 'ai_assistant', name: 'Saved AI chats and chat history' },
      { key: 'document_chat', name: 'Medical Document Vault & Chat' },
      { key: 'health_reports', name: 'Doctor-ready PDF health reports' },
      { key: 'symptom_checker', name: 'PCOS/endometriosis symptom checker' },
      { key: 'symptom_predictions', name: 'Enhanced symptom predictions' },
      { key: 'partner_connect', name: 'Partner Connect' },
      { key: 'period_buddy', name: 'Period Buddy matching' },
    ],
    monthly: { slug: 'premium-monthly', price: 99, billingCycle: 'monthly' },
    yearly: {
      slug: 'premium-yearly',
      price: 799,
      billingCycle: 'yearly',
      comparison: { twelveMonthly: 1188, monthlyEquivalent: 66.58, saving: 389, savingPercent: 32.7 },
    },
    founding: null,
    autoRenews: false,
  },
  addOns: [
    { key: 'ai_assistant', name: 'Saved AI chat', price: 29, yearlyPrice: 290, includedInPremium: true },
    { key: 'document_chat', name: 'Medical Document Vault & Chat', price: 39, yearlyPrice: 390, includedInPremium: true },
    { key: 'health_reports', name: 'Doctor-ready PDF report', price: 19, yearlyPrice: 190, includedInPremium: true },
    { key: 'symptom_checker', name: 'PCOS/endometriosis symptom checker', price: 29, yearlyPrice: 290, includedInPremium: true },
    { key: 'symptom_predictions', name: 'Enhanced symptom predictions', price: 19, yearlyPrice: 190, includedInPremium: true },
    { key: 'partner_connect', name: 'Partner Connect', price: 19, yearlyPrice: 190, includedInPremium: true },
    { key: 'period_buddy', name: 'Period Buddy matching', price: 19, yearlyPrice: 190, includedInPremium: true },
  ],
  fairUse: { enabled: false },
};

/** "₹99", "₹66.58": paise only when there are any. */
export const formatRupees = (amount) => {
  const value = Math.round(amount * 100) / 100;
  return `₹${Number.isInteger(value) ? value : value.toFixed(2)}`;
};

/** The live pricing, laid over the fallback so a missing piece never blanks the page. */
export const mergePricing = (live) => {
  if (!live?.premium) return FALLBACK_PRICING;
  return {
    ...FALLBACK_PRICING,
    ...live,
    premium: {
      ...FALLBACK_PRICING.premium,
      ...live.premium,
      monthly: live.premium.monthly || FALLBACK_PRICING.premium.monthly,
      yearly: live.premium.yearly || FALLBACK_PRICING.premium.yearly,
    },
    addOns: live.addOns?.length ? live.addOns : FALLBACK_PRICING.addOns,
  };
};
