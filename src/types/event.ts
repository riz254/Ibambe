import { ApiResponse } from "./api"

// api response for a single event
export type EventResponse = ApiResponse<Event>
// api response for all events
export type EventListResponse = ApiResponse<Event[]>


// event object
export type Event = {
    id: number
    name:string
    location:string
    totalTicketsPurchased: number
    totalTicketsEntered: number
    date: string
    createdAt: string
    updatedAt: string
}

