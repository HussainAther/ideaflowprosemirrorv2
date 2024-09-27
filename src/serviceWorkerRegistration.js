// src/serviceWorkerRegistration.js

const register = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            navigator.serviceWorker
                .register(swUrl)
                .then((registration) => {
                    if (registration.waiting) {
                        // Handle waiting service worker
                    }
                    if (registration.onupdatefound) {
                        registration.onupdatefound = () => {
                            // Handle update found
                        };
                    }
                })
                .catch((error) => {
                    console.error('Error during service worker registration:', error);
                });
        });
    }
};

export { register };

