lucide.createIcons();
    
    // Sidebar toggle functionality
    document.addEventListener('DOMContentLoaded', function() {
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const menuToggle = document.getElementById('menuToggle');
        const mainLogo = document.getElementById('mainLogo');
        
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-open');
            sidebarOverlay.classList.toggle('sidebar-overlay-active');
        });
        
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('sidebar-open');
            sidebarOverlay.classList.remove('sidebar-overlay-active');
        });
        
        // Logo interaction
        if (mainLogo) {
            mainLogo.addEventListener('click', function(e) {
                e.preventDefault();
                showPage('home');
            });
            
            mainLogo.addEventListener('mouseenter', function() {
                // Make windows glow
                const houseSvg = this.querySelector('.new-logo-svg');
                if (houseSvg) {
                    const circles = houseSvg.querySelectorAll('circle');
                    circles.forEach(circle => {
                        circle.style.fill = '#FFC857';
                        circle.style.filter = 'drop-shadow(0 0 3px rgba(255, 200, 87, 0.8))';
                    });
                }
            });
            
            mainLogo.addEventListener('mouseleave', function() {
                // Reset windows
                const houseSvg = this.querySelector('.new-logo-svg');
                if (houseSvg) {
                    const circles = houseSvg.querySelectorAll('circle');
                    circles.forEach(circle => {
                        circle.style.fill = '#FFC857';
                        circle.style.filter = 'none';
                    });
                }
            });
        }
        
        // Page navigation functionality
        const menuItems = document.querySelectorAll('.menu-item[data-page]');
        const navLinks = document.querySelectorAll('.nav-link[data-page]');
        const pageContents = document.querySelectorAll('.page-content');
        
        function showPage(pageId) {
            // Hide all pages
            pageContents.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // Update active menu item
            menuItems.forEach(item => {
                item.classList.remove('menu-item-active');
                if (item.getAttribute('data-page') === pageId) {
                    item.classList.add('menu-item-active');
                }
            });
            
            // Close sidebar on mobile after selection
            if (window.innerWidth < 768) {
                sidebar.classList.remove('sidebar-open');
                sidebarOverlay.classList.remove('sidebar-overlay-active');
            }
        }
        
        // Add click event to menu items
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                showPage(pageId);
            });
        });
        
        // Add click event to nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                showPage(pageId);
            });
        });
        
        // Theme toggle functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        if (themeToggle) {
            themeToggle.addEventListener('click', function(e) {
                e.preventDefault();
                body.classList.toggle('dark-theme');
                
                const icon = this.querySelector('i');
                const span = this.querySelector('span');
                
                if (body.classList.contains('dark-theme')) {
                    icon.setAttribute('data-lucide', 'moon');
                    span.textContent = 'Dark Mode';
                } else {
                    icon.setAttribute('data-lucide', 'sun');
                    span.textContent = 'Light Mode';
                }
                
                lucide.createIcons();
            });
        }
        
        // Virtual Assistant functionality
        const chatInput = document.getElementById('chatInput');
        const sendMessage = document.getElementById('sendMessage');
        const chatContainer = document.getElementById('chatContainer');
        
        if (sendMessage && chatInput) {
            sendMessage.addEventListener('click', function() {
                const message = chatInput.value.trim();
                if (message) {
                    // Add user message
                    const userMessage = document.createElement('div');
                    userMessage.className = 'chat-message user-message';
                    userMessage.textContent = message;
                    chatContainer.appendChild(userMessage);
                    
                    // Clear input
                    chatInput.value = '';
                    
                    // Simulate assistant response
                    setTimeout(() => {
                        const assistantMessage = document.createElement('div');
                        assistantMessage.className = 'chat-message assistant-message';
                        assistantMessage.textContent = "I understand you're asking about: '" + message + "'. As a home design assistant, I can help you with layout planning, material selection, cost estimation, and more. Could you provide more details about your specific needs?";
                        chatContainer.appendChild(assistantMessage);
                        
                        // Scroll to bottom
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }, 1000);
                    
                    // Scroll to bottom
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            });
            
            // Allow sending message with Enter key
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage.click();
                }
            });
        }
        
        // Navbar hide/show on scroll functionality
        const navbar = document.getElementById('mainNav');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down and past 100px - hide navbar
                navbar.classList.add('hidden');
            } else {
                // Scrolling up - show navbar
                navbar.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    });