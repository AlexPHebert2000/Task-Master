export default ({enabled, title, navigation}) => {
  return (
    <h1 onClick={() => {enabled ? navigation() : null}} className={`mx-3 drop-shadow-md p-1 rounded-sm ${enabled ? "bg-gray-500/75 hover:bg-300/75" : "bg-gray-800/75"}`}>{title}</h1>
  )
}