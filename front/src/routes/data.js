import { Cloudinary } from "@cloudinary/url-gen/index";

export const getAllData = async () => {
    const res = await fetch('http://localhost:3000/api/all');
    const data = await res.json();
    return data;
};

export const getItemData = async (itemId) => {
    const res = await fetch(`http://localhost:3000/api/item/${itemId}`);
    const data = await res.json();
    console.log(data[0])
    return data[0];
};

export const getPhotoFromCloudinary = async (photo) => {
    const cld = new Cloudinary({
		cloud: {
			cloudName: 'dcgmvmf04'
		}
	});

	const img = cld
		.image(photo)
		.format('auto')
		.quality('auto')
		.toURL();

    return img
}
