"use client"

import { useState, useEffect } from "react"
import { BlockDatesModal } from "./block-dates-modal.tsx"
import { EditDatesModal } from "./edit-dates-modal.tsx"

interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
  hasEvent: boolean
  isBlocked?: boolean
}

interface CalendarCardProps {
  initialMonth?: string
  initialYear?: number
  onEditDates?: () => void
}

// Helper function to get the number of days in a month
function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate()
}

// Helper function to get the day of week for the first day of the month (0 = Sunday, 6 = Saturday)
function getFirstDayOfMonth(month: number, year: number): number {
  return new Date(year, month, 1).getDay()
}

// Map month number to month name
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function CalendarCard({
  initialMonth = "April",
  initialYear = 2025,
  onEditDates = () => console.log("Edit dates clicked"),
}: CalendarCardProps) {
  // Convert initial month name to month index (0-11)
  const initialMonthIndex = monthNames.findIndex((m) => m === initialMonth)

  const [currentMonthIndex, setCurrentMonthIndex] = useState(initialMonthIndex !== -1 ? initialMonthIndex : 3) // Default to April (3) if not found
  const [currentYear, setCurrentYear] = useState(initialYear)
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [blockedDates, setBlockedDates] = useState<string[]>([])
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])

  // Generate calendar days based on current month and year
  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentMonthIndex, currentYear, blockedDates))
  }, [currentMonthIndex, currentYear, blockedDates])

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      // If January, go to December of previous year
      setCurrentMonthIndex(11)
      setCurrentYear(currentYear - 1)
    } else {
      // Otherwise, go to previous month
      setCurrentMonthIndex(currentMonthIndex - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      // If December, go to January of next year
      setCurrentMonthIndex(0)
      setCurrentYear(currentYear + 1)
    } else {
      // Otherwise, go to next month
      setCurrentMonthIndex(currentMonthIndex + 1)
    }
  }

  const handleBlockDates = () => {
    setIsBlockModalOpen(true)
  }

  const handleEditDates = () => {
    setIsEditModalOpen(true)
  }

  const handleCloseBlockModal = () => {
    setIsBlockModalOpen(false)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
  }

  const handleConfirmDates = (dates: string[]) => {
    setBlockedDates(dates)
    setIsBlockModalOpen(false)
  }

  const handleUpdateDates = (dates: string[]) => {
    setBlockedDates(dates)
    setIsEditModalOpen(false)
  }

  return (
    <>
      <div className="bg-white rounded-md shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="font-medium">
            {monthNames[currentMonthIndex]} {currentYear}
          </div>
          <div className="flex">
            <button className="p-1 hover:text-blue-600" onClick={handlePrevMonth}>
              ←
            </button>
            <button className="p-1 hover:text-blue-600" onClick={handleNextMonth}>
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 text-center text-xs mb-2">
          <div className="text-gray-500">SUN</div>
          <div className="text-gray-500">MON</div>
          <div className="text-gray-500">TUE</div>
          <div className="text-gray-500">WED</div>
          <div className="text-gray-500">THU</div>
          <div className="text-gray-500">FRI</div>
          <div className="text-gray-500">SAT</div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-sm">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center
                ${day.isToday ? "bg-blue-600 text-white" : ""}
                ${day.isCurrentMonth ? "" : "text-gray-300"}
                ${day.hasEvent ? "font-bold" : ""}
                ${day.isBlocked ? "bg-gray-200" : ""}
              `}
            >
              {day.date}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button className="bg-blue-600 text-white px-4 py-2.5 rounded-md text-sm w-full" onClick={handleBlockDates}>
            Block Dates
          </button>
          <button
            className="bg-white text-gray-800 px-4 py-2.5 rounded-md text-sm w-full border border-gray-300"
            onClick={handleEditDates}
          >
            Edit Dates
          </button>
        </div>
      </div>

      <BlockDatesModal
        isOpen={isBlockModalOpen}
        onClose={handleCloseBlockModal}
        onConfirm={handleConfirmDates}
        initialMonth={currentMonthIndex}
        initialYear={currentYear}
        blockedDates={blockedDates}
      />

      <EditDatesModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onUpdate={handleUpdateDates}
        initialMonth={currentMonthIndex}
        initialYear={currentYear}
        blockedDates={blockedDates}
      />
    </>
  )
}

// Helper function to generate calendar days
function generateCalendarDays(monthIndex: number, year: number, blockedDates: string[]): CalendarDay[] {
  const days: CalendarDay[] = []
  const daysInMonth = getDaysInMonth(monthIndex, year)
  const firstDayOfMonth = getFirstDayOfMonth(monthIndex, year)
  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const monthName = monthNames[monthIndex]

  // Add empty cells for days before the 1st of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    const prevMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1
    const prevMonthYear = monthIndex === 0 ? year - 1 : year
    const daysInPrevMonth = getDaysInMonth(prevMonthIndex, prevMonthYear)
    const prevMonthDay = daysInPrevMonth - firstDayOfMonth + i + 1

    days.push({
      date: prevMonthDay,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false,
      isBlocked: false,
    })
  }

  // Add the actual days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === currentDay && monthIndex === currentMonth && year === currentYear
    const dateString = `${monthName} ${day}, ${year}`
    const isBlocked = blockedDates.includes(dateString)

    days.push({
      date: day,
      isCurrentMonth: true,
      isToday,
      hasEvent: false, // You can implement event detection logic here
      isBlocked,
    })
  }

  // Add empty cells for days after the last day of the month
  const totalCells = 42 // 6 rows of 7 days
  const remainingCells = totalCells - days.length

  if (remainingCells > 0 && remainingCells < 7) {
    const nextMonthIndex = monthIndex === 11 ? 0 : monthIndex + 1
    const nextMonthYear = monthIndex === 11 ? year + 1 : year

    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        date: day,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
        isBlocked: false,
      })
    }
  }

  return days
}
