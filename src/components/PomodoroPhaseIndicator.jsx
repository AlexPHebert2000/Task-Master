export default ({title, active}) => {
  return (
  <div>
    <div className={`${active ? 'bg-green-700' : 'bg-amber-300'}`}>{title}</div>
  </div>
)}