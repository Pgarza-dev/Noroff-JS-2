export async function fetcher({
  url,
  method = "GET",
  body = null,
  needsAuth = true,
  headers = {},
  query = {},
}) {
  try {
    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    if (needsAuth) {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found, please log in again.");
      }
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    const queryString = new URLSearchParams(
      Object.entries(query).map(([key, value]) => [
        key,
        value === true ? "true" : value,
      ]),
    ).toString();

    const completeUrl = queryString ? `${url}?${queryString}` : url;

    const fetchOptions = {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(completeUrl, fetchOptions);

    if (response.status === 401) {
      const errorJson = await response.json();
      throw new Error(errorJson.errors[0].message);
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}, status ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    return { error: true, message: error.message };
  }
}
