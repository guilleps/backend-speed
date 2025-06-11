import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Plus, Trash2, Mail, MapPin, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createUser, deleteUser, getUsers } from "@/services/user.service";
import { createCity, getCities } from "@/services/cities.service";
import { getCompanyById } from "@/services/company.service";

const ConfigurationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(1);

  const fetchDrivers = async () => {
    try {
      const users = await getUsers();
      const conductores = users
        .map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          password: "", // No deberías mostrarla realmente
          status: user.status ?? "Activo"
        }));

      setDrivers(conductores);
    } catch (error) {
      console.error("Error al cargar conductores:", error);
      toast({
        title: "Error al obtener conductores",
        description: "No se pudo cargar la lista de conductores",
        variant: "destructive",
      });
    }
  };

  const fetchCities = async () => {
    try {
      const cities = await getCities();
      const ciudades = cities
        .map(c => ({
          id: c.id,
          name: c.name,
          address: c.address
        }));

      setCities(ciudades);
    } catch (error) {
      console.error("Error al cargar ciudades:", error);
      toast({
        title: "Error al obtener ciudades",
        description: "No se pudo cargar la lista de ciudades",
        variant: "destructive",
      });
    }
  };

  const fetchCompany = async () => {
    if (!user?.companyId) return;
    try {
      const companyFounded = await getCompanyById(user.companyId);

      setCompanyData({
        name: companyFounded.name,
        ruc: companyFounded.ruc,
        address: companyFounded.address,
        phone: companyFounded.phone,
      });
    } catch (error) {
      console.error("Error al cargar la empresa:", error);
      toast({
        title: "Error al obtener la empresa",
        description: "No se pudo cargar la data de la empresa",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchCities();
    fetchCompany();
  }, []);


  // Datos de la empresa
  const [companyData, setCompanyData] = useState<
    { name: string, ruc: string, address: string, phone: string }
  >({ name: "", ruc: "", address: "", phone: "", });

  // Lista de conductores
  const [drivers, setDrivers] = useState<
    { id: string; name: string; email: string; password: string; status: string }[]
  >([]);

  // Lista de ciudades/sucursales
  const [cities, setCities] = useState<
    { id: string, name: string, address: string }[]
  >([]);

  // Formularios para nuevos registros
  const [newDriver, setNewDriver] = useState({ name: "", email: "", password: "" });
  const [newCity, setNewCity] = useState({ name: "", address: "" });

  if (!user || user.role !== 'company') {
    navigate('/login');
    return null;
  }

  const addDriver = async () => {
    if (!newDriver.name || !newDriver.email || !newDriver.password) {
      toast({
        title: "Error",
        description: "Completa todos los campos del conductor",
        variant: "destructive",
      });
      return;
    }

    try {
      const newUser = await createUser({
        name: newDriver.name,
        email: newDriver.email,
        password: newDriver.password,
        role: 'conductor'
      })

      setDrivers(prev => [
        ...prev,
        {
          id: newUser.id, // asegúrate de que `createUser` retorne `id`
          name: newUser.name,
          email: newUser.email,
          password: "", // no mostrar la real
          status: newUser.status ?? "Pendiente"
        }
      ]);

      setNewDriver({ name: "", email: "", password: "" });

      toast({
        title: "Conductor agregado",
        description: `Se enviará una invitación a ${newDriver.email}`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al crear conductor",
        description: error.response?.data?.message || "Error inesperado",
        variant: "destructive",
      });
    }
  }

  const removeDriver = async (id: string) => {
    try {
      await deleteUser(id); // llamada real al backend

      setDrivers(prev => prev.filter(driver => driver.id !== id));

      toast({
        title: "Conductor eliminado",
        description: "El conductor ha sido eliminado correctamente",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error al eliminar conductor",
        description: error?.response?.data?.message || "No se pudo eliminar el conductor",
        variant: "destructive",
      });
    }
  };

  const addCity = async () => {
    if (!newCity.name || !newCity.address) {
      toast({
        title: "Error",
        description: "Completa todos los campos de la ciudad",
        variant: "destructive",
      });
      return;
    }

    try {
      const newCit = await createCity({
        name: newCity.name,
        address: newCity.address,
      });

      setCities(prev => [
        ...prev,
        {
          id: newCit.id,
          name: newCit.name,
          address: newCit.address,
        }
      ]);

      setNewCity({ name: "", address: "" });

      toast({
        title: "Ciudad agregada",
        description: "La ciudad ha sido agregada correctamente",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al crear ciudad",
        description: error.response?.data?.message || "Error inesperado",
        variant: "destructive",
      });
    }
  };

  const removeCity = (id: string) => {
    setCities(cities.filter(city => city.id !== id));
    toast({
      title: "Ciudad eliminada",
      description: "La ciudad ha sido removida de la lista",
    });
  };

  return (
    <div className="min-h-screen bg-ispeed-gray">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-ispeed-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/company-dashboard')}
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
                <h1 className="text-xl font-semibold text-ispeed-black">Configuración</h1>
                <p className="text-sm text-gray-600">Configurar datos de la empresa</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: "Datos Empresa", icon: Users },
              { step: 2, title: "Conductores", icon: Users },
              { step: 3, title: "Ciudades", icon: MapPin }
            ].map(({ step, title, icon: Icon }) => (
              <div
                key={step}
                className={`flex items-center space-x-2 cursor-pointer ${activeStep === step ? "text-ispeed-red" : "text-gray-400"
                  }`}
                onClick={() => setActiveStep(step)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep === step ? "bg-ispeed-red text-white" : "bg-gray-200"
                  }`}>
                  {step}
                </div>
                <Icon className="w-5 h-5" />
                <span className="font-medium">{title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Company Data */}
        {activeStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-ispeed-black">Datos de la Empresa</CardTitle>
              <CardDescription>
                Información básica de tu empresa de transportes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Nombre de la Empresa</Label>
                  <Input
                    id="companyName"
                    value={companyData.name}
                    readOnly
                    className="mt-1 bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label htmlFor="ruc">RUC</Label>
                  <Input
                    id="ruc"
                    value={companyData.ruc}
                    readOnly
                    className="mt-1 bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Dirección</Label>
                <Textarea
                  id="address"
                  value={companyData.address}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, address: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={companyData.phone}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    toast({
                      title: "Datos guardados",
                      description: "La información de la empresa ha sido guardada correctamente",
                    });
                  }}
                  className="bg-ispeed-red hover:bg-red-700 text-white"
                >
                  Guardar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Drivers */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-ispeed-black">Agregar Conductor</CardTitle>
                <CardDescription>
                  Agrega los conductores que tendrán acceso al sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="driverName">Nombre Completo</Label>
                    <Input
                      id="driverName"
                      value={newDriver.name}
                      onChange={(e) => setNewDriver(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Juan Pérez"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="driverEmail">Correo Electrónico</Label>
                    <Input
                      id="driverEmail"
                      type="email"
                      value={newDriver.email}
                      onChange={(e) => setNewDriver(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="juan@correo.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="driverPassword">Contraseña</Label>
                    <Input
                      id="driverPassword"
                      value={newDriver.password}
                      onChange={(e) => setNewDriver(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="987654321"
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button
                  onClick={addDriver}
                  className="bg-ispeed-red hover:bg-red-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Conductor
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-ispeed-black">Conductores Registrados</CardTitle>
                <CardDescription>
                  Lista de conductores con acceso al sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {drivers.map((driver, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-ispeed-black">{driver.name}</h3>
                        <p className="text-sm text-gray-600">{driver.email}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={driver.status === "Activo" ? "default" : "secondary"}
                          className={driver.status === "Activo" ? "bg-green-500" : ""}
                        >
                          {driver.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeDriver(driver.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setActiveStep(1)}
                    className="border-gray-300 text-gray-600"
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Conductores guardados",
                        description: "La información de conductores ha sido guardada correctamente",
                      });
                    }}
                    className="bg-ispeed-red hover:bg-red-700 text-white"
                  >
                    Guardar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Cities */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-ispeed-black">Agregar Ciudad</CardTitle>
                <CardDescription>
                  Configura las ciudades donde tu empresa tiene sucursales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="cityName">Ciudad</Label>
                    <Input
                      id="cityName"
                      value={newCity.name}
                      onChange={(e) => setNewCity(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Lima"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cityAddress">Dirección de Sucursal</Label>
                    <Input
                      id="cityAddress"
                      value={newCity.address}
                      onChange={(e) => setNewCity(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Terminal Terrestre, Av. Principal 123"
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button
                  onClick={addCity}
                  className="bg-ispeed-red hover:bg-red-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Ciudad
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-ispeed-black">Ciudades Configuradas</CardTitle>
                <CardDescription>
                  Ciudades donde tu empresa tiene sucursales habilitadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cities.map((city, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-ispeed-black">{city.name}</h3>
                        <p className="text-sm text-gray-600">{city.address}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCity(city.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setActiveStep(2)}
                    className="border-gray-300 text-gray-600"
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Ciudades guardadas",
                        description: "La información de ciudades ha sido guardada correctamente",
                      });
                    }}
                    className="bg-ispeed-red hover:bg-red-700 text-white mr-2"
                  >
                    Guardar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationPage;
