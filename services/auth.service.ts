import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api"
import type { UserProfile } from "@/types/types"

export async function authenticateWithFirebase(idToken: string): Promise<UserProfile> {
    const url = `${API_BASE_URL}${API_ENDPOINTS.AUTH_FIREBASE}`

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ id_token: idToken }),
    })

    if (!response.ok) {
        const errorBody = await response.text()
        console.error(`[Auth] POST ${url} → ${response.status}`, errorBody)
        throw new Error(`Authentication failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
}
