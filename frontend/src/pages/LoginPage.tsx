import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ShieldCheck, Truck } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"company" | "conductor">("company");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password, role);
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido como ${role === 'company' ? 'company' : 'conductor'}`,
      });

      if (role === "company") {
        navigate("/company-dashboard");
      } else {
        navigate("/conductor-dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Credenciales incorrectas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ispeed-gray to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img
              src="/logo.png"
              alt="iSpeed Logo"
              className="h-16 w-auto mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl font-bold text-ispeed-black">
            Iniciar Sesión
          </h1>
          <p className="text-gray-600 mt-2">
            Accede a tu cuenta de iSpeed
          </p>
        </div>

        <Card className="border-2 border-gray-100 shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-ispeed-black">Bienvenido</CardTitle>
            <CardDescription className="text-center">
              Selecciona tu tipo de usuario e ingresa tus credenciales
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Barra para seleccionar tipo de usuario */}
            <div className="mb-6">
              <div className="bg-gray-100 p-1 rounded-lg flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setRole("company")}
                  className={`flex items-center justify-center w-1/2 py-2 px-4 rounded-md transition-all ${role === "company"
                      ? "bg-ispeed-red text-white shadow-md"
                      : "bg-transparent text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Empresa
                </button>
                <button
                  type="button"
                  onClick={() => setRole("conductor")}
                  className={`flex items-center justify-center w-1/2 py-2 px-4 rounded-md transition-all ${role === "conductor"
                      ? "bg-ispeed-red text-white shadow-md"
                      : "bg-transparent text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Conductor
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-ispeed-black font-medium">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    required
                    className="mt-1 pl-10"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-ispeed-black font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="mt-1 pl-10"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-ispeed-red hover:bg-red-700 text-white py-2 h-11 text-base transition-all hover:shadow-lg"
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-ispeed-red hover:underline font-medium"
                >
                  Registra tu empresa
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;