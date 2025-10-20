export default ({ title, modes, dispatch }) => {
  const handleClick = (item, action) => {
    dispatch({ type: action, payload: item });
  };

  const actionButtons = {
    remove: (
      <button
        className="text-red-500 hover:bg-red-500 hover:text-white border-1 rounded-sm px-1.5 relative -top-7 left-43"
        onClick={() => {
          handleClick(title, "remove");
        }}
      >
        ✕
      </button>
    ),
    complete: (
      <button
        className="text-green-700 hover:bg-green-700 hover:text-white border-1 rounded-sm px-1.5 relative -top-7 left-43"
        onClick={() => {
          handleClick(title, "complete");
        }}
      >
        ✓
      </button>
    ),
    undo: (
      <button
        className="text-blue-500 hover:bg-blue-500 hover:text-white border-1 rounded-sm px-1.5 relative -top-7 left-43"
        onClick={() => {
          handleClick(title, "undoComplete");
        }}
      >
        ↺
      </button>
    ),
  };

  const enableActions = () => {
    const buttons = [];
    for (let mode of modes) {
      buttons.push(actionButtons[mode]);
    }
    return buttons;
  };

  return (
    <div className="mt-2 p-2 pt-8 drop-shadow-amber-950/30 drop-shadow-sm bg-amber-100 w-52 h-full" id="list-item">
      <div className="absolute ">
        {...enableActions()}
      </div>
      <div className="flex justify-center items-center h-full">
        <p className="inline mr-2 wrap-normal text-lg">{title}</p>
      </div>
    </div>
  );
};
