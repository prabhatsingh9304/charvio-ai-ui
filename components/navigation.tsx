"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import { CreateCharacterDialog } from "@/app/characters/components/create-character-dialog"
import { CreateSceneDialog } from "@/app/scenes/components/create-scene-dialog"
import { Logo } from "./navigation/Logo"
import { DesktopNav } from "./navigation/DesktopNav"
import { ProfileMenu } from "./navigation/ProfileMenu"
import { MobileHamburger } from "./navigation/MobileHamburger"
import { MobileMenu } from "./navigation/MobileMenu"
import { CreditDisplay } from "./navigation/CreditDisplay"

export function Navigation() {
    const pathname = usePathname()
    const router = useRouter()
    const { user } = useAuth()
    const [isCharacterOpen, setIsCharacterOpen] = useState(false)
    const [isSceneOpen, setIsSceneOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut(auth)
        localStorage.removeItem("auth_token")
        router.replace("/login")
    }

    if (pathname?.startsWith("/chat") || pathname?.startsWith("/login")) {
        return null
    }

    const handleNavClick = (path: string) => {
        router.push(path)
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <nav className="sticky top-0 z-40 w-full border-b border-pink-200/50 bg-white/80 backdrop-blur-lg transition-all duration-300">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Logo onNavigate={handleNavClick} />
                        <DesktopNav 
                            onOpenCharacter={() => setIsCharacterOpen(true)}
                            onOpenScene={() => setIsSceneOpen(true)}
                        />
                        <div className="flex items-center gap-2">
                            {user && <CreditDisplay />}
                            {user && <ProfileMenu user={user} onSignOut={handleSignOut} />}
                            <MobileHamburger 
                                isOpen={isMobileMenuOpen}
                                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            />
                        </div>
                    </div>
                </div>
                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    onNavigate={handleNavClick}
                    onOpenCharacter={() => { setIsCharacterOpen(true); setIsMobileMenuOpen(false) }}
                    onOpenScene={() => { setIsSceneOpen(true); setIsMobileMenuOpen(false) }}
                />
            </nav>

            <CreateCharacterDialog
                isOpen={isCharacterOpen}
                onClose={() => setIsCharacterOpen(false)}
            />

            <CreateSceneDialog
                isOpen={isSceneOpen}
                onClose={() => setIsSceneOpen(false)}
            />
        </>
    )
}
