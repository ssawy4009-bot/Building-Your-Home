// Track current step
        let currentStep = 1;
        const totalSteps = 4;
        
        // Initialize the form
        document.addEventListener('DOMContentLoaded', function() {
            updateStepIndicators();
        });
        
        // File upload display
        document.getElementById('document').addEventListener('change', function(e) {
            const fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
            document.getElementById('fileName').textContent = fileName;
        });
        
        // Form submission
        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const agreeTerms = document.getElementById('agreeTerms');
            if (!agreeTerms.checked) {
                alert('You must agree to the Terms of Use and Privacy Policy');
                return;
            }
            
            alert('Account created successfully! You will be redirected to the home page.');
            // window.location.href = 'home.html';
        });
        
        // Navigation functions
        function nextStep(current) {
            if (validateStep(current)) {
                currentStep = current + 1;
                showStep(currentStep);
                updateStepIndicators();
            }
        }
        
        function prevStep(current) {
            currentStep = current - 1;
            showStep(currentStep);
            updateStepIndicators();
        }
        
        function showStep(stepNumber) {
            // Hide all steps
            document.querySelectorAll('.form-step').forEach(step => {
                step.classList.remove('active');
            });
            
            // Show current step
            document.getElementById(`step-${stepNumber}`).classList.add('active');
        }
        
        function updateStepIndicators() {
            // Reset all indicators
            document.querySelectorAll('.step').forEach((step, index) => {
                step.classList.remove('active', 'completed');
                
                if (index + 1 < currentStep) {
                    step.classList.add('completed');
                } else if (index + 1 === currentStep) {
                    step.classList.add('active');
                }
            });
        }
        
        function validateStep(step) {
            // Simple validation example - extend as needed
            if (step === 1) {
                const fullName = document.getElementById('fullName').value;
                const email = document.getElementById('email').value;
                if (!fullName || !email) {
                    alert('Please fill in all required fields');
                    return false;
                }
            }
            return true;
        }