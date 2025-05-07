import Sidebar from "@/components/Sidebar";
import Content from "@/components/Content";
import Visualisasi from "@/components/Visualisasi";


export default function Home() {
  return (
    <div>
      <div className="h-full fixed  w-full">
        <Sidebar />
      </div>
      <div className="relative ml-[32%] md:ml-[20%]">
        <Content/>
        <Visualisasi/>
      </div>
    </div>
  );
}
