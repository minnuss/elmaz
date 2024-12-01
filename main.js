const corsProxy = "https://cors-anywhere.herokuapp.com/";
const initialURL = prompt("Paste Elmaz profile url");

fetch(corsProxy + initialURL)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text();
    })
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Locate the gallery element
        const gallery = doc.querySelector("div.gallery");
        if (!gallery) {
            console.error("Gallery element not found");
            return;
        }

        // Locate the list element within the gallery
        const list = gallery.querySelector("div.list");
        if (!list) {
            console.error("List element not found");
            return;
        }

        // Find all img elements in the list and modify src attributes
        const images = list.querySelectorAll("img");
        const modifiedURLs = [];
        images.forEach(img => {
            if (img.src) {
                const modifiedSrc = img.src.replace("-rb.jpg", "-rr.jpg");
                modifiedURLs.push(modifiedSrc);
            }
        });

        // Display the modified URLs on the page
        const container = document.createElement("div");
        document.body.appendChild(container);
        modifiedURLs.forEach(url => {
            const imgElement = document.createElement("img");
            imgElement.src = url;
            imgElement.alt = "Modified image";
            imgElement.style.margin = "10px";
            imgElement.style.maxWidth = "200px"; // Adjust size for display
            container.appendChild(imgElement);
        });
    })
    .catch(error => {
        console.error("Error fetching the page:", error);
    });
