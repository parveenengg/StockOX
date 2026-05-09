const USER_API = typeof process !== 'undefined' && process.env.REACT_APP_USER_API 
  ? process.env.REACT_APP_USER_API 
  : (import.meta.env.VITE_USER_API || "https://stockox-user-auth-service.onrender.com");

const SUBSCRIPTION_API = typeof process !== 'undefined' && process.env.REACT_APP_SUBSCRIPTION_API 
  ? process.env.REACT_APP_SUBSCRIPTION_API 
  : (import.meta.env.VITE_SUBSCRIPTION_API || "https://stockox-subscription-service.onrender.com");

export const API = {
  // Auth endpoints
  LOGIN:    `${USER_API}/api/v1/auth/login`,
  REGISTER: `${USER_API}/api/v1/auth/register`,
  LOGOUT:   `${USER_API}/api/v1/auth/logout`,

  // User endpoints
  PROFILE:  `${USER_API}/api/v1/users/profile`,

  // Subscription endpoints
  PLANS:        `${SUBSCRIPTION_API}/api/v1/plans`,
  SUBSCRIPTION: `${SUBSCRIPTION_API}/api/v1/subscriptions/current`,

  // Payment endpoints
  CREATE_ORDER:  `${SUBSCRIPTION_API}/api/v1/payments/create-order`,
  VERIFY_PAYMENT:`${SUBSCRIPTION_API}/api/v1/payments/verify`,
};
