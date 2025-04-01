import landingPage from "../assets/landing.png"
import downloadingApp from "../assets/appDownload.png"
import SearchBar, { searchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { searchQuery } from "@/api/MenuApi";

const HomePage = () => {

    const navigate = useNavigate()
    
    const handleSubmit = async (data : searchForm) => {
        console.log(data)
        
        const result = await searchQuery(data.searchQuery)
        console.log(result)
        // navigate(`/search/${searchQuery.searchQuery}`)
    }

    return (
        <div className='max-w-7xl mx-auto flex flex-col gap-12'>
            <div className="bg-white shadow-md rounded-lg flex flex-col gap-5 text-center -mt-[100px] p-10">
                <h1 className="text-5xl font-bold tracking-tighter text-orange-600">
                    Hãy thưởng thức món ăn mang về hôm nay
                </h1>
                <span className="text-xl">Chỉ cần một cú click để có đồ ăn</span>
                <SearchBar onSubmit={handleSubmit} placeHolder="Tìm kiếm đồ ăn bạn muốn"/>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingPage} />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Đặt món ăn mang về nhanh hơn
                    </span>
                    <span>Tải ứng dụng Uniservice để đặt đồ ăn nhanh hơn và nhận những gợi ý cá nhân hóa</span>
                    <img src={downloadingApp}  />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
