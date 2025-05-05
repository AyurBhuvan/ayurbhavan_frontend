import ky from "ky";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const search_api_url = process.env.NEXT_PUBLIC_SEARCH_API_BASE_URL;

const api = ky.create({
    prefixUrl: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    mode: "cors",
    credentials: "include",
    timeout: 10000
})

const search_api=ky.create({
    prefixUrl: search_api_url,
    headers: {
        'Content-Type': 'application/json',
    },

    timeout: 40000
})

export const search_api_get = async <T>(endpoint: string): Promise<T> => {
    console.log(search_api_url);
    
    return search_api.get(endpoint).json();
}

export const search_api_post = async <T>(endpoint: string, data: T,limit:number, options?: Partial<RequestInit>) => {
  return search_api.post(endpoint, {
      json: { ...data },
      ...options
  }).json();
}

export const get = async <T>(endpoint: string): Promise<T> => {
    return api.get(endpoint).json();
}

export const post = async <T>(endpoint: string, data: T, options?: Partial<RequestInit>) => {

    return api.post(endpoint, {
        json: { ...data },
        ...options
    }).json();



    // try {

    //     return response;
    // } catch (error:any) {
    //     // If the error is an HTTP error (like 4xx or 5xx), we can extract the status code
    //     console.log();


    //     if ( await error.response) {
    //         const statusCode = error.response.status;
    //         console.log(statusCode);

    //         const errorBody = await error.response.json(); // Optionally capture the error body
    //         // console.log(await error.response.json());

    //         throw new Error(`${errorBody.message || 'Unknown error'}`);
    //     }
    //     throw error;
    // }
}


export const patch = async <T>(endpoint: string, data: T, options?: Partial<RequestInit>) => {
    return api.patch(endpoint, {
        json: { ...data },
        ...options
    }).json()
}

export const del = async <T>(endpoint: string, data: T, options?: Partial<RequestInit>) => {
    return api.delete(endpoint, { json: { ...data }, ...options }).json();
}