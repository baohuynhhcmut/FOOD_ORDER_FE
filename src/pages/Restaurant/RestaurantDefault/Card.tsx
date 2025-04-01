import CardRestaurant from "@/components/CardRestaurant";
import RestaurantNotFound from "@/components/RestaurantNotFound";
import { restaurant } from "@/store/slice/RestaurantSlice";

type Props = {
    restaurant: restaurant[]
    resultResFind:any,
    clearSearch:any,
    selectedRes:any,
    setSelectedRes:any
}

const Card = ({restaurant,resultResFind,clearSearch,selectedRes,setSelectedRes}:Props) => {
    return (
        <>
            {!restaurant.length && resultResFind.active ? (
              <RestaurantNotFound
                text="Không có kết quả tìm kiếm"
                buttonText="Trở lại"
                back={() => clearSearch()}
              />
            ) : (
              <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto p-5 rounded-lg">
                {restaurant.map((item) => (
                  <CardRestaurant
                    restaurant={item}
                    setSelectedRes={setSelectedRes}
                    resList={selectedRes}
                  />
                ))}
              </div>
            )}
        </>
    );
}

export default Card;
