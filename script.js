
   document.addEventListener('DOMContentLoaded', () => {
    // ... [Keep all existing variables] ...
    // Add this utility function inside your DOMContentLoaded block
function createConfettiEffect(rect) {
    // Simple confetti implementation
    const confettiCount = 15;
    const colors = ['#ff7e7e', '#ffc0cb', '#f06292', '#ff4081'];
    
    for (let i = 0; i < confettiCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('confetti-particle');
        
        // Randomize size and color
        const size = Math.random() * 8 + 4; // 4px to 12px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Position it near the heart
        particle.style.left = `${rect.left + rect.width / 2}px`;
        particle.style.top = `${rect.top + rect.height / 2}px`;

        // Apply random movement (uses CSS variables defined in your style.css)
        particle.style.setProperty('--rand-x', Math.random() * 2 - 1); // -1 to 1
        particle.style.setProperty('--rand-y', Math.random() * 2 - 1); // -1 to 1
        
        particle.style.animation = `confetti-fall ${Math.random() * 2 + 1}s ease-out forwards`;
        
        document.body.appendChild(particle);

        // Remove the particle after the animation is done
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}
    
    // Add the video element variable
    const finalVideo = document.getElementById('final-video'); 

    // ... [Keep all existing code for intro, scroll, lightbox, etc.] ...

    // --- New: Ensure Video Plays and Loads ---
    if (finalVideo) {
        // Optional: Ensure video starts playing when the section comes into view
        // (This is useful if you remove 'autoplay' later, but keep it for now)
        finalVideo.addEventListener('canplaythrough', () => {
            // Video is ready to play
            finalVideo.style.opacity = 1; // If you style it to fade in
        });

        // Use the existing Intersection Observer to trigger a special animation 
        // or ensure video playback stability when the final section is reached.
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    finalVideo.play().catch(e => console.error("Video playback failed:", e));
                    // Optional: You could fade out the black background here
                } else {
                    finalVideo.pause(); 
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the video is visible

        videoObserver.observe(document.getElementById('final-page'));
    }
    
    // ... [Keep the rest of the existing JAVASCRIPT CODE] ...
});
    // ... [KEEP ALL EXISTING VARIABLES (introScreen, mainContent, etc.)] ...
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.querySelector('main');
    const scrollButton = document.getElementById('scroll-to-story');
    const storySection = document.getElementById('our-story');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const heartEasterEgg = document.getElementById('heart-easter-egg');

    const galleryItems = document.querySelectorAll('.media-item'); // NEW
    const lightbox = document.getElementById('lightbox'); // NEW
    const lightboxContent = document.querySelector('.lightbox-content'); // NEW
    const lightboxClose = document.querySelector('.lightbox-close'); // NEW

    // --- 1. Cinematic Intro and Transition ---
    // ... [KEEP EXISTING INTRO/TRANSITION CODE] ...
    setTimeout(() => {
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            document.querySelectorAll('.fade-in-delay').forEach((el, index) => {
                el.style.transitionDelay = `${index * 0.2}s`;
                el.classList.add('active');
            });
        }, 1500); 
    }, 3000);

  
    // --- 2. Music Toggle ---
