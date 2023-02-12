import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export const getPhoto = async() => {
    const photo = await Camera.getPhoto({
        quality: 100,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
    });
    return {
        base64: `${photo.base64String}`,
        imageName: photo.path
    }
}