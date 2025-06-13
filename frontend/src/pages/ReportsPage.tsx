import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Filter, ArrowLeft } from "lucide-react";
import { User } from "@/dto/user.dto";
import { getDriversByCompany } from "@/services/user.service";
import { getDestinationsByCompany, getDestinationsByUser, getDynamicTrips } from "@/services/trip.service";
import { searchReports } from "@/services/trip.service";
import { ReportFilters } from "@/dto/report.dto";
import { Trip } from "@/dto/trip.dto";

const ReportsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    driver: "",
    destination: "",
    status: ""
  });
  const [drivers, setDrivers] = useState<User[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);

  const normalizeFilters = (f: ReportFilters): ReportFilters => {
    const isCompany = user?.role === 'company';

    return {
      ...f,
      driver: isCompany && f.driver === "all" ? undefined : f.driver,
      destination: f.destination === "all" ? undefined : f.destination,
      status: f.status === "all" ? undefined : f.status,
    };
  };

  const handleSearch = async () => {
    const normalized = normalizeFilters(filters);
    const results = await searchReports(normalized);
    setTrips(results);
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        // ⚠️ Usa nuevo endpoint de viajes según el rol
        const trips = await getDynamicTrips();
        setTrips(trips);

        if (user.role === 'company' && user.companyId) {
          const [drivers, destinations] = await Promise.all([
            getDriversByCompany(user.companyId),
            getDestinationsByCompany(user.companyId),
          ]);
          setDrivers(drivers);
          setDestinations(destinations);
        }

        if (user.role === 'conductor') {
          const destinations = await getDestinationsByUser();
          setDestinations(destinations);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    navigate('/');
    return null;
  }

  const getResponseRate = (alerts: number, responses: number) => {
    return Math.round((responses / alerts) * 100);
  };

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return "-";

    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();

    if (isNaN(diffMs) || diffMs < 0) return "-";

    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m ${seconds}s`;
    }
  };

  return (
    <div className="min-h-screen bg-ispeed-gray">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-ispeed-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate(user.role === 'company' ? '/company-dashboard' : '/conductor-dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <img
                src="/logo.png"
                alt="iSpeed Logo"
                className="h-10 w-auto mr-4"
              />
              <div>
                <h1 className="text-xl font-semibold text-ispeed-black">Reportes de Viajes</h1>
                <p className="text-sm text-gray-600">Análisis detallado de viajes</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-ispeed-black">
              <Filter className="w-5 h-5 mr-2" />
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="dateFrom">Fecha Desde</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="dateTo">Fecha Hasta</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                  className="mt-1"
                />
              </div>

              {user.role === 'company' && (
                <div>
                  <Label htmlFor="driver">Conductor</Label>
                  <Select value={filters.driver} onValueChange={(value) => setFilters(prev => ({ ...prev, driver: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="destination">Destino</Label>
                <Select value={filters.destination} onValueChange={(value) => setFilters(prev => ({ ...prev, destination: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {destinations.map((destination) => (
                      <SelectItem key={destination} value={destination}>
                        {destination}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  className="w-full bg-ispeed-red hover:bg-red-700 text-white"
                  onClick={handleSearch}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-ispeed-black">Resultados</h2>
            <p className="text-gray-600">{trips.length} reportes encontrados</p>
          </div>
        </div>

        {/* Reports Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold text-ispeed-black">Fecha</th>
                    {user.role === 'company' && (
                      <th className="text-left p-4 font-semibold text-ispeed-black">Conductor</th>
                    )}
                    <th className="text-left p-4 font-semibold text-ispeed-black">Destino</th>
                    <th className="text-left p-4 font-semibold text-ispeed-black">Duración</th>
                    <th className="text-left p-4 font-semibold text-ispeed-black">Alertas</th>
                    <th className="text-left p-4 font-semibold text-ispeed-black">Respuesta</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((trip) => (
                    <tr key={trip.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-gray-900">{new Date(trip.startDate).toLocaleDateString()}</td>
                      {user.role === 'company' && (
                        <td className="p-4 text-gray-900">{trip.user.name}</td>
                      )}
                      <td className="p-4 text-gray-900">{trip.origin.name} - {trip.destination.name}</td>
                      <td className="p-4 text-gray-900">{calculateDuration(trip.startDate, trip.endDate)}</td>
                      {/* <td className="p-4 text-gray-900">{trip.alerts}</td> */}
                      {/* <td className="p-4">
                        <span className="text-gray-900">{trip.responses}/{trip.alerts}</span>
                        <span className="text-sm text-gray-500 ml-1">
                          ({getResponseRate(trip.alerts, trip.responses)}%)
                        </span>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
