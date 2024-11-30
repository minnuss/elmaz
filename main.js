  document.addEventListener("DOMContentLoaded", () => {
            let pictureBox = document.querySelector('.pic-box'); // Select the .pic-box element
            let urlSource = prompt('Provide one pic source URL');
            const regex = /-(\d+)-r/; // Regex to match the number between dashes
            const match = urlSource.match(regex);

            if (match) {
                const originalNumber = match[1]; // Extract the matched number

                // Loop through numbers 0-20 and dynamically create images
                for (let i = 0; i <= 20; i++) {
                    // Generate a new URL by replacing the matched number
                    let updatedURL = urlSource.replace(`-${originalNumber}-`, `-${i}-`);
                    createPictureBox(updatedURL);
                }
            } else {
                console.error('The provided URL does not match the expected format.');
            }

            // Function to dynamically create and append images to the picture box
            function createPictureBox(url) {
                let img = document.createElement('img'); // Create an img element
                img.className = 'image'; // Assign the "image" class
                img.src = url; // Set the src attribute to the updated URL
                img.alt = "Generated image"; // Add an alt attribute for accessibility
                pictureBox.appendChild(img); // Append the image to the .pic-box container
            }
        });
