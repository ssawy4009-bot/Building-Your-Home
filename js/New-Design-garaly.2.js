





// Page Navigation Functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Get all page links
            const pageLinks = document.querySelectorAll('[data-page]');
            
            // Function to show a specific page
            function showPage(pageId) {
                // Hide all pages
                document.querySelectorAll('.page-content').forEach(page => {
                    page.classList.remove('active');
                });
                
                // Show the selected page
                const targetPage = document.getElementById(pageId);
                if (targetPage) {
                    targetPage.classList.add('active');
                }
                
                // Update active menu item
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('menu-item-active');
                });
                
                // Update active nav item
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Set active state for clicked item
                const activeMenuItem = document.querySelector(`[data-page="${pageId}"]`);
                if (activeMenuItem) {
                    activeMenuItem.classList.add('menu-item-active');
                }
                
                // Close sidebar on mobile after navigation
                closeSidebar();
            }
            
            // Add click event listeners to all page links
            pageLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const pageId = this.getAttribute('data-page');
                    showPage(pageId);
                });
            });
            
            // Initialize with home page
            showPage('home');
            
            // Sidebar functionality
            const sidebar = document.getElementById('sidebar');
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            const menuToggle = document.getElementById('menuToggle');
            const closeMenu = document.getElementById('closeMenu');
            const themeToggle = document.getElementById('themeToggle');
            const themeToggleSidebar = document.getElementById('themeToggleSidebar');
            const body = document.body;
            
            // Open Menu
            menuToggle.addEventListener('click', function() {
                sidebar.classList.add('sidebar-open');
                sidebarOverlay.classList.add('sidebar-overlay-active');
                document.body.style.overflow = 'hidden';
            });
            
            // Close Menu
            function closeSidebar() {
                sidebar.classList.remove('sidebar-open');
                sidebarOverlay.classList.remove('sidebar-overlay-active');
                document.body.style.overflow = 'auto';
            }
            
            closeMenu.addEventListener('click', closeSidebar);
            sidebarOverlay.addEventListener('click', closeSidebar);
            
            // Close Menu with Escape Key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    closeSidebar();
                }
            });
            
            // Theme Toggle Functionality
            function toggleTheme() {
                const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
                const nextTheme = isDarkMode ? 'light' : 'dark';
                
                if (isDarkMode) {
                    document.documentElement.removeAttribute('data-theme');
                    document.body.removeAttribute('data-theme'); // Backup
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.body.setAttribute('data-theme', 'dark'); // Backup
                }
                
                localStorage.setItem('theme', nextTheme);
                updateThemeIcons(nextTheme);
            }
            
            function updateThemeIcons(theme) {
                if (themeToggle) {
                    const themeIcon = themeToggle.querySelector('i');
                    if (themeIcon) themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                }
                
                if (themeToggleSidebar) {
                    const sidebarThemeText = themeToggleSidebar.querySelector('span');
                    if (sidebarThemeText) sidebarThemeText.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
                    const sidebarThemeIcon = themeToggleSidebar.querySelector('i');
                    if (sidebarThemeIcon) sidebarThemeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                }
            }
            
            // Initialize theme from localStorage
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.body.setAttribute('data-theme', 'dark');
                updateThemeIcons('dark');
            } else {
                updateThemeIcons('light');
            }
            
            // Add event listeners for theme toggles
            if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
            if (themeToggleSidebar) themeToggleSidebar.addEventListener('click', function() {
                toggleTheme();
                setTimeout(closeSidebar, 300);
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;
                    
                    if (href.startsWith('#')) {
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            e.preventDefault();
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            });
            
            // Hide navbar on scroll down, show on scroll up
            let lastScrollTop = 0;
            const navbar = document.querySelector('.navbar');
            
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
            });
            
            // Virtual Assistant Chat Functionality
            const chatContainer = document.getElementById('chatContainer');
            const chatInput = document.getElementById('chatInput');
            const sendMessage = document.getElementById('sendMessage');
            
            function addMessage(message, isUser = false) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `chat-message ${isUser ? 'user-message' : 'assistant-message'}`;
                messageDiv.textContent = message;
                chatContainer.appendChild(messageDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
            
            function handleUserMessage() {
                const message = chatInput.value.trim();
                if (message) {
                    addMessage(message, true);
                    chatInput.value = '';
                    
                    // Simulate AI response
                    setTimeout(() => {
                        addMessage("I understand you're interested in " + message + ". Let me help you with that. Our platform offers various design options that might suit your needs.");
                    }, 1000);
                }
            }
            
            if (sendMessage) sendMessage.addEventListener('click', handleUserMessage);
            if (chatInput) chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleUserMessage();
                }
            });
        });

        // Carousel functionality
        function scrollCarousel(direction, id) {
            const track = document.getElementById(id);
            const card = track.querySelector('.gallery-card');
            if (!card) return;
            const scrollAmount = card.offsetWidth + 24; // 24px gap
            track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        }