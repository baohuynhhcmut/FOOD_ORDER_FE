import MenuTableDashboard from "@/components/TableDashboard/MenuTableDashboard"
import { menuItem } from "@/type"

type Props = {
    menuItem:menuItem[],
    handleCheckAll: any;
    handleCheckBox:any;
    valueInclude:string[];
    handleDeletedAll:any;
}

const Table = ({menuItem,handleCheckAll,handleCheckBox,valueInclude,handleDeletedAll}:Props) => {
    return (
        <MenuTableDashboard valueInclude={valueInclude} menuItem={menuItem} handleCheckAll={handleCheckAll} handleCheckBox={handleCheckBox} handleDeletedAll={handleDeletedAll} />
    )
}

export default Table