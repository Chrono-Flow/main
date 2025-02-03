'use client';
import { LiteralUnion, signIn } from "next-auth/react";
export default function LoginPage() {
  const handleSignIn = (provider: 'google' | 'github' | 'microsoft') => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Decorative shapes */}
          <div className="absolute -left-4 -bottom-4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute -right-4 -top-4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-70"></div>
        </div>

        {/* Content */}
        <div className="relative w-full flex items-center justify-center">
          <div className="p-12 text-white">
            <h1 className="text-5xl font-bold mb-6">Welcome to ChronFlow</h1>
            <p className="text-xl opacity-80">
              Join thousands of developers building better workflows with our platform.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="mt-3 text-gray-600">Start managing your workflows efficiently</p>
          </div>

          <div className="space-y-6">
            {/* GitHub login button */}
            <button
              onClick={() => handleSignIn('github')}
              className="w-full flex items-center justify-center
              hover:bg-gray-200
              gap-3 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              Continue with GitHub
            </button>

            {/* Google Login Button  */}
            <button
              onClick={() => handleSignIn('google')}
              className="w-full flex items-center justify-center
              hover:bg-gray-200
              gap-3 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* More options coming soon */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">More options coming soon</span>
              </div>
            </div>

            {/* Coming soon providers */}
            <div className="grid grid-cols-2 gap-4">
              <button disabled className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg text-gray-400 bg-gray-50 cursor-not-allowed">
                <span className="text-sm">Microsoft</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <DecorativeShapes />
    </div>
  );
}

// Add decorative shapes
const DecorativeShapes = () => {
  return (
    <>
      {/* Floating circles */}
      <div className="absolute right-10 top-10 w-20 h-20 rounded-full bg-indigo-400 opacity-20 animate-float"></div>
      <div className="absolute right-40 top-20 w-16 h-16 rounded-full bg-purple-400 opacity-20 animate-float-delayed"></div>
      <div className="absolute left-20 top-32 w-24 h-24 rounded-full bg-pink-400 opacity-20 animate-float"></div>
      <div className="absolute left-48 top-16 w-12 h-12 rounded-full bg-blue-400 opacity-20 animate-float"></div>
      <div className="absolute left-10 bottom-20 w-16 h-16 rounded-full bg-green-400 opacity-20 animate-float"></div>
      <div className="absolute right-24 bottom-32 w-20 h-20 rounded-full bg-yellow-400 opacity-20 animate-float"></div>

      {/* Abstract shapes */}
      <div className="absolute right-20 bottom-20 w-32 h-32 bg-pink-400 opacity-10 transform rotate-45"></div>
      <div className="absolute right-60 bottom-40 w-24 h-24 bg-blue-400 opacity-10 transform -rotate-12"></div>

      {/* Gradient blob */}
      {/* <div className="absolute right-1/4 top-1/3 w-64 h-64 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full opacity-10 blur-3xl"></div> */}

      {/* Animated dots */}
      <div className="absolute right-1/3 bottom-1/4 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-indigo-500 opacity-40   "></div>
        <div className="w-2 h-2 rounded-full bg-purple-500 opacity-40 "></div>
        <div className="w-2 h-2 rounded-full bg-pink-500 opacity-40 "></div>
      </div>
    </>
  );
};

// Add to global styles:
// @keyframes float {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-10px); }
// }
// .animate-float { animation: float 6s ease-in-out infinite; }
// .animate-float-delayed { animation: float 6s ease-in-out infinite 2s; }
