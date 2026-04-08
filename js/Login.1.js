window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YOUR_GA_ID');

/* --- Next Script Block --- */

// Google Analytics event tracking
        function trackEvent(category, action, label) {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        
        // Handle Google Sign-In
        function handleGoogleSignIn(response) {
            // Send the credential to your backend
            const credential = response.credential;
            
            // Track successful Google sign-in
            trackEvent('Authentication', 'Google Sign-In', 'Success');
            
            // Here you would typically send the credential to your server for verification
            console.log('Google Sign-In successful', credential);
            
            // Redirect or handle successful login
            // window.location.href = '/dashboard';
        }
        
        // Handle form submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember').checked;
            
            // Track login attempt
            trackEvent('Authentication', 'Login Attempt', email);
            
            // Here you would typically send the data to your server
            console.log('Login submitted', { email, password, rememberMe });
            
            // Simulate successful login (replace with actual API call)
            setTimeout(() => {
                // Track successful login
                trackEvent('Authentication', 'Login Success', email);
                
                alert('Login successful! Redirecting...');
                // window.location.href = '/dashboard';
            }, 1000);
        });
        
        // Track page view
        trackEvent('Page', 'View', 'Login Page');