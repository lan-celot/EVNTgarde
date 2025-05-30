
import type React from "react"
import { useState } from "react"
import { X, Upload, Edit, Trash2, Plus } from "lucide-react"

interface Guest {
  id: string
  firstName: string
  lastName: string
  gender: string
  email: string
  sms: string
}
interface CreateGuestListModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateGuestList: (guests: Guest[]) => void
  eventId: number
  eventName?: string
}


const CreateGuestListModal: React.FC<CreateGuestListModalProps> = ({
  isOpen,
  onClose,
  onCreateGuestList,
  eventId,
  eventName = "Event",
}) => {

  const [currentStep, setCurrentStep] = useState(1)
  const [creationMode, setCreationMode] = useState<"manual" | "csv">("manual")
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: "1",
      firstName: "Juan",
      lastName: "Dela Cruz",
      gender: "Male",
      email: "juan@gmail.com",
      sms: "0958 456 8225",
    },
    {
      id: "2",
      firstName: "John",
      lastName: "Doe",
      gender: "Female",
      email: "john@gmail.com",
      sms: "0958 165 2226",
    },
    {
      id: "3",
      firstName: "John",
      lastName: "Smith",
      gender: "Male",
      email: "js@gmail.com",
      sms: "0915 485 8955",
    },
    {
      id: "4",
      firstName: "Abigail",
      lastName: "Smith",
      gender: "Male",
      email: "as@gmail.com",
      sms: "0979 458 6566",
    },
    {
      id: "5",
      firstName: "Awesome",
      lastName: "Gonzales",
      gender: "Female",
      email: "ag@gmail.com",
      sms: "",
    },
  ])
  const [newGuest, setNewGuest] = useState({
    firstName: "",
    lastName: "",
    gender: "Male",
    email: "",
    sms: "",
  })
  const [confirmed, setConfirmed] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  if (!isOpen) return null

  const handleNext = () => {
    setCurrentStep(2)
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleAddGuest = () => {
    if (newGuest.firstName && newGuest.lastName) {
      const guest: Guest = {
        id: Date.now().toString(),
        ...newGuest,
      }
      setGuests([...guests, guest])
      setNewGuest({
        firstName: "",
        lastName: "",
        gender: "Male",
        email: "",
        sms: "",
      })
    }
  }

  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter((guest) => guest.id !== id))
  }

  const handleEditGuest = (id: string, field: keyof Guest, value: string) => {
    setGuests(guests.map((guest) => (guest.id === id ? { ...guest, [field]: value } : guest)))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

 const handleCreateGuestList = async () => {
  if (creationMode === "manual") {
    onCreateGuestList(guests);
    onClose();
  } else if (uploadedFile) {
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("eventId", eventId.toString());

      const response = await fetch("/api/guestlist/uploadGuestCSV", {
        method: "POST",
        body: formData,
      });

const result = await response.json();
      if (result.success) {
        console.log("CSV upload successful:", result);
        onCreateGuestList([]); // or update UI accordingly
        onClose();
      } else {
        alert("CSV upload failed: " + result.message);
      }
    } catch (err) {
      console.error("CSV upload error:", err);
      alert("An error occurred during CSV upload.");
    }
  }
};


  const renderStep1 = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Create Guest List</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            01
          </div>
          <span className="ml-2 text-sm font-medium text-blue-600">Mode of Creation</span>
        </div>
        <div className="flex-1 h-px bg-gray-300 mx-4"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
            02
          </div>
          <span className="ml-2 text-sm font-medium text-gray-500">Creating List</span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-700 mb-4">How will you create the guest list for this event?</p>

        <div className="space-y-3">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="radio"
              name="creationMode"
              value="manual"
              checked={creationMode === "manual"}
              onChange={(e) => setCreationMode(e.target.value as "manual" | "csv")}
              className="mt-1"
            />
            <span className="text-gray-700">{"I'll be manually uploading the guest's information."}</span>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="radio"
              name="creationMode"
              value="csv"
              checked={creationMode === "csv"}
              onChange={(e) => setCreationMode(e.target.value as "manual" | "csv")}
              className="mt-1"
            />
            <span className="text-gray-700">
              {"I'll be uploading an Excel/CSV file containing the guest's information."}
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onClose}
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Next
        </button>
      </div>
    </div>
  )

  const renderManualEntry = () => (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Create Guest List</h2>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center">
            <span className="text-white text-xs">👤</span>
          </div>
          <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center">
            <span className="text-black text-xs">👥</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-4">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            ✓
          </div>
          <span className="ml-2 text-sm font-medium text-blue-600">Mode of Creation</span>
        </div>
        <div className="flex-1 h-px bg-blue-600 mx-4"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            02
          </div>
          <span className="ml-2 text-sm font-medium text-blue-600">Creating List</span>
        </div>
      </div>

      {/* Guest Table */}
      <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">First Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Gender</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SMS</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {guests.map((guest) => (
              <tr key={guest.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{guest.firstName}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{guest.lastName}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{guest.gender}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{guest.email}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{guest.sms}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDeleteGuest(guest.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {/* Add new guest row */}
            <tr className="bg-gray-50">
              <td className="px-4 py-3">
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={newGuest.firstName}
                  onChange={(e) => setNewGuest({ ...newGuest, firstName: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={newGuest.lastName}
                  onChange={(e) => setNewGuest({ ...newGuest, lastName: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
              </td>
              <td className="px-4 py-3">
                <select
                  value={newGuest.gender}
                  onChange={(e) => setNewGuest({ ...newGuest, gender: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </td>
              <td className="px-4 py-3">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  value={newGuest.sms}
                  onChange={(e) => setNewGuest({ ...newGuest, sms: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
              </td>
              <td className="px-4 py-3">
                <button onClick={handleAddGuest} className="text-green-600 hover:text-green-800">
                  <Plus size={16} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Confirmation */}
      <div className="mb-6">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-gray-700">
            I confirm that the associated guest list is accurate and up to date. I understand that no changes will be
            allowed once the list has been created.
          </span>
        </label>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleCreateGuestList}
          disabled={!confirmed}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Create Guest List
        </button>
      </div>
    </div>
  )

  const renderCSVUpload = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Create Guest List</h2>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center">
            <span className="text-white text-xs">👤</span>
          </div>
          <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center">
            <span className="text-black text-xs">👥</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-4">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            ✓
          </div>
          <span className="ml-2 text-sm font-medium text-blue-600">Mode of Creation</span>
        </div>
        <div className="flex-1 h-px bg-blue-600 mx-4"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
            02
          </div>
          <span className="ml-2 text-sm font-medium text-gray-500">Creating List</span>
        </div>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
        <div className="mb-4">
          <Upload size={48} className="mx-auto text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">UPLOAD CSV FILE</h3>
        <p className="text-gray-600 mb-4">
          The uploaded file should contain guest information with columns for
          <br />
          First Name, Last Name, Gender, Email, SMS.
        </p>
        <label className="inline-block">
          <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} className="hidden" />
          <span className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
            Upload File
          </span>
        </label>
        {uploadedFile && <p className="mt-2 text-sm text-green-600">File uploaded: {uploadedFile.name}</p>}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleCreateGuestList}
          disabled={!uploadedFile}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Create Guest List
        </button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && creationMode === "manual" && renderManualEntry()}
        {currentStep === 2 && creationMode === "csv" && renderCSVUpload()}
      </div>
    </div>
  )
}

export default CreateGuestListModal
