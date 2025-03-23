'use client';

import Link from 'next/link';

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/95 supports-backdrop-blur:bg-white/60">
      <div className="max-w-8xl mx-auto">
        <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 mx-4 lg:mx-0">
          <div className="relative flex items-center">
            {/* Logo */}
            <Link href="/" className="mr-3 flex-none w-[138px] overflow-hidden md:w-auto">
              <span className="text-xl font-bold text-indigo-600">Chrono-flow</span>
            </Link>
            {/* Navigation */}
            <div className="relative hidden lg:flex items-center ml-auto">
              <nav className="text-sm leading-6 font-semibold text-slate-700">
                <ul className="flex space-x-8">
                  <li><a className="hover:text-indigo-600" href="#features">Features</a></li>
                  <li><a className="hover:text-indigo-600" href="#pricing">Pricing</a></li>
                  <li><a className="hover:text-indigo-600" href="#documentation">Documentation</a></li>
                  <li><a className="hover:text-indigo-600" href="#blog">Blog</a></li>
                </ul>
              </nav>
              <div className="flex items-center border-l border-slate-200 ml-6 pl-6">
                <a href="/login" className="text-sm font-semibold text-slate-700 hover:text-indigo-600">Sign in</a>
                <a href="/login" className="ml-6 inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-indigo-600 text-white hover:bg-indigo-700">
                  Get started
                </a>
              </div>
            </div>
            {/* Mobile menu button */}
            <button type="button" className="ml-auto text-slate-500 w-8 h-8 -my-1 flex items-center justify-center lg:hidden">
              <span className="sr-only">Open menu</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function TestimonialsSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[90rem] px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 text-indigo-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Loved by developers worldwide
          </p>
        </div>

        <div className="mx-auto mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <figure className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-900/5">
            <blockquote className="text-gray-900">
              <p className="text-sm font-medium leading-6">&quot;The monitoring capabilities have helped us identify and fix issues before they impact our users.&quot;</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-x-4 border-t border-gray-900/10 pt-4">
              <div className="h-10 w-10 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <span className="text-sm font-semibold text-white">SB</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Sarah Brown</div>
                <div className="text-xs text-gray-600">CTO at TechFlow</div>
              </div>
            </figcaption>
          </figure>

          <figure className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-900/5">
            <blockquote className="text-gray-900">
              <p className="text-sm font-medium leading-6">"Setting up complex workflows used to take days. With Chron-flow, we can do it in hours."</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-x-4 border-t border-gray-900/10 pt-4">
              <div className="h-10 w-10 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <span className="text-sm font-semibold text-white">AL</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Alice Lee</div>
                <div className="text-xs text-gray-600">Engineering Manager at DevCorp</div>
              </div>
            </figcaption>
          </figure>

          <figure className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-900/5">
            <blockquote className="text-gray-900">
              <p className="text-sm font-medium leading-6">"The integration capabilities are incredible. We've connected all our services seamlessly."</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-x-4 border-t border-gray-900/10 pt-4">
              <div className="h-10 w-10 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                <span className="text-sm font-semibold text-white">RK</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Rachel Kim</div>
                <div className="text-xs text-gray-600">DevOps Lead at CloudTech</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

