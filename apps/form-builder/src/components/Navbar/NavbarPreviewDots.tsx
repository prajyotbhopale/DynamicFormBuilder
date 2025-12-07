export const NavbarPreviewDots = ({
  showPreview,
  setShowPreview,
  validateBeforePreview,
  navigate,
  dotsRef,
  dotsMenu,
  setDotsMenu,
}: any) => {
  return (
    <div className="hidden md:flex items-center gap-3">
      <button
        className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
        onClick={() => {
          if (showPreview) {
            setShowPreview(false);
            navigate("/");
          } else {
            if (!validateBeforePreview()) return;
            setShowPreview(true);
            navigate("/preview");
          }
        }}
      >
        {showPreview ? "Back to Builder" : "Preview"}
      </button>

      <div className="relative" ref={dotsRef}>
        <button
          className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-xl"
          onClick={() => setDotsMenu(!dotsMenu)}
        >
          ⋮
        </button>

        {dotsMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setDotsMenu(false);
                navigate("/saved-forms");
              }}
            >
              Saved Forms
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
