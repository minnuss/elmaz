document.addEventListener("DOMContentLoaded", () => {
    let pictureBox = document.querySelector('.pic-box'); // Select the .pic-box element
    let urlSource = prompt('Provide one pic source URL');
    const regex = /-(\d+)-r/; // Regex to match the number between dashes
    const match = urlSource.match(regex);

    if (match) {
        const originalNumber = match[1]; // Extract the matched number

        // Loop through numbers 0-20 and dynamically check and append images
        for (let i = 0; i <= 20; i++) {
            // Generate a new URL by replacing the matched number
            let updatedURL = urlSource.replace(`-${originalNumber}-`, `-${i}-`);
            checkAndCreateImage(updatedURL);
        }
    } else {
        console.error('The provided URL does not match the expected format.');
    }

    // Function to check if an image URL is valid and append it if it is
    function checkAndCreateImage(url) {
        let img = new Image(); // Create a new Image object
        img.src = url;

        // Load event confirms the image is valid
        img.onload = () => {
            createPictureBox(url); // Append the image if it loads successfully
        };

        // Error event skips the image if it cannot be loaded
        img.onerror = () => {
            console.warn(`Image not found: ${url}`); // Log the invalid image URL
        };
    }

    // Function to dynamically create and append images to the picture box
    function createPictureBox(url) {
        let img = document.createElement('img'); // Create an img element
        img.className = 'image'; // Assign the "image" class
        img.src = url; // Set the src attribute to the validated URL
        img.alt = "Generated image"; // Add an alt attribute for accessibility
        pictureBox.appendChild(img); // Append the image to the .pic-box container
    }
});
