export async function apiFetch<T, K = unknown>(
  body: T,
  url: string,
  method: string
): Promise<K | void> {
  const res = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  debugger;

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  // Check if data is null or an empty object, array
  if (
    data === null ||
    (typeof data === "object" && Object.keys(data).length === 0) ||
    (Array.isArray(data) && data.length === 0)
  ) {
    return;
  }

  return data as K;
}
