import { API_BASE_URL } from "../constants";
import { fetcher } from "./fetcher";
import toastStore from "@/lib/stores/toastStore";

function handleErrors(
  error,
  message = "Something went wrong! Please try again.",
) {
  console.error(error);
  toastStore.addToast(message, "error");
}

/**
 * Makes a call to the Noroff API, using a generic fetcher function.
 *
 * @param {Object} options - The options for the API call.
 * @param {string} options.endpoint - The API endpoint to call.
 * @param {string} [options.method='GET'] - The HTTP method to use.
 * @param {Object} [options.body=null] - The body of the request, for POST, PUT, etc.
 * @param {Object} [options.query={}] - Query parameters to include in the API call.
 * @param {string} [options.errorMessage] - Custom error message for this API call.
 * @param {*} [options.defaultReturn=[]] - The default value to return if the API call fails.
 *
 * @return {Promise<*>} - A promise that resolves to the API response data or to the defaultReturn value in case of an error.
 */
export async function makeApiCall({
  endpoint,
  method = "GET",
  body = null,
  query = {},
  needsAuth = true,
  errorMessage,
  defaultReturn = [],
}) {
  try {
    if (method === "GET") {
      body = null;
    } else {
      body = {
        ...body,
      };
    }
    const result = await fetcher({
      url: API_BASE_URL + endpoint,
      method,
      body,
      needsAuth,
      query: {
        ...query,
      },
    });

    if (result.error) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    handleErrors(error, errorMessage);
    return defaultReturn;
  }
}
