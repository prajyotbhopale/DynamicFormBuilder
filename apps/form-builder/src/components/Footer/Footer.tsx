export const Footer = () => (
  <footer className="mt-14 bg-gradient-to-r from-gray-50 to-gray-100 border-t flex items-center justify-center">
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Top Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Logo / Branding */}
        <div>
          <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dynamic Form Builder
          </h2>
          <p className="text-gray-500 mt-1">
            Build, preview, and manage custom forms effortlessly.
          </p>
        </div>

      </div>


    </div>
  </footer>
);
