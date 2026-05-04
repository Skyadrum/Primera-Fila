document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contact form');
    
    // Select inputs
    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector('textarea');

    const validateForm = (e) => {
        e.preventDefault(); // Prevent default submission
        
        let isValid = true;
        const data = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };

        // 1. Name Validation: Minimum 2 characters, only letters/spaces
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
        if (!nameRegex.test(data.name)) {
            showError(nameInput, "Por favor, ingresa un nombre válido (mínimo 2 letras).");
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // 2. Email Validation: RFC 5322 Standard-ish regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(data.email)) {
            showError(emailInput, "Por favor, ingresa un correo electrónico válido.");
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // 3. Message Validation: Ensure it's not just empty or whitespace
        if (data.message.length < 10) {
            showError(messageInput, "Cuéntanos un poco más (al menos 10 caracteres).");
            isValid = false;
        } else {
            clearError(messageInput);
        }

        // If all pass
        if (isValid) {
            submitForm(data);
        }
    };

    // Helper: Show Error
    const showError = (input, message) => {
        input.style.borderColor = "#ff4d4d";
        // Check if error message already exists to avoid duplicates
        let errorMsg = input.nextElementSibling;
        if (!errorMsg || !errorMsg.classList.contains('error-text')) {
            errorMsg = document.createElement('small');
            errorMsg.className = 'error-text';
            errorMsg.style.color = "#ff4d4d";
            errorMsg.style.display = "block";
            errorMsg.style.marginBottom = "10px";
            input.insertAdjacentElement('afterend', errorMsg);
        }
        errorMsg.innerText = message;
    };

    // Helper: Clear Error
    const clearError = (input) => {
        input.style.borderColor = "";
        const errorMsg = input.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-text')) {
            errorMsg.remove();
        }
    };

    const submitForm = (payload) => {
        console.log("Formulario enviado con éxito:", payload);
        alert("¡Gracias! Tu mensaje ha sido enviado.");
        contactForm.reset();
    };

    contactForm.addEventListener('submit', validateForm);
});
