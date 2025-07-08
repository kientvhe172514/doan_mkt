import { useState } from 'react';
import { toast } from 'react-toastify';
import MagicHourService from '../../lib/magichour';

const ImageGenerator = ({ onImagesGenerated }) => {
    const [prompt, setPrompt] = useState('');
    const [numImages, setNumImages] = useState(4);
    const [style, setStyle] = useState('product');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImages, setGeneratedImages] = useState([]);

    const handleGenerateImages = async (e) => {
        e.preventDefault();

        if (!prompt.trim()) {
            toast.error('Please enter a prompt');
            return;
        }

        setIsLoading(true);
        try {
            const response = await MagicHourService.generateProductImages(prompt, numImages, style);

            if (response.success) {
                setGeneratedImages(response.images || []);
                toast.success('Images generated successfully!');

                // Callback to parent component if provided
                if (onImagesGenerated) {
                    onImagesGenerated(response.images);
                }
            } else {
                toast.error(response.message || 'Failed to generate images');
            }
        } catch (error) {
            console.error('Error generating images:', error);
            toast.error('Failed to generate images. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageSelect = (imageUrl) => {
        // Handle image selection - you can implement download or save functionality
        console.log('Selected image:', imageUrl);
        toast.info('Image selected!');
    };

    return (
        <div className="magichour-image-generator">
            <div className="card">
                <div className="card-header">
                    <h5 className="mb-0">
                        <i className="fas fa-magic me-2"></i>
                        MagicHour AI Image Generator
                    </h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleGenerateImages}>
                        <div className="mb-3">
                            <label htmlFor="prompt" className="form-label">
                                Product Description *
                            </label>
                            <textarea
                                id="prompt"
                                className="form-control"
                                rows="3"
                                placeholder="Describe the product you want to generate images for (e.g., 'A modern wireless headphones with sleek design, premium materials')"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="numImages" className="form-label">
                                        Number of Images
                                    </label>
                                    <select
                                        id="numImages"
                                        className="form-select"
                                        value={numImages}
                                        onChange={(e) => setNumImages(parseInt(e.target.value))}
                                    >
                                        <option value={1}>1 Image</option>
                                        <option value={2}>2 Images</option>
                                        <option value={3}>3 Images</option>
                                        <option value={4}>4 Images</option>
                                        <option value={6}>6 Images</option>
                                        <option value={8}>8 Images</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="style" className="form-label">
                                        Style
                                    </label>
                                    <select
                                        id="style"
                                        className="form-select"
                                        value={style}
                                        onChange={(e) => setStyle(e.target.value)}
                                    >
                                        <option value="product">Product Photography</option>
                                        <option value="lifestyle">Lifestyle</option>
                                        <option value="minimalist">Minimalist</option>
                                        <option value="luxury">Luxury</option>
                                        <option value="modern">Modern</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Generating Images...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-magic me-2"></i>
                                    Generate Images
                                </>
                            )}
                        </button>
                    </form>

                    {generatedImages.length > 0 && (
                        <div className="mt-4">
                            <h6>Generated Images:</h6>
                            <div className="row">
                                {generatedImages.map((image, index) => (
                                    <div key={index} className="col-md-6 col-lg-3 mb-3">
                                        <div className="card h-100">
                                            <img
                                                src={image.url || image}
                                                className="card-img-top"
                                                alt={`Generated product ${index + 1}`}
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                            <div className="card-body">
                                                <button
                                                    className="btn btn-sm btn-outline-primary w-100"
                                                    onClick={() => handleImageSelect(image.url || image)}
                                                >
                                                    <i className="fas fa-download me-1"></i>
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator; 