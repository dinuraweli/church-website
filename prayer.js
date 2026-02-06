document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prayerRequestForm');
    const anonymousCheckbox = document.getElementById('anonymous');
    const nameEmailFields = document.getElementById('nameEmailFields');
    const submitBtn = form.querySelector('.btn-submit');
    
    // Toggle name/email fields
    anonymousCheckbox.addEventListener('change', function() {
        nameEmailFields.style.display = this.checked ? 'none' : 'block';
    });
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable submit button and show loading
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = {
            prayerRequest: document.getElementById('prayerRequest').value,
            anonymous: anonymousCheckbox.checked,
            name: anonymousCheckbox.checked ? 'Anonymous' : document.getElementById('name').value || 'Anonymous',
            email: anonymousCheckbox.checked ? 'Not provided' : document.getElementById('email').value || 'Not provided',
            timestamp: new Date().toLocaleString(),
            ip: await getClientIP()
        };
        
        // Validate
        if (!formData.prayerRequest.trim()) {
            alert('Please enter your prayer request.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Send to Google Apps Script
        try {
            const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL_HERE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                showSuccessMessage();
                form.reset();
                nameEmailFields.style.display = 'none';
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Sorry, there was an error submitting your prayer request. Please try again or contact us directly.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Get client IP (for tracking purposes only)
    async function getClientIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch {
            return 'Unknown';
        }
    }
    
    // Success message function
    function showSuccessMessage() {
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 10px; text-align: center; max-width: 500px; width: 90%;">
                <div style="font-size: 3rem; color: #4CAF50; margin-bottom: 20px;">🙏</div>
                <h3 style="color: var(--primary-color); margin-bottom: 15px;">Prayer Request Received</h3>
                <p>Thank you for sharing your prayer intention. Our community will pray for you.</p>
                <p style="font-size: 0.9rem; color: var(--text-light); margin-top: 15px;">
                    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." - Philippians 4:6
                </p>
                <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" 
                        style="margin-top: 25px; padding: 10px 30px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Continue
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
});
