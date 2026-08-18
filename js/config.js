// Configuración General de Mundo Roma
const SITE_CONFIG = {
  storeName: "Mundo Roma",
  slogan: "Todo lo que buscás, en un solo lugar",
  subSlogan: "Juguetes, electrodomésticos, bazar y mucho más con la mejor calidad y precios accesibles.",
  phone: "+5491123456789", // Reemplazar con el número real de WhatsApp de la tienda (ej: 54911xxxxxxxx)
  phoneDisplay: "+54 9 11 2345-6789",
  email: "contacto@mundoroma.com",
  instagram: "https://instagram.com/mundoroma",
  facebook: "https://facebook.com/mundoroma",
  currency: "$",
  currencyCode: "ARS",
  freeShippingThreshold: 50000,
  welcomeMessage: "¡Hola Mundo Roma! Quiero realizar el siguiente pedido:",
  closingMessage: "Quisiera consultar disponibilidad, medios de pago y coordinar la entrega. ¡Muchas gracias!"
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
