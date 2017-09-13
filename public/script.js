document.addEventListener("DOMContentLoaded", function() {
  const deleteButton = document.querySelector('.delete-button')
  const newReviewButton = document.querySelector('.new-review-button')
  const newReviewForm = document.querySelector('.new-review-form')

  console.log('DOM fully operational')

  if (deleteButton) {
    deleteButton.addEventListener("click", function() {
    })
  }

  if (newReviewButton) {
    newReviewButton.addEventListener("click", function() {
      event.preventDefault()
      window.location = (window.location.href + '/reviews/new')
      localStorage.setItem('albumID', albumID)
    })
  }
});
