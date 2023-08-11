import MiniCalendar from "@/components/main/MainMiniCalendar"
import MenuBar from "@/components/main/MainMenuBar"

export default function SideMenu(){
  return(
    <>
      <div className="">
        <div className="w-56 pb-10">
          <MiniCalendar/>
        </div>
        <MenuBar/>
      </div>
    </>
  )
}