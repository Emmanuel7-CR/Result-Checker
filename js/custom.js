// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Simple form validation example
document.addEventListener('DOMContentLoaded', function() {
  const paymentForm = document.getElementById('paymentForm');
  if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
      const receipt = document.getElementById('receiptUpload').files[0];
      if (!receipt) {
        e.preventDefault();
        alert('Please upload payment receipt');
        return false;
      }
      
      if (receipt.size > 2000000) { // 2MB limit
        e.preventDefault();
        alert('File too large. Maximum size is 2MB');
        return false;
      }
    });
  }
  
  // Demo PIN generation
  const generatePinBtn = document.getElementById('generatePin');
  if (generatePinBtn) {
    generatePinBtn.addEventListener('click', function() {
      const pin = 'IHS-' + Math.random().toString(36).substr(2, 8).toUpperCase();
      document.getElementById('generatedPin').value = pin;
      document.getElementById('pinDetails').classList.remove('d-none');
    });
  }
  
  // Sidebar toggle for mobile
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      document.querySelector('.sidebar').classList.toggle('show');
    });
  }
});