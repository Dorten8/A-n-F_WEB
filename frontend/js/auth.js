document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorElement = document.getElementById('error-message');
  errorElement.hidden = true;

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        username: document.getElementById('username').value, 
        password: document.getElementById('password').value 
      })
    })
    console.log('Response status:', response.status);;

    // First check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Server returned: ${text}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Login failed');
    }

    // Success case
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = '/index.html';
        
  } catch (error) {
    errorElement.textContent = error.message;
    errorElement.hidden = false;
    console.error('Login error:', error);
  }
});