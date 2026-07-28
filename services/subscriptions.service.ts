import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/constants/api"
import type { SubscriptionCreateRequest, AutoRenewRequest } from "@/types/types"

export async function createSubscription(
    data: SubscriptionCreateRequest
): Promise<Record<string, unknown>> {
    return apiClient<Record<string, unknown>>(API_ENDPOINTS.SUBSCRIPTIONS, {
        method: "POST",
        body: data,
    })
}

export async function getCurrentSubscription(): Promise<Record<string, unknown>> {
    return apiClient<Record<string, unknown>>(`${API_ENDPOINTS.SUBSCRIPTIONS}/current`)
}

export async function cancelSubscription(): Promise<Record<string, unknown>> {
    return apiClient<Record<string, unknown>>(`${API_ENDPOINTS.SUBSCRIPTIONS}/cancel`, {
        method: "POST",
    })
}

export async function setAutoRenew(
    autoRenew: boolean
): Promise<Record<string, unknown>> {
    return apiClient<Record<string, unknown>>(`${API_ENDPOINTS.SUBSCRIPTIONS}/auto-renew`, {
        method: "POST",
        body: { auto_renew: autoRenew } as AutoRenewRequest,
    })
}
