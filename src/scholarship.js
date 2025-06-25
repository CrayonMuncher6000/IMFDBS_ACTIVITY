// scholarship.js
// Scholarship tracking using backend API (Node.js/Express)

const API_URL = 'http://localhost:5000/api/scholarships';

// Add a new scholarship
async function addScholarship(scholarship) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scholarship)
  });
  if (!response.ok) throw new Error('Failed to add scholarship');
  return await response.json();
}

// Get all scholarships
async function getScholarships() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch scholarships');
  return await response.json();
}

// Update a scholarship by id
async function updateScholarship(id, updatedScholarship) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedScholarship)
  });
  if (!response.ok) throw new Error('Failed to update scholarship');
  return await response.json();
}

// Delete a scholarship by id
async function deleteScholarship(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete scholarship');
  return await response.json();
}

// Example usage:
// addScholarship({ name: 'John Doe', program: 'STEM', status: 'Active' });
// getScholarships().then(console.log);
// updateScholarship('scholarshipId', { name: 'Jane', program: 'Math', status: 'Graduated' });
// deleteScholarship('scholarshipId');

// Connect these functions to your HTML forms and tables for full interactivity.
