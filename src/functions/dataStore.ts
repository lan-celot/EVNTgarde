// Simple in-memory data store
import type { CustomerRequest, BudgetProposal, RequestStatus } from "./types"

// Generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

// Format currency
export function formatCurrency(amount: number): string {
  return `Php ${amount.toLocaleString()}`
}

// Sample data
const sampleRequests: CustomerRequest[] = [
  {
      id: "1",
      customerName: "Mark Zuckerberg",
      customerEmail: "mvzuckerberg@gmail.com",
      customerPhone: "0916 123 4567",
      organization: "University of Santo Tomas",
      title: "College of Information and Computing Science (CICS) Week",
      description: "CICS Week is a 3-day event that aims to gather the whole CICS community to celebrate the achievements of the college and its students.",
      location: "University of Santo Tomas, España Blvd, Sampaloc, Manila",
      eventDates: {
          start: "2023-03-01",
          end: "2023-03-03",
      },
      guestCount: "400-500 guests",
      budget: {
          min: 50000,
          max: 100000,
      },
      requirements: "Food Stalls, No Alcohol Drinks",
      status: "pending",
      dates: [],
      schedule: [],
      guestDetails: {
          expectedCount: "",
          targetAudience: ""
      },
      serviceRequirements: {
          serviceType: "",
          foodStyle: "",
          quantity: "",
          specification: "",
          specialRequirements: ""
      },
      customerId: ""
  },
  {
      id: "2",
      customerName: "Elon Musk",
      customerEmail: "elon@tesla.com",
      customerPhone: "0917 987 6543",
      organization: "Tesla Motors",
      title: "Electric Vehicle Showcase",
      description: "A showcase of the latest electric vehicles and technology from Tesla.",
      location: "SM Mall of Asia, Pasay City",
      eventDates: {
          start: "2023-04-15",
          end: "2023-04-17",
      },
      guestCount: "1000+ guests",
      budget: {
          min: 200000,
          max: 500000,
      },
      requirements: "Food and Beverage, Display Areas",
      status: "pending",
      dates: [],
      schedule: [],
      guestDetails: {
          expectedCount: "",
          targetAudience: ""
      },
      serviceRequirements: {
          serviceType: "",
          foodStyle: "",
          quantity: "",
          specification: "",
          specialRequirements: ""
      },
      customerId: ""
  },
  {
      id: "3",
      customerName: "Bill Gates",
      customerEmail: "bill@microsoft.com",
      customerPhone: "0918 456 7890",
      organization: "Microsoft Philippines",
      title: "Microsoft Developer Conference",
      description: "Annual developer conference for Microsoft technologies and platforms.",
      location: "SMX Convention Center, Pasay City",
      eventDates: {
          start: "2023-05-10",
          end: "2023-05-12",
      },
      guestCount: "800+ guests",
      budget: {
          min: 150000,
          max: 300000,
      },
      requirements: "Full Catering, Technical Equipment",
      status: "accepted",
      dates: [],
      schedule: [],
      guestDetails: {
          expectedCount: "",
          targetAudience: ""
      },
      serviceRequirements: {
          serviceType: "",
          foodStyle: "",
          quantity: "",
          specification: "",
          specialRequirements: ""
      },
      customerId: ""
  },
]

const sampleProposals: BudgetProposal[] = [
  {
    id: "1",
    requestId: "3",
    services: [
      { description: "Food Catering (3 days)", amount: 150000 },
      { description: "Beverages", amount: 50000 },
      { description: "Technical Support", amount: 50000 },
    ],
    totalAmount: 250000,
    description:
      "Full catering service for 3 days including breakfast, lunch, and snacks. Beverages throughout the day and technical support for all equipment.",
    status: "accepted",
  },
]

// In-memory data store
class DataStore {
  private requests: CustomerRequest[] = [...sampleRequests]
  private proposals: BudgetProposal[] = [...sampleProposals]

  // Request methods
  getAllRequests(): CustomerRequest[] {
    return this.requests
  }

  getRequestById(id: string): CustomerRequest | undefined {
    return this.requests.find((request) => request.id === id)
  }

  getRequestsByStatus(status: RequestStatus): CustomerRequest[] {
    return this.requests.filter((request) => request.status === status)
  }

  updateRequestStatus(id: string, status: RequestStatus): CustomerRequest | undefined {
    const index = this.requests.findIndex((request) => request.id === id)
    if (index === -1) return undefined

    this.requests[index] = {
      ...this.requests[index],
      status,
    }

    return this.requests[index]
  }

  // Proposal methods
  getProposalsByRequestId(requestId: string): BudgetProposal[] {
    return this.proposals.filter((proposal) => proposal.requestId === requestId)
  }

  getCurrentProposal(requestId: string): BudgetProposal | undefined {
    const proposals = this.getProposalsByRequestId(requestId)
    if (proposals.length === 0) return undefined

    // Return the most recent proposal (assuming the last one in the array is the most recent)
    return proposals[proposals.length - 1]
  }

  createProposal(proposal: Omit<BudgetProposal, "id">): BudgetProposal {
    const newProposal: BudgetProposal = {
      id: generateId(),
      ...proposal,
    }

    this.proposals.push(newProposal)

    // Update request status to negotiating
    this.updateRequestStatus(proposal.requestId, "negotiating")

    return newProposal
  }

  updateProposalStatus(id: string, status: "accepted" | "rejected"): BudgetProposal | undefined {
    const index = this.proposals.findIndex((proposal) => proposal.id === id)
    if (index === -1) return undefined

    this.proposals[index] = {
      ...this.proposals[index],
      status,
    }

    // If proposal is accepted, update request status to accepted
    if (status === "accepted") {
      this.updateRequestStatus(this.proposals[index].requestId, "accepted")
    }

    return this.proposals[index]
  }
}

// Export a singleton instance
export const dataStore = new DataStore()

