"use client"

import { useState, useEffect } from "react"
import { getCreditBalance } from "@/services/credits.service"
import type { CreditBalanceResponse } from "@/types/types"

export function CreditDisplay() {
    const [balance, setBalance] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchBalance() {
            try {
                const data = await getCreditBalance()
                setBalance(data.balance)
            } catch (error) {
                console.error("Failed to fetch credit balance:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchBalance()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-200">
                <div className="w-2 h-2 rounded-full bg-pink-300 animate-pulse" />
                <span className="text-sm text-gray-500">Loading...</span>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200">
            <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472a4.265 4.265 0 01.264-.521z" />
            </svg>
            <span className="text-sm font-semibold text-pink-700">{balance ?? 0} credits</span>
        </div>
    )
}
