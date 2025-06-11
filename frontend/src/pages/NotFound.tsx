import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [position, setPosition] = useState(0);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Animación de carro
    const interval = setInterval(() => {
      setPosition((prev) => (prev < 100 ? prev + 1 : 0));
    }, 50);

    return () => clearInterval(interval);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-ispeed-gray to-white p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 relative overflow-hidden">
        {/* Carretera */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-800">
          <div className="absolute top-1/2 left-0 right-0 h-2 flex">
            <div className="w-1/6 h-full bg-yellow-400 mx-1"></div>
            <div className="w-1/6 h-full bg-yellow-400 mx-1"></div>
            <div className="w-1/6 h-full bg-yellow-400 mx-1"></div>
            <div className="w-1/6 h-full bg-yellow-400 mx-1"></div>
            <div className="w-1/6 h-full bg-yellow-400 mx-1"></div>
            <div className="w-1/6 h-full bg-yellow-400 mx-1"></div>
          </div>
        </div>

        {/* Animación de carro */}
        <div 
          className="absolute bottom-16 transition-all duration-300"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="relative w-20 h-10">
            <div className="absolute bottom-0 w-full h-6 bg-ispeed-red rounded-t-lg rounded-b-sm">
              <div className="absolute top-1 left-1 right-1 h-3 bg-blue-200 rounded-sm"></div>
            </div>
            <div className="absolute -bottom-2 left-2 w-4 h-4 bg-gray-800 rounded-full border border-gray-300"></div>
            <div className="absolute -bottom-2 right-2 w-4 h-4 bg-gray-800 rounded-full border border-gray-300"></div>
          </div>
        </div>

        <div className="text-center mb-20">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-16 w-16 text-ispeed-red" />
          </div>
          <h1 className="text-5xl font-bold mb-2 text-ispeed-black">404</h1>
          <h2 className="text-2xl font-semibold mb-4 text-ispeed-black">¡Ruta no encontrada!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Parece que has tomado un desvío. Esta ruta no está en nuestro mapa de seguridad vial.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-ispeed-red hover:bg-red-700 text-white px-6 py-2 rounded-md transition-transform hover:scale-105"
          >
            Volver a la ruta principal
          </Button>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-500">
        <p>iSpeed IA - Seguridad vial inteligente para el Perú</p>
      </div>
    </div>
  );
};

export default NotFound;