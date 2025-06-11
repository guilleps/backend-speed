import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getCountByUser, getTripsByUser } from "@/services/trip.service";
import { useToast } from "@/hooks/use-toast";
import { Trip } from "@/dto/trip.dto";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [totalTrips, setTotalTrips] = useState<number>(0);
  const [myTrips, setMyTrips] = useState<Trip[]>([]);

  const fetchRecentlyTrips = async () => {
    try {
      const trips = await getTripsByUser();
      setMyTrips(trips);
    } catch (error) {
      console.error("Error al obtener viajes del usuario:", error);
      toast({
        title: "Error al obtener viajes",
        description: error.response?.data?.message || "Error inesperado",
        variant: "destructive",
      });
    }
  };

  const fetchNumberTrips = async () => {
    try {
      const trips = await getCountByUser();
      setTotalTrips(trips);
    } catch (error) {
      console.error("Error al obtener viajes del usuario:", error);
      toast({
        title: "Error al obtener viajes",
        description: error.response?.data?.message || "Error inesperado",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchNumberTrips();
    fetchRecentlyTrips();
  }, []);

  if (!user || user.role !== 'conductor') {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-ispeed-gray">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-ispeed-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="iSpeed Logo"
                className="h-10 w-auto mr-4"
              />
              <div>
                <h1 className="text-xl font-semibold text-ispeed-black">Panel del Conductor</h1>
                <p className="text-sm text-gray-600">Bienvenido, {user.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/reports')}
                className="border-ispeed-red text-ispeed-red hover:bg-ispeed-red hover:text-white"
              >
                Ver Reportes
              </Button>
              <Button
                variant="outline"
                onClick={logout}
                className="text-gray-600 hover:text-ispeed-red"
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Action */}
        <div className="mb-8">
          <Card className="border-2 border-ispeed-red bg-gradient-to-r from-ispeed-red to-red-600 text-white">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold">Comenzar Nuevo Viaje</CardTitle>
              <CardDescription className="text-red-100 text-lg">
                Inicia tu viaje con el copiloto virtual de iSpeed
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                size="lg"
                onClick={() => navigate('/trip')}
                className="bg-white text-ispeed-red hover:bg-gray-100 px-8 py-4 text-xl font-semibold"
              >
                Iniciar Viaje
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-ispeed-black">Viajes Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-ispeed-red">{totalTrips}</div>
              <p className="text-sm text-gray-600">Este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-ispeed-black">Puntuación Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">85</div>
              <p className="text-sm text-gray-600">Sobre 100 puntos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-ispeed-black">Alertas Atendidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">94%</div>
              <p className="text-sm text-gray-600">Índice de respuesta</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Trips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ispeed-black">Viajes Recientes</CardTitle>
            <CardDescription>
              Resumen de tus últimos viajes realizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myTrips.slice(0, 3).map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold text-ispeed-black">{trip.origin.name} → {trip.destination.name}</h3>
                    <p className="text-sm text-gray-600">{new Date(trip.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Badge variant="secondary">{trip.status}</Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => navigate('/reports')}
                className="border-ispeed-red text-ispeed-red hover:bg-ispeed-red hover:text-white"
              >
                Ver Todos los Reportes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverDashboard;
