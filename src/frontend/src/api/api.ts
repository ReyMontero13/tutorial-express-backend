//src/api.ts

const API_URL = "http://localhost:5000";

const getToken = () => {
  return localStorage.getItem("token");
};

// Helper function to handle fetch errors
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

// export const fetchUsers = async (): Promise<any> => { // Replace `any` with the appropriate type if known
//     try {
//         const response = await fetch(`${API_URL}/users`, {
//             headers: {
//                 'Authorization': `Bearer ${getToken()}`, // Invoke the getToken function
//                 'Content-Type': 'application/json',
//             }
//         });
//         console.log('Response status:', response.status);
//         return handleResponse(response);
//     } catch (error) {
//         console.error('Fetch users error:', error);
//         return Promise.reject(error); // Ensure the function returns a rejected promise
//     }
// };

export async function getFetch(url: string) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return handleResponse(response);
}

export const fetchUsers = async (): Promise<any> => {
  const token = getToken();
  console.log(token);
  // if (!token) {
  //     return Promise.reject(new Error('No token found'));
  // }

  const url = `${API_URL}/users`;
  return getFetch(url); //soon add token - getFetch(url, token)
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchUser = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  return response.json();
};

// export const createUser = async (name: string, email: string) => {
//     const response = await fetch(`${API_URL}/sign_up`,{
//         method: 'POST' ,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({name, email}),
//     });
//     return response.json();
// };

export const createUser = async (name: string, email: string) => {
  const response = await fetch(`${API_URL}/sign_up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, email }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorText}`
    );
  }
  return response.json();
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(
    `${API_URL}/users?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorText}`
    );
  }
  return response.json();
};
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

export const updateuser = async (id: number, name: string, email: string) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });
  return response.json();
};

// export const deleteUser = async (id: number) => {
//     await fetch(`${API_URL}/users/${id}`,{
//         method: 'DELETE',
//     });
// };

export const deleteUser = async (id: number): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return "User has been deleted";
  } catch (error) {
    console.error("Delete user error:", error);
    throw error;
  }
};

export {};
