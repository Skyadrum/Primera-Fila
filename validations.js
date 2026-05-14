document.addEventListener('DOMContentLoaded', () => {
    // Selector optimizado mediante ID directo de tu HTML
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector('textarea');

    const validateForm = (e) => {
        e.preventDefault(); 
        
        let isValid = true;
        const data = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };

        const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
        if (!nameRegex.test(data.name)) {
            showError(nameInput, "Por favor, ingresa un nombre válido (mínimo 2 letras).");
            isValid = false;
        } else {
            clearError(nameInput);
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(data.email)) {
            showError(emailInput, "Por favor, ingresa un correo electrónico válido.");
            isValid = false;
        } else {
            clearError(emailInput);
        }

        if (data.message.length < 10) {
            showError(messageInput, "Cuéntanos un poco más (al menos 10 caracteres).");
            isValid = false;
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            submitForm(data);
        }
    };

    const showError = (input, message) => {
        input.style.borderColor = "#ff4d4d";
        let errorMsg = input.nextElementSibling;
        if (!errorMsg || !errorMsg.classList.contains('error-text')) {
            errorMsg = document.createElement('small');
            errorMsg.className = 'error-text';
            errorMsg.style.color = "#ff4d4d";
            errorMsg.style.display = "block";
            errorMsg.style.marginBottom = "10px";
            errorMsg.style.textAlign = "left";
            input.insertAdjacentElement('afterend', errorMsg);
        }
        errorMsg.innerText = message;
    };

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
