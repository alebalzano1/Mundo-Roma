// Base de Datos de Productos y Categorías - Mundo Roma
const CATEGORIES = [
  {
    id: "todos",
    name: "Todos los productos",
    icon: "sparkles",
    badge: "Catálogo completo"
  },
  {
    id: "juguetes",
    name: "Juguetes",
    icon: "puzzle",
    description: "Diversión, imaginación y juegos para todas las edades.",
    image: "assets/images/teddy-bear.jpg",
    badge: "Populares"
  },
  {
    id: "electro",
    name: "Electrodomésticos",
    icon: "zap",
    description: "Equipamiento práctico, moderno y eficiente para el hogar.",
    image: "assets/images/washing-machine.jpg",
    badge: "Hogar"
  },
  {
    id: "bazar",
    name: "Bazar y Hogar",
    icon: "home",
    description: "Utensilios, organización y detalles que transforman tu espacio.",
    image: "assets/images/bazaar-set.jpg",
    badge: "Tendencia"
  },
  {
    id: "tecnologia",
    name: "Tecnología y Gadgets",
    icon: "cpu",
    description: "Accesorios inteligentes, audio y gadgets prácticos.",
    image: "assets/images/hydrogel-gun.jpg",
    badge: "Novedades"
  },
  {
    id: "ofertas",
    name: "Super Ofertas",
    icon: "percent",
    description: "Precios imperdibles con descuentos especiales por tiempo limitado.",
    image: "assets/images/toy-car.jpg",
    badge: "Hasta -30%"
  }
];