if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                // Attempt to play the music
                bgMusic.play()
                    .then(() => {
                        // Success: update the button text
                        musicToggle.textContent = '🎶 Pause Music';
                    })
                    .catch(e => {
                        // Failure: This catches the rare scenario where the browser still blocks playback.
                        console.error("Audio playback blocked by browser or failed:", e);
                        alert("Audio playback failed. Please try interacting with the page again.");
                    });
            } else {
                // Pause the audio
                bgMusic.pause();
                musicToggle.textContent = '🎵 Play Music';
            }
        });
    } else {
        // Use the console to verify if the script failed to find the elements
        console.error("CRITICAL ERROR: Audio elements or toggle button not found. Check IDs and HTML structure.");
    }
    
    // Example for playing a sound effect:
    // const surpriseSound = document.getElementById('surprise-sound');
    // document.querySelector('.cinematic-button').addEventListener('click', () => {
    //     if (surpriseSound) {
    //         surpriseSound.play();
    //     }
    // });

    // --- 3. Scroll to Story Button ---
    scrollButton.addEventListener('click', () => {
        storySection.scrollIntoView({ behavior: 'smooth' });
    });

    // --- 4. Scroll-Triggered Animations (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stop observing once it's visible to save resources
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Start slightly earlier than the viewport end
    });

    // Attach observer to all elements that should fade in on scroll
    document.querySelectorAll('.fade-in-up, .fade-in-scroll').forEach(el => {
        observer.observe(el);
    });

    // --- 5. Hidden Surprise (Easter Egg) ---
    heartEasterEgg.style.cursor = 'pointer';
    heartEasterEgg.addEventListener('click', () => {
        alert("🎉 YOU FOUND THE SECRET MESSAGE! 🎉\n\nI love you more than words can say, and this website is just the beginning of your surprise! Check your email/texts later today!\n\nYour amazing boyfriend.");
        
        // Optional: Trigger a mini confetti on click
        createConfettiEffect(heartEasterEgg.getBoundingClientRect());
    });
    
 // --- 6. Lightbox Event Handlers (NEW) ---
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightboxContent.innerHTML = ''; // Clear previous content

           if (item.classList.contains('video-placeholder')) {
                // Handle LOCAL Video File
                const videoSource = item.getAttribute('data-video-src');
                const video = document.createElement('video');
                
                video.src = videoSource;
                video.controls = true; // Show video controls in lightbox
                video.autoplay = true; // Start playback immediately
                video.loop = true;      // Loop the video
                video.playsinline = true; 
                
                lightboxContent.appendChild(video);
            } else {
                // Handle Image Placeholder (Keep existing logic)
                const img = document.createElement('img');
                const bgImage = item.style.backgroundImage.slice(5, -2); 
                img.src = bgImage;
                img.alt = "Gallery Image";
                lightboxContent.appendChild(img);
            }

            lightbox.classList.add('active');
        });
    });

    // Update the close lightbox listener to stop video playback
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        // Stop video playback when closing
        lightboxContent.innerHTML = '';
    });
    // And for the click outside listener:
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            lightboxContent.innerHTML = '';
        }
    });
    // And for the ESC key listener:
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            lightboxContent.innerHTML = '';
        }
    });
    // ... (rest of the code)
    // Close lightbox when 'X' is clicked
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        // Stop video playback when closing
        lightboxContent.innerHTML = '';
    });

    // Close lightbox when clicked outside of content (or anywhere on the overlay)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            lightboxContent.innerHTML = '';
        }
    });

    // Close lightbox on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            lightboxContent.innerHTML = '';
        }
    });

    // --- 7. Parallax Scrolling Effect (NEW) ---
    const heroSection = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');

    // Add this style change to your CSS or ensure the content is positioned correctly
    heroContent.style.willChange = 'transform'; 

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Apply Parallax to the content relative to the background
        // Content moves slightly slower than the scroll, creating depth
        heroContent.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        
        // You can also apply a subtle counter-movement to the light leak/background
        const lightLeak = document.querySelector('.light-leak');
        if (lightLeak) {
             lightLeak.style.transform = `translateY(${scrollPosition * -0.1}px)`;
        }
    });

    // Add CSS for the confetti particle in your style.css for this to work:
    /*
    .confetti-particle {
        position: fixed;
        border-radius: 50%;
        z-index: 10000;
        pointer-events: none;
    }
    @keyframes confetti-fall {
        to {
            transform: translate(calc(var(--rand-x) * 200px), calc(var(--rand-y) * 500px)) rotate(720deg);
            opacity: 0;
        }
    }
    */
    // Note: Since I can't modify style.css *and* script.js easily, I've left the confetti simple. 
    // For a better effect, you'd integrate a small library or more complex CSS.
