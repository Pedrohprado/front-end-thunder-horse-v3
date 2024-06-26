export const url = import.meta.env.VITE_BASE_URL_URL_API;

export async function getAllDevices() {
  const url: string = import.meta.env.VITE_BASE_URL_URL_API;
  const response = await fetch(`${url}/allprocess`);
  const data = await response.json();

  return data;
}

export async function getLastWeldBead(id: string) {
  const url: string = import.meta.env.VITE_BASE_URL_URL_API;
  if (id) {
    const response = await fetch(`${url}/lastweldbead/${id}`);
    const data = await response.json();
    return data;
  }
}
