import { useState } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { FormBuilderProvider } from "../context/FormBuilderProvider";
import { AppRoutes } from "../routes/AppRoutes";
import { Footer } from "../components/Footer/Footer";


export default function App() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <FormBuilderProvider>
      <div className="min-h-screen flex flex-col">
        
        <Navbar showPreview={showPreview} setShowPreview={setShowPreview} />

        {/* Main content grows */}
        <div className="flex-1">
          <AppRoutes showPreview={showPreview} />
        </div>

        {/* Footer stays at bottom */}
        <Footer />
      </div>
    </FormBuilderProvider>
  );
}

