import NavButton from "./NavButton"

export default ({setView, enableTasks}) => {

  const navOptions = [
    {title: "📝", navigation: () => {setView("create")}, enabled: true},
    {title: "☑️", navigation: () => {setView("list")}, enabled: enableTasks},
    {title: "🏆", navigation: () => {console.warn("Not impemented")}, enabled: true}
  ]

  return (
    <div class="content-center bg-gray-700 px-5 text-3xl py-2 flex flex-row mb-4 drop-shadow-gray-950/20 drop-shadow-md">
      <h1 class="text-white font-bold text-center mr-3" >Task Master</h1>
      {
        navOptions.map((props) => <NavButton key={props.title} {...props} />)
      }
    </div>
  )
}