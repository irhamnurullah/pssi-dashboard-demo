import IndoFlag from '../../../../public/indo-flag.png';

const PlayerCard = ({ img, alt, country, playerName, playerPosition }) => {
  const countryFlag = () => {
    switch (country) {
      case 'Indonesia':
        return IndoFlag;
      default:
        return IndoFlag;
    }
  }
  
  return (
    <div className="flex flex-col w-full items-center">
      <img src={img} alt={alt} className="object-cover w-full h-[45vh] rounded-t-lg"/>

      <div className="flex flex-col w-full p-4 gap-2 bg-white rounded-lg shadow-xl items-center">
        <div className="flex gap-2 items-center">
          <img src={countryFlag()} alt={country} />
          <p className='text-bold text-[10px] truncate'>{playerName}</p>
        </div>

        <p>{playerPosition}</p>
      </div>
    </div>
  )
}

export default PlayerCard