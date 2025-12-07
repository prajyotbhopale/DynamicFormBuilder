import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load named exports
const FormBuilderPage = lazy(() =>
  import("../pages/FormBuilderPage").then((m) => ({ default: m.FormBuilderPage }))
);

const PreviewForm = lazy(() =>
  import("../components/Preview/PreviewForm").then((m) => ({ default: m.PreviewForm }))
);

const SavedFormsPage = lazy(() =>
  import("../pages/SavedFormsPage").then((m) => ({ default: m.SavedFormsPage }))
);

const SavedFilledFormsPage = lazy(() =>
  import("../pages/SavedFilledFormsPage").then((m) => ({ default: m.SavedFilledFormsPage }))
);

// Loading fallback
const LoadingScreen = () => (
  <div className="w-full text-center py-10 text-gray-600 text-lg">Loading...</div>
);

export const AppRoutes = ({ showPreview }: { showPreview: boolean }) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route
          path="/"
          element={<FormBuilderPage showPreview={showPreview} />}
        />

        <Route path="/preview" element={<PreviewForm mode="create" />} />
        <Route path="/view" element={<PreviewForm mode="view" />} />
        <Route path="/edit" element={<PreviewForm mode="edit" />} />

        <Route path="/saved-forms" element={<SavedFormsPage />} />
        <Route path="/saved-responses" element={<SavedFilledFormsPage />} />
      </Routes>
    </Suspense>
  );
};
