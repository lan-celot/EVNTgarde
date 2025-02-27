export default function Footer() {
  return (
    <footer className="bg-[#2B579A] text-white">
      <div className="container grid gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-6 flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-yellow-400 p-1">
              <span className="block text-center text-sm font-bold text-blue-900">YNT</span>
            </div>
            <span className="text-lg font-semibold">Your next successful event starts here</span>
          </div>
          <h3 className="mb-4 text-lg font-semibold">Company Info</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-sm text-gray-200 hover:text-yellow-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="text-sm text-gray-200 hover:text-yellow-400">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Categories</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-200 hover:text-yellow-400">
                Catering & F&B
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-200 hover:text-yellow-400">
                Venues & Meeting
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-200 hover:text-yellow-400">
                Audio & Design
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-200 hover:text-yellow-400">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-200 hover:text-yellow-400">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-200 hover:text-yellow-400">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-200 hover:text-yellow-400">
                YouTube
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Help</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-200 hover:text-yellow-400">
                Account Support
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-200 hover:text-yellow-400">
                Using EventHub
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-200 hover:text-yellow-400">
                Event Planning
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blue-400">
        <div className="container flex items-center justify-between px-4 py-6">
          <p className="text-sm text-gray-200">© 2024 EventHub. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-gray-200 hover:text-yellow-400">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-200 hover:text-yellow-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
