import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/constants/api"
import type { UserProfile, UserUpdate } from "@/types/types"

export async function getCurrentUser(): Promise<UserProfile> {
    return apiClient<UserProfile>(API_ENDPOINTS.USERS_ME)
}

export async function updateCurrentUser(data: UserUpdate): Promise<UserProfile> {
    return apiClient<UserProfile>(API_ENDPOINTS.USERS_ME, {
        method: "PUT",
        body: data,
    })
}
