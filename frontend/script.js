const API_URL = 'http://localhost:5000/api/admin/categories';

const form = document.getElementById('category-form');
const input = document.getElementById('category-name');
const list = document.getElementById('category-list');

// Load categories on page load
window.addEventListener('DOMContentLoaded', getCategories);

// Add new category
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = input.value.trim();

  if (name === "") return;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });

    const data = await res.json();
    console.log("Category added:", data);
    input.value = '';
    getCategories();
  } catch (err) {
    console.error("Error adding category:", err);
  }
});

// Fetch and display categories
async function getCategories() {
  try {
    const res = await fetch(API_URL);
    const categories = await res.json();

    list.innerHTML = ''; // clear previous list
    categories.forEach(cat => {
      const li = document.createElement('li');
      li.textContent = cat.name;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
}