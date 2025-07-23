// INVITACION/app/page.tsx

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Users, Calendar, Phone, Mail } from "lucide-react"

export default function PremiumQuinceaneraInvitation() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // formData ahora solo incluye 'name' y 'guests'
  const [formData, setFormData] = useState({
    name: "",
    guests: "",
  })

  // Nuevos estados para la pantalla de inicio
  const [showInvitationContent, setShowInvitationContent] = useState(false); // Cambiado a showInvitationContent para claridad
  const [showViewInvitationButton, setShowViewInvitationButton] = useState(false);

  const targetDate = new Date('2025-09-13T00:00:00'); //

  // Lógica para la cuenta regresiva
  useEffect(() => {
    // Solo iniciar el timer si el contenido principal está visible
    if (!showInvitationContent) return;

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, showInvitationContent]); // Dependencia showInvitationContent

  // Lógica para la animación de la pantalla de inicio
  useEffect(() => {
    // La imagen se anima durante ~2 segundos (fade-in y scale-in)
    const imageAnimationTimer = setTimeout(() => {
      setShowViewInvitationButton(true); // Mostrar el botón después de que la imagen termine de aparecer
    }, 2500); // 2.5 segundos para que la animación de la imagen termine y aparezca el botón

    return () => clearTimeout(imageAnimationTimer);
  }, []);

  const handleViewInvitationClick = () => {
    setShowInvitationContent(true); // Mostrar el contenido principal de la invitación
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiRouteURL = '/api/rsvp'; // Apunta a tu API Route local

    try {
      const response = await fetch(apiRouteURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('¡Confirmación enviada exitosamente!');
        setFormData({ name: '', guests: '' }); // Limpiar el formulario
      } else {
        alert(`Error al enviar confirmación: ${result.message || 'Intente de nuevo.'}`);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un problema al enviar su confirmación. Por favor, intente más tarde.');
    }
  };

  // Renderizado condicional: si showInvitationContent es falso, muestra la pantalla de inicio
  if (!showInvitationContent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 relative overflow-hidden">
        {/* Imagen de fondo a pantalla completa con animaciones */}
        <img
          src="/foto.jpg" // Ruta de tu imagen
          alt="Las Festejadas"
          className="fixed inset-0 object-cover w-full h-full
                     animate-fade-in animate-scale-in" // Aplica las animaciones
          style={{ animationDuration: '2s', animationDelay: '0.2s' }}
        />

        {/* Botón "Ver Invitación" que aparece después de la animación */}
        {showViewInvitationButton && (
          <div className="fixed bottom-1/4 left-1/2 -translate-x-1/2 z-20"> {/* Posiciona el botón */}
            <Button
              onClick={handleViewInvitationClick}
              className="font-dancing text-3xl md:text-4xl text-white
                         bg-rose-500 bg-opacity-60 hover:bg-opacity-80
                         py-3 px-8 rounded-full shadow-lg transition-all duration-300
                         animate-fade-in" // Animación para el botón
              style={{ animationDuration: '1s', animationDelay: '0.1s' }}
            >
              Ver Invitación
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Si showInvitationContent es verdadero, se renderiza el contenido principal de la invitación
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-amber-50 relative">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      {/* Subtle floating elements - Mejorados para un efecto de "sparkle" */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute size-1 bg-white rounded-full opacity-0 animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${1.5 + Math.random() * 1.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10 max-w-4xl">
        {/* Premium Header */}
        <header className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/30 to-transparent blur-2xl"></div>
          <div className="relative">
            <div className="mb-8">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-6"></div>
              {/* Nombres de las Quinceañeras con tipografía extravagante */}
              <h1 className="text-5xl md:text-7xl font-great-vibes text-slate-800 mb-4 tracking-tight">
                Isabella <span className="text-rose-600">&</span> Sophia
              </h1>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
            </div>
            {/* Texto de la invitación mejorado */}
            <p className="text-xl md:text-3xl font-playfair text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-quince-purple-500 max-w-3xl mx-auto leading-loose p-6 border border-rose-200 rounded-lg shadow-lg backdrop-blur-sm bg-white/50 animate-fade-in text-center">
              Nos complacemos en invitarle a celebrar este momento tan especial en nuestras vidas, donde la tradición y la
              elegancia se unen en una velada inolvidable.
            </p>
          </div>
        </header>

        {/* Premium Countdown */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-playfair text-slate-700 mb-2">Cuenta Regresiva</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: timeLeft.days, label: "Días" },
              { value: timeLeft.hours, label: "Horas" },
              { value: timeLeft.minutes, label: "Minutos" },
              { value: timeLeft.seconds, label: "Segundos" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
              >
                <div className="text-3xl md:text-4xl font-playfair text-slate-800 mb-2 tabular-nums">
                  {item.value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm font-playfair text-slate-500 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Elegant Photo Gallery */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-playfair text-slate-700 mb-2">Nuestras Quinceañeras</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              { name: "Isabella", image: "/placeholder.svg?height=500&width=400&text=Isabella" },
              { name: "Sophia", image: "/placeholder.svg?height=500&width=400&text=Sophia" },
            ].map((person, index) => (
              <div key={index} className="group relative">
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <img
                    src={person.image || "/placeholder.svg"}
                    alt={person.name}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-2xl font-dancing text-white mb-1">{person.name}</h3>
                    <div className="w-12 h-0.5 bg-white/60"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Event Information */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-playfair text-slate-700 mb-2">Programa del Evento</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Ceremony */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-playfair">✝</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-playfair text-slate-800 mb-2">Ceremonia Religiosa</h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar className="w-4 h-4 text-rose-500" />
                    <span className="font-playfair">Sábado, 15 de Junio 2024</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="w-4 h-4 text-rose-500" />
                    <span className="font-playfair">18:00 hrs</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span className="font-playfair">
                      Parroquia San José
                      <br />
                      Av. Principal 123, Centro
                    </span>
                  </div>
                  {/* Botón para ver el mapa de la Iglesia */}
                  <div className="mt-6">
                    <Button asChild>
                      <a
                        href="https://maps.app.goo.gl/ST9yq8rh9vif4WzD8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        Ver Ubicación en Mapa
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reception */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-playfair">🥂</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-playfair text-slate-800 mb-2">Recepción</h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span className="font-playfair">Sábado, 15 de Junio 2024</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="font-playfair">20:30 hrs</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span className="font-playfair">
                      Salón Elegancia Premium
                      <br />
                      Boulevard de los Sueños 456
                    </span>
                  </div>
                  {/* Botón para ver el mapa del Salón */}
                  <div className="mt-6">
                    <Button asChild>
                      <a
                        href="https://maps.app.goo.gl/d8ar4D9w8MvLLUnW6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        Ver Ubicación en Mapa
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Dress Code */}
        <section className="mb-20">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-playfair">👔</span>
                  </div>
                </div>
                <h3 className="text-xl font-playfair text-slate-800 mb-2">Código de Vestimenta</h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto"></div>
              </div>
              <p className="text-lg font-playfair text-slate-700 mb-6">Formal / Cocktail</p>
              <div className="flex justify-center gap-3 mb-6">
                <div className="w-6 h-6 bg-slate-800 rounded-full shadow-md"></div>
                <div className="w-6 h-6 bg-rose-600 rounded-full shadow-md"></div>
                <div className="w-6 h-6 bg-amber-600 rounded-full shadow-md"></div>
                <div className="w-6 h-6 bg-slate-600 rounded-full shadow-md"></div>
              </div>
              <p className="text-sm font-playfair text-slate-600 leading-relaxed">
                Sugerimos vestimenta formal en tonos elegantes. <br />
                Evitar colores blancos y tonos muy llamativos.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Premium RSVP Form */}
        <section className="mb-16">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl max-w-lg mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-playfair text-slate-800 mb-2">Confirmación de Asistencia</h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-4"></div>
                <p className="text-sm font-playfair text-slate-600">
                  Por favor confirme su asistencia antes del 1 de Junio
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-slate-200 focus:border-rose-400 focus:ring-rose-400/20 bg-white/50 backdrop-blur-sm h-12"
                    required
                  />
                </div>
                {/* Campos de correo electrónico y teléfono eliminados según la solicitud previa */}
                <div>
                  <Select
                    value={formData.guests}
                    onValueChange={(value) => setFormData({ ...formData, guests: value })}
                  >
                    <SelectTrigger className="border-slate-200 focus:border-rose-400 focus:ring-rose-400/20 bg-white/50 backdrop-blur-sm h-12">
                      <SelectValue placeholder="Número de invitados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 persona</SelectItem>
                      <SelectItem value="2">2 personas</SelectItem>
                      <SelectItem value="3">3 personas</SelectItem>
                      <SelectItem value="4">4 personas</SelectItem>
                      <SelectItem value="5">5 personas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-light h-12 shadow-lg hover:shadow-xl transition-all duration-300 tracking-wide"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Confirmar Asistencia
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Elegant Footer */}
        <footer className="text-center py-12 border-t border-slate-200/50">
          <div className="mb-6">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-4"></div>
            <p className="text-lg font-playfair text-slate-700 mb-2">
              Esperamos compartir este momento especial con usted
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}