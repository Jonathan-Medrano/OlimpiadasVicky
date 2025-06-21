import axios from "axios";
const API = "http://localhost/miapi";

export const login = (data) => axios.post(`${API}/login.php`, data);
export const register = (data) => axios.post(`${API}/register.php`, data);
export const getPaquetes = () => axios.get(`${API}/get_paquetes.php`);
export const addProducto = (data) => axios.post(`${API}/admin/add_producto.php`, data);
// etc.
