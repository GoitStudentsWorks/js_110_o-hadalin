import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 2,
      },
    },
    on: {
      slideChange: () => {
        updateButtonStates();
      },
    },
  });

  fetchReviews();

  async function fetchReviews() {
    const reviewsList = document.getElementById('reviews-list');
    const errorMessage = document.getElementById('error-message');

    try {
      const response = await fetch('https://portfolio-js.b.goit.study/api/reviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch reviews: ${response.status}`);

      const reviews = await response.json();

      reviews.forEach((review) => {
        const listItem = document.createElement('li');
        listItem.className = 'swiper-slide';

        const text = document.createElement('p');
        text.className = 'review-text';
        text.textContent = review.text;

        const reviewerInfo = document.createElement('div');
        reviewerInfo.className = 'reviewer-info';

        const photo = document.createElement('img');
        photo.className = 'review-photo';
        photo.src = review.photo;
        photo.alt = `${review.name}'s photo`;

        const name = document.createElement('p');
        name.className = 'reviewer-name';
        name.textContent = review.name;

        reviewerInfo.appendChild(photo);
        reviewerInfo.appendChild(name);

        listItem.appendChild(text);
        listItem.appendChild(reviewerInfo);
        reviewsList.appendChild(listItem);
      });

      swiper.update();
    } catch (error) {
      console.error('Error fetching reviews:', error);
      errorMessage.textContent = 'Not found';
      errorMessage.classList.remove('hidden');
    }
  }

  function updateButtonStates() {
    const nextButton = document.querySelector('.swiper-button-next');
    const prevButton = document.querySelector('.swiper-button-prev');

    nextButton.disabled = swiper.isEnd;
    prevButton.disabled = swiper.isBeginning;

    nextButton.classList.toggle('disabled', swiper.isEnd);
    prevButton.classList.toggle('disabled', swiper.isBeginning);
  }

  updateButtonStates();
});
