export const NavbarMobileMenu = ({
  mobileMenu,
  switchMode,
  saveFormLayout,
  validateBeforePreview,
  setShowPreview,
  navigate,
  setMobileMenu,
}: any) => {
  if (!mobileMenu) return null;

  return (
    <div className="md:hidden bg-white shadow-lg border-t py-3 px-6 space-y-3">
      <button className="w-full text-left" onClick={() => switchMode("CREATE")}>
        Create
      </button>
      <button className="w-full text-left" onClick={() => switchMode("VIEW")}>
        View
      </button>
      <button className="w-full text-left" onClick={() => switchMode("EDIT")}>
        Edit
      </button>

      <button className="w-full text-left" onClick={saveFormLayout}>
        Save Form
      </button>

      <button
        className="w-full text-left"
        onClick={() => {
          if (!validateBeforePreview()) return;
          setShowPreview(true);
          navigate("/preview");
          setMobileMenu(false);
        }}
      >
        Preview
      </button>

      <button
        className="w-full text-left"
        onClick={() => {
          navigate("/saved-forms");
          setMobileMenu(false);
        }}
      >
        Saved Forms
      </button>
    </div>
  );
};
