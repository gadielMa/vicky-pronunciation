import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Vicky Pronunciation
            </p>
            <p className="text-sm text-gray-500">
              Argentine Spanish for the world.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/login" className="hover:text-gray-900">
              Sign in
            </Link>
            <Link href="/register" className="hover:text-gray-900">
              Sign up
            </Link>
            <Link href="#pricing" className="hover:text-gray-900">
              Pricing
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Vicky Pronunciation. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
