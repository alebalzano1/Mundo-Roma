# Mundo Roma 🌸✨
> Tienda Online Moderna, Catálogo de Productos y Checkout Automatizado por WhatsApp.

---

## 🛍️ Sobre el Proyecto
**Mundo Roma** es una plataforma de e-commerce y catálogo interactivo diseñada para ofrecer una experiencia de compra fluida, visualmente atractiva y cercana para los clientes.

Inspirada en una estética **3D Pastel** en tonos rosa, lila, turquesa y amarillo con microinteracciones y optimización responsive para dispositivos móviles y computadoras.

---

## ✨ Características Principales
- 🔍 **Buscador en Tiempo Real**: Filtrado instantáneo de productos por nombre y categoría.
- 🏷️ **Filtros por Categoría & Ordenamiento**: Navegación por Juguetes, Electrodomésticos, Bazar, Super Ofertas y ordenamiento por precios.
- 📦 **Modal de Detalle**: Ficha técnica de cada producto, galería de fotos, selector de cantidad y consulta directa.
- 🛒 **Carrito de Compras (Drawer)**: Carrito deslizable con persistencia en `localStorage`.
- 💬 **Checkout Directo por WhatsApp**: Genera automáticamente el mensaje con el detalle de los productos, cantidades y total listo para enviar.
- 📱 **100% Responsive**: Optimizado para teléfonos móviles, tablets y computadoras de escritorio.

---

## 🛠️ Tecnologías Utilizadas
- **HTML5 Semántico**: Estructura accesible y optimizada para SEO.
- **CSS3 Moderno**: Variables personalizadas, Flexbox, Grid, sombras suaves y animaciones 3D.
- **JavaScript Vanilla**: Lógica modular desacoplada para catálogo, carrito, modales y configuración.

---

## ⚙️ Configuración Rápida

### Cambiar el número de WhatsApp o Redes Sociales
Editar el archivo `js/config.js`:
```javascript
const SITE_CONFIG = {
  storeName: "Mundo Roma",
  phone: "+5491123456789", // Reemplazar con el número de WhatsApp oficial
  instagram: "https://instagram.com/mundoroma",
  ...
};
```

### Agregar o Modificar Productos
Editar el archivo `js/data/products.js`.

---

## 🚀 Despliegue y Uso Local
Solo abre el archivo `index.html` en cualquier navegador web o despliega la carpeta en **GitHub Pages**, **Vercel** o **Netlify**.

---
© 2026 Mundo Roma. Todos los derechos reservados.
