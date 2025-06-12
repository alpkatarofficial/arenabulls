// Progressive database configuration - starts simple, scales up
export interface DatabaseConfig {
  type: "local" | "vercel-postgres" | "mongodb" | "memory"
  connectionString?: string
}

// Environment-based configuration - Fixed for client/server separation
export const getDatabaseConfig = (): DatabaseConfig => {
  // Production environment check
  if (process.env.NODE_ENV === "production") {
    console.log("🌐 Running in production environment")
    // In production, always use memory storage on server-side
    if (typeof window === "undefined") {
      return {
        type: "memory",
      }
    }
  }

  // Client-side always uses local storage
  if (typeof window !== "undefined") {
    return {
      type: "local",
    }
  }

  // Server-side: Use Vercel Postgres if available
  if (process.env.POSTGRES_URL) {
    return {
      type: "vercel-postgres",
      connectionString: process.env.POSTGRES_URL,
    }
  }

  // Server-side fallback: Use memory storage
  return {
    type: "memory",
  }
}

// Database schemas
export interface NewsSchema {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  category: "haber" | "duyuru" | "transfer" | "etkinlik" | "sponsorluk"
  date: string
  slug: string
  featured: boolean
  author: string
  createdAt: Date
  updatedAt: Date
}

export interface BlogSchema {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  category: "analiz" | "strateji" | "röportaj" | "rehber" | "teknoloji" | "sektör"
  date: string
  slug: string
  featured: boolean
  author: string
  readTime: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface UserSchema {
  id: string
  username: string
  email: string
  password: string // hashed
  role: "admin" | "editor"
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
}

// localStorage keys
const NEWS_STORAGE_KEY = "arenabulls_news"
const BLOG_STORAGE_KEY = "arenabulls_blog"
const MATCHES_STORAGE_KEY = "arenabulls_matches"

// Storage helpers - Optimized to reduce localStorage calls
const isClient = () => typeof window !== "undefined"

// Cache flags to prevent unnecessary localStorage reads
let newsLoaded = false
let blogsLoaded = false

const loadNewsFromStorage = (key: string, defaultData: NewsSchema[]): NewsSchema[] => {
  if (!isClient()) return defaultData
  try {
    const stored = localStorage.getItem(key)
    if (!stored) return defaultData
    const parsed = JSON.parse(stored)
    console.log(`📖 Loaded ${parsed.length} news items from localStorage`)
    return parsed
  } catch (error) {
    console.error(`❌ Error loading from storage (${key}):`, error)
    return defaultData
  }
}

const loadBlogsFromStorage = (key: string, defaultData: BlogSchema[]): BlogSchema[] => {
  if (!isClient()) return defaultData
  try {
    const stored = localStorage.getItem(key)
    if (!stored) return defaultData
    const parsed = JSON.parse(stored)
    console.log(`📖 Loaded ${parsed.length} blog items from localStorage`)
    return parsed
  } catch (error) {
    console.error(`❌ Error loading from storage (${key}):`, error)
    return defaultData
  }
}

const saveNewsToStorage = (key: string, data: NewsSchema[]): void => {
  if (!isClient()) {
    console.warn("⚠️ Cannot save to localStorage on server side")
    return
  }
  try {
    localStorage.setItem(key, JSON.stringify(data))
    console.log(`💾 Saved ${data.length} news items to localStorage`)
  } catch (error) {
    console.error(`❌ Error saving to storage (${key}):`, error)
  }
}

const saveBlogsToStorage = (key: string, data: BlogSchema[]): void => {
  if (!isClient()) {
    console.warn("⚠️ Cannot save to localStorage on server side")
    return
  }
  try {
    localStorage.setItem(key, JSON.stringify(data))
    console.log(`💾 Saved ${data.length} blog items to localStorage`)
  } catch (error) {
    console.error(`❌ Error saving to storage (${key}):`, error)
  }
}

// Sample data - Expanded with more content including the missing news
const sampleNewsData: NewsSchema[] = [
  {
    id: "news-future-festival",
    title: "Future Festival 2025 Duyurusu",
    content:
      "Arena Bulls olarak Future Festival 2025'te yer alacağız! Bu büyük etkinlikte esports dünyasının en önemli isimleri bir araya gelecek. Takımımız bu prestijli festivalde Türkiye'yi temsil edecek ve en iyi performansını sergileyecek. Festival boyunca çeşitli turnuvalar, paneller ve etkinlikler düzenlenecek.",
    excerpt: "Arena Bulls Future Festival 2025'te Türkiye'yi temsil edecek",
    image: "/placeholder.svg?height=400&width=600&text=Future+Festival+2025",
    category: "etkinlik",
    date: "2024-01-20",
    slug: "future-festival-2025-4412",
    featured: true,
    author: "Arena Bulls Medya",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "news-1",
    title: "Arena Bulls Yeni Sezona Hazır",
    content:
      "Arena Bulls esports takımı yeni sezon için hazırlıklarını tamamladı. Güçlü kadromuzla birlikte bu sezon da başarılı olmaya devam edeceğiz. Takımımız yoğun antrenmanlar ve strateji çalışmaları ile sezona damga vurmaya hazırlanıyor.",
    excerpt: "Takımımız yeni sezon için güçlü kadrosuyla hazır",
    image: "/placeholder.svg?height=400&width=600&text=Arena+Bulls+Season",
    category: "haber",
    date: "2024-01-15",
    slug: "arena-bulls-yeni-sezona-hazir",
    featured: true,
    author: "Arena Bulls Medya",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "news-2",
    title: "Yeni Transfer: Phantom Takıma Katıldı",
    content:
      "Valorant takımımıza yeni katılan Phantom ile birlikte kadromuz daha da güçlendi. Phantom'ın deneyimi ve yetenekleri ile takımımızın başarısına katkı sağlayacağına inanıyoruz.",
    excerpt: "Valorant takımımıza yeni oyuncu Phantom katıldı",
    image: "/placeholder.svg?height=400&width=600&text=Phantom+Transfer",
    category: "transfer",
    date: "2024-01-12",
    slug: "yeni-transfer-phantom-takima-katildi",
    featured: false,
    author: "Arena Bulls Medya",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "news-3",
    title: "Razer ile Sponsorluk Anlaşması İmzalandı",
    content:
      "Arena Bulls olarak Razer ile önemli bir sponsorluk anlaşması imzaladık. Bu anlaşma ile oyuncularımız en son teknoloji gaming ekipmanları kullanacak ve performanslarını artıracaklar.",
    excerpt: "Razer ile stratejik sponsorluk ortaklığı başladı",
    image: "/placeholder.svg?height=400&width=600&text=Razer+Partnership",
    category: "sponsorluk",
    date: "2024-01-10",
    slug: "razer-ile-sponsorluk-anlasmasi",
    featured: true,
    author: "Arena Bulls Medya",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "news-4",
    title: "Arena Bulls Cup 2024 Duyurusu",
    content:
      "Bu yıl düzenleyeceğimiz Arena Bulls Cup 2024 turnuvası için kayıtlar başladı. Türkiye'nin en büyük esports turnuvalarından biri olacak bu etkinlikte 100.000 TL ödül havuzu bulunuyor.",
    excerpt: "100.000 TL ödüllü turnuva kayıtları başladı",
    image: "/placeholder.svg?height=400&width=600&text=Arena+Bulls+Cup",
    category: "etkinlik",
    date: "2024-01-08",
    slug: "arena-bulls-cup-2024-duyurusu",
    featured: true,
    author: "Arena Bulls Medya",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "news-5",
    title: "League of Legends Takımı Şampiyonlukta",
    content:
      "League of Legends takımımız Turkish Championship League'de şampiyonluk elde etti. Furiouss ve ekibinin mükemmel performansı ile kazanılan bu başarı takımımızın gururudur.",
    excerpt: "LoL takımımız TCL şampiyonu oldu",
    image: "/placeholder.svg?height=400&width=600&text=LoL+Championship",
    category: "haber",
    date: "2024-01-05",
    slug: "lol-takimi-sampiyonlukta",
    featured: false,
    author: "Arena Bulls Medya",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "news-6",
    title: "Yeni Antrenman Merkezi Açılıyor",
    content:
      "Arena Bulls'un yeni antrenman merkezi İstanbul'da açılıyor. 500 metrekarelik modern tesisimizde oyuncularımız en iyi koşullarda antrenman yapabilecekler.",
    excerpt: "İstanbul'da modern antrenman merkezi açılıyor",
    image: "/placeholder.svg?height=400&width=600&text=Training+Center",
    category: "duyuru",
    date: "2024-01-03",
    slug: "yeni-antrenman-merkezi-aciliyor",
    featured: false,
    author: "Arena Bulls Medya",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "news-7",
    title: "CS2 Takımı Avrupa Finallerinde",
    content:
      "Counter-Strike 2 takımımız European Masters turnuvasında finale kaldı. Striker'ın liderliğindeki takımımız Avrupa'nın en iyi takımları ile mücadele edecek.",
    excerpt: "CS2 takımımız Avrupa finallerinde mücadele edecek",
    image: "/placeholder.svg?height=400&width=600&text=CS2+Finals",
    category: "haber",
    date: "2024-01-01",
    slug: "cs2-takimi-avrupa-finallerinde",
    featured: false,
    author: "Arena Bulls Medya",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "news-8",
    title: "MSI ile Teknoloji Ortaklığı",
    content:
      "MSI ile imzaladığımız teknoloji ortaklığı anlaşması ile oyuncularımız en son teknoloji bilgisayarlar ve ekipmanlar kullanacak. Bu ortaklık performansımızı artıracak.",
    excerpt: "MSI ile teknoloji ortaklığı anlaşması imzalandı",
    image: "/placeholder.svg?height=400&width=600&text=MSI+Partnership",
    category: "sponsorluk",
    date: "2023-12-28",
    slug: "msi-ile-teknoloji-ortakligi",
    featured: false,
    author: "Arena Bulls Medya",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const sampleBlogData: BlogSchema[] = [
  {
    id: "blog-1",
    title: "2024 Esports Meta Analizi: Valorant",
    content:
      "2024 yılında Valorant meta'sında yaşanan değişiklikleri analiz ediyoruz. Agent seçimleri, map stratejileri ve takım kompozisyonlarındaki yenilikler detaylı olarak inceleniyor. Phantom ve Vandal kullanım oranları, ekonomi yönetimi ve clutch durumlarında başarı faktörleri ele alınıyor.",
    excerpt: "Valorant 2024 meta değişiklikleri ve strateji analizleri",
    image: "/placeholder.svg?height=400&width=600&text=Valorant+Meta+2024",
    category: "analiz",
    date: "2024-01-14",
    slug: "2024-esports-meta-analizi-valorant",
    featured: true,
    author: "Arena Bulls Analiz Ekibi",
    readTime: 12,
    tags: ["valorant", "meta", "analiz", "strateji"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "blog-2",
    title: "Oyuncu Röportajı: Furiouss ile Özel Söyleşi",
    content:
      "Takımımızın yıldız oyuncusu Furiouss ile esports kariyeri, başarı hikayeleri ve gelecek hedefleri hakkında özel bir röportaj gerçekleştirdik. League of Legends dünyasındaki deneyimleri ve genç oyunculara tavsiyeleri.",
    excerpt: "Furiouss ile esports kariyeri ve başarı hikayeleri",
    image: "/placeholder.svg?height=400&width=600&text=Furiouss+Interview",
    category: "röportaj",
    date: "2024-01-11",
    slug: "oyuncu-roportaji-furiouss-ozel-soylesi",
    featured: true,
    author: "Arena Bulls Medya",
    readTime: 8,
    tags: ["röportaj", "furiouss", "lol", "oyuncu"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "blog-3",
    title: "Counter-Strike 2: Yeni Başlayanlar İçin Rehber",
    content:
      "Counter-Strike 2'ye yeni başlayanlar için kapsamlı rehber. Temel mekanikler, silah seçimleri, map bilgisi ve takım oyunu stratejileri. Aim antrenmanı, crosshair ayarları ve oyun içi ekonomi yönetimi konularında detaylı bilgiler.",
    excerpt: "CS2'ye yeni başlayanlar için kapsamlı başlangıç rehberi",
    image: "/placeholder.svg?height=400&width=600&text=CS2+Beginner+Guide",
    category: "rehber",
    date: "2024-01-09",
    slug: "counter-strike-2-yeni-baslayanlar-rehber",
    featured: false,
    author: "Arena Bulls Eğitim Ekibi",
    readTime: 15,
    tags: ["cs2", "rehber", "başlangıç", "strateji"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "blog-4",
    title: "Esports Teknolojisinin Geleceği",
    content:
      "Esports dünyasında teknolojinin rolü ve gelecekteki gelişmeler. VR esports, AI destekli antrenman sistemleri, 5G teknolojisinin esports'a etkisi ve cloud gaming'in yarışmalardaki yeri inceleniyor.",
    excerpt: "Esports teknolojisindeki yenilikler ve gelecek trendleri",
    image: "/placeholder.svg?height=400&width=600&text=Esports+Technology",
    category: "teknoloji",
    date: "2024-01-07",
    slug: "esports-teknolojisinin-gelecegi",
    featured: true,
    author: "Arena Bulls Teknoloji Ekibi",
    readTime: 10,
    tags: ["teknoloji", "gelecek", "vr", "ai"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "blog-5",
    title: "League of Legends: Jungle Pozisyonu Stratejileri",
    content:
      "LoL'de jungle pozisyonunun önemi ve etkili jungle stratejileri. Gank timing'i, objective kontrolü, ward yerleştirme ve takım savaşlarındaki rol. Meta jungle champion'ları ve build önerileri detaylı olarak açıklanıyor.",
    excerpt: "LoL jungle pozisyonu için profesyonel strateji rehberi",
    image: "/placeholder.svg?height=400&width=600&text=LoL+Jungle+Guide",
    category: "strateji",
    date: "2024-01-06",
    slug: "lol-jungle-pozisyonu-stratejileri",
    featured: false,
    author: "Arena Bulls Strateji Ekibi",
    readTime: 11,
    tags: ["lol", "jungle", "strateji", "rehber"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "blog-6",
    title: "Esports Sektörü 2024 Raporu",
    content:
      "2024 yılında esports sektörünün durumu, büyüme oranları ve gelecek projeksiyonları. Türkiye esports pazarının analizi, yatırım trendleri ve sektördeki fırsatlar detaylı olarak inceleniyor.",
    excerpt: "2024 esports sektör analizi ve Türkiye pazarı raporu",
    image: "/placeholder.svg?height=400&width=600&text=Esports+Industry+2024",
    category: "sektör",
    date: "2024-01-04",
    slug: "esports-sektoru-2024-raporu",
    featured: true,
    author: "Arena Bulls Araştırma Ekibi",
    readTime: 13,
    tags: ["sektör", "analiz", "2024", "türkiye"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "blog-7",
    title: "Phantom ile Röportaj: Valorant Dünyasında Yükseliş",
    content:
      "Yeni transferimiz Phantom ile Valorant kariyeri, takım dinamikleri ve Arena Bulls'a katılma süreci hakkında özel röportaj. Profesyonel esports oyuncusu olma yolculuğu ve tavsiyeleri.",
    excerpt: "Phantom ile Valorant kariyeri ve Arena Bulls deneyimi",
    image: "/placeholder.svg?height=400&width=600&text=Phantom+Interview",
    category: "röportaj",
    date: "2024-01-02",
    slug: "phantom-roportaj-valorant-yukselis",
    featured: false,
    author: "Arena Bulls Medya",
    readTime: 7,
    tags: ["phantom", "röportaj", "valorant", "transfer"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "blog-8",
    title: "Gaming Setup Rehberi: Profesyonel Oyuncu Ekipmanları",
    content:
      "Profesyonel esports oyuncuları için ideal gaming setup rehberi. Mouse, klavye, kulaklık, monitor seçimi ve masa düzeni önerileri. Ergonomi, performans ve bütçe faktörleri göz önünde bulundurularak hazırlanmış kapsamlı rehber.",
    excerpt: "Profesyonel gaming setup için ekipman seçimi rehberi",
    image: "/placeholder.svg?height=400&width=600&text=Gaming+Setup+Guide",
    category: "rehber",
    date: "2023-12-30",
    slug: "gaming-setup-rehberi-profesyonel-ekipmanlar",
    featured: false,
    author: "Arena Bulls Ekipman Ekibi",
    readTime: 9,
    tags: ["setup", "ekipman", "rehber", "gaming"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "blog-9",
    title: "Esports Psikolojisi: Zihinsel Performans Artırma",
    content:
      "Esports'ta zihinsel performansın önemi ve geliştirme yöntemleri. Stres yönetimi, konsantrasyon teknikleri, takım iletişimi ve rekabet psikolojisi konularında uzman görüşleri ve pratik öneriler.",
    excerpt: "Esports'ta zihinsel performans ve psikolojik hazırlık",
    image: "/placeholder.svg?height=400&width=600&text=Esports+Psychology",
    category: "analiz",
    date: "2023-12-27",
    slug: "esports-psikolojisi-zihinsel-performans",
    featured: false,
    author: "Arena Bulls Performans Ekibi",
    readTime: 14,
    tags: ["psikoloji", "performans", "zihinsel", "antrenman"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// In-memory storage - Global storage for server-side access
let globalNewsStorage: NewsSchema[] = []
let globalBlogStorage: BlogSchema[] = []

// Initialize global storage with sample data
const initializeGlobalStorage = () => {
  if (globalNewsStorage.length === 0) {
    globalNewsStorage = [...sampleNewsData]
    console.log(`🌐 Global news storage initialized with ${globalNewsStorage.length} items`)
  }
  if (globalBlogStorage.length === 0) {
    globalBlogStorage = [...sampleBlogData]
    console.log(`🌐 Global blog storage initialized with ${globalBlogStorage.length} items`)
  }
}

// Initialize immediately
initializeGlobalStorage()

// In-memory storage - only load from localStorage once
let newsStorage: NewsSchema[] = []
let blogStorage: BlogSchema[] = []

const userStorage: UserSchema[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@arenabulls.gg",
    password: "arenabulls2025", // In production, this should be hashed
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Initialize data only once
const initializeNewsData = () => {
  if (!newsLoaded && isClient()) {
    newsStorage = loadNewsFromStorage(NEWS_STORAGE_KEY, sampleNewsData)
    // Sync with global storage
    globalNewsStorage = [...newsStorage]
    newsLoaded = true
    console.log(`📰 Client-side news initialized with ${newsStorage.length} items`)
  } else if (!newsLoaded && !isClient()) {
    // Server-side initialization - use global storage
    newsStorage = [...globalNewsStorage]
    newsLoaded = true
    console.log(`📰 Server-side news initialized with ${newsStorage.length} items`)
    console.log(`📰 Available news slugs: ${newsStorage.map((n) => n.slug).join(", ")}`)
  }
}

const initializeBlogData = () => {
  if (!blogsLoaded && isClient()) {
    blogStorage = loadBlogsFromStorage(BLOG_STORAGE_KEY, sampleBlogData)
    // Sync with global storage
    globalBlogStorage = [...blogStorage]
    blogsLoaded = true
    console.log(`📝 Client-side blogs initialized with ${blogStorage.length} items`)
  } else if (!blogsLoaded && !isClient()) {
    // Server-side initialization - use global storage
    blogStorage = [...globalBlogStorage]
    blogsLoaded = true
    console.log(`📝 Server-side blogs initialized with ${blogStorage.length} items`)
    console.log(`📝 Available blog slugs: ${blogStorage.map((b) => b.slug).join(", ")}`)
  }
}

// Database operations with optimized caching
export class DatabaseService {
  private static config = getDatabaseConfig()

  // News operations
  static async getAllNews(): Promise<NewsSchema[]> {
    console.log(`🔧 Database config type: ${this.config.type}`)

    if (this.config.type === "vercel-postgres") {
      return this.getNewsFromPostgres()
    } else if (this.config.type === "memory") {
      // Use global storage for server-side
      if (!newsLoaded) {
        initializeNewsData()
      }
      console.log(`📰 Returning ${globalNewsStorage.length} news items from global storage`)
      return [...globalNewsStorage].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    // Only load from localStorage if not already loaded
    initializeNewsData()
    console.log(`📰 Returning ${newsStorage.length} news items from localStorage`)

    return [...newsStorage].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  static async getNewsById(id: string): Promise<NewsSchema | null> {
    if (this.config.type === "vercel-postgres") {
      return this.getNewsFromPostgresById(id)
    } else if (this.config.type === "memory") {
      if (!newsLoaded) {
        initializeNewsData()
      }
      return globalNewsStorage.find((news) => news.id === id) || null
    }

    initializeNewsData()
    return newsStorage.find((news) => news.id === id) || null
  }

  static async getNewsBySlug(slug: string): Promise<NewsSchema | null> {
    console.log(`🔍 Looking for news with slug: ${slug}, config type: ${this.config.type}`)

    if (this.config.type === "vercel-postgres") {
      return this.getNewsFromPostgresBySlug(slug)
    } else if (this.config.type === "memory") {
      if (!newsLoaded) {
        initializeNewsData()
      }
      console.log(`📰 Available slugs in global storage: ${globalNewsStorage.map((n) => n.slug).join(", ")}`)
      const foundNews = globalNewsStorage.find((news) => news.slug === slug)
      console.log(`🔍 Global storage - News with slug ${slug}: ${foundNews ? "found" : "not found"}`)
      return foundNews || null
    }

    initializeNewsData()
    console.log(`📰 Available slugs in localStorage: ${newsStorage.map((n) => n.slug).join(", ")}`)
    const foundNews = newsStorage.find((news) => news.slug === slug)
    console.log(`🔍 Local storage - News with slug ${slug}: ${foundNews ? "found" : "not found"}`)
    return foundNews || null
  }

  static async getFeaturedNews(): Promise<NewsSchema[]> {
    if (this.config.type === "vercel-postgres") {
      return this.getFeaturedNewsFromPostgres()
    }

    initializeNewsData()
    const storage = this.config.type === "memory" ? globalNewsStorage : newsStorage
    return storage.filter((news) => news.featured).slice(0, 6)
  }

  static async createNews(news: Omit<NewsSchema, "id" | "createdAt" | "updatedAt">): Promise<NewsSchema> {
    console.log("🔄 Creating news:", news.title)

    const newNews: NewsSchema = {
      ...news,
      id: `news-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    if (this.config.type === "vercel-postgres") {
      return this.createNewsInPostgres(newNews)
    }

    initializeNewsData()

    // Add to both storages
    if (this.config.type === "memory") {
      globalNewsStorage.unshift(newNews)
    } else {
      newsStorage.unshift(newNews)
      globalNewsStorage.unshift(newNews) // Sync with global storage
    }

    if (isClient()) {
      saveNewsToStorage(NEWS_STORAGE_KEY, newsStorage.length > 0 ? newsStorage : globalNewsStorage)
      console.log("✅ News created successfully:", newNews.title)
    }

    return newNews
  }

  static async updateNews(id: string, updates: Partial<NewsSchema>): Promise<NewsSchema | null> {
    console.log("🔄 Updating news:", id)

    if (this.config.type === "vercel-postgres") {
      return this.updateNewsInPostgres(id, updates)
    }

    initializeNewsData()

    // Update in both storages
    const storage = this.config.type === "memory" ? globalNewsStorage : newsStorage
    const index = storage.findIndex((news) => news.id === id)
    if (index === -1) {
      console.log("❌ News not found for update:", id)
      return null
    }

    storage[index] = {
      ...storage[index],
      ...updates,
      updatedAt: new Date(),
    }

    // Sync with global storage if using local storage
    if (this.config.type === "local") {
      const globalIndex = globalNewsStorage.findIndex((news) => news.id === id)
      if (globalIndex !== -1) {
        globalNewsStorage[globalIndex] = storage[index]
      }
    }

    if (isClient()) {
      saveNewsToStorage(NEWS_STORAGE_KEY, storage)
      console.log("✅ News updated successfully:", id)
    }

    return storage[index]
  }

  static async deleteNews(id: string): Promise<boolean> {
    console.log("🗑️ Deleting news:", id)

    if (this.config.type === "vercel-postgres") {
      return this.deleteNewsFromPostgres(id)
    }

    initializeNewsData()

    // Delete from both storages
    const storage = this.config.type === "memory" ? globalNewsStorage : newsStorage
    const index = storage.findIndex((news) => news.id === id)
    if (index === -1) {
      console.log("❌ News not found for deletion:", id)
      return false
    }

    storage.splice(index, 1)

    // Sync with global storage if using local storage
    if (this.config.type === "local") {
      const globalIndex = globalNewsStorage.findIndex((news) => news.id === id)
      if (globalIndex !== -1) {
        globalNewsStorage.splice(globalIndex, 1)
      }
    }

    if (isClient()) {
      saveNewsToStorage(NEWS_STORAGE_KEY, storage)
      console.log("✅ News deleted successfully:", id)
    }

    return true
  }

  // Blog operations
  static async getAllBlogs(): Promise<BlogSchema[]> {
    if (this.config.type === "vercel-postgres") {
      return this.getBlogsFromPostgres()
    } else if (this.config.type === "memory") {
      if (!blogsLoaded) {
        initializeBlogData()
      }
      return [...globalBlogStorage].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    initializeBlogData()
    return [...blogStorage].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  static async getBlogById(id: string): Promise<BlogSchema | null> {
    if (this.config.type === "vercel-postgres") {
      return this.getBlogFromPostgresById(id)
    } else if (this.config.type === "memory") {
      if (!blogsLoaded) {
        initializeBlogData()
      }
      return globalBlogStorage.find((blog) => blog.id === id) || null
    }

    initializeBlogData()
    return blogStorage.find((blog) => blog.id === id) || null
  }

  static async getBlogBySlug(slug: string): Promise<BlogSchema | null> {
    console.log(`🔍 Looking for blog with slug: ${slug}, config type: ${this.config.type}`)

    if (this.config.type === "vercel-postgres") {
      return this.getBlogFromPostgresBySlug(slug)
    } else if (this.config.type === "memory") {
      if (!blogsLoaded) {
        initializeBlogData()
      }
      console.log(`📝 Available blog slugs in global storage: ${globalBlogStorage.map((b) => b.slug).join(", ")}`)
      const foundBlog = globalBlogStorage.find((blog) => blog.slug === slug)
      console.log(`🔍 Global storage - Blog with slug ${slug}: ${foundBlog ? "found" : "not found"}`)
      return foundBlog || null
    }

    initializeBlogData()
    console.log(`📝 Available blog slugs in localStorage: ${blogStorage.map((b) => b.slug).join(", ")}`)
    const foundBlog = blogStorage.find((blog) => blog.slug === slug)
    console.log(`🔍 Local storage - Blog with slug ${slug}: ${foundBlog ? "found" : "not found"}`)
    return foundBlog || null
  }

  static async getFeaturedBlogs(): Promise<BlogSchema[]> {
    if (this.config.type === "vercel-postgres") {
      return this.getFeaturedBlogsFromPostgres()
    }

    initializeBlogData()
    const storage = this.config.type === "memory" ? globalBlogStorage : blogStorage
    return storage.filter((blog) => blog.featured).slice(0, 6)
  }

  static async createBlog(blog: Omit<BlogSchema, "id" | "createdAt" | "updatedAt">): Promise<BlogSchema> {
    console.log("🔄 Creating blog:", blog.title)

    const newBlog: BlogSchema = {
      ...blog,
      id: `blog-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    if (this.config.type === "vercel-postgres") {
      return this.createBlogInPostgres(newBlog)
    }

    initializeBlogData()

    // Add to both storages
    if (this.config.type === "memory") {
      globalBlogStorage.unshift(newBlog)
    } else {
      blogStorage.unshift(newBlog)
      globalBlogStorage.unshift(newBlog) // Sync with global storage
    }

    if (isClient()) {
      saveBlogsToStorage(BLOG_STORAGE_KEY, blogStorage.length > 0 ? blogStorage : globalBlogStorage)
      console.log("✅ Blog created successfully:", newBlog.title)
    }

    return newBlog
  }

  static async updateBlog(id: string, updates: Partial<BlogSchema>): Promise<BlogSchema | null> {
    console.log("🔄 Updating blog:", id)

    if (this.config.type === "vercel-postgres") {
      return this.updateBlogInPostgres(id, updates)
    }

    initializeBlogData()

    // Update in both storages
    const storage = this.config.type === "memory" ? globalBlogStorage : blogStorage
    const index = storage.findIndex((blog) => blog.id === id)
    if (index === -1) {
      console.log("❌ Blog not found for update:", id)
      return null
    }

    storage[index] = {
      ...storage[index],
      ...updates,
      updatedAt: new Date(),
    }

    // Sync with global storage if using local storage
    if (this.config.type === "local") {
      const globalIndex = globalBlogStorage.findIndex((blog) => blog.id === id)
      if (globalIndex !== -1) {
        globalBlogStorage[globalIndex] = storage[index]
      }
    }

    if (isClient()) {
      saveBlogsToStorage(BLOG_STORAGE_KEY, storage)
      console.log("✅ Blog updated successfully:", id)
    }

    return storage[index]
  }

  static async deleteBlog(id: string): Promise<boolean> {
    console.log("🗑️ Deleting blog:", id)

    if (this.config.type === "vercel-postgres") {
      return this.deleteBlogFromPostgres(id)
    }

    initializeBlogData()

    // Delete from both storages
    const storage = this.config.type === "memory" ? globalBlogStorage : blogStorage
    const index = storage.findIndex((blog) => blog.id === id)
    if (index === -1) {
      console.log("❌ Blog not found for deletion:", id)
      return false
    }

    storage.splice(index, 1)

    // Sync with global storage if using local storage
    if (this.config.type === "local") {
      const globalIndex = globalBlogStorage.findIndex((blog) => blog.id === id)
      if (globalIndex !== -1) {
        globalBlogStorage.splice(globalIndex, 1)
      }
    }

    if (isClient()) {
      saveBlogsToStorage(BLOG_STORAGE_KEY, storage)
      console.log("✅ Blog deleted successfully:", id)
    }

    return true
  }

  // User operations
  static async getUserByUsername(username: string): Promise<UserSchema | null> {
    if (this.config.type === "vercel-postgres") {
      return this.getUserFromPostgres(username)
    }

    return userStorage.find((user) => user.username === username) || null
  }

  static async validateUser(username: string, password: string): Promise<UserSchema | null> {
    if (this.config.type === "vercel-postgres") {
      return this.validateUserInPostgres(username, password)
    }

    const user = userStorage.find((user) => user.username === username && user.password === password)
    if (user) {
      user.lastLogin = new Date()
    }
    return user || null
  }

  // Force refresh data from localStorage (for admin panel)
  static forceRefreshNews(): void {
    if (isClient()) {
      newsLoaded = false
      initializeNewsData()
    }
  }

  static forceRefreshBlogs(): void {
    if (isClient()) {
      blogsLoaded = false
      initializeBlogData()
    }
  }

  // Sync localStorage with global storage (for admin panel)
  static syncWithGlobalStorage(): void {
    if (isClient()) {
      // Load from localStorage and sync with global storage
      const localNews = loadNewsFromStorage(NEWS_STORAGE_KEY, [])
      const localBlogs = loadBlogsFromStorage(BLOG_STORAGE_KEY, [])

      if (localNews.length > 0) {
        globalNewsStorage = [...localNews]
        console.log("🔄 Synced news with global storage")
      }

      if (localBlogs.length > 0) {
        globalBlogStorage = [...localBlogs]
        console.log("🔄 Synced blogs with global storage")
      }
    }
  }

  // Future Postgres implementations (stubs for now)
  private static async getNewsFromPostgres(): Promise<NewsSchema[]> {
    console.log("Using Postgres for news (not implemented yet)")
    return []
  }

  private static async getNewsFromPostgresById(id: string): Promise<NewsSchema | null> {
    console.log("Using Postgres for news by ID (not implemented yet)")
    return null
  }

  private static async getNewsFromPostgresBySlug(slug: string): Promise<NewsSchema | null> {
    console.log("Using Postgres for news by slug (not implemented yet)")
    return null
  }

  private static async getFeaturedNewsFromPostgres(): Promise<NewsSchema[]> {
    console.log("Using Postgres for featured news (not implemented yet)")
    return []
  }

  private static async createNewsInPostgres(news: NewsSchema): Promise<NewsSchema> {
    console.log("Creating news in Postgres (not implemented yet)")
    return news
  }

  private static async updateNewsInPostgres(id: string, updates: Partial<NewsSchema>): Promise<NewsSchema | null> {
    console.log("Updating news in Postgres (not implemented yet)")
    return null
  }

  private static async deleteNewsFromPostgres(id: string): Promise<boolean> {
    console.log("Deleting news from Postgres (not implemented yet)")
    return false
  }

  private static async getBlogsFromPostgres(): Promise<BlogSchema[]> {
    console.log("Using Postgres for blogs (not implemented yet)")
    return []
  }

  private static async getBlogFromPostgresById(id: string): Promise<BlogSchema | null> {
    console.log("Using Postgres for blog by ID (not implemented yet)")
    return null
  }

  private static async getBlogFromPostgresBySlug(slug: string): Promise<BlogSchema | null> {
    console.log("Using Postgres for blog by slug (not implemented yet)")
    return null
  }

  private static async getFeaturedBlogsFromPostgres(): Promise<BlogSchema[]> {
    console.log("Using Postgres for featured blogs (not implemented yet)")
    return []
  }

  private static async createBlogInPostgres(blog: BlogSchema): Promise<BlogSchema> {
    console.log("Creating blog in Postgres (not implemented yet)")
    return blog
  }

  private static async updateBlogInPostgres(id: string, updates: Partial<BlogSchema>): Promise<BlogSchema | null> {
    console.log("Updating blog in Postgres (not implemented yet)")
    return null
  }

  private static async deleteBlogFromPostgres(id: string): Promise<boolean> {
    console.log("Deleting blog from Postgres (not implemented yet)")
    return false
  }

  private static async getUserFromPostgres(username: string): Promise<UserSchema | null> {
    console.log("Getting user from Postgres (not implemented yet)")
    return null
  }

  private static async validateUserInPostgres(username: string, password: string): Promise<UserSchema | null> {
    console.log("Validating user in Postgres (not implemented yet)")
    return null
  }
}

export function initializeSampleData() {
  // Initialize data when module loads
  if (isClient()) {
    initializeNewsData()
    initializeBlogData()
    // Sync with global storage
    DatabaseService.syncWithGlobalStorage()
  } else {
    // Server-side initialization
    console.log("🚀 Initializing sample data on server-side")
    initializeNewsData()
    initializeBlogData()
  }
}

// Initialize sample data
initializeSampleData()
