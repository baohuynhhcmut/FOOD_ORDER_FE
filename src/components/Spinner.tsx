import {ThreeDots} from "react-loader-spinner"

const Spinner = () => {
  return (
    <>
       <div className="flex flex-col items-center justify-center">
        <img className="w-40 h-28 object-cover" src="https://static.vecteezy.com/system/resources/previews/010/351/723/non_2x/chicken-logo-icon-design-vector.jpg" />
        <p className="font-bold">Please wait...</p>
        <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="orange"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
       </div>
    </>
  )
}
export default Spinner