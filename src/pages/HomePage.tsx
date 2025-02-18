import landingPage from "../assets/landing.png"
import downloadingApp from "../assets/appDownload.png"
import SearchBar, { searchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate()
    
    const handleSubmit = (searchQuery : searchForm) => {
        console.log(searchQuery)
       
        navigate(`/search/${searchQuery.searchQuery}`)
    }

    return (
        <div className='flex flex-col gap-12'>
            <div className="bg-white shadow-md rounded-lg py-9 flex flex-col gap-5 text-center -mt-20">
                <h1 className="text-5xl font-bold tracking-tighter text-orange-600">
                    Tuck into a takeway today
                </h1>
                <span className="text-xl">Food is just a click</span>
                <SearchBar onSubmit={handleSubmit} placeHolder="Search by city or town"/>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingPage} />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order takeaway even faster
                    </span>
                    <span>Downloading the Uniservice App for faster ordering and personalised recommendations</span>
                    <img src={downloadingApp}  />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
