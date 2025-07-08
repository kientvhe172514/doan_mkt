const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9999/api';

class MagicHourService {
    constructor() {
        this.baseURL = `${API_BASE_URL}/https://api.magichour.ai/v1/ai-clothes-changer`;
    }

    async makeRequest(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('MagicHour API Error:', error);
            throw error;
        }
    }

    // Generate product images
    async generateProductImages(prompt, numImages = 4, style = 'product') {
        return this.makeRequest('/generate-images', {
            method: 'POST',
            body: JSON.stringify({
                prompt,
                numImages,
                style,
            }),
        });
    }

    // Generate marketing copy
    async generateMarketingCopy(productName, category, features = []) {
        return this.makeRequest('/generate-copy', {
            method: 'POST',
            body: JSON.stringify({
                productName,
                category,
                features,
            }),
        });
    }

    // Generate product variations
    async generateProductVariations(baseProduct, variations = ['color', 'style']) {
        return this.makeRequest('/generate-variations', {
            method: 'POST',
            body: JSON.stringify({
                baseProduct,
                variations,
            }),
        });
    }

    // Generate social media content
    async generateSocialContent(productName, platform = 'instagram') {
        return this.makeRequest('/generate-social', {
            method: 'POST',
            body: JSON.stringify({
                productName,
                platform,
            }),
        });
    }

    // AI Clothes Changer
    async changeClothes({ name, person_file_path, garment_file_path, garment_type }) {
        return this.makeRequest('/clothes-changer', {
            method: 'POST',
            body: JSON.stringify({
                name,
                person_file_path,
                garment_file_path,
                garment_type
            })
        });
    }

    // Get account information
    async getAccountInfo() {
        return this.makeRequest('/account', {
            method: 'GET',
        });
    }
}

export default new MagicHourService(); 