// apiService.ts
import axios from 'axios';

const API_BASE_URL = 'https://shippex-demo.bc.brandimic.com/api/method';

export const login = async (username: string, password: string) => {
  const url = `${API_BASE_URL}/login`;
  const formData = new FormData();
  formData.append('usr', username);
  formData.append('pwd', password);

  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// New function to fetch shipment status list
export const fetchShipmentStatusList = async () => {
  const url = `${API_BASE_URL}/frappe.client.get_list`;
  const params = {
    doctype: 'AWB Status',
    fields: ['*'], 
  };

  return axios.get(url, { params });
};
