import Task from "../components/Task";
import Pomodoro from "./Pomodoro";

export default ({ inProgress, complete, dispatch, timeState }) => {
  return (
    <div className="flex flex-col items-center">
      <Pomodoro timeState={timeState} />
      <hr className="my-5 w-lg" />
      <h1>Todo List</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-300">
          <h2>In Progress</h2>
          <div className="flex flex-col">
            {inProgress.map((task, index) => (
              <Task title={task} key={index} dispatch={dispatch} modes={["complete"]} />
            ))}
          </div>
        </div>

        <div className="bg-amber-300">
          <h2>Complete</h2>
          <div>
            {complete.map((task, index) => (
              <Task title={task} key={index} dispatch={dispatch} modes={[]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
