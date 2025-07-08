import axios from "axios";
import authSlice from "../../client/src/redux/features/auth/authSlice";
import store from "../../client/src/redux/store";

const accessToken = store.getState().auth.accessToken;

class MagicHourService {
    constructor() {
        this.apiKey = process.env.MAGICHOUR_API_KEY;
        this.baseURL = 'https://api.magichour.ai';
        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async changeClothes({ name, person_file_path, garment_file_path, garment_type }) {
        try {
            console.log(person_file_path);
            console.log(garment_file_path);
            console.log(garment_type);
            const response = await this.client.post('/v1/ai-clothes-changer', {
                name,
                assets: {
                    person_file_path,
                    garment_file_path,
                    garment_type
                }
            });

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('MagicHour Clothes Changer Error:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data?.error?.message || error.message
            };
        }
    }

    // Check API status and credits
    async getAccountInfo() {
        try {
            const response = await this.client.get('/v1/models');
            return {
                success: true,
                data: {
                    models: response.data.data || [],
                    status: 'active'
                }
            };
        } catch (error) {
            console.error('MagicHour Account Info Error:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data?.error?.message || error.message
            };
        }
    }
}

export default new MagicHourService();