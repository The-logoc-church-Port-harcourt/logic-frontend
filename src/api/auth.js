// Hardcoded admin credentials (for development only)
const ADMIN_CREDENTIALS = {
  email: 'admin@logic.com',
  password: 'admin123',
  name: 'Admin User',
  role: 'admin'
};

export const login = async (email, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    // Return mock user data
    return {
      token: 'mock-jwt-token',
      admin: {
        id: 1,
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: ADMIN_CREDENTIALS.role
      }
    };
  }
  
  // Throw error for invalid credentials
  const error = new Error('Invalid email or password');
  error.response = { status: 401 };
  throw error;
};

export const getCurrentUser = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Check if user is logged in (has token)
  const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  if (!token) {
    const error = new Error('Not authenticated');
    error.response = { status: 401 };
    throw error;
  }
  
  // Return mock user data
  return {
    admin: {
      id: 1,
      email: ADMIN_CREDENTIALS.email,
      name: ADMIN_CREDENTIALS.name,
      role: ADMIN_CREDENTIALS.role
    }
  };
};

export const logout = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return true;
};
