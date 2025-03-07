// Simple request service
import { dataStore } from "./dataStore"
import type { CustomerRequest, RequestStatus, BudgetProposal } from "./types"

// Get all requests
export function getAllRequests(): CustomerRequest[] {
  return dataStore.getAllRequests()
}

// Get requests by status
export function getRequestsByStatus(status: RequestStatus): CustomerRequest[] {
  return dataStore.getRequestsByStatus(status)
}

// Get request by ID
export function getRequestById(id: string): CustomerRequest | undefined {
  return dataStore.getRequestById(id)
}

// Accept a request
export function acceptRequest(id: string): CustomerRequest | undefined {
  return dataStore.updateRequestStatus(id, "accepted")
}

// Reject a request
export function rejectRequest(id: string): CustomerRequest | undefined {
  return dataStore.updateRequestStatus(id, "rejected")
}

// Get all requests grouped by status
export function getRequestsByStatusGroup(): {
  pending: CustomerRequest[]
  accepted: CustomerRequest[]
  rejected: CustomerRequest[]
  negotiating: CustomerRequest[]
} {
  return {
    pending: dataStore.getRequestsByStatus("pending"),
    accepted: dataStore.getRequestsByStatus("accepted"),
    rejected: dataStore.getRequestsByStatus("rejected"),
    negotiating: dataStore.getRequestsByStatus("negotiating"),
  }
}

// Get current proposal for a request
export function getCurrentProposal(requestId: string): BudgetProposal | undefined {
  return dataStore.getCurrentProposal(requestId)
}

// Create a new proposal
export function createProposal(
  requestId: string,
  services: { description: string; amount: number }[],
  description: string,
): BudgetProposal {
  const totalAmount = services.reduce((sum, service) => sum + service.amount, 0)

  return dataStore.createProposal({
    requestId,
    services,
    totalAmount,
    description,
    status: "pending",
  })
}

// Accept a proposal
export function acceptProposal(id: string): BudgetProposal | undefined {
  return dataStore.updateProposalStatus(id, "accepted")
}

// Reject a proposal
export function rejectProposal(id: string): BudgetProposal | undefined {
  return dataStore.updateProposalStatus(id, "rejected")
}


