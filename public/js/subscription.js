const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#subscription-name').value.trim();
  //const cancel_date = document.querySelector('#cancel-date').value.trim();
  var cancel_date = moment(document.querySelector('#cancel-date'))

  console.log(cancel_date);

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

document
  .querySelector('.new-subscription')
  .addEventListener('submit', newFormHandler);