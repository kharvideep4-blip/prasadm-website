/**
 * CONTACT PAGE JS – Form handling
 * Only used on the Contact page
 */

(function() {
    'use strict';

    var form = document.getElementById('contactForm');
    var feedback = document.getElementById('formFeedback');

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

            // Success – simulate submission
            feedback.style.display = 'block';
            feedback.className = 'mt-3 alert alert-success';
            var safeName = name ? name.value.trim() : 'User';
            feedback.textContent = 'Thank you, ' + safeName + '! Your message has been sent. We\'ll get back to you within 24 hours.';

            // Optionally reset form
            // form.reset();
            // [name, email, message].forEach(function(f) { if (f) f.classList.remove('is-valid'); });
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