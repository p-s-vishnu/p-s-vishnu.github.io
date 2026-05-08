// Reads the persisted accent color from localStorage on app start and applies
// it to :root so every page (blog, notes, about, etc.) reflects the user's
// last picked accent — not just the landing where the picker lives.

const LS_KEY = 'portfolio-accent';
const ALLOWED = ['#ff5a3c', '#d4ff3a', '#7c5cff', '#3affb7'];

export default function accentInit() {
  if (typeof window === 'undefined') return; // SSR safety
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored && ALLOWED.includes(stored)) {
      document.documentElement.style.setProperty('--accent', stored);
    }
  } catch {
    // localStorage unavailable (private mode, etc.) — fall back to CSS default
  }
}
