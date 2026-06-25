export async function getServicesProjectBackup() {
  const response = await fetch("/data/services-backup.json", {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("No se pudo cargar el backup local de servicios");
  }

  return response.json();
}

export function groupServicesByCategory(services) {
  const grouped = {};

  services.forEach((service) => {
    const category = service.category;

    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(service);
  });

  return grouped;
}