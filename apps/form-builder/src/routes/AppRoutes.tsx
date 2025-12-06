import { Routes, Route } from "react-router-dom";
import { PreviewForm } from "../components/Preview/PreviewForm";
import { FormBuilderPage } from "../pages/FormBuilderPage";
import { SavedFormsPage } from "../pages/SavedFormsPage";
import { SavedFilledFormsPage } from "../pages/SavedFilledFormsPage";

export const AppRoutes = ({ showPreview }: { showPreview: boolean }) => {
  return (
    <Routes>
      <Route path="/" element={<FormBuilderPage showPreview={showPreview} />} />
      <Route path="/preview" element={<PreviewForm mode="create" />} />
      <Route path="/view" element={<PreviewForm mode="view" />} />
      <Route path="/edit" element={<PreviewForm mode="edit" />} />
      <Route path="/saved-forms" element={<SavedFormsPage />} />
      <Route path="/saved-responses" element={<SavedFilledFormsPage />} />


    </Routes>
  );
};
