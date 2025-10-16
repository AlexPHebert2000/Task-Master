export default ({title, active, clickHander}) => {
  return (
    <div className={`${active ? 'bg-gray-300 drop-shadow-black/50 drop-shadow-sm font-semibold' : 'bg-gray-600 drop-shadow-[0px, -6px, 4px] hover:bg-gray-400'}  px-2 rounded-lg`}
      onClick={clickHander}
    >{title}</div>
)}