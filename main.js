
const typingElement = document.getElementById("typing-text");
if (typingElement) {
  const text = "Welcome to The XIV Project";
  let index = 0;

  function type() {
    if (index < text.length) {
      typingElement.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }

  type();
}


document.body.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === 'f') {
    alert("Boo!");
  }
});


const input = document.getElementById('insert-input');
const button = document.getElementById('insert-btn');
const result = document.getElementById('result');

if (button && input && result) {
  button.addEventListener('click', () => {
    const num = input.value.trim();

    if (!num) {
      result.textContent = 'Please enter a number!';
      return;
    }

    result.textContent = "I'm thinking...";
    input.value = '';  

    setTimeout(() => {
      result.textContent = `Your number was: ${num} ;)`;
    }, 3000);
  });
}


const viewCountEl = document.getElementById('view-count');


if (viewCountEl) {
  fetch('/.netlify/functions/view-counter')
    .then(res => res.json())
    .then(data => {
      viewCountEl.textContent = `Views: ${data.count}`;
    })
    .catch(err => {
      console.error('View counter error:', err);
      viewCountEl.textContent = 'Views: ?';
    });
}
