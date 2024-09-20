import axios from 'axios';

const API_BASE_URL = 'https://shippex-demo.bc.brandimic.com/api/method';

export const login = async (username:string, password:string) => {
    const url = 'https://shippex-demo.bc.brandimic.com/api/method/login';
    const formData = new FormData();
    formData.append('usr', username);
    formData.append('pwd', password);
    
    return axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

export const getShipments = async (searchTerm: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/frappe.client.get_list`, {
            params: {
                doctype: 'AWB',
                fields: ['*'],
                filters: {
                    name: ['like', `%${searchTerm}%`],
                },
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
