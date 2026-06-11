export function Header() {
  return (
    <header class="bg-brand-bg py-6 sm:py-10">
      <div class="container-custom flex flex-col sm:flex-row justify-between items-center gap-6">
        <h1 class="text-2xl font-black tracking-tighter uppercase">
          <span class="text-brand-orange">Dalvik</span><span class="text-brand-blue">Stack</span>
        </h1>
        <nav class="flex flex-wrap justify-center gap-6 sm:gap-12 text-[10px] font-black uppercase tracking-[0.2em]">
          <a href="/" class="text-brand-muted hover:text-brand-orange transition-colors">System Overview</a>
          <a href="/specs" class="text-brand-muted hover:text-brand-blue transition-colors">Core Architecture</a>
          <a href="/no-js" class="text-brand-muted hover:text-brand-orange transition-colors">SSR Validation</a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer class="bg-brand-surface py-20 mt-20 sm:mt-40">
      <div class="container-custom flex flex-col md:flex-row justify-between items-center gap-10">
        <div class="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted text-center md:text-left">
          DalvikStack Runtime Environment // Enterprise Documentation // 2026
        </div>
        <div class="flex gap-6">
          <div class="w-4 h-4 rounded-full bg-brand-orange"></div>
          <div class="w-4 h-4 rounded-full bg-brand-blue"></div>
          <div class="w-4 h-4 rounded-full bg-white/5"></div>
        </div>
      </div>
    </footer>
  );
}
