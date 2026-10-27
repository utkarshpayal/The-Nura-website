import { defaultSchema } from 'rehype-sanitize';

// Rich content format shared with the admin editor (period-buddy-content,
// src/lib/richText.ts) and the app (period-buddy, lib/richText.ts). Keep the
// three in step. Posts are Markdown plus a small allowlist:
//   <span data-color="rose">…</span>  colored text (named palette only)
//   <mark data-color="yellow">…</mark> highlight
//   <u>…</u>                          underline
//   ```chart + JSON                   a chart (see parseChartSpec)
// Any other raw HTML is stripped by the sanitizer below.

export const TEXT_COLORS = ['rose', 'violet', 'blue', 'teal', 'green', 'amber', 'red', 'gray'];
export const HIGHLIGHT_COLORS = ['yellow', 'pink', 'green', 'blue', 'violet'];

export const TEXT_COLOR_HEX = {
  rose: '#C2416F',
  violet: '#6A5BC9',
  blue: '#2F5FB3',
  teal: '#0F7A64',
  green: '#3B7A1E',
  amber: '#956410',
  red: '#B42318',
  gray: '#5E5566',
};

/** Series colors, in order. */
export const CHART_COLORS = ['rose', 'violet', 'teal', 'amber', 'blue', 'green', 'red', 'gray'];

/** GitHub's sanitize schema plus the allowlist above. Runs after rehype-raw. */
export const richTextSchema = {
  ...defaultSchema,
  tagNames: [...defaultSchema.tagNames, 'u', 'mark'],
  attributes: {
    ...defaultSchema.attributes,
    span: [...(defaultSchema.attributes.span ?? []), ['dataColor', ...TEXT_COLORS]],
    mark: [['dataColor', ...HIGHLIGHT_COLORS]],
  },
};

/** A chart block's JSON as { type, title, caption, unit, labels, series }, or null. */
export function parseChartSpec(source) {
  try {
    const raw = JSON.parse(source);
    if (!raw || !['bar', 'line', 'pie'].includes(String(raw.type))) return null;
    const labels = Array.isArray(raw.labels) ? raw.labels.map((l) => String(l ?? '')) : [];
    const series = (Array.isArray(raw.series) ? raw.series : [])
      .filter((s) => s && Array.isArray(s.values))
      .map((s) => ({
        name: String(s.name ?? ''),
        values: labels.map((_, i) => {
          const n = Number(s.values[i]);
          return Number.isFinite(n) ? n : 0;
        }),
      }));
    if (!labels.length || !series.length) return null;
    return {
      type: raw.type,
      title: raw.title ? String(raw.title) : '',
      caption: raw.caption ? String(raw.caption) : '',
      unit: raw.unit ? String(raw.unit) : '',
      labels,
      series: raw.type === 'pie' ? series.slice(0, 1) : series,
    };
  } catch {
    return null;
  }
}
