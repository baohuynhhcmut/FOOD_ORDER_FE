

const Hero = ({image}:{image:string}) => {
  return (
    <div className="max-w-7xl overflow-hidden rounded-2xl">
        <img src={image} className="w-full h-96 object-cover" />
    </div>
  )
}
export default Hero