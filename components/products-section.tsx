import Link from "next/link"
import Image from "next/image"

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: "ArenaBulls Forma",
      price: "₺299",
      image: "/esports-jersey.png",
      category: "Giyim",
      isNew: true,
      features: ["Nefes alabilir kumaş", "Resmi takım logosu", "S, M, L, XL bedenleri", "Premium kalite"],
    },
    {
      id: 2,
      name: "Pro Gaming Mouse",
      price: "₺899",
      category: "Ekipman",
      isNew: false,
      features: ["25,000 DPI sensör", "RGB aydınlatma", "8 programlanabilir tuş", "Ergonomik tasarım"],
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: "₺1.299",
      category: "Ekipman",
      isNew: false,
      features: ["Cherry MX switchler", "RGB per-key aydınlatma", "Alüminyum gövde", "Anti-ghosting"],
    },
    {
      id: 4,
      name: "Gaming Headset",
      price: "₺799",
      category: "Ekipman",
      isNew: true,
      features: ["7.1 Surround ses", "Gürültü önleyici mikrofon", "50mm driver", "Rahat kulak yastıkları"],
    },
  ]

  return (
    <section className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-white">Mağaza</h2>
          <div className="flex space-x-2">
            <Link href="/magaza/giyim">
              <button className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                Giyim
              </button>
            </Link>
            <Link href="/magaza/ekipman">
              <button className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                Ekipman
              </button>
            </Link>
            <Link href="/magaza/aksesuar">
              <button className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                Aksesuar
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <Link href={`/magaza/urun/${product.id}`} key={product.id}>
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-[#0099ff]/20 transition-all duration-300 cursor-pointer group border border-gray-700 hover:border-[#0099ff]/50">
                <div className="relative h-56 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                      <span className="text-6xl text-gray-500 font-bold">AB</span>
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-[#0099ff] to-[#0077cc] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      YENİ
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#0099ff] bg-[#0099ff]/10 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#0099ff] transition-colors">
                    {product.name}
                  </h3>
                  <div className="mb-3">
                    <ul className="text-xs text-gray-400 space-y-0.5">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#0099ff] rounded-full mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-white">{product.price}</p>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-[#0099ff] hover:bg-[#0077cc] text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors">
                        Görüntüle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/magaza">
            <button className="bg-[#0099ff] hover:bg-[#0077cc] text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Tüm Ürünler
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export { ProductsSection }
