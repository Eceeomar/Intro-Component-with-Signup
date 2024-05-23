document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('form');
  const inputs = form.querySelectorAll("input:not([type='submit'])");

  inputs.forEach(input => {
    // Add event listener for invalid inputs for all inputs
    input.addEventListener('invalid', addErrorMessage);

    // Check validity on every blur
    input.addEventListener('blur', (event) => {
      input.checkValidity();
    });

    // Remove existing error messages on focus
    input.addEventListener('focus', removeErrorMessage);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        addErrorMessage({ target: input });
      }
    });
  });

  function addErrorMessage(e) {
    const input = e.target;
    const inputContainer = input.parentElement;
    const name = input.getAttribute("name");

    // Remove existing error elements if any
    removeErrorMessage({ target: input });

    // Create an error icon element
    const errorIcon = document.createElement('span');
    errorIcon.setAttribute("data-id", name);
    errorIcon.classList.add('error-icon');
    errorIcon.innerHTML = "<img src='images/icon-error.svg' alt='Error'>";

    // Create an error message
    const errorMessage = document.createElement('span');
    errorMessage.setAttribute("data-id", name);
    errorMessage.classList.add('error-message');

    if (input.value === "" || input.value == null) {
      errorMessage.innerHTML = input.getAttribute("placeholder") + " cannot be empty.";
    } else if (input.type === 'email' && !validateEmail(input.value)) {
      errorMessage.innerHTML = "Looks like this is not an email.";
    } else {
      errorMessage.innerHTML = "Looks like this is not a valid " + input.getAttribute("placeholder") + ".";
    }

    // Append error icon and message inside input-container
    inputContainer.appendChild(errorMessage);
    inputContainer.appendChild(errorIcon);

    // Add error class to input to change border color
    input.classList.add('error');
  }

  function removeErrorMessage(e) {
    const input = e.target;
    const name = input.getAttribute("name");

    // Get error icon and message elements corresponding to target
    const elements = document.querySelectorAll("[data-id='" + name + "']");

    // Remove those elements
    elements.forEach(errorElement => {
      errorElement.remove();
    });

    // Remove error class from input
    input.classList.remove('error');
  }

  // Function to validate email
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Password visibility toggle
  let a = 0;
  const passwordField = document.getElementById('password');
  const passIcon = document.getElementById('pass-icon');

  passIcon.addEventListener('click', pass);

  function pass() {
    if (a == 1) {
      passwordField.type = 'password';
      passIcon.src = 'hide.png';
      a = 0;
    } else {
      passwordField.type = 'text';
      passIcon.src = 'show.png';
      a = 1;
    }
  }
});
