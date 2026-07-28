import { API_BASE_URL } from "@/constants/api"
import { auth } from "./firebase"

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    body?: unknown
    cache?: RequestCache
}

async function getToken(forceRefresh = false): Promise<string | null> {
    if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken(forceRefresh)
        if (typeof window !== "undefined") {
            localStorage.setItem("auth_token", token)
        }
        return token
    }
    return typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
}

function buildRequest(method: string, token: string | null, body: unknown, cache: RequestCache): RequestInit {
    const config: RequestInit = {
        method,
        headers: {
            ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache,
    }
    if (body) {
        config.body = body instanceof FormData ? body : JSON.stringify(body)
    }
    return config
}

export async function apiClient<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const { method = "GET", body, cache = "no-store" } = options
    const url = `${API_BASE_URL}${endpoint}`

    let token = await getToken()
    let config = buildRequest(method, token, body, cache)

    try {
        let response = await fetch(url, config)

        if (response.status === 401 && auth.currentUser) {
            token = await getToken(true)
            config = buildRequest(method, token, body, cache)
            response = await fetch(url, config)
        }

        if (!response.ok) {
            const errorBody = await response.text()
            console.error(`[API] ${method} ${url} → ${response.status}`, errorBody)
            throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        const text = await response.text()
        return text ? JSON.parse(text) : (null as T)
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch from ${endpoint}: ${error.message}`)
        }
        throw new Error(`Failed to fetch from ${endpoint}`)
    }
}
