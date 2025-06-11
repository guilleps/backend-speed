import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mic, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import tripSimulations from "./simulated_trips.json";
import { City } from "@/dto/city.dto";
import { getCitiesByCompany } from "@/services/cities.service";
import { createTrip, updateTrip } from "@/services/trip.service";
import { createDetail } from "@/services/details.service";

type AlertRecord = {
  segundo: number;
  minuto: number;
  hora: number;
  mensaje: string;
  respondida: boolean;
};

type TripSimulation = {
  id: string;
  alertas: AlertRecord[];
};

const TripPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [tripStarted, setTripStarted] = useState(false);
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [activeAlertMessage, setActiveAlertMessage] = useState("");
  const [selectedTrip, setSelectedTrip] = useState<TripSimulation | null>(null);
  const [tripData, setTripData] = useState({ alerts: 0, responses: 0, duration: 0 });
  const [availableCities, setAvailableCities] = useState<City[]>([]);
  const [tripId, setTripId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities = await getCitiesByCompany();
        setAvailableCities(cities);
      } catch (error) {
        console.error("Error al obtener ciudades disponibles:", error);
      }
    };

    fetchCities();
  }, []);

  const findCityNameById = (id: string) => {
    return availableCities.find(available => available.id === id).name;
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (tripStarted && selectedTrip) {
      // Convertir alertas a segundos al iniciar el viaje
      const alertSchedule = selectedTrip.alertas.map(alert => {
        const tiempoEnSegundos =
          alert.segundo !== undefined ? alert.segundo :
            alert.minuto !== undefined ? alert.minuto * 60 :
              alert.hora !== undefined ? alert.hora * 3600 : 0;
        return {
          ...alert,
          triggerSecond: tiempoEnSegundos
        };
      });

      interval = setInterval(() => {
        setTripData(prev => {
          const newDuration = prev.duration + 1;

          const alertToTrigger = alertSchedule.find(a => Math.round(a.triggerSecond) === newDuration);
          if (alertToTrigger) {
            setIsAlertActive(true);
            setActiveAlertMessage(alertToTrigger.mensaje);

            setTimeout(() => {
              setIsAlertActive(false);
              setActiveAlertMessage("");
              setTripData(prev2 => ({
                ...prev2,
                responses: prev2.responses + (alertToTrigger.respondida ? 1 : 0)
              }));
            }, 2000);

            return { ...prev, alerts: prev.alerts + 1, duration: newDuration };
          }

          return { ...prev, duration: newDuration };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tripStarted, selectedTrip]);

  useEffect(() => {
    const allTrips = tripSimulations as TripSimulation[];
    const random = allTrips[Math.floor(Math.random() * allTrips.length)];
    setSelectedTrip(random);
  }, []);

  if (!user || user.role !== "conductor") {
    navigate("/login");
    return null;
  }

  const startTrip = async () => {
    if (!originCity || !destinationCity || originCity === destinationCity) return;

    try {
      const newTrip = await createTrip({
        startDate: new Date().toISOString(),
        origin: originCity,
        destination: destinationCity,
        status: "IN_PROGRESS"
      });

      // console.log("Viaje creado:", newTrip);

      setTripId(newTrip.id);
      setTripStarted(true);
    } catch (error) {
      console.error("Error al crear el viaje:", error);
      toast({
        title: "Error al crear el viaje",
        description: error.response?.data?.message || "Error inesperado",
        variant: "destructive",
      });
    }
  };

  const endTrip = async () => {
    if (!tripId) return;

    try {
      await createDetail(tripId, selectedTrip.alertas);

      await updateTrip(tripId, {
        endDate: new Date().toISOString(),
        status: "FINISHED",
      });

      setTripStarted(false);
      navigate("/conductor-dashboard");
    } catch (error) {
      console.error("Error al finalizar el viaje:", error);
      toast({
        title: "Error al finalizar el viaje",
        description: error.response?.data?.message || "Error inesperado",
        variant: "destructive",
      });
    }
  };

  if (!tripStarted) {
    return (
      <div className="min-h-screen bg-ispeed-gray flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-gray-100">
          <CardHeader className="text-center">
            <img src="/logo.png" alt="iSpeed Logo" className="h-12 w-auto mx-auto mb-4" />
            <CardTitle className="text-2xl text-ispeed-black">Iniciar Nuevo Viaje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-ispeed-black font-medium">Ciudad Origen</Label>
              <Select value={originCity} onValueChange={setOriginCity}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecciona ciudad de origen" />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map(city => (
                    <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-ispeed-black font-medium">Ciudad Destino</Label>
              <Select value={destinationCity} onValueChange={setDestinationCity}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecciona ciudad de destino" />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.filter(city => city.id !== originCity).map(city => (
                    <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => navigate("/conductor-dashboard")} className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50">
                Cancelar
              </Button>
              <Button onClick={startTrip} disabled={!originCity || !destinationCity || originCity === destinationCity} className="flex-1 bg-ispeed-red hover:bg-red-700 text-white">
                Comenzar Viaje
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  function formatTime(duration: number): React.ReactNode {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const pad = (num: number) => String(num).padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ispeed-black to-gray-800 text-white">
      <header className="bg-ispeed-black/90 backdrop-blur-sm border-b border-ispeed-red p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Viaje en Curso</h1>
            <p className="text-gray-300">{findCityNameById(originCity)} → {findCityNameById(destinationCity)}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono">{formatTime(tripData.duration)}</div>
            <p className="text-sm text-gray-300">Duración</p>
          </div>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className={`w-32 h-32 mx-auto rounded-full border-4 border-ispeed-red flex items-center justify-center transition-all duration-300 ${isAlertActive ? 'animate-voice-pulse bg-ispeed-red/20 scale-110' : 'bg-ispeed-red/10'}`}>
              <Mic className="w-16 h-16 text-ispeed-red" />
            </div>
            {isAlertActive && (
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-ispeed-red text-white px-4 py-2 rounded-lg text-sm font-medium animate-pulse">
                  {activeAlertMessage}
                </div>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Copiloto Virtual Activo</h2>
            <p className="text-gray-300 text-lg">Monitoreando tu conducción en tiempo real</p>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-ispeed-red">{tripData.alerts}</div>
              <div className="text-sm text-gray-300">Alertas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{tripData.responses}</div>
              <div className="text-sm text-gray-300">Respuestas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{tripData.alerts > 0 ? Math.round((tripData.responses / tripData.alerts) * 100) : 100}%</div>
              <div className="text-sm text-gray-300">Efectividad</div>
            </div>
          </div>
          <Button onClick={endTrip} size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4">
            <Square className="w-5 h-5 mr-2" /> Finalizar Viaje
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-700 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-white animate-road-move opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default TripPage;
