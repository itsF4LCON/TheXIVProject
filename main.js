
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
const namespace = 'thexivproject';
const key = 'xiv';

if (viewCountEl) {
  fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      viewCountEl.textContent = `Views: ${data.value}`;
    })
    .catch(() => {
      viewCountEl.textContent = 'Views: ?';
    });
}
