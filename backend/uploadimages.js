const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const path = require('path');

const uploadImages = async () => {
    const baseDir = path.join(__dirname, 'pictures'); // Base directory for pictures
    const categories = fs.readdirSync(baseDir);

    for (let i = 0; i < categories.length; i++) {
        const categoryDir = path.join(baseDir, categories[i]);
        const speciesFolders = fs.readdirSync(categoryDir);

        for (const speciesFolder of speciesFolders) {
            const speciesDir = path.join(categoryDir, speciesFolder);
            const images = fs.readdirSync(speciesDir);

            for (const image of images) {
                const imagePath = path.join(speciesDir, image);
                const form = new FormData();
                form.append('image', fs.createReadStream(imagePath));
                form.append('category_name', categories[i]); // Category name
                form.append('species_name', speciesFolder); // Species name

                try {
                    const response = await axios.post('http://localhost:8080/uploadSpeciesImage', form, {
                        headers: {
                            ...form.getHeaders()
                        }
                    });
                    console.log(`Uploaded ${image}: ${response.data.message}`);
                } catch (error) {
                    console.error(`Failed to upload ${image}: ${error.message}`);
                }
            }
        }
    }
};

uploadImages();
