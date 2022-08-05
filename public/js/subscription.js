const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#subscription-name').value.trim();
  const cancel_date = document.querySelector('#cancel-date').value.trim();

  if (name && cancel_date) {
    const response = await fetch(`/api/subscription/create`, {
      method: 'POST',
      body: JSON.stringify({ name, cancel_date }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/subscription/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-subscription')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.subscription-list')
  .addEventListener('click', delButtonHandler);
