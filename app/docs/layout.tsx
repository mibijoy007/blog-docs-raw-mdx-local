
import Footer from "@/components/Footer"
import { MySidebar } from "@/components/MySidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
          <div className="flex flex-col">
          {/* Main Content with Sidebar */}
          <main className="flex flex-1">
            <div className="ml-12 mt-3">
            <MySidebar />
            </div>
            <section className="flex-1 p-4">
              {children}
              </section>
          </main>
          <Footer/>
        </div>
    
  )
}
