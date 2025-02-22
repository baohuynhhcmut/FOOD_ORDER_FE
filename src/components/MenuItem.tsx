import { menuItem } from "@/type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
    menuItem : menuItem;
    addToCart: () => void;
}

const MenuItem = ({menuItem,addToCart} : Props) => {
    return (
        <Card onClick={addToCart}>
            <CardHeader className="cursor-pointer">
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
                {menuItem.price} Đ
            </CardContent>
        </Card>
    );
}

export default MenuItem;
