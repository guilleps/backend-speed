import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, TrendingDown, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

// Componente Feature card para mejor reusabilidad
const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="border-2 border-gray-100 hover:border-ispeed-red transition-colors hover:shadow-md">
    <CardContent className="p-6 text-center">
      <Icon className="h-12 w-12 text-ispeed-red mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-ispeed-black mb-2">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </CardContent>
  </Card>
);

// Componente Step card para la sección de ¿Cómo Funciona iSpeed?
const StepCard = ({ number, title, description }) => (
  <div className="text-center">
    <div className="bg-ispeed-red text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4 transform transition-transform hover:scale-110">
      {number}
    </div>
    <h3 className="text-xl font-semibold text-ispeed-black mb-3">
      {title}
    </h3>
    <p className="text-gray-600">
      {description}
    </p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Animación simple de carga al momento de cargar la página
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Información de los features
  const features = [
    {
      icon: Shield,
      title: "Seguridad Avanzada",
      description: "Alertas por voz en tiempo real cuando se detectan condiciones peligrosas"
    },
    {
      icon: Zap,
      title: "Análisis Instantáneo",
      description: "Procesamiento de múltiples variables simultáneamente para decisiones precisas"
    },
    {
      icon: TrendingDown,
      title: "Reducción de Riesgo",
      description: "Monitoreo continuo del comportamiento del conductor y registro de reacciones"
    },
    {
      icon: BarChart3,
      title: "Reportes Detallados",
      description: "Informes completos post-viaje para supervisores y conductores"
    }
  ];

  // Información de los pasos
  const steps = [
    {
      number: 1,
      title: "Configuración Inicial",
      description: "El supervisor registra la empresa, conductores y destinos habilitados"
    },
    {
      number: 2,
      title: "Monitoreo en Tiempo Real",
      description: "Durante el viaje, iSpeed analiza velocidad, GPS y clima emitiendo alertas inteligentes"
    },
    {
      number: 3,
      title: "Reportes Automáticos",
      description: "Al finalizar, se genera un reporte detallado del comportamiento del conductor"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-ispeed-gray to-white">
      <Navbar />
      
      {/* iSpeed IA */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-ispeed-black/10 to-transparent"></div>
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-ispeed-black mb-6">
              iSpeed
              <span className="text-ispeed-red"> IA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sistema de inteligencia artificial diseñado para mejorar la seguridad vial 
              en el transporte interprovincial terrestre del Perú
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-ispeed-red hover:bg-red-700 text-white px-8 py-3 text-lg transition-transform hover:scale-105"
              >
                Comenzar Ahora
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-ispeed-red text-ispeed-red hover:bg-ispeed-red hover:text-white px-8 py-3 text-lg transition-transform hover:scale-105"
              >
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Prevención de Accidentes en Tiempo Real */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ispeed-black mb-4">
              Prevención de Accidentes en Tiempo Real
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Analizamos velocidad, ubicación GPS y condiciones climáticas para emitir 
              alertas inteligentes que salvan vidas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ¿Cómo Funciona iSpeed? */}
      <section className="py-20 bg-ispeed-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ispeed-black mb-4">
              ¿Cómo Funciona iSpeed?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <StepCard 
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

            {/* Road Animation with Bus */}
            <div className="relative h-40 bg-gradient-to-b from-ispeed-gray to-ispeed-black overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-800">
          {/* Road lines */}
          <div className="absolute top-1/2 left-0 right-0 h-2 flex">
            <div className="w-1/6 h-full bg-yellow-400 mx-1 animate-road-line-flash"></div>
            <div className="w-1/6 h-full bg-yellow-400 mx-1 animate-road-line-flash delay-100"></div>
            <div className="w-1/6 h-full bg-yellow-400 mx-1 animate-road-line-flash delay-200"></div>
            <div className="w-1/6 h-full bg-yellow-400 mx-1 animate-road-line-flash delay-300"></div>
            <div className="w-1/6 h-full bg-yellow-400 mx-1 animate-road-line-flash delay-400"></div>
            <div className="w-1/6 h-full bg-yellow-400 mx-1 animate-road-line-flash delay-500"></div>
          </div>
        </div>
        
                {/* Bus */}
                <div className="absolute bottom-16 animate-bus-move">
          <div className="relative w-48 h-20 bg-ispeed-red rounded-t-lg shadow-md transition-all duration-300">
            {/* Bus body */}
            <div className="absolute bottom-0 w-full h-16 bg-ispeed-red rounded-t-lg">
              {/* Windows */}
              <div className="absolute top-2 left-4 right-4 h-8 flex space-x-2">
                <div className="w-6 h-full bg-blue-200 rounded-sm"></div>
                <div className="w-6 h-full bg-blue-200 rounded-sm"></div>
                <div className="w-6 h-full bg-blue-200 rounded-sm"></div>
                <div className="w-6 h-full bg-blue-200 rounded-sm"></div>
                <div className="w-6 h-full bg-blue-200 rounded-sm"></div>
              </div>
            </div>
            {/* Wheels */}
            <div className="absolute -bottom-3 left-8 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-300 animate-wheel-spin"></div>
            <div className="absolute -bottom-3 right-8 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-300 animate-wheel-spin"></div>
          </div>
        </div>
      </div>

      {/* Únete a la Revolución de la Seguridad Vial (CTA) */}
      <section className="py-20 bg-ispeed-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Únete a la Revolución de la Seguridad Vial
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Protege a tus conductores y pasajeros con tecnología de inteligencia artificial
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/register')}
            className="bg-ispeed-red hover:bg-red-700 text-white px-8 py-3 text-lg transition-all hover:shadow-lg hover:scale-105"
          >
            Empezar Gratis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/logo.png" 
              alt="iSpeed Logo" 
              className="h-8 w-auto"
              loading="lazy"
            />
          </div>
          <p className="text-gray-600">
            © {new Date().getFullYear()} iSpeed. Todos los derechos reservados. Seguridad vial inteligente para el Perú.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;