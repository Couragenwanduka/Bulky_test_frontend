import axiosInstance from "..";

const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const { data: response } = await axiosInstance.post(`/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

export default uploadFile;