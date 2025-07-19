// Helper để chuyển đổi một URL ảnh thành đối tượng File
async function urlToBlob(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Không thể tải ảnh từ URL: ${url}`);
    }
    const blob = await response.blob();
    const fileName = url.substring(url.lastIndexOf('/') + 1) || 'image.jpg';
    return new File([blob], fileName, { type: blob.type });
  }
  
  const API_KEY = process.env.NEXT_PUBLIC_LIGHTX_API_KEY;
  
  /**
   * BƯỚC 1 & 2: Tải một ảnh (File hoặc URL) lên server LightX.
   */
  export const uploadImage = async (imageSource) => {
    if (!API_KEY) throw new Error("Chưa cấu hình API Key của LightX.");
    
    let file;
    if (typeof imageSource === 'string') {
      //console.log(`Đang chuyển đổi URL thành file: ${imageSource}`);
      file = await urlToBlob(imageSource);
    } else {
      file = imageSource;
    }
  
    const getUrlResponse = await fetch('https://api.lightxeditor.com/external/api/v2/uploadImageUrl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
      body: JSON.stringify({ uploadType: "imageUrl", size: file.size, contentType: file.type }),
    });
    if (!getUrlResponse.ok) throw new Error("Không thể lấy URL để tải ảnh lên.");
    const urlData = await getUrlResponse.json();
    const { uploadImage: presignedUrl, imageUrl: finalImageUrl } = urlData.body;
  
    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });
    if (!uploadResponse.ok) throw new Error("Tải file lên server thất bại.");
    
    //console.log(`Tải ảnh thành công: ${finalImageUrl}`);
    return finalImageUrl;
  };
  
  /**
   * BƯỚC 3: Bắt đầu tác vụ ghép ảnh AI.
   */
  export const startVirtualTryOnJob = async (humanImageUrl, garmentImageUrl) => {
    if (!API_KEY) throw new Error("Chưa cấu hình API Key của LightX.");
    
    const response = await fetch('https://api.lightxeditor.com/external/api/v2/aivirtualtryon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
      body: JSON.stringify({ imageUrl: humanImageUrl, styleImageUrl: garmentImageUrl }),
    });
    if (!response.ok) throw new Error("Không thể bắt đầu tác vụ AI.");
    const data = await response.json();
    if (data.statusCode !== 2000) throw new Error(data.message);
    
    //console.log(`Bắt đầu tác vụ AI thành công, Order ID: ${data.body.orderId}`);
    return data.body.orderId;
  };
  
  /**
   * BƯỚC 4: Kiểm tra trạng thái của tác vụ AI (ĐÃ SỬA LỖI).
   */
  export const checkJobStatus = async (orderId) => {
    if (!API_KEY) throw new Error("Chưa cấu hình API Key của LightX.");
  
    const response = await fetch('https://api.lightxeditor.com/external/api/v2/order-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
      body: JSON.stringify({ orderId }),
    });
    if (!response.ok) throw new Error("Không thể kiểm tra trạng thái tác vụ.");
    const data = await response.json();
    if (data.statusCode !== 2000) throw new Error(data.message);
    const body = data.body;
    //console.log(`Kiểm tra trạng thái Order ID ${orderId}:`, body);
  
    // SỬA LỖI: Lấy URL từ key "output" mà bạn đã tìm thấy
    const outputUrl = 
      body.output ||                  // <-- THÊM DÒNG NÀY LÊN ĐẦU TIÊN
      body.outputs?.[0]?.outputUrl ||
      body.outputUrl ||
      body.imageUrl ||
      null;
  
    return {
      status: body.status,
      outputUrl: outputUrl, // Trả về URL tìm được hoặc null
    };
  };
  