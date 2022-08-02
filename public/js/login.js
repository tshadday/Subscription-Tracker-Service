const loginForm = async (event) => {
    event.preventdefault();

    const email = document.querySelector('#emailLogin').value.trim();
    const password = document.querySelector('passwordLogin').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            document.location.replace('/');
          } else {
            alert('Failed to log in');
          }
    };
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
