"use client"

export function ContactForm({ isSponsorForm = false }) {
  return (
    <form className="space-y-4">
      <input 
        type="text" 
        placeholder="Ad Soyad" 
        className="bg-gray-800 p-2 w-full"
      />
      {isSponsorForm && (
        <input 
          type="text" 
          placeholder="Şirket Adı" 
          className="bg-gray-800 p-2 w-full"
        />
      )}
      <button type="submit" className="bg-[#0099ff] px-4 py-2">
        Gönder
      </button>
    </form>
  )
}
