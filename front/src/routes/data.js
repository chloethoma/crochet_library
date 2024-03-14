import { Cloudinary } from "@cloudinary/url-gen/index";

export const getAllData = async () => {
    const res = await fetch('http://localhost:3000/api/all');
    const data = await res.json();
    return data;
};

export const getItemData = async (itemId) => {
    const res = await fetch(`http://localhost:3000/api/item/${itemId}`);
    const data = await res.json();
    console.log(data)
    return data;
};

export const getPhotoFromCloudinary = async (item) => {
    const cld = new Cloudinary({
		cloud: {
			cloudName: 'dcgmvmf04'
		}
	});

	const photo = cld
		.image(item.photo)
		.format('auto')
		.quality('auto')
		.toURL();

    return photo
}
