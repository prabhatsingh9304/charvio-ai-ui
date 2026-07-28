"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { PUBLIC_PATHS } from "@/constants/app"

type AuthContextValue = {
    user: User | null
    loading: boolean
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true })

export { AuthContext }

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        if (loading) return
        const isPublic = PUBLIC_PATHS.some((p) => pathname?.startsWith(p))
        if (!user && !isPublic) {
            router.replace("/login")
        }
    }, [user, loading, pathname, router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50">
                <div className="animate-pulse text-pink-400 text-lg font-medium">Loading...</div>
            </div>
        )
    }

    const isPublic = PUBLIC_PATHS.some((p) => pathname?.startsWith(p))
    if (!user && !isPublic) {
        return null
    }

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