const PRODUCTS = [
  {
    id: "prod-01",
    name: "Oso Teddy Peluche Deluxe",
    slug: "oso-teddy-peluche-deluxe",
    category: "juguetes",
    categoryName: "Juguetes",
    price: 18500,
    oldPrice: 23000,
    discount: "-20%",
    tag: "MÁS VENDIDO",
    rating: 4.9,
    reviewsCount: 320,
    featured: true,
    inStock: true,
    image: "assets/images/teddy-bear.jpg",
    images: [
      "assets/images/teddy-bear.jpg"
    ],
    shortDesc: "Peluche ultrasuave de colección con moño rosa y detalles bordados premium.",
    description: "Hermoso oso de peluche con acabado ultra esponjoso y antialérgico. Fabricado con materiales hipoalergénicos de altísima calidad, costuras reforzadas y un elegante moño rosa pastel con lunares. Ideal para regalar, decorar habitaciones infantiles o acompañar los momentos de descanso.",
    specs: [
      { label: "Material", value: "Felpa hipoalergénica premium" },
      { label: "Medidas", value: "32 cm de alto" },
      { label: "Lavable", value: "Apto lavado a mano" },
      { label: "Edad recomendada", value: "+0 años" }
    ]
  },
  {
    id: "prod-02",
    name: "Auto Pastel con Bloques de Construcción",
    slug: "auto-pastel-con-bloques",
    category: "juguetes",
    categoryName: "Juguetes",
    price: 15900,
    oldPrice: 19500,
    discount: "-18%",
    tag: "TENDENCIA",
    rating: 4.8,
    reviewsCount: 210,
    featured: true,
    inStock: true,
    image: "assets/images/toy-car.jpg",
    images: [
      "assets/images/toy-car.jpg"
    ],
    shortDesc: "Vehículo rodante con set de bloques encastrables para estimulación temprana.",
    description: "Divertido auto rodante en colores pasteles con ruedas suaves que no rayan el piso. Incluye un set de bloques modulares encastrables de motricidad fina que estimulan la creatividad, el reconocimiento de formas y la coordinación mano-ojo en los más chicos.",
    specs: [
      { label: "Material", value: "Plástico ABS libre de BPA" },
      { label: "Piezas", value: "Auto + 5 bloques apilables" },
      { label: "Seguridad", value: "Bordes 100% redondeados" },
      { label: "Edad recomendada", value: "+12 meses" }
    ]
  },
  {
    id: "prod-03",
    name: "Mini Lavarropas Retro Pastel",
    slug: "mini-lavarropas-retro-pastel",
    category: "electro",
    categoryName: "Electrodomésticos",
    price: 34500,
    oldPrice: 42000,
    discount: "-18%",
    tag: "DESTACADO",
    rating: 4.9,
    reviewsCount: 150,
    featured: true,
    inStock: true,
    image: "assets/images/washing-machine.jpg",
    images: [
      "assets/images/washing-machine.jpg"
    ],
    shortDesc: "Lavadora compacta eléctrica para prendas delicadas, esponjas de maquillaje y accesorios.",
    description: "Práctica y hermosa mini lavadora compacta con diseño vintage en tonos pastel rosa y lila. Cuenta con motor de rotación bidireccional suave, tambor de acero inoxidable con visor transparente y perilla de control temporizado. Perfecta para el cuidado de ropa interior, ropa de bebé o limpieza de brochas y esponjas.",
    specs: [
      { label: "Capacidad", value: "1.5 Litros" },
      { label: "Alimentación", value: "Conexión USB / 220V adaptable" },
      { label: "Funciones", value: "Lavado suave + Centrifugado exprés" },
      { label: "Garantía", value: "6 meses directa" }
    ]
  },
  {
    id: "prod-04",
    name: "Set Completo de Bazar & Utensilios Pastel",
    slug: "set-completo-bazar-utensilios-pastel",
    category: "bazar",
    categoryName: "Bazar y Hogar",
    price: 19800,
    oldPrice: 24500,
    discount: "-19%",
    tag: "MÁS VENDIDO",
    rating: 5.0,
    reviewsCount: 185,
    featured: true,
    inStock: true,
    image: "assets/images/bazaar-set.jpg",
    images: [
      "assets/images/bazaar-set.jpg"
    ],
    shortDesc: "Kit de 8 piezas de cocina con mango ergonómico de madera y canasto organizador.",
    description: "Renová tu cocina con este completo y adorable set de utensilios de silicona de grado alimenticio que no rayan tus ollas ni sartenes. Resistentes a altas temperaturas (hasta 230°C), con mangos de madera natural pulida y canasta organizadora de metal con acabado epoxi rosa.",
    specs: [
      { label: "Contenido", value: "Espátula, batidor, cuchara, pincel, dispensadores y canasto" },
      { label: "Material", value: "Silicona alimentaria + Madera natural" },
      { label: "Térmico", value: "-40°C hasta 230°C" },
      { label: "Antiadherente", value: "No raya teflón ni cerámica" }
    ]
  },
  {
    id: "prod-05",
    name: "Pistola Blaster de Hidrogel Automática",
    slug: "pistola-blaster-hidrogel-automatica",
    category: "juguetes",
    categoryName: "Juguetes",
    price: 28500,
    oldPrice: 35000,
    discount: "-18%",
    tag: "OFERTA",
    rating: 4.9,
    reviewsCount: 290,
    featured: true,
    inStock: true,
    image: "assets/images/hydrogel-gun.jpg",
    images: [
      "assets/images/hydrogel-gun.jpg"
    ],
    shortDesc: "Lanzador eléctrico recargable con tolva transparente y 5000 bolitas de hidrogel ecológicas.",
    description: "La diversión del verano asegurada. Pistola eléctrica automática de hidrogel con batería recargable de litio, mecanismo de disparo rápido y municiones de hidrogel 100% biodegradables y seguras que se desintegran al impacto sin manchar la ropa. Incluye gafas protectoras y cable de carga rápida.",
    specs: [
      { label: "Modo de disparo", value: "Automático por ráfagas" },
      { label: "Batería", value: "7.4V recargable por USB (incluida)" },
      { label: "Alcance", value: "Hasta 20 metros" },
      { label: "Incluye", value: "Tolva + 5000 orbes + Gafas + Cable USB" }
    ]
  },
  {
    id: "prod-06",
    name: "Batidora Planetaria Pastel Chef",
    slug: "batidora-planetaria-pastel-chef",
    category: "electro",
    categoryName: "Electrodomésticos",
    price: 49900,
    oldPrice: 58000,
    discount: "-14%",
    tag: "PREMIUM",
    rating: 4.9,
    reviewsCount: 95,
    featured: false,
    inStock: true,
    image: "assets/images/hero-composition.jpg",
    images: [
      "assets/images/hero-composition.jpg"
    ],
    shortDesc: "Batidora planetaria con bowl de acero de 4L y 6 velocidades para repostería.",
    description: "Ideal para preparar masas, cremas, merengues y panes de manera rápida y sin esfuerzo. Movimiento planetario profesional que garantiza un mezclado uniforme, 6 niveles de potencia con pulsador y 3 accesorios intercambiables de fundición de aluminio y acero inoxidable.",
    specs: [
      { label: "Potencia", value: "800W de alto rendimiento" },
      { label: "Capacidad del Bowl", value: "4 Litros en Acero Inox" },
      { label: "Accesorios", value: "Batidor globo, gancho amasador y mezclador plano" },
      { label: "Garantía", value: "1 año oficial" }
    ]
  },
  {
    id: "prod-07",
    name: "Frigo Mini Retro Pastel 10L",
    slug: "frigo-mini-retro-pastel-10l",
    category: "electro",
    categoryName: "Electrodomésticos",
    price: 59000,
    oldPrice: 69000,
    discount: "-15%",
    tag: "DESTACADO",
    rating: 5.0,
    reviewsCount: 88,
    featured: false,
    inStock: true,
    image: "assets/images/hero-composition.jpg",
    images: [
      "assets/images/hero-composition.jpg"
    ],
    shortDesc: "Heladera compacta portátil para bebidas, snacks, cosméticos y skincare.",
    description: "Frigobar portátil termoeléctrico con doble función de frío y calor. Su diseño retro en lila pastel y puerta con estantes regulables la convierte en el complemento perfecto para el dormitorio, oficina o tocador de belleza.",
    specs: [
      { label: "Capacidad", value: "10 Litros (hasta 12 latas)" },
      { label: "Doble Función", value: "Enfría hasta 18°C bajo ambiente / Calienta hasta 60°C" },
      { label: "Conexión", value: "220V hogar y 12V para auto" },
      { label: "Silenciosa", value: "Bajo nivel de ruido < 28dB" }
    ]
  },
  {
    id: "prod-08",
    name: "Cubo Mágico Antiestrés Pastel 3x3",
    slug: "cubo-magico-antiestres-pastel",
    category: "juguetes",
    categoryName: "Juguetes",
    price: 7500,
    oldPrice: 9500,
    discount: "-21%",
    tag: "OFERTA",
    rating: 4.7,
    reviewsCount: 142,
    featured: false,
    inStock: true,
    image: "assets/images/toy-car.jpg",
    images: [
      "assets/images/toy-car.jpg"
    ],
    shortDesc: "Cubo de velocidad con giro suave y stickers mate en colores pastel suaves.",
    description: "Cubo de Rubik de velocidad profesional con mecanismo magnético interno para transiciones ultrasuaves sin atascos. Diseñado con una paleta pastel relajante para la vista, ideal para desarrollar el pensamiento espacial y liberar el estrés diario.",
    specs: [
      { label: "Dimensiones", value: "5.6 x 5.6 x 5.6 cm" },
      { label: "Mecanismo", value: "Ajustable con resortes de precisión" },
      { label: "Material", value: "Plástico ecológico reciclable" }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CATEGORIES, PRODUCTS };
}
