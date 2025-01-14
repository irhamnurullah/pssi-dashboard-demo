const CardGradient = ({ title, subtitle, sideText, color, loadingState }) => {
  const colors = (colorCode) => {
    switch (colorCode) {
      case "blue":
        return {
          bg1: 'from-white',
          bg2: 'to-blue-50',
          text: 'text-blue-500',
          border: 'border-blue-100/50'
        }
      case "gray":
        return {
          bg1: 'from-white',
          bg2: 'to-gray-100',
          text: 'text-gray-500',
          border: 'border-gray-100/50'
        }
      case "green":
        return {
          bg1: 'from-white',
          bg2: 'to-green-50',
          text: 'text-green-500',
          border: 'border-green-100/50'
        }
      case "red":
        return {
          bg1: 'from-white',
          bg2: 'to-red-50',
          text: 'text-red-500',
          border: 'border-red-100/50'
        }
      case "yellow":
        return {
          bg1: 'from-white',
          bg2: 'to-yellow-50',
          text: 'text-yellow-500',
          border: 'border-yellow-100/50'
        }
      case "orange":
        return {
          bg1: 'from-white',
          bg2: 'to-orange-50',
          text: 'text-orange-500',
          border: 'border-orange-100/50'
        }
      case "fuchsia":
        return {
          bg1: 'from-white',
          bg2: 'to-fuchsia-50',
          text: 'text-fuchsia-500',
          border: 'border-fuchsia-100/50'
        }
      case "pink":
        return {
          bg1: 'from-white',
          bg2: 'to-pink-50',
          text: 'text-pink-500',
          border: 'border-pink-100/50'
        }
      default:
        return {
          bg1: 'from-white',
          bg2: 'to-gray-100',
          text: 'text-gray-500',
          border: 'border-gray-100/50'
        }
    }
  }
  
  return (
    loadingState
    ? <div className={`p-4 rounded-lg border ${colors('secondary')?.border} bg-gradient-to-r ${colors('secondary')?.bg1} ${colors('secondary')?.bg2} shadow-sm`}>
        <div className="flex h-full gap-2 justify-between items-center">
          <div className="flex flex-col h-full gap-2 justify-between overflow-hidden">
            <div className="w-[150px] h-[20px] bg-gray-200 rounded-md animate-pulse"/>
            <div className="w-[100px] h-[28px] bg-gray-200 rounded-md animate-pulse"/>
          </div>

          <div>
            <div className="w-[50px] h-[28px] bg-gray-200 rounded-md animate-pulse"/>
          </div>
        </div>
      </div>
    : <div className={`p-4 rounded-lg border ${colors(color)?.border} bg-gradient-to-r ${colors(color)?.bg1} ${colors(color)?.bg2} shadow-sm`}>
        <div className="flex h-full gap-2 justify-between items-center">
          <div className="flex flex-col h-full gap-2 justify-between overflow-hidden">
            {title &&
            <span className="text-sm font-bold line-clamp-2">{title}</span>}
            {subtitle &&
            <span className={`font-bold text-lg ${colors(color)?.text} items-end`}>
              {subtitle}
            </span>}
          </div>

          {sideText &&
          <div className={`text-lg ${colors(color)?.text}`}>
            <span className="font-bold">{sideText}</span>
          </div>}
        </div>
      </div>
  )
}

export default CardGradient