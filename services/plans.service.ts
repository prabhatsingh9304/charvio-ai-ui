import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/constants/api"
import type { PlanResponse } from "@/types/types"

export async function getPlans(): Promise<PlanResponse[]> {
    return apiClient<PlanResponse[]>(API_ENDPOINTS.PLANS)
}
