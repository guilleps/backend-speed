import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart3, Users, MapPin, AlertTriangle, Settings } from "lucide-react";
import { getTripCountByCompanyLastWeek, getTripsByCompany } from "@/services/trip.service";
import { Trip } from "@/dto/trip.dto";
import { getCityCountByCompany } from "@/services/cities.service";
import { getDriverCountByCompany } from "@/services/user.service";

const SupervisorDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isConfigured, setIsConfigured] = useState(true); // Simular empresa ya configurada
  const [driverCount, setDriverCount] = useState<number>(0);
  const [cityCount, setCityCount] = useState<number>(0);
  const [tripsInLastWeek, setTripsInLastWeek] = useState<number>(0);
  const [myTrips, setMyTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchDriverCount = async () => {
      if (!user?.companyId) return;
      try {
        const count = await getDriverCountByCompany(user.companyId);
        setDriverCount(count);
      } catch (error) {
        console.error("Error al contar conductores", error);
      }
    };

    const fetchCityCount = async () => {
      try {
        const count = await getCityCountByCompany();
        setCityCount(count);
      } catch (error) {
        console.error("Error al obtener número de ciudades:", error);
      }
    };
    
    const fetchTripsInLastWeek = async () => {
      try {
        const count = await getTripCountByCompanyLastWeek();
        setTripsInLastWeek(count);
      } catch (error) {
        console.error("Error al obtener número de viajes de la semana:", error);
      }
    };

    fetchDriverCount();
    fetchTripsInLastWeek();
    fetchCityCount();
  }, [user]);

  useEffect(() => {
    const fetchCompanyTrips = async () => {
      try {
        const trips = await getTripsByCompany();
        // console.log("Viajes de la empresa:", trips);
        setMyTrips(trips);
      } catch (error) {
        console.error("Error al obtener los viajes de la empresa:", error);
      }
    };

    fetchCompanyTrips();
  }, []);

  // Datos simulados
  const dashboardData = {
    totalDrivers: 24,
    activeTrips: 8,
    totalDestinations: 12,
    weeklyTrips: 156,
    alertsThisWeek: 43,
    responseRate: 94
  };

  if (!user || user.role !== 'company') {
    navigate('/login');
    return null;
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-ispeed-gray flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-ispeed-red">
          <CardHeader className="text-center">
            <img
              src="/logo.png"
              alt="iSpeed Logo"
              className="h-12 w-auto mx-auto mb-4"
            />
            <CardTitle className="text-2xl text-ispeed-black">Configuración Inicial</CardTitle>
            <CardDescription>
              Tu empresa necesita configuración inicial para comenzar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => navigate('/configuration')}
              className="w-full bg-ispeed-red hover:bg-red-700 text-white"
            >
              Comenzar Configuración
            </Button>
          </CardContent>
        </Card>
      </div>
    );
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
                <h1 className="text-xl font-semibold text-ispeed-black">Panel de Supervisor</h1>
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
                onClick={() => navigate('/configuration')}
                className="border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4 mr-2" />
                Configuración
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
        {/* Stats principales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-ispeed-red">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Conductores Activos</CardTitle>
              <Users className="h-4 w-4 text-ispeed-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ispeed-black">{driverCount}</div>
              <p className="text-xs text-gray-600">Algunos en viaje</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Viajes Esta Semana</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ispeed-black">{tripsInLastWeek}</div>
              <p className="text-xs text-green-600">+12% vs semana anterior</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Destinos Activos</CardTitle>
              <MapPin className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ispeed-black">{cityCount}</div>
              <p className="text-xs text-gray-600">Rutas configuradas</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Alertas Esta Semana</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ispeed-black">{dashboardData.alertsThisWeek}</div>
              <p className="text-xs text-gray-600">{dashboardData.responseRate}% atendidas</p>
            </CardContent>
          </Card>
        </div>

        {/* Viajes recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ispeed-black">Viajes Recientes</CardTitle>
            <CardDescription>
              Últimos viajes realizados por tu flota
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold text-ispeed-black">{trip.user.name ?? "Conductor desconocido"}</h3>
                    <p className="text-sm text-gray-600">{trip.origin.name ?? "?"} → {trip.destination.name ?? "?"}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={trip.status === "IN_PROGRESS" ? "default" : "secondary"}
                      className={trip.status === "IN_PROGRESS" ? "bg-ispeed-red" : ""}
                    >
                      {trip.status}
                    </Badge>
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

export default SupervisorDashboard;