// 👇 Lazy glob (IMPORTANTE: sin eager)
const modules = import.meta.glob(
  "../../assets/eventos/*/*.{jpg,jpeg,png,webp}"
);

// 👇 obtiene solo la primera imagen (cover)
export function getCover(folder) {
  const entry = Object.entries(modules).find(([path]) =>
    path.includes(`/eventos/${folder}/`)
  );

  return entry ? entry[1]().then((mod) => mod.default) : null;
}


// 👇 obtiene TODAS las imágenes (solo cuando se llame)
export async function getImagesByFolder(folder) {
  const entries = Object.entries(modules).filter(([path]) =>
    path.includes(`/eventos/${folder}/`)
);

const images = await Promise.all(
  entries.map(([, loader]) => loader().then((mod) => mod.default))
);

return images.sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true })
);
}

export function getImageCount(folder) {
  return Object.keys(modules).filter((path) =>
    path.includes(`/eventos/${folder}/`)
).length;
}

// 👇 metadata ligera (sin images precargadas)
export const eventos = [
  {
    slug: "mega-media-maraton-abril-2026",
    folder: "mega-media-maraton",
    title: "Mega media maratón - Abril 2026",
    imageCount: getImageCount("mega-media-maraton"),
    date: "2026-04-05",
    description:
    "En Equilibria formamos parte de la Mega Media Maratón de abril 2026 como patrocinadores, pero también como participantes activos.\n\nCorrimos junto a los atletas y, al mismo tiempo, estuvimos presentes brindando atención y acompañamiento durante toda la jornada.\n\nVivimos el running desde adentro. Sabemos lo que implica cada kilómetro, el desgaste, la exigencia y la recuperación, porque también somos corredores.\n\nPor eso, nuestro enfoque no se basa solo en teoría, sino en la experiencia real de quienes entienden el proceso en el propio cuerpo."
  },
  {
    slug: "aniversario-equilibria-2026",
    folder: "aniversario-equilibria-2026",
    title: "Aniversario Equilibria 2026",
    date: "2026-04-21",
    imageCount: getImageCount("aniversario-equilibria-2026"),
    description:
    "El Aniversario de Equilibria este 2026 fue un punto de encuentro entre comunidad, práctica y experiencia.\n\nNo se trató solo de celebrar un año más, sino de reunir a quienes forman parte del proceso: practicantes, usuarios y profesionales que trabajan día a día con el bienestar desde una perspectiva integral.\n\nDurante la jornada compartimos espacios de conexión, demostraciones y acompañamiento personalizado, mostrando en vivo cómo se aplican nuestras herramientas en contextos reales.\n\nEquilibria no es solo un servicio, es una comunidad en movimiento. Este aniversario reafirma nuestro compromiso con un enfoque práctico, humano y sostenible del bienestar."
  },
];
export const eventosOrdenados = [...eventos].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);