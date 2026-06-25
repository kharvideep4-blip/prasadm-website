/**
 * CONTACT PAGE JS – Form handling with Firestore
 * Only used on the Contact page
 */

(function() {
    'use strict';

    var form = document.getElementById('contactForm');
    var feedback = document.getElementById('formFeedback');
    var submitBtn = form ? form.querySelector('button[type="submit"]') : null;

    if (form && feedback) {

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            feedback.style.display = 'none';
            feedback.className = 'mt-3';
            feedback.textContent = '';

            var name = document.getElementById('fullName');
            var email = document.getElementById('emailAddress');
            var org = document.getElementById('orgName');
            var message = document.getElementById('messageText');

            // Reset validation states
            [name, email, message].forEach(function(field) {
                if (field) {
                    field.classList.remove('is-invalid', 'is-valid');
                }
            });

            var isValid = true;

            // Validate Name
            if (!name || !name.value || name.value.trim().length < 2) {
                if (name) name.classList.add('is-invalid');
                isValid = false;
            } else if (name) {
                name.classList.add('is-valid');
            }

            // Validate Email
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !email.value || !emailPattern.test(email.value.trim())) {
                if (email) email.classList.add('is-invalid');
                isValid = false;
            } else if (email) {
                email.classList.add('is-valid');
            }

            // Validate Message
            if (!message || !message.value || message.value.trim().length < 5) {
                if (message) message.classList.add('is-invalid');
                isValid = false;
            } else if (message) {
                message.classList.add('is-valid');
            }

            if (!isValid) {
                feedback.style.display = 'block';
                feedback.className = 'mt-3 alert alert-danger';
                feedback.textContent = 'Please fix the highlighted fields and try again.';
                return;
            }

            // ── Prepare data ──
            var fullName = name.value.trim();
            var emailVal = email.value.trim();
            var orgVal = org ? org.value.trim() : '';
            var msgVal = message.value.trim();

            // ── Disable submit button ──
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            }

            // ── Check if Firebase Firestore is available ──
            if (typeof db === 'undefined') {
                console.error('Firestore not available.');
                feedback.style.display = 'block';
                feedback.className = 'mt-3 alert alert-danger';
                feedback.textContent = '❌ System error. Please try again later.';
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message <i class="fas fa-arrow-right ms-2"></i>';
                }
                return;
            }

            // ── Save to Firestore ──
            db.collection('contacts').add({
                fullName: fullName,
                email: emailVal,
                orgName: orgVal || '',
                message: msgVal,
                status: 'new',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(function() {
                feedback.style.display = 'block';
                feedback.className = 'mt-3 alert alert-success';
                feedback.textContent = '✅ Thank you, ' + fullName + '! Your message has been sent. We\'ll get back to you within 24 hours.';
                form.reset();
                [name, email, message].forEach(function(f) { if (f) f.classList.remove('is-valid'); });
            })
            .catch(function(error) {
                console.error('Error submitting contact form:', error);
                feedback.style.display = 'block';
                feedback.className = 'mt-3 alert alert-danger';
                feedback.textContent = '❌ Something went wrong. Please try again later.';
            })
            .finally(function() {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message <i class="fas fa-arrow-right ms-2"></i>';
                }
            });
        });

        // Clear validation on input
        document.querySelectorAll('#contactForm .form-control').forEach(function(input) {
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') || this.classList.contains('is-valid')) {
                    this.classList.remove('is-invalid', 'is-valid');
                }
            });
        });

    }

})();