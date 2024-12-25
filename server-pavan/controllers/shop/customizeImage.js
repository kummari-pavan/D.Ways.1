const axios = require('axios');
const fs = require('fs');
const HUGGING_FACE_API_KEY = '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';
//const MODEL_URL = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev';
// const MODEL_URL = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell';
const MODEL_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers'

// Helper function to convert buffer to base64 string
function bufferToBase64(buffer) {
    return buffer.toString('base64');
}

// Function to handle the image generation and conversion
const generateImage = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // Sending request to Hugging Face API
        const response = await axios.post(
            MODEL_URL,
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                },
                responseType: 'arraybuffer', // Ensure the response is in binary form
            }
        );

        console.log("Hugging Face Response:", response.data); // Log the API response for debugging

        // Check if the response contains an image (in binary format)
        if (response.data) {
            const imageBuffer = Buffer.from(response.data, 'binary'); // Convert the binary data into a buffer
            
            // Convert the image buffer to base64
            const base64Image = bufferToBase64(imageBuffer);

            // Sending the image buffer back as a response to the client
            res.json({
                message: 'Image generated successfully!',
                image: base64Image, // This will be the base64 representation of the image
            });

            // Save the image as a PNG file on the server
            const filePath = 'generated_image.png'; // You can change this to .jpg if needed
            fs.writeFileSync(filePath, imageBuffer);
            console.log(`Image saved as ${filePath}`);
        } else {
            console.error('Hugging Face response does not contain an image.');
            res.status(500).json({ error: 'No image returned from Hugging Face API' });
        }
    } catch (error) {
        console.error('Error generating image:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate image' });
    }
};

module.exports = { generateImage };
