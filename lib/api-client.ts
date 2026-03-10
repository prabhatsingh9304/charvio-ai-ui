import { API_BASE_URL } from "./config"

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    body?: unknown
    cache?: RequestCache
}

export async function apiClient<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const { method = "GET", body, cache = "no-store" } = options

    const url = `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
        method,
        headers: {
            // Only set Content-Type if body is not FormData
            ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        },
        cache,
    }

    if (body) {
        config.body = body instanceof FormData ? body : JSON.stringify(body)
    }

    try {
        const response = await fetch(url, config)

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch from ${endpoint}: ${error.message}`)
        }
        throw new Error(`Failed to fetch from ${endpoint}`)
    }
}
