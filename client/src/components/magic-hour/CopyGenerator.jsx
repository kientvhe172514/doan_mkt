import { useState } from 'react';
import { toast } from 'react-toastify';
import MagicHourService from '../../lib/magichour';

const CopyGenerator = ({ onCopyGenerated }) => {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [features, setFeatures] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedCopy, setGeneratedCopy] = useState('');

    const handleGenerateCopy = async (e) => {
        e.preventDefault();

        if (!productName.trim() || !category.trim()) {
            toast.error('Please enter product name and category');
            return;
        }

        setIsLoading(true);
        try {
            const featuresArray = features.split(',').map(f => f.trim()).filter(f => f);

            const response = await MagicHourService.generateMarketingCopy(
                productName,
                category,
                featuresArray
            );

            if (response.success) {
                setGeneratedCopy(response.copy || '');
                toast.success('Marketing copy generated successfully!');

                // Callback to parent component if provided
                if (onCopyGenerated) {
                    onCopyGenerated(response.copy);
                }
            } else {
                toast.error(response.message || 'Failed to generate copy');
            }
        } catch (error) {
            console.error('Error generating copy:', error);
            toast.error('Failed to generate copy. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(generatedCopy);
        toast.success('Copy copied to clipboard!');
    };

    return (
        <div className="magichour-copy-generator">
            <div className="card">
                <div className="card-header">
                    <h5 className="mb-0">
                        <i className="fas fa-pen me-2"></i>
                        MagicHour AI Copy Generator
                    </h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleGenerateCopy}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="productName" className="form-label">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="productName"
                                        className="form-control"
                                        placeholder="Enter product name"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">
                                        Category *
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        className="form-control"
                                        placeholder="e.g., Electronics, Fashion, Home & Garden"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="features" className="form-label">
                                Key Features (comma-separated)
                            </label>
                            <textarea
                                id="features"
                                className="form-control"
                                rows="2"
                                placeholder="e.g., Wireless, Bluetooth 5.0, 30-hour battery life, noise cancellation"
                                value={features}
                                onChange={(e) => setFeatures(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Generating Copy...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-magic me-2"></i>
                                    Generate Marketing Copy
                                </>
                            )}
                        </button>
                    </form>

                    {generatedCopy && (
                        <div className="mt-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6>Generated Copy:</h6>
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={handleCopyToClipboard}
                                >
                                    <i className="fas fa-copy me-1"></i>
                                    Copy to Clipboard
                                </button>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <pre className="mb-0" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                                        {generatedCopy}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CopyGenerator; 