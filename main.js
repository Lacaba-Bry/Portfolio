
window.addEventListener("scroll", function() {
    let header = document.querySelector("header");
    if (window.scrollY > 50) { 
        header.classList.add("active"); // Add blur when scrolling down
    } else {
        header.classList.remove("active"); // Remove blur when at the top
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section"); // Select all sections
    const navLinks = document.querySelectorAll(".nav-link"); // Select all nav links

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.remove("active"); // Remove active class from all links
                        if (link.getAttribute("href").substring(1) === entry.target.id) {
                            link.classList.add("active"); // Add active class to the corresponding link
                        }
                    });
                }
            });
        },
        { threshold: 0.5 } // Adjust threshold if necessary
    );

    sections.forEach((section) => {
        observer.observe(section); // Observe each section
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tab buttons and content sections
            tabs.forEach(btn => btn.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked tab button
            button.classList.add('active');

            // Add active class to the corresponding content section
            const activeTab = document.getElementById(button.dataset.tab);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
});




function toggleProjects() {
    const allCards = document.querySelectorAll('.card-proj');
    const toggleButton = document.querySelector('.toggle-projects');
    const hiddenCards = document.querySelectorAll('.card-proj.hidden');
    
    if (hiddenCards.length > 0) {
        // Show the next 6 hidden cards
        let count = 0;
        hiddenCards.forEach(card => {
            if (count < 6) {
                card.classList.remove('hidden');
                count++;
            }
        });
        toggleButton.innerText = 'Show Less';
    } else {
        // Hide all cards except the first 6
        allCards.forEach((card, index) => {
            if (index >= 6) {
                card.classList.add('hidden');
            }
        });
        toggleButton.innerText = 'Show More';
    }
}

// Initial Hide for Projects
document.addEventListener("DOMContentLoaded", function() {
    const projectTab = document.querySelector('#projects');
    const cards = projectTab.querySelectorAll('.card-proj');
    
    // Hide all cards except the first 6
    cards.forEach((card, index) => {
        if (index >= 6) {
            card.classList.add('hidden');
        }
    });
});

// Toggle Certificates Section
function toggleCertificates() {
    const allCards = document.querySelectorAll('.card-certificate');
    const toggleButton = document.querySelector('.toggle-certificates');
    const hiddenCards = document.querySelectorAll('.card-certificate.hidden');

    if (hiddenCards.length > 0) {
        // Show the next 6 hidden cards
        let count = 0;
        hiddenCards.forEach(card => {
            if (count < 6) {
                card.classList.remove('hidden');
                count++;
            }
        });
        toggleButton.innerText = 'Show Less';
    } else {
        // Hide all cards except the first 6
        allCards.forEach((card, index) => {
            if (index >= 6) {
                card.classList.add('hidden');
            }
        });
        toggleButton.innerText = 'Show More';
    }
}

// Initial Hide for Certificates
document.addEventListener("DOMContentLoaded", function() {
    const certificatesTab = document.querySelector('#certificates');
    const cards = certificatesTab.querySelectorAll('.card-certificate');
    
    cards.forEach((card, index) => {
        if (index >= 6) {
            card.classList.add('hidden');
        }
    });
});
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const userId = {
        name: null,
        message: null,
        date: null,
        image: null,
        identity: null
    }

    const userComment = document.querySelector(".usercomment");
    const publishBtn = document.querySelector("#publish");
    const commentList = document.querySelector(".comments-list");
    const userName = document.querySelector(".user");
    const photoUpload = document.querySelector("#photo-upload");
    const photoPreviewImg = document.querySelector("#photo-preview-img");

    // Hide the preview image box initially
    photoPreviewImg.style.display = "none";

    photoUpload.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                photoPreviewImg.setAttribute("src", event.target.result);
                photoPreviewImg.style.display = "block"; // Show the preview
                userId.image = event.target.result; // Save image for the comment
            }
            reader.readAsDataURL(file);
        } else {
            // If no file selected, hide the preview box
            photoPreviewImg.style.display = "none";
            userId.image = null;
        }
    });

    userComment.addEventListener("input", () => {
        if (!userComment.value) {
            publishBtn.setAttribute("disabled", "disabled");
            publishBtn.classList.remove("abled");
        } else {
            publishBtn.removeAttribute("disabled");
            publishBtn.classList.add("abled");
        }
    });

    function addPost() {
        if (!userComment.value) return;

        userId.name = userName.value;
        userId.message = userComment.value;
        userId.date = new Date().toLocaleTimeString();

        // Check if user is anonymous
        if (userId.name === "Anonymous") {
            userId.identity = false;
            // If no custom photo uploaded, use default anonymous photo
            if (!userId.image) {
                userId.image = "anonous.png";
            }
        } else {
            userId.identity = true;
            // If user is not anonymous but didn't upload photo, use default user image
            if (!userId.image) {
                userId.image = "user.png";
            }
        }

        // Create the comment structure
        let published = `
        <div class="parent">
            <img src="${userId.image}" alt="User Image">
            <div>
                <h1>${userId.name}</h1>
                <p>${userId.message}</p>
                <div class="engagements">
                    <img src="like.png" alt="Like">
                    <img src="share.png" alt="Share">
                </div>
                <span class="date">${userId.date}</span>
            </div>
        </div>`;

        // Use insertAdjacentHTML to add the comment
        commentList.insertAdjacentHTML('beforeend', published);

        // Clear the input, image, and disable the button
        userComment.value = "";
        photoPreviewImg.style.display = "none";
        userId.image = null; // Reset to null for the next comment
        publishBtn.setAttribute("disabled", "disabled");
        publishBtn.classList.remove("abled");
    }

    // Attach the click event listener
    publishBtn.addEventListener("click", addPost);
});
