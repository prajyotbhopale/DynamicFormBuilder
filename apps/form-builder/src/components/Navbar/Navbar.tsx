import { useContext } from "react";
import { FormBuilderContext } from "../../context/FormBuilderContext";

type NavbarProps = {
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Navbar = ({ showPreview, setShowPreview }: NavbarProps) => {
  const ctx = useContext(FormBuilderContext);
  // console.log("Navbar context:", ctx);

  if (!ctx) return null;

  const { metadata, setMetadata, submittedData } = ctx;

  const switchMode = (mode: "CREATE" | "VIEW" | "EDIT") => {
    setMetadata({ ...metadata, viewType: mode });
    setShowPreview(true); // ⭐ ensure form is visible when switching
  };

  return (
    <nav className="backdrop-blur-lg bg-white/60 border-b border-gray-200 shadow sticky top-0 z-50 w-full">
      <div className="w-full px-8 py-3 flex items-center justify-between">

        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 
                       bg-clip-text text-transparent tracking-tight">
          Dynamic Form Builder
        </h1>

        {/* Mode Switch Buttons */}
        <div className="flex items-center gap-3">

          <button
            className="px-4 py-1 bg-gray-200 rounded"
            onClick={() => switchMode("CREATE")}
          >
            Create
          </button>

          <button
            className="px-4 py-1 bg-gray-200 rounded"
            onClick={() => switchMode("VIEW")}
          >
            View
          </button>

          <button
            disabled={!submittedData}
            className={`px-4 py-1 rounded ${
              submittedData ? "bg-gray-200" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => switchMode("EDIT")}
          >
            Edit
          </button>
        </div>

        {/* Preview Toggle */}
        <button
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 
                     text-white font-medium shadow-md"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? "Back to Builder" : "Preview Form"}
        </button>
      </div>
    </nav>
  );
};
