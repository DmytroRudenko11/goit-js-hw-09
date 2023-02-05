import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', dataHandler);

function dataHandler(e) {
  e.preventDefault();
  let currentDelay = 0;

  const delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);
  const amount = Number(e.target.amount.value);

  if (delay < 0) {
    return Notiflix.Notify.failure(
      'Value for first step should be positive or equal 0!'
    );
  } else if (0 >= amount) {
    return Notiflix.Notify.failure(
      'Amount of promises should be higher then 0!'
    );
  }

  for (let i = 0; i < amount; i++) {
    currentDelay = delay + step * i;

    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
