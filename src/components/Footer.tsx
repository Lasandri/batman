export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[#F5C518]/15 bg-black px-6 py-14 text-center">
      <img src="/images/batman-logo.png" alt="Batman" className="logo-glow mx-auto mb-5 h-10 w-auto opacity-90" />
      <p className="font-cinematic text-xl tracking-[0.25em] text-[#F5C518] sm:text-2xl">
        HAPPY BIRTHDAY, JAY AIYAA
      </p>
      <p className="mt-3 font-body text-sm text-gray-400">From your sister, with love — {year}</p>
      <p className="mt-6 font-body text-[10px] uppercase tracking-[0.35em] text-gray-600">
        Gotham City · It's not who I am underneath, but what I do that defines me.
      </p>
    </footer>
  );
}
