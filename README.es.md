# UNT — Ultimate Note Pad · Manual (Español)

[English](README.md) · [Português (BR)](README.pt-BR.md) · **Español**

![Versión](https://img.shields.io/badge/versi%C3%B3n-0.3.0-blue)
![Chrome](https://img.shields.io/badge/Chrome-114%2B-4285F4?logo=googlechrome&logoColor=white)
![Licencia](https://img.shields.io/badge/licencia-MIT-green)
![Sin conexión](https://img.shields.io/badge/100%25-sin%20conexi%C3%B3n-brightgreen)

**Bloc de borradores a mano alzada en el panel lateral de Chrome.** Notas rápidas,
cálculos matemáticos y dibujos con tu lápiz digital — sin cuentas, sin nube, sin
rastreo.

---

## Acerca de

**UNT (Ultimate Note Pad)** es una extensión para navegadores basados en Chrome que
convierte el panel lateral en una hoja de papel digital: escribe con el lápiz de tu
tableta, borra, deshaz y exporta como imagen. Todo sucede **localmente en tu
computadora** — ningún dato sale de ella.

Pensada para quien tiene un **lápiz digital (stylus) conectado a la PC** y quiere
anotar algo en 2 segundos sin abrir otro programa.

## Funciones

- **Panel lateral con alternancia inmediata** — haz clic en el ícono de la extensión para abrir/cerrar
- **Tinta sensible a la presión** — el grosor del trazo sigue la presión del lápiz
- **Rechazo de palma** — la palma de la mano no dibuja ni borra mientras usas el lápiz
- **Pantalla completa** — el botón *↗ Pantalla completa* o `Ctrl+Shift+U` abre el editor en su propia pestaña
- **Caja de texto** — el botón *Texto* muestra un área para escribir a máquina (Ctrl+Z deshace dentro de ella)
- **Herramientas esenciales** — 3 colores, 2 grosores, borrador, deshacer (`Ctrl+Z`) y limpiar
- **4 formatos de exportación** — `PNG`, `JPG`, `PDF` (una página) y `TXT` (el texto escrito), con un clic cada uno
- **100% sin conexión** — funciona sin internet; no se recopila ni se envía nada

## Requisitos

- Google Chrome 114 o superior (o navegadores Chromium/Edge/Vivaldi equivalentes)
- La tableta con lápiz es opcional — el mouse también funciona

## Instalación (modo desarrollador)

1. Descarga o clona este repositorio en una carpeta fija de tu computadora
2. Abre `chrome://extensions` en la barra de direcciones
3. Activa el **Modo de desarrollador** (interruptor en la esquina superior derecha)
4. Haz clic en **Cargar descomprimida** y selecciona la carpeta del proyecto
5. Listo — el ícono de UNT aparece en la barra de herramientas de Chrome

> **Consejo:** no elimines la carpeta después de instalar — Chrome carga la extensión
> desde ella. Para actualizar, descarga la nueva versión y haz clic en *Actualizar* en
> la tarjeta de la extensión.

## Uso

| Acción | Cómo |
|--------|------|
| Abrir/cerrar el bloc | Haz clic en el ícono de UNT en la barra de herramientas |
| Escribir | Toca el panel con el lápiz (o haz clic con el mouse) |
| Cambiar color/grosor | Botones en la barra de herramientas |
| Borrar | **Borrador** (borra trazos sin limpiar el resto) |
| Deshacer | **Deshacer** o `Ctrl+Z` |
| Limpiar todo | **Limpiar** (también se deshace con `Ctrl+Z`) |
| Pantalla completa | Botón **↗ Pantalla completa** o `Ctrl+Shift+U` |
| Escribir texto | Botón **Texto** (muestra el área de texto) |
| Descargar el texto como TXT | Botón **TXT** |
| Descargar el dibujo como PDF | Botón **PDF** (una página) |
| Descargar imagen | Botones **PNG** o **JPG** |

**Pantalla completa:** si el panel tiene un dibujo (y/o texto) al abrir la pestaña, el
contenido se **copia una vez** al editor en pantalla completa (aparece un aviso en el
pie). Después de eso, panel y pestaña son independientes — dibujar en uno no cambia el otro.

El atajo `Ctrl+Shift+U` se puede reconfigurar en `chrome://extensions/shortcuts`.

## Privacidad

- **Cero recopilación de datos.** La extensión no envía nada a ningún servidor — no existe
- **100% sin conexión.** Sin permiso de red, sin rastreo, sin cookies
- Permisos usados: `sidePanel` (el panel) y `storage` (preferencias locales)
- El código es abierto — audítalo libremente

## Limitaciones conocidas (v0.3)

- Los dibujos no se conservan entre sesiones de Chrome (guardar está en el roadmap)
- Al redimensionar el panel, el dibujo se mantiene sin distorsión en la esquina superior izquierda
- La caja de texto es una capa sobre la parte inferior del lienzo (no divide la vista)
- El PDF es una página con el dibujo como imagen (no es texto seleccionable)
- El OCR (manuscrito → texto) aún no está disponible

## Roadmap

- [x] Panel lateral con lápiz sensible a la presión
- [x] Modo pestaña a pantalla completa (`Ctrl+Shift+U`)
- [x] Exportación TXT y PDF
- [ ] OCR manuscrito → texto (procesado localmente)
- [ ] Guardar borradores entre sesiones
- [ ] Publicación en Chrome Web Store

## Licencia

MIT — ver [LICENSE](LICENSE). Libre para usar, modificar y distribuir.
