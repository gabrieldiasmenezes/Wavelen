import Header from "../components/Home/Header/Header"
import MobileBar from "../components/MobileBar/MobileBar"
import SideBar from "../components/Sidebar/SideBar"



export default function Home() {

  return (
    <main className="min-h-screen flex flex-col">
      <Header/>
      <SideBar/>
      <MobileBar/>
    </main>
  )
}