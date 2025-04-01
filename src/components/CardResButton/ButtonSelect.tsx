
type Props = {
    id:string;
    resList:string[];
    handleCheckBox: (e:any) => void;
}

const ButtonSelect = ({id,resList,handleCheckBox}:Props) => {
  return (
    <div>
        <input checked={resList.includes(id)} onChange={handleCheckBox} name={id} value={id} className="w-4 h-4" type="checkbox" />
    </div>
  )
}

export default ButtonSelect