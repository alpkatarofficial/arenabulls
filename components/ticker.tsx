export function Ticker() {
  const tickerItems = [
    "#ARENABULLS",
    "ALWAYS BE KING",
    "#FORZABULLS",
    "ALWAYS BE QUEEN",
    "#LETSGOBULLS",
    "#ARENABULLS",
    "ALWAYS BE KING",
    "#FORZABULLS",
    "ALWAYS BE QUEEN",
    "#LETSGOBULLS",
  ]

  return (
    <div className="bg-[#0099ff]/90 py-3 overflow-hidden">
      <div className="ticker">
        {tickerItems.map((item, index) => (
          <span key={index} className="inline-block px-6 text-lg font-bold">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
