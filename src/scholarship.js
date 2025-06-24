// scholarship.js
// Basic scholarship tracking using localStorage

// Add a new scholarship
function addScholarship(scholarship) {
  const scholarships = getScholarships();
  scholarships.push(scholarship);
  localStorage.setItem('scholarships', JSON.stringify(scholarships));
}

// Get all scholarships
function getScholarships() {
  const data = localStorage.getItem('scholarships');
  return data ? JSON.parse(data) : [];
}

// Update a scholarship by index
function updateScholarship(index, updatedScholarship) {
  const scholarships = getScholarships();
  if (index >= 0 && index < scholarships.length) {
    scholarships[index] = updatedScholarship;
    localStorage.setItem('scholarships', JSON.stringify(scholarships));
  }
}

// Example: Add a new scholarship
// addScholarship({ name: 'John Doe', program: 'STEM', status: 'Active' });

// Example: Get all scholarships
// console.log(getScholarships());

// Example: Update a scholarship
// updateScholarship(0, { name: 'John Doe', program: 'STEM', status: 'Graduated' });

// You can connect these functions to your HTML forms and tables for full interactivity.
