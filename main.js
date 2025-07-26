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

// === VIEW COUNTER USING JSONBIN.IO ===

const BIN_ID = '68853128f7e7a370d1ee6a89';      // <-- Put your jsonbin.io bin ID here
const API_KEY = '$2a$10$KVYC/407xLBFjFLQse8idOBO7Rnt295RL9Zg85oYMQ9hfKEik131a';    // <-- Put your jsonbin.io API key here

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': API_KEY
};

async function getCount() {
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, { headers });
    const data = await res.json();
    return data.record.count || 0;
  } catch (e) {
    console.error('Error fetching count:', e);
    return 0;
  }
}

async function updateCount(newCount) {
  try {
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ count: newCount })
    });
  } catch (e) {
    console.error('Error updating count:', e);
  }
}

async function incrementViewCount() {
  let count = await getCount();
  count++;
  await updateCount(count);
  const el = document.getElementById('view-count');
  if (el) {
    el.textContent = `Views: ${count}`;
  }
}

incrementViewCount();
