"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, User, Home } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Basit admin kontrolü - gerçek uygulamada JWT token kullanılmalı
    if (username === "admin" && password === "arenabulls2025") {
      localStorage.setItem("adminLoggedIn", "true")
      router.push("/admin/dashboard")
    } else {
      setError("Kullanıcı adı veya şifre hatalı!")
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Ana Sayfa Linki */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <Home className="h-5 w-5" />
        <span>Ana Sayfa</span>
      </Link>

      <Card className="w-full max-w-md bg-[#111111] border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 bg-[#0099ff] rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Admin Girişi</CardTitle>
          <CardDescription className="text-gray-400">İçerik yönetimi için giriş yapın</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Kullanıcı Adı</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Kullanıcı adınızı girin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-black/50 border-gray-700 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-black/50 border-gray-700 text-white"
                  required
                />
              </div>
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <Button type="submit" className="w-full bg-[#0099ff] hover:bg-[#0099ff]/80">
              Giriş Yap
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">Demo: admin / arenabulls2025</div>
        </CardContent>
      </Card>
    </div>
  )
}
