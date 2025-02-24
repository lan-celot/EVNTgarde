"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Moon, Sun, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Packages", href: "/packages" },
]

export default function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full bg-[#2B579A] text-white dark:bg-[#1E3A6D]">
      <div className="container flex h-14 items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-20 w-20 items-center justify-center rounded p-1">
            <img 
              src="/images/logo.png" 
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </Link>

        <nav className="mx-auto flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-yellow-400",
                pathname === item.href &&
                  "text-yellow-400 after:absolute after:bottom-[-1.15rem] after:left-0 after:h-1 after:w-full after:bg-yellow-400",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-600 dark:hover:bg-blue-800"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600 dark:hover:bg-blue-800">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600 dark:hover:bg-blue-800">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
