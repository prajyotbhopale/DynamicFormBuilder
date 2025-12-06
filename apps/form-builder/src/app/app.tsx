import { useState } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { FormBuilderProvider } from "../context/FormBuilderProvider";
import { AppRoutes } from "../routes/AppRoutes";


export default function App() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <FormBuilderProvider>
      <Navbar showPreview={showPreview} setShowPreview={setShowPreview} />
      <AppRoutes showPreview={showPreview} />
    </FormBuilderProvider>
  );
}
