import { restaurant } from "@/type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dot } from "lucide-react";


type Props = {
    restaurant: restaurant
}

const RestaurantInfo = ({restaurant} : Props) => {

    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">{restaurant.restaurantName}</CardTitle>
                <CardDescription>
                    {restaurant.country} , {restaurant.city}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex">
                {restaurant.cuisines.map((item,index) => (
                    <>
                        {item} 
                        {index < restaurant.cuisines.length && <Dot />}
                    </>
                ))}
            </CardContent>
        </Card>
    );
}

export default RestaurantInfo;
