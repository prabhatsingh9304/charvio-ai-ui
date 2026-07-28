import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/constants/api"
import type {
    PaymentOrderRequest,
    PaymentOrderResponse,
    PaymentVerificationRequest,
    PaymentResponse,
} from "@/types/types"

export async function createPaymentOrder(
    planId: string
): Promise<PaymentOrderResponse> {
    return apiClient<PaymentOrderResponse>(`${API_ENDPOINTS.PAYMENTS}/create-order`, {
        method: "POST",
        body: { plan_id: planId } as PaymentOrderRequest,
    })
}

export async function verifyPayment(
    data: PaymentVerificationRequest
): Promise<Record<string, unknown>> {
    return apiClient<Record<string, unknown>>(`${API_ENDPOINTS.PAYMENTS}/verify`, {
        method: "POST",
        body: data,
    })
}

export async function getPaymentHistory(
    skip = 0,
    limit = 100
): Promise<PaymentResponse[]> {
    const params = new URLSearchParams({ skip: String(skip), limit: String(limit) })
    return apiClient<PaymentResponse[]>(`${API_ENDPOINTS.PAYMENTS}/history?${params}`)
}
