export const NavbarModes = ({ metadata, switchMode, saveFormLayout }: any) => {
  return (
    <div className="hidden md:flex items-center gap-3">
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            metadata.viewType === "CREATE"
              ? "bg-blue-600 text-white shadow"
              : "hover:bg-gray-200"
          }`}
          onClick={() => switchMode("CREATE")}
        >
          Create
        </button>

        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            metadata.viewType === "VIEW"
              ? "bg-green-600 text-white shadow"
              : "hover:bg-gray-200"
          }`}
          onClick={() => switchMode("VIEW")}
        >
          View
        </button>

        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            metadata.viewType === "EDIT"
              ? "bg-purple-600 text-white shadow"
              : "hover:bg-gray-200"
          }`}
          onClick={() => switchMode("EDIT")}
        >
          Edit
        </button>
      </div>

      <button
        className="px-5 py-2 rounded-full bg-green-600 text-white shadow hover:bg-green-700"
        onClick={saveFormLayout}
      >
        Save Form
      </button>
    </div>
  );
};