function PricingSection() {
  return (
    <div id="pricing" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for your needs
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Free Tier */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Free</h3>
                <p className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                  Most popular
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">Perfect for trying out ChronoFlow</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">$0</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Up to 5 workflows
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Basic analytics
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Community support
                </li>
              </ul>
            </div>
            <a href="#" className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Get started for free
            </a>
          </div>

          {/* Pro Tier - Highlighted */}
          <div className="flex flex-col justify-between rounded-3xl bg-indigo-50 p-8 ring-2 ring-indigo-600 xl:p-10 relative">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold leading-5 text-white">The Best</span>
            </div>
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-indigo-600">Pro</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">Perfect for growing teams</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">$49</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Unlimited workflows
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Custom integrations
                </li>
              </ul>
            </div>
            <a href="#" className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Get started with Pro
            </a>
          </div>

          {/* Enterprise Tier */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Enterprise</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">For large-scale operations</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">Custom</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Everything in Pro
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Dedicated support team
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Custom SLA
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  On-premise deployment
                </li>
              </ul>
            </div>
            <a href="#" className="mt-8 block rounded-md bg-gray-900 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-xs hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
              Contact sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmallShapes() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Small scattered shapes */}
      <div className="absolute top-1/6 left-1/5 animate-float-slow opacity-20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
          <path d="M12 0L24 12L12 24L0 12L12 0Z" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-1/6 animate-float opacity-10">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="black">
          <circle cx="8" cy="8" r="8" />
        </svg>
      </div>
      <div className="absolute top-2/3 left-1/3 animate-float-slow opacity-15">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="black">
          <path d="M10 0L20 10L10 20L0 10L10 0Z" />
        </svg>
      </div>
      <div className="absolute top-1/4 right-1/4 animate-float opacity-10">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="black">
          <rect width="12" height="12" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 left-1/6 animate-float-slow opacity-20">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="black">
          <polygon points="8,0 16,16 0,16" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-1/3 animate-float opacity-15">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="black">
          <path d="M7 0L14 7L7 14L0 7L7 0Z" />
        </svg>
      </div>
      {/* Dotted patterns */}
      <div className="absolute top-1/4 left-1/2 opacity-20">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="4" cy="4" r="2" fill="black" />
          <circle cx="20" cy="4" r="2" fill="black" />
          <circle cx="36" cy="4" r="2" fill="black" />
          <circle cx="4" cy="20" r="2" fill="black" />
          <circle cx="20" cy="20" r="2" fill="black" />
          <circle cx="36" cy="20" r="2" fill="black" />
          <circle cx="4" cy="36" r="2" fill="black" />
          <circle cx="20" cy="36" r="2" fill="black" />
          <circle cx="36" cy="36" r="2" fill="black" />
        </svg>
      </div>
      {/* Circuit-like lines */}
      <div className="absolute bottom-1/4 right-1/4 opacity-10">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="black" strokeWidth="1">
          <path d="M0 30h20M40 30h20M30 0v20M30 40v20" />
          <circle cx="30" cy="30" r="4" fill="black" />
        </svg>
      </div>
      {/* Small crosses */}
      <div className="absolute top-2/3 right-1/5 opacity-15">
        <svg width="20" height="20" viewBox="0 0 20 20" stroke="black" strokeWidth="2" fill="none">
          <path d="M5 5l10 10M15 5L5 15" />
        </svg>
      </div>
      {/* Pixel dots */}
      <div className="absolute top-1/3 left-2/3 opacity-20">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <rect x="4" y="4" width="4" height="4" fill="black" />
          <rect x="16" y="4" width="4" height="4" fill="black" />
          <rect x="10" y="10" width="4" height="4" fill="black" />
          <rect x="4" y="16" width="4" height="4" fill="black" />
          <rect x="16" y="16" width="4" height="4" fill="black" />
        </svg>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      {/* Cyberpunk-style decorative elements */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Diagonal lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 40" fill="none" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating polygons */}
        <div className="absolute top-1/4 left-1/4 animate-float-slow">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 0L80 20L60 60L20 80L0 40L20 20L40 0Z" fill="rgba(99, 102, 241, 0.1)" />
          </svg>
        </div>

        <div className="absolute top-3/4 right-1/4 animate-float">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 0L60 30L30 60L0 30L30 0Z" fill="rgba(99, 102, 241, 0.08)" />
          </svg>
        </div>

        {/* Hexagon grid */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2) rotate(0)">
                <path d="M25 0L50 14.4v28.8L25 43.4L0 43.4V14.4z" stroke="rgba(99, 102, 241, 0.2)" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        {/* Glowing circles */}
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-indigo-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-purple-500 rounded-full filter blur-2xl opacity-10 animate-pulse"></div>
      </div>

      {/* Add the new SmallShapes component */}
      <SmallShapes />

      {/* Main content */}
      <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
        <div className="text-center relative z-10">
          <h1 className="text-4xl font-bold tracking-tight transition-all sm:text-6xl wave-text">
            Chrono-flow
          </h1>

          {/* <span className="inline-block text-balance transition-all" style={{ opacity: 1, willChange: "auto", transform: "none" }}>
            <span className="relative overflow-hidden inline-flex bg-background leading-normal text-4xl font-extrabold">
              AI Agent SDK

              <div className="absolute inset-0 pointer-events-none mix-blend-lighten dark:mix-blend-darken">
                <div className="absolute w-[60vw] h-[60vw] top-[-50%] animate-aurora-1" style={{ backgroundColor: "hsl(var(--color-1))", filter: "blur(1rem)", mixBlendMode: "overlay" }}></div>
                <div className="absolute w-[60vw] h-[60vw] right-0 top-0 animate-aurora-2" style={{ backgroundColor: "hsl(var(--color-2))", filter: "blur(1rem)", mixBlendMode: "overlay" }}></div>
                <div className="absolute w-[60vw] h-[60vw] left-0 bottom-0 animate-aurora-3" style={{ backgroundColor: "hsl(var(--color-3))", filter: "blur(1rem)", mixBlendMode: "overlay" }}></div>
                <div className="absolute w-[60vw] h-[60vw] right-0 bottom-[-50%] animate-aurora-4" style={{ backgroundColor: "hsl(var(--color-4))", filter: "blur(1rem)", mixBlendMode: "overlay" }}></div>
                <div className="absolute w-[60vw] h-[60vw] animate-aurora-5" style={{ backgroundColor: "hsl(var(--color-5))", filter: "blur(1rem)", mixBlendMode: "overlay" }}></div>
              </div>
            </span>
          </span> */}


          <p className="mt-6 text-lg leading-8 text-gray-600 relative">
            Build, manage, and monitor your backend services with ease , the only platform you'll ever need.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 relative overflow-hidden group">
              <span className="relative z-10">Get started</span>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors px-3.5 py-2.5 border border-gray-200 rounded-md hover:border-indigo-600">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate px-6 py-24 sm:px-16 sm:rounded-3xl overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-linear-to-b from-gray-50 to-gray-100"></div>

          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <svg className="absolute left-0 top-0 h-full" width="400" xmlns="http://www.w3.org/2000/svg">
              <pattern id="lines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="20" y2="20" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#lines)" />
            </svg>
          </div>

          {/* Subtle shapes */}
          <div className="absolute -left-4 -bottom-4 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -right-4 -top-4 w-72 h-72 bg-purple-50 rounded-full blur-3xl opacity-20"></div>

          {/* Content */}
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to streamline your workflow?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join the community of developers who are building better, faster, and more reliable services with Chron-flow.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#" className="group relative rounded-full px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-200 border-2 border-gray-200">
                <span className="absolute inset-0 rounded-full bg-gray-100 transition-all duration-200 group-hover:bg-gray-200"></span>
                <span className="relative flex items-center gap-2">
                  Get started
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              <a href="#" className="group text-sm font-semibold leading-6 text-gray-900">
                <span className="flex items-center gap-2">
                  View documentation
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 text-left">
              <div>
                <p className="text-4xl font-semibold tracking-tight text-gray-900">10k+</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">Developers</p>
              </div>
              <div>
                <p className="text-4xl font-semibold tracking-tight text-gray-900">1M+</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">Workflows</p>
              </div>
              <div>
                <p className="text-4xl font-semibold tracking-tight text-gray-900">99.9%</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">Uptime</p>
              </div>
              <div>
                <p className="text-4xl font-semibold tracking-tight text-gray-900">24/7</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Section */}
      <div className="bg-linear-to-b from-white to-indigo-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your services
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg className="h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                  Visual Workflow Builder
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Design complex scheduling workflows using our intuitive flowchart interface.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg className="h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684z" />
                  </svg>
                  Smart Scheduling
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Intelligent job scheduling with automatic retry and failure handling.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg className="h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z" clipRule="evenodd" />
                  </svg>
                  Real-time Monitoring
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Monitor your services and jobs in real-time with detailed analytics and logs.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <TestimonialsSection />

      <PricingSection />

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-900/10">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">GitHub</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2024 ChronFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
