import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/constants/api"
import type { CreditBalanceResponse, CreditTransactionResponse } from "@/types/types"

export async function getCreditBalance(): Promise<CreditBalanceResponse> {
    return apiClient<CreditBalanceResponse>(`${API_ENDPOINTS.CREDITS}/balance`)
}

export async function getCreditTransactions(
    skip = 0,
    limit = 100
): Promise<CreditTransactionResponse[]> {
    const params = new URLSearchParams({ skip: String(skip), limit: String(limit) })
    return apiClient<CreditTransactionResponse[]>(
        `${API_ENDPOINTS.CREDITS}/transactions?${params}`
    )
}
