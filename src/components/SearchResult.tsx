import { Link } from "react-router-dom";



type Props = {
    total: number;
    city : string;
}

const SearchResult = ({total,city} : Props) => {
    return (
        <div className="flex  text-xl font-bold gap-3">
            <span>
                {total} Restaurants found in {city}
                <Link to={'/'} className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500 ">Change new location</Link>
            </span>

        </div>
    );
}

export default SearchResult;
