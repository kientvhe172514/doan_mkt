import { useState } from 'react';

const GarmentType = {
    UPPER_BODY: "upper_body",
    LOWER_BODY: "lower_body",
    DRESSES: "dresses",
}

const MagicHourDashboard = () => {
    const [personFile, setPersonFile] = useState(null);
    const [garmentFile, setGarmentFile] = useState(null);
    const [isClothesLoading, setIsClothesLoading] = useState(false);
    const [clothesResult, setClothesResult] = useState(null);

    return (
        <div className="magichour-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="mb-0">
                                        <i className="fas fa-magic me-2 text-primary"></i>
                                        MagicHour AI Dashboard
                                    </h4>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="tab-content">
                                    <div className="tab-pane fade show active">
                                        <form
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                if (!personFile || !garmentFile) {
                                                    setClothesResult({ error: "Vui lòng chọn đủ 2 ảnh." });
                                                    return;
                                                }
                                                setIsClothesLoading(true);
                                                setClothesResult(null);
                                                try {
                                                    const uploadFile = async (file) => {
                                                        const formData = new FormData();
                                                        formData.append("file", file);
                                                        const res = await fetch("/api/cloudinary/add-img", {
                                                            method: "POST",
                                                            body: formData,
                                                        });
                                                        const data = await res.json();
                                                        return data.file_path;
                                                    };
                                                    const person_file_path = await uploadFile(personFile);
                                                    const garment_file_path = await uploadFile(garmentFile);
                                                    console.log(person_file_path, garment_file_path);

                                                    const result = await MagicHourService.changeClothes({
                                                        name: "Demo",
                                                        person_file_path,
                                                        garment_file_path,
                                                        garment_type: GarmentType.UPPER_BODY,
                                                    });
                                                    setClothesResult(result);
                                                } catch (err) {
                                                    setClothesResult({ error: err.message || "Có lỗi xảy ra." });
                                                } finally {
                                                    setIsClothesLoading(false);
                                                }
                                            }}
                                        >
                                            <div className="mb-3">
                                                <label className="form-label">Ảnh người (person)</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="form-control"
                                                    onChange={e => setPersonFile(e.target.files[0])}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Ảnh quần áo (garment)</label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="form-control"
                                                    onChange={e => setGarmentFile(e.target.files[0])}
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={isClothesLoading}
                                            >
                                                {isClothesLoading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Đang xử lý...
                                                    </>
                                                ) : (
                                                    "Thay quần áo AI"
                                                )}
                                            </button>
                                        </form>

                                        {/* Hiển thị kết quả */}
                                        {clothesResult && (
                                            <div className="mt-4">
                                                {clothesResult.error ? (
                                                    <div className="alert alert-danger">
                                                        <strong>Lỗi:</strong> {clothesResult.error}
                                                    </div>
                                                ) : (
                                                    <div className="alert alert-success">
                                                        <strong>Thành công!</strong>
                                                        {clothesResult.result_image && (
                                                            <div className="mt-3">
                                                                <img
                                                                    src={clothesResult.result_image}
                                                                    alt="Kết quả thay quần áo"
                                                                    className="img-fluid rounded"
                                                                    style={{ maxWidth: '400px' }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MagicHourDashboard; 