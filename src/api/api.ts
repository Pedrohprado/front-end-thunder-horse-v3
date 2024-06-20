export async function getAllDevices() {
  const url: string = import.meta.env.VITE_BASE_URL_URL_API;
  const response = await fetch(`${url}/allprocess`);
  const data = await response.json();

  return data;
}
