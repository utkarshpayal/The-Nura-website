import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { seedBlogData } from './lib/api'

// Pages prerendered at build time (scripts/prerender.mjs) carry their blog
// data, so the article draws at once instead of loading again.
seedBlogData(window.__NURA_BLOG_DATA__)

// The prerendered structured data is replaced by the page's own (useSeo), so
// drop it rather than leave two copies.
document.querySelectorAll('script[data-prerender]').forEach((el) => el.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
