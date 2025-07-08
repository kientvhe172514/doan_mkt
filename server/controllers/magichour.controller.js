const MagicHourService = require('../services/magichour.service');

// Generate product images
const generateProductImages = async (req, res) => {
    try {
        const { prompt, numImages = 4, style = 'product' } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: 'Prompt is required'
            });
        }

        const result = await MagicHourService.generateProductImages(prompt, numImages, style);

        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Failed to generate images',
                error: result.error
            });
        }

        res.status(200).json({
            success: true,
            message: 'Images generated successfully',
            data: result.data,
            images: result.images
        });
    } catch (error) {
        console.error('Generate Product Images Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Generate marketing copy
const generateMarketingCopy = async (req, res) => {
    try {
        const { productName, category, features = [] } = req.body;

        if (!productName || !category) {
            return res.status(400).json({
                success: false,
                message: 'Product name and category are required'
            });
        }

        const result = await MagicHourService.generateMarketingCopy(productName, category, features);

        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Failed to generate marketing copy',
                error: result.error
            });
        }

        res.status(200).json({
            success: true,
            message: 'Marketing copy generated successfully',
            data: result.data,
            copy: result.copy
        });
    } catch (error) {
        console.error('Generate Marketing Copy Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Generate product variations
const generateProductVariations = async (req, res) => {
    try {
        const { baseProduct, variations = ['color', 'style'] } = req.body;

        if (!baseProduct) {
            return res.status(400).json({
                success: false,
                message: 'Base product description is required'
            });
        }

        const result = await MagicHourService.generateProductVariations(baseProduct, variations);

        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Failed to generate product variations',
                error: result.error
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product variations generated successfully',
            data: result.data,
            variations: result.variations
        });
    } catch (error) {
        console.error('Generate Product Variations Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Generate social media content
const generateSocialContent = async (req, res) => {
    try {
        const { productName, platform = 'instagram' } = req.body;

        if (!productName) {
            return res.status(400).json({
                success: false,
                message: 'Product name is required'
            });
        }

        const result = await MagicHourService.generateSocialContent(productName, platform);

        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Failed to generate social media content',
                error: result.error
            });
        }

        res.status(200).json({
            success: true,
            message: 'Social media content generated successfully',
            data: result.data,
            content: result.content
        });
    } catch (error) {
        console.error('Generate Social Content Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get account information
const getAccountInfo = async (req, res) => {
    try {
        const result = await MagicHourService.getAccountInfo();

        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Failed to get account information',
                error: result.error
            });
        }

        res.status(200).json({
            success: true,
            message: 'Account information retrieved successfully',
            data: result.data
        });
    } catch (error) {
        console.error('Get Account Info Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    generateProductImages,
    generateMarketingCopy,
    generateProductVariations,
    generateSocialContent,
    getAccountInfo
}; 