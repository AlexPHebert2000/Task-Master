import Task from "../components/Task"

export default ({inProgress, complete, dispatch}) => {
  return (
    <div>
      <h1>Todo List</h1>
      <div class="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
         <div class="bg-red-300">
          <h2>In Progress</h2>
          <div class="flex flex-col">
            {
              inProgress.map((task) =>( <Task title={task} dispatch={dispatch} modes={["complete"]} />))
            }
          </div>
         </div>

        <div class="bg-amber-300">
          <h2>Complete</h2>
          <div >
            {
              complete.map((task) =>( <Task title={task} dispatch={dispatch} modes={[]} />))
            }
          </div>
         </div>
      </div>
    </div>
  )
}