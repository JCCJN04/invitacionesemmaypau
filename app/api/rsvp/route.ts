// INVITACION/app/api/rsvp/route.ts

import { NextResponse } from 'next/server';

// Obtén la URL de Apps Script de las variables de entorno
// ¡CORREGIDO AQUÍ A MINÚSCULAS Y CON NAMESPACE app!
const APPS_SCRIPT_WEB_APP_URL = process.env.APP_APPS_SCRIPT_WEB_APP_URL; 

if (!APPS_SCRIPT_WEB_APP_URL) {
  console.error("Falta la variable de entorno APP_APPS_SCRIPT_WEB_APP_URL. Asegúrate de definirla en Firebase Functions.");
  // Considera un manejo de errores más robusto para producción
}

export async function POST(req: Request) {
  if (!APPS_SCRIPT_WEB_APP_URL) {
    return NextResponse.json({ success: false, message: 'Error de configuración del servidor: URL de Apps Script no definida.' }, { status: 500 });
  }

  try {
    const formData = await req.json(); // La API Route recibe JSON del frontend

    // Transformar el objeto JSON a una cadena URL-encoded
    const params = new URLSearchParams();
    for (const key in formData) {
      params.append(key, formData[key]);
    }
    const urlEncodedBody = params.toString();

    // Reenviar la solicitud a Google Apps Script
    const appsScriptResponse = await fetch(APPS_SCRIPT_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // ¡CRUCIAL! Esto es lo que Apps Script espera para e.parameter
      },
      body: urlEncodedBody, // Enviamos el cuerpo URL-encoded
    });

    // Parsea la respuesta de Apps Script
    const appsScriptResult = await appsScriptResponse.json();

    // Reenvía la respuesta de Apps Script al frontend
    if (appsScriptResponse.ok) {
      return NextResponse.json(appsScriptResult, { status: 200 });
    } else {
      // Si Apps Script devuelve un error, lo reenviamos
      return NextResponse.json(appsScriptResult, { status: appsScriptResponse.status });
    }

  } catch (error) {
    console.error('Error en la API Route al reenviar a Apps Script:', error);
    return NextResponse.json({ success: false, message: 'Error interno del servidor al procesar la confirmación.' }, { status: 500 });
  }
}