const newUserForm = document.querySelector('.new-user-form')
const deleteButton = document.querySelector('.delete-button')
const newReviewButton = document.querySelector('.new-review-button')

document.addEventListener("DOMContentLoaded", function() {
  console.log('Battlecruiser operational')
  newReviewButton.addEventListener("click", function() {
    window.location.href = ('/reviews/new')
  })
});
