document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNavLinks = document.querySelector('.mobile-nav-links');

    if (menuToggle && mobileNavLinks) {
        menuToggle.addEventListener('click', function() {
          mobileNavLinks.classList.toggle('show');
            if (mobileNavLinks.style.display === 'block') {
                mobileNavLinks.style.display = 'none';
            } else {
                mobileNavLinks.style.display = 'block';
            }
        });
    } else {
        console.error('Menu toggle or mobile nav links not found');
    }

    // Initialize account widget
    const accountWidget = new AccountWidget();
    accountWidget.render();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

const CACHE_NAME = 'cashtrack-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/index.js',
  '/img/logo2.png',
  '/img/pieChart.png',
  '/img/healthChart.png',
  // Add other assets you want to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Configuration object for user data
const CONFIG = {
    user: {
        name: 'Alex Kim',
        email: 'alex.k@example.com',
        initials: 'AK'
    }
};

// Account Widget Component
class AccountWidget {
    constructor() {
        this.user = CONFIG.user;
    }

    render() {
        // Desktop sidebar account widget
        const sidebarWidget = `
            <div class="account-widget">
                <div class="account-info">
                    <div class="avatar">
                        <span>${this.user.initials}</span>
                    </div>
                    <div class="user-details">
                        <p class="user-name">${this.user.name}</p>
                        <p class="user-email">${this.user.email}</p>
                    </div>
                </div>
            </div>
        `;

        // Mobile account widget
        const mobileWidget = `
            <div class="mobile-account-widget">
                <div class="account-info">
                    <div class="avatar">
                        <span>${this.user.initials}</span>
                    </div>
                    <div class="user-details">
                        <p class="user-name">${this.user.name}</p>
                        <p class="user-email">${this.user.email}</p>
                    </div>
                </div>
            </div>
        `;

        // Insert desktop widget
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.insertAdjacentHTML('beforeend', sidebarWidget);
        }

        // Insert mobile widget
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav) {
            mobileNav.insertAdjacentHTML('beforeend', mobileWidget);
        }
    }
}
