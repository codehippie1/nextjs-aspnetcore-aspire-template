const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7001';

interface ApiError extends Error {
  status?: number;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = new Error('API request failed');
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export async function getProducts() {
  const response = await fetch(`${API_URL}/api/products`);
  return handleResponse(response);
}

export async function getProduct(id: string) {
  const response = await fetch(`${API_URL}/api/products/${id}`);
  return handleResponse(response);
}

export async function createProduct(data: any) {
  const response = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateProduct(id: string, data: any) {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function deleteProduct(id: string) {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

export async function getUsers() {
  const response = await fetch(`${API_URL}/api/users`);
  return handleResponse(response);
}

export async function getUser(id: string) {
  const response = await fetch(`${API_URL}/api/users/${id}`);
  return handleResponse(response);
}

export async function createUser(data: any) {
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateUser(id: string, data: any) {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function deleteUser(id: string) {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

export async function getOrders() {
  const response = await fetch(`${API_URL}/api/orders`);
  return handleResponse(response);
}

export async function getOrder(id: string) {
  const response = await fetch(`${API_URL}/api/orders/${id}`);
  return handleResponse(response);
}

export async function createOrder(data: any) {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateOrder(id: string, data: any) {
  const response = await fetch(`${API_URL}/api/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function deleteOrder(id: string) {
  const response = await fetch(`${API_URL}/api/orders/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
} 