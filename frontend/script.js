const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    message: contactForm.message.value
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const result = await res.json();

    if (res.ok) {
      formResponse.style.color = 'lightgreen';
      formResponse.textContent = result.message || 'Message sent successfully!';
      contactForm.reset();
    } else {
      formResponse.style.color = 'red';
      formResponse.textContent = result.error || 'Failed to send message.';
    }
  } catch (error) {
    console.error('❌ Error:', error);
    formResponse.style.color = 'red';
    formResponse.textContent = 'An unexpected error occurred.';
  }
});
  