import type { ReactNode } from "react"
import { Button } from "../Major Pages/Dashboards/Registered/Elements/ui/combined-ui"
import { useNavigate, useLocation } from "react-router-dom"
import { ThemeToggle } from "../functions/ThemeToogle"
import { Bell } from "lucide-react"

interface CombinedLayoutProps {
  children: ReactNode
  isLoggedIn?: boolean
}

export default function CombinedLayout({
  children,
  isLoggedIn = localStorage.getItem("isAuthenticated") === "true",
}: CombinedLayoutProps) {
  const storedUserType = localStorage.getItem("userType")
  const userType = storedUserType === "individual" ? "customer" : storedUserType

  const location = useLocation()
  const isHomePage = location.pathname === "/" || location.pathname === "/home"

  const showWelcomeBanner = isHomePage && (userType === "customer" || userType === "organizer" || userType === "vendor")

  return (
    <div className="layout">
      <div className="HeaderContainer">{isLoggedIn ? <Header /> : <Header2 />}</div>

      {showWelcomeBanner && <WelcomeBanner />}

      <div className="MainContainer">
        <div className="MainContent">{children}</div>
      </div>

      {!isLoggedIn && (
        <div className="FooterContainer">
          <Footer />
        </div>
      )}
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#2B579A] text-white dark:bg-[#1E3A6D]">
      <div className="container flex h-14 items-center">
        <div className="flex items-center">
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600 dark:hover:bg-blue-800">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600 dark:hover:bg-blue-800">
            <ThemeToggle />
            <span className="sr-only">Toggle Theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

function Header2() {
  const navigate = useNavigate()
  const location = useLocation()
  const handleNavigation = (path: string) => () => navigate(path)

  return (
    <header className="sticky top-0 z-50 w-full bg-[#2B579A] text-white dark:bg-[#1E3A6D]">
      <div className="w-full px-8 flex h-14 items-center justify-between">
        <div className="flex-1">
          <a href="/" className="flex items-center">
            <img src="../../src/assets/OrganizerLogo.png" alt="Logo" className="h-8 w-auto object-contain" />
          </a>
        </div>

        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center space-x-8">
            <li>
              <button
                onClick={handleNavigation("/")}
                className="relative text-white after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={handleNavigation("/about")}
                className="relative text-white after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={handleNavigation("/login")}
                className="relative text-white after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
              >
                Organizers
              </button>
            </li>
          </ul>
        </nav>

        <div className="flex-1 flex items-center justify-end gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600 dark:hover:bg-blue-800">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle Notifications</span>
          </Button>
          <ThemeToggle />
          <a
            href="/login"
            className="relative text-white after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
          >
            Log in
          </a>
          <a
            href="/role-selection"
            className="relative text-white after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
          >
            Register
          </a>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-[#2B579A] text-white dark:bg-[rgb(30,58,109)] py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm">© {new Date().getFullYear()} Platform. All rights reserved.</div>
      </div>
    </footer>
  )
}

function WelcomeBanner() {
  return (
    <section className="relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <img src="/images/banner.jpg" alt="Event crowd" className="h-full w-full object-cover z-10" />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <div className="mb-8 sm:mb-0 sm:mr-8 flex-shrink-0">
            <img
              src="/src/assets/OrganizerLogo.png"
              alt="Logo"
              className="h-48 sm:h-64 lg:h-99 max-w-xs sm:max-w-sm object-contain"
            />
          </div>
          <div className="text-center sm:text-left flex flex-col justify-center self-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to Your Event Management Hub
            </h1>
            <p className="mt-6 max-w-lg text-lg text-gray-300 sm:mx-auto md:mt-8 md:max-w-xl md:text-xl lg:mx-0">
              Discover tailored events services and manage everything from one central dashboard. Your next successful
              event starts here.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
