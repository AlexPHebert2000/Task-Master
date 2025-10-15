export default ({title, active}) => {
  return (
  <div>
    <div className={`${active ? 'bg-gray-300 drop-shadow-black/50 drop-shadow-md' : 'bg-gray-600 drop-shadow-[0px, -6px, 4px]'}  px-2 rounded-lg`}>{title}</div>
  </div>
)}