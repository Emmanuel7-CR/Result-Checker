document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips if any
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Demo notifications for non-admin pages
    if (!window.location.href.includes('admin/') && document.querySelector('.alert') === null) {
        setTimeout(function() {
            const demoNotification = document.createElement('div');
            demoNotification.className = 'alert alert-info position-fixed bottom-0 end-0 m-3 shadow';
            demoNotification.style.zIndex = '9999';
            demoNotification.style.maxWidth = '350px';
            demoNotification.innerHTML = `
                <strong>Demo Notice:</strong> This is a demonstration of the result checker system. 
                Contact school administration for the live portal.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            document.body.appendChild(demoNotification);
            
            // Auto-dismiss after 10 seconds
            setTimeout(function() {
                demoNotification.remove();
            }, 10000);
        }, 3000);
    }
});

// Function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

// Function to generate random PIN (for demo purposes)
function generateRandomPIN() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pin = '';
    for (let i = 0; i < 10; i++) {
        pin += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pin;
}