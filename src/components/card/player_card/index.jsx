import IndoFlag from '../../../../public/indo-flag.png';

const PlayerCard = ({ img, alt, country, playerName, namaTim }) => {
  const countryFlag = () => {
    switch (country) {
      case 'Indonesia':
        return IndoFlag;
      default:
        return IndoFlag;
    }
  }
  
  return (
    <div className="flex flex-col w-full items-center bg-white hover:shadow-xl cursor-pointer rounded-lg border">
      {/* <img src={img} alt={alt} className="object-cover w-full h-[45vh] rounded-t-lg"/> */}
      <img
                    className="mx-auto rounded-t-lg object-cover w-full h-[30vh]"
                    src={img}
                    alt="avatar"
                    style={{objectPosition: "top" }}
                  />

      {/* <div className="flex flex-col w-full p-4 gap-2   items-center"> */}
        {/* <div className="flex gap-2 items-center">
          <img src={countryFlag()} alt={country} />
          <p className='text-bold text-[10px] truncate'>{playerName}</p>
        </div> */}

        


        {/* <p>{playerPosition}</p> */}
      {/* </div> */}

      <div className="flex flex-col w-full p-4 gap-2  px-4 py-3 border rounded-b-lg hover:shadow-xl  bg-white " style={{backgroundImage: `url('./pattern-white.svg')`}}>
                    <div className=" rounded-lg w-full ">
                      <p className="w-full text-[#212B5A] text-sm truncate font-semibold">
                        {playerName}
                      </p>

                      <div className="grid grid-cols-3 mt-2">
                        <div className="col-span-2">
                          <div className="flex gap-1">
                            <svg className="mt-1" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.49 2.23006L5.50003 4.11006C4.35003 4.54006 3.41003 5.90006 3.41003 7.12006V14.5501C3.41003 15.7301 4.19003 17.2801 5.14003 17.9901L9.44003 21.2001C10.85 22.2601 13.17 22.2601 14.58 21.2001L18.88 17.9901C19.83 17.2801 20.61 15.7301 20.61 14.5501V7.12006C20.61 5.89006 19.67 4.53006 18.52 4.10006L13.53 2.23006C12.68 1.92006 11.32 1.92006 10.49 2.23006Z" stroke="grey" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.05005 11.8701L10.66 13.4801L14.96 9.18005" stroke="grey" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <div className="my-auto">
                              <small className="text-xs text-neutral-400">Team</small>
                              <p className="text-xs text-neutral-700">
                                {namaTim}
                              </p>
                            </div>
                            
                          </div>  
                        </div>

                        <div className="col-span-1">
                          <div className="flex gap-1">
                            <svg width="18" height="18" className="mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.15002 2V22" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.15002 4H16.35C19.05 4 19.65 5.5 17.75 7.4L16.55 8.6C15.75 9.4 15.75 10.7 16.55 11.4L17.75 12.6C19.65 14.5 18.95 16 16.35 16H5.15002" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>


                            <div className="my-auto">
                              <small className="text-xs text-neutral-400">Negara</small>
                              <p className="text-xs text-neutral-700">
                                {country}
                              </p>
                            </div>
                            
                          </div>  
                        </div>

                      </div>

                    </div>
      </div>
    </div>
  )
}

export default PlayerCard