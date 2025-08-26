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

  // formData solo incluye 'name' y 'guests'
  const [formData, setFormData] = useState({
    name: "",
    guests: "",
  })

  // Estados para la pantalla de inicio
  const [showInvitationContent, setShowInvitationContent] = useState(false);
  const [showViewInvitationButton, setShowViewInvitationButton] = useState(false);

  const targetDate = new Date('2025-09-13T00:00:00'); //

  // Lógica para la cuenta regresiva
  useEffect(() => {
    if (!showInvitationContent) return; // Solo iniciar el timer si el contenido principal está visible

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
  }, [targetDate, showInvitationContent]);

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
        setFormData({ name: '', guests: '' });
      } else {
        alert(`Error al enviar confirmación: ${result.message || 'Intente de nuevo.'}`);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un problema al enviar su confirmación. Por favor, intente más tarde.');
    }
  };

  // Datos de las fotos para la galería
  const quinceaneraPhotos = [
    { src: "/emma6.jpg", alt: "Emma 1" },
    { src: "/emma2.jpg", alt: "Emma 2" },
    { src: "/emma1.jpg", alt: "Emma 3" },
    { src: "/emma4.jpg", alt: "Emma 4" },
    { src: "/emma5.jpg", alt: "Emma 5" },
    { src: "/pau3.jpg", alt: "Paulina 1" },
    { src: "/pau2.jpg", alt: "Paulina 2" },
    { src: "/pau1.jpg", alt: "Paulina 3" },
    { src: "/pau4.jpg", alt: "Paulina 4" },
    { src: "/pau5.jpg", alt: "Paulina 5" },
  ];


  // Renderizado condicional: si showInvitationContent es falso, muestra la pantalla de inicio
  if (!showInvitationContent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 relative overflow-hidden">
        {/* Imagen de fondo a pantalla completa con animaciones */}
        <img
          src="/b.jpg" // Ruta de tu imagen para la pantalla de inicio
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
  return ( // <-- Esta es la línea 142 de tu error
    <div className="min-h-screen bg-[url('/fondoinvitacion.jpeg')] bg-cover bg-center bg-fixed relative">      {/* Elegant background pattern */}
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

      {/* Sección de la Cabecera/Invitación Principal - Reestructurada para el efecto de sobre */}
      {/* El header ahora ocupa todo el ancho y alto de la pantalla, con la imagen de fondo */}
      <header className="relative w-full overflow-hidden mb-16
                           bg-[url('/fondoinvitacion.jpeg')] bg-cover bg-center bg-no-repeat
                           min-h-screen flex items-center justify-center p-4 md:p-8"> {/* Ajustado min-h y bg-full para que la imagen se vea completa */}

          {/* Capa de brillo sobre el fondo, si es necesario */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/20 to-transparent blur-2xl"></div>

          {/* La "Tarjeta Blanca" superpuesta, que contiene el texto de la invitación */}
          {/* Reducido max-w para que el fondo del sobre sea visible a los lados */}
          <div className="relative z-10 bg-white rounded-xl shadow-2xl p-10 md:p-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto
                          flex flex-col items-center text-center animate-fade-in"
               style={{ minHeight: '400px' }}> {/* Ajusta minHeight para la tarjeta */}


            {/* Nombres de las Quinceañeras - Mayte equivalente (AHORA ES UNA IMAGEN) */}
            {/* Se reemplaza el h1 por la imagen directamente */}
            <img src="/emmaypau.png" alt="emma y pau XV Aniversario" className="w-48 mb-4 object-contain" />

            {/* Texto "Con la Bendición de Dios..." */}
            <p className="text-sm font-playfair uppercase text-slate-600 mb-4">
              Dando gracias a Dios por la vida y por el amor que nuestra familia nos ha dado, queremos compartir con ustedes
              este momento tan especial para nosotras.
            </p>

            {/* Mis padres */}
            <p className="text-lg font-playfair font-semibold text-slate-800 mb-2">Nuestros Padres</p>
            <p className="text-sm font-playfair uppercase text-slate-600 mb-4">
              Sandra Castillo Anaya<br/>
              Juan de Jesús Mendoza Camarena
            </p>

            {/* Mis padrinos*/}
            <p className="text-lg font-playfair font-semibold text-slate-800 mb-2">Nuestros Padrinos</p>
            <p className="text-sm font-playfair uppercase text-slate-600 mb-4">
              Maria Luisa Castillo Anaya<br/>
              Edgar Garcia Herrera
            </p>
          </div>
        </header>

      {/* Sección del Contador - Reestructurada para el efecto de fondo de imagen */}
      <section className="relative w-full overflow-hidden mb-20
                          bg-[url('/foto1.jpg')] bg-cover bg-center bg-no-repeat
                          min-h-[300px] flex items-center justify-center p-4"> {/* Ajusta min-h según tu imagen */}
        {/* Capa de superposición para mejorar la legibilidad del texto del contador */}
        <div className="absolute inset-0 bg-black/40"></div> {/* Oscurece el fondo */}

        <div className="relative z-10 text-center text-white">
          {/* Texto "Mi Gran Día" */}
          <p className="text-3xl md:text-5xl font-great-vibes mb-2">Nuestro Gran Día</p>
          {/* Fecha de la quinceañera */}
          <p className="text-xl md:text-3xl font-playfair mb-8">Sabado 13 septiembre 2025</p> {/* Ajusta la fecha real */}

          {/* Grid del Contador */}
          <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
            {[
              { value: timeLeft.days, label: "DÍAS" },
              { value: timeLeft.hours, label: "HRS" },
              { value: timeLeft.minutes, label: "MINS" },
              { value: timeLeft.seconds, label: "SEGS" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg"
              >
                <div className="text-3xl sm:text-4xl font-playfair tabular-nums mb-1">
                  {item.value.toString().padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm font-playfair uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content container - Este div ahora contiene el resto de las secciones */}
      <div className="container mx-auto px-6 py-12 relative z-10 max-w-4xl">
        {/* Elegant Photo Gallery */}
        <section className="mb-20">
          {/* Galería de fotos - Cuadrícula con 3 fotos por niña */}
          {(() => { // Usamos una IIFE para definir la constante dentro del renderizado
            const allPhotos = [
              { src: "/emma6.jpg", alt: "Emma 1" },
              { src: "/emma2.jpg", alt: "Emma 2" },
              { src: "/emma1.jpg", alt: "Emma 3" },
              { src: "/emma4.jpg", alt: "Emma 4" },
              { src: "/emma5.jpg", alt: "Emma 5" },
              { src: "/pau1.jpg", alt: "Paulina 1" },
              { src: "/pau2.jpg", alt: "Paulina 2" },
              { src: "/pau3.jpg", alt: "Paulina 3" },
              { src: "/pau4.jpg", alt: "Paulina 4" },
              { src: "/pau5.jpg", alt: "Paulina 5" },
            ];

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"> {/* Cuadrícula responsive */}
                {allPhotos.map((photo, index) => (
                  <div key={index} className="group relative">
                    <div className="relative overflow-hidden rounded-lg shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                      <img
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.alt}
                        className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105" // Altura ajustada
                      />
                      {/* Texto de la festejada (opcional, puedes adaptarlo o quitarlo) */}
                      <div className="absolute bottom-6 left-6 z-20">
                        <h3 className="text-2xl font-dancing text-white mb-1">{photo.alt.split(' ')[0]}</h3> {/* Extrae el nombre de alt */}
                        <div className="w-12 h-0.5 bg-white/60"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
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
                    <img
                      src="/iglesia.svg" // <--- ¡REEMPLAZA ESTO CON LA RUTA REAL DE TU SVG!
                      alt="Icono de Iglesia"
                      className="w-8 h-8 object-contain text-rose-600" />
                  </div>
                  <h3 className="text-xl font-playfair text-slate-800 mb-2">Misa</h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span className="font-playfair">
                      Parroquia Nuestra Señora Del Carmen
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar className="w-4 h-4 text-rose-500" />
                    <span className="font-playfair">Av. México Nte. 117 <br /> Tepic, Nayarit.</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="w-4 h-4 text-rose-500" />
                    <span className="font-playfair">19:30 hrs</span>
                  </div>
                  {/* Botón para ver el mapa de la Iglesia */}
                  <div className="mt-6">
                    <Button asChild className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-light h-12 shadow-lg hover:shadow-xl transition-all duration-300 tracking-wide">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img
                      src="/festejo.svg" // <--- ¡REEMPLAZA ESTO CON LA RUTA REAL DE TU SVG!
                      alt="Icono de Iglesia"
                      className="w-8 h-8 object-contain text-rose-600" />
                  </div>
                  <h3 className="text-xl font-playfair text-slate-800 mb-2">Recepción</h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span className="font-playfair">
                      Salón de Eventos María Magdalena
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span className="font-playfair">San Luis Nte 224, Col. San Antonio <br />
                      Tepic, Nayarit.</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="font-playfair">21:00 hrs</span>
                  </div>
                  {/* Botón para ver el mapa del Salón */}
                  <div className="mt-6">
                    <Button asChild className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-light h-12 shadow-lg hover:shadow-xl transition-all duration-300 tracking-wide">
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
                <h3 className="text-xl font-playfair text-slate-800 mb-2">Código de Vestimenta</h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-6"></div>
                {/* Reemplaza esto con la ruta real a tu imagen */}
                <img
                  src="/pareja.png"
                  alt="Código de Vestimenta Sugerido"
                  className="w-full rounded-md shadow-md mb-6"
                />
              </div>
              <p className="text-lg font-playfair text-slate-700 mb-6">Formal</p>
            </CardContent>
          </Card>
        </section>

        {/* Sugerencia de Regalo */}
        <section className="mb-20">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl max-w-2xl mx-auto min-h-[350px]"> {/* min-h para asegurar espacio */}
            <CardContent className="p-8 text-center flex flex-col h-full"> {/* Eliminado justify-between de aquí */}
              {/* Contenido superior de la tarjeta: Título y texto principal */}
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-playfair text-slate-800 mb-2">Sugerencia de regalo</h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-6"></div>
                </div>

                {/* Texto principal de sugerencia */}
                <p className="text-sm font-playfair text-slate-600 leading-relaxed mb-4">
                  Su presencia es nuestro mayor regalo, pero si<br />
                  desean hacernos un presente, un sobre será<br />
                  bienvenido o ponemos a su disposición<br />
                  nuestra mesa de regalos.
                </p>
              </div>

              {/* Contenido inferior: dividiendo el espacio con flexbox */}
              <div className="flex w-full mt-auto py-4"> {/* mt-auto para empujar hacia abajo, py-4 para espacio vertical */}
                {/* Columna izquierda para el icono (ocupando la mitad izquierda y centrándose en ella) */}
                <div className="flex-1 flex justify-center items-center"> {/* flex-1 para ocupar espacio, justify-center para centrar el icono */}
                  {/* Icono de sobre (Mail de Lucide-React) */}
                  <Mail className="w-20 h-20 text-slate-600" />
                </div>

                {/* Columna derecha para el botón y la imagen pequeña */}
                <div className="flex-1 flex flex-col justify-end items-end"> {/* flex-col para apilar verticalmente, justify-end para empujar al fondo, items-end para alinear a la derecha */}
                  {/* Imagen pequeña (arriba del botón) */}
                  <img src="/liverpool.png" alt="Logo Liverpool" className="w-12 h-12 object-contain mb-2" /> {/* Ajusta w- y h- y la ruta */}

                  {/* Botón Liverpool con link Mesa de regalos */}
                  <Button asChild variant="outline" className="border-rose-500 text-rose-500 hover:bg-rose-50 hover:text-rose-600 font-light h-10 px-4 shadow-md hover:shadow-lg transition-all duration-300 tracking-wide">
                    <a
                      href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51671268"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mesa de Regalos
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sugerencia de Hospedaje */}
        <section className="mb-20">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mb-8">
                <h3 className="text-xl font-playfair text-slate-800 mb-2">Sugerencia de hospedaje</h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-6"></div>
              </div>

              {/* Contenido de la sugerencia de hospedaje */}
              <div className="flex flex-col items-center justify-center mb-6">
                {/* Texto del hotel */}
                <p className="text-sm font-playfair text-slate-600 leading-relaxed mb-2">
                  Hotel City Express
                </p>
                {/* Dirección del hotel */}
                <p className="text-sm font-playfair text-slate-600 leading-relaxed mb-6">
                  Colima 93-Sur, San Antonio, 63159 Tepic, Nay.
                </p>

                {/* Botón para reservar */}
                <Button asChild className="w-full max-w-xs bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-light h-12 shadow-lg hover:shadow-xl transition-all duration-300 tracking-wide mb-4">
                  <a
                    href="https://www.marriott.com/es/event-reservations/reservation-link.mi?id=1752859500993&key=GRP&guestreslink2=true&app=resvlink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reservar
                  </a>
                </Button>

                {/* Botón para Ver en Mapa */}
                <Button asChild variant="outline" className="w-full max-w-xs border-rose-500 text-rose-500 hover:bg-rose-50 hover:text-rose-600 font-light h-12 shadow-md hover:shadow-lg transition-all duration-300 tracking-wide">
                  <a
                    href="https://maps.app.goo.gl/uBFyGy8YSHbJWRzQ8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver en Mapa
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Premium RSVP Form */}
        {/* Premium RSVP Form */}
        <section className="mb-16">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl max-w-lg mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-playfair text-slate-800 mb-2">Confirmación de Asistencia</h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-4"></div>
                <p className="text-sm font-playfair text-slate-600">
                  Por favor confirme su asistencia.
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
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-light h-12 shadow-lg hover:shadow-xl transition-all duration-300 tracking-wide
                            active:scale-98 active:shadow-inner" // ¡AÑADIDAS CLASES DE ACCIÓN AQUÍ!
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
            <p className="text-lg font-playfair text-slate-700 mb-2"> {/* CAMBIADO A font-playfair */}
              Esperamos compartir este momento especial con ustedes
            </p>
            <p className="text-lg font-playfair text-slate-700 mb-2"> {/* CAMBIADO A font-playfair */}
              Con cariño, Familia Mendoza Castillo
            </p>
          </div>
          <div className="flex justify-center gap-6 text-slate-400">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-playfair text-slate-700">+81 1123 0163</span> {/* CAMBIADO A font-playfair */}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-playfair">castillo.sandra.anaya@gmail.com</span> {/* CAMBIADO A font-playfair */}
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}