import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Bus, ChevronLeft, Eye, EyeOff, ShieldCheck } from "lucide-react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    ruc: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "El nombre de la empresa es requerido";
      if (!formData.ruc.trim()) newErrors.ruc = "El RUC es requerido";
      else if (!/^\d{11}$/.test(formData.ruc)) newErrors.ruc = "El RUC debe tener 11 dígitos";

      if (!formData.address.trim()) newErrors.address = "La dirección es requerida";
      if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido";
    } else if (currentStep === 2) {
      if (!formData.email.trim()) newErrors.email = "El correo electrónico es requerido";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Formato de correo inválido";

      if (!formData.password) newErrors.password = "La contraseña es requerida";
      else if (formData.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres";

      if (!formData.confirmPassword) newErrors.confirmPassword = "Confirme su contraseña";
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return { strength: 0, label: "" };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const labels = ["Débil", "Regular", "Buena", "Fuerte", "Excelente"];
    return {
      strength,
      label: labels[strength] || "",
      color: ["red", "orange", "yellow", "green", "green"][strength] || ""
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(2)) return;

    setLoading(true);

    try {
      await register(formData);
      toast({
        title: "Registro exitoso",
        description: "Empresa registrada correctamente. Ahora puedes iniciar sesión.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al registrar la empresa",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-ispeed-gray to-white py-12 px-4">
      <div className="max-w-2xl mx-auto mb-16">
        <div className="text-center mb-8">
          <Link to="/">
            <img
              src="/logo.png"
              alt="iSpeed Logo"
              className="h-16 w-auto mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl font-bold text-ispeed-black">
            Registrar Empresa
          </h1>
          <p className="text-gray-600 mt-2">
            Únete a iSpeed y mejora la seguridad de tu flota
          </p>
        </div>

        {/* Progreso de los pasos */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-ispeed-red text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-ispeed-red' : 'bg-gray-200'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-ispeed-red text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
          </div>
        </div>

        <Card className="border-2 border-gray-100 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-ispeed-black">
              {step === 1 && <Bus className="mr-2 h-5 w-5 text-ispeed-red" />}
              {step === 2 && <ShieldCheck className="mr-2 h-5 w-5 text-ispeed-red" />}
              {step === 1 && "Datos de la Empresa"}
              {step === 2 && "Datos de Acceso"}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 1 && "Completa la información para registrar tu empresa"}
              {step === 2 && "Crea tus credenciales de acceso seguras"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                      <Label htmlFor="name" className="text-ispeed-black font-medium">
                        Nombre de la Empresa *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Transportes ABC S.A.C."
                        className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="ruc" className="text-ispeed-black font-medium">
                        RUC *
                      </Label>
                      <Input
                        id="ruc"
                        name="ruc"
                        value={formData.ruc}
                        onChange={handleChange}
                        placeholder="20123456789"
                        className={`mt-1 ${errors.ruc ? 'border-red-500' : ''}`}
                      />
                      {errors.ruc && (
                        <p className="text-red-500 text-sm mt-1">{errors.ruc}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                      <Label htmlFor="address" className="text-ispeed-black font-medium">
                        Dirección *
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Av. Principal 123, Lima, Perú"
                        className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-ispeed-black font-medium">
                        Teléfono de la Empresa *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01-2345678"
                        className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-ispeed-black font-medium">
                      Correo Electrónico *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contacto@empresa.com"
                      className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-ispeed-black font-medium">
                      Contraseña *
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`mt-1 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}

                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${passwordStrength.strength === 0 ? 'bg-red-500' :
                                passwordStrength.strength === 1 ? 'bg-orange-500' :
                                  passwordStrength.strength === 2 ? 'bg-yellow-500' :
                                    'bg-green-500'
                                }`}
                              style={{ width: `${(passwordStrength.strength + 1) * 20}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">{passwordStrength.label}</span>
                        </div>
                        <ul className="text-xs text-gray-500 mt-2 space-y-1">
                          <li className={formData.password.length >= 8 ? 'text-green-500' : ''}>
                            • Mínimo 8 caracteres
                          </li>
                          <li className={/[A-Z]/.test(formData.password) ? 'text-green-500' : ''}>
                            • Al menos una letra mayúscula
                          </li>
                          <li className={/[0-9]/.test(formData.password) ? 'text-green-500' : ''}>
                            • Al menos un número
                          </li>
                          <li className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-500' : ''}>
                            • Al menos un carácter especial
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-ispeed-black font-medium">
                      Confirmar Contraseña *
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`mt-1 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-ispeed-red text-ispeed-red hover:bg-ispeed-red hover:text-white"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Anterior
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Volver
                  </Button>
                )}

                {step < 2 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-ispeed-red hover:bg-red-700 text-white"
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-ispeed-red hover:bg-red-700 text-white"
                    disabled={loading}
                  >
                    {loading ? "Registrando..." : "Registrar Empresa"}
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-ispeed-red hover:underline font-medium"
                >
                  Iniciar sesión
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
