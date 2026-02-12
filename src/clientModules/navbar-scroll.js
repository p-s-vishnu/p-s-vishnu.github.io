export default function navbarScroll() {
  if (typeof window === 'undefined') return; // SSR safety

  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };

  // Passive listener for better scroll performance
  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}
