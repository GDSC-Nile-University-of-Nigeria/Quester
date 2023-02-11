import { Filesystem, Directory } from "@capacitor/filesystem";

export const getFile = async () => {
    const file = await Filesystem.readFile({
        path: '',
        directory: Directory.Documents
    })
    return file.data;
}