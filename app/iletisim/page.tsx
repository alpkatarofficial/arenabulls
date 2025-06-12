import { ContactForm, SocialLinks, ContactMap } from "@/components/contact";

export default function ContactPage() {
  return (
    <div className="bg-black text-white">
      <h1 className="text-4xl font-bold">Bizimle İletişime Geçin</h1>
      
      <section>
        <h2>Genel Başvuru Formu</h2>
        <ContactForm />
      </section>

      <section>
        <h2>İletişim Bilgileri</h2>
        <ContactMap />
      </section>

      <section>
        <h2>Sosyal Medya</h2>
        <SocialLinks />
      </section>
    </div>
  )
}
