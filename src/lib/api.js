const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  let body = null;
  try {
    body = await res.json();
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    const message = body?.message || `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.errors = body?.errors;
    throw error;
  }

  return body;
}

export const subscribeNewsletter = (email) =>
  request('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

export const submitContactMessage = ({ name, email, topic, message }) =>
  request('/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, topic, message }),
  });
