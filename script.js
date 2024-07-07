document.addEventListener('DOMContentLoaded', function() {
    const tellMeButton = document.getElementById('tellMeButton');
    const percentageMatchButton = document.getElementById('percentageMatchButton');
    const jobDescriptionInput = document.getElementById('input');
    const resumeFileInput = document.getElementById('resumeFile');
    const responseSection = document.getElementById('responseSection');

    const apiKey = 'AIzaSyBslAxOpii0AgbLRkay0DUhEAaxx30jPPg';

    function inputPdfSetup(file) {
        return new Promise((resolve, reject) => {
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const pdfData = event.target.result;
                    const pdfContent = {
                        mime_type: 'application/pdf',
                        data: pdfData.split(',')[1] // Extract base64 encoded data
                    };
                    resolve(pdfContent);
                };
                reader.onerror = function(error) {
                    reject(error);
                };
                reader.readAsDataURL(file);
            } else {
                reject(new Error('No file uploaded'));
            }
        });
    }

    function getGeminiResponse(input, pdfContent, prompt) {
        // Example: Replace 'YOUR_API_ENDPOINT' with your actual backend API endpoint
        fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ input, pdfContent, prompt })
        })
        .then(response => response.json())
        .then(data => {
            responseSection.innerHTML = `<p>${data.response}</p>`;
        })
        .catch(error => {
            responseSection.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    }

    tellMeButton.addEventListener('click', async function() {
        try {
            const pdfContent = await inputPdfSetup(resumeFileInput.files[0]);
            getGeminiResponse(jobDescriptionInput.value, pdfContent, 'Tell Me About the Resume');
        } catch (error) {
            responseSection.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });

    percentageMatchButton.addEventListener('click', async function() {
        try {
            const pdfContent = await inputPdfSetup(resumeFileInput.files[0]);
            getGeminiResponse(jobDescriptionInput.value, pdfContent, 'Percentage Match');
        } catch (error) {
            responseSection.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });
});
