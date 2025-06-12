// JWT Authentication utilities
export interface User {
  id: string
  username: string
  role: "admin" | "editor"
  email: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  token?: string
  user?: User
  message?: string
}

// Geçici kullanıcı verileri - gerçek uygulamada veritabanından gelecek
const users: User[] = [
  {
    id: "1",
    username: "admin",
    role: "admin",
    email: "admin@arenabulls.gg",
  },
  {
    id: "2",
    username: "editor",
    role: "editor",
    email: "editor@arenabulls.gg",
  },
]

// Geçici şifreler - gerçek uygulamada hash'lenmiş olacak
const passwords: Record<string, string> = {
  admin: "arenabulls2025",
  editor: "editor2025",
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    // Kullanıcıyı bul
    const user = users.find((u) => u.username === credentials.username)

    if (!user) {
      return {
        success: false,
        message: "Kullanıcı bulunamadı",
      }
    }

    // Şifreyi kontrol et
    if (passwords[credentials.username] !== credentials.password) {
      return {
        success: false,
        message: "Şifre hatalı",
      }
    }

    // JWT token oluştur (gerçek uygulamada JWT library kullanılacak)
    const token = btoa(
      JSON.stringify({
        userId: user.id,
        username: user.username,
        role: user.role,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 saat
      }),
    )

    return {
      success: true,
      token,
      user,
      message: "Giriş başarılı",
    }
  } catch (error) {
    return {
      success: false,
      message: "Giriş sırasında bir hata oluştu",
    }
  }
}

export function logout(): void {
  localStorage.removeItem("authToken")
  localStorage.removeItem("adminLoggedIn")
}

export function getCurrentUser(): User | null {
  try {
    const token = localStorage.getItem("authToken")
    if (!token) return null

    const decoded = JSON.parse(atob(token))

    // Token süresi kontrol et
    if (decoded.exp < Date.now()) {
      logout()
      return null
    }

    return users.find((u) => u.id === decoded.userId) || null
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function hasRole(requiredRole: "admin" | "editor"): boolean {
  const user = getCurrentUser()
  if (!user) return false

  if (requiredRole === "editor") {
    return user.role === "admin" || user.role === "editor"
  }

  return user.role === "admin"
}
