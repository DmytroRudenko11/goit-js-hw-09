import Notiflix from 'notiflix';

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

const form = document.querySelector('.form');
form.addEventListener('submit', dataHandler);

function dataHandler(e) {
  e.preventDefault();
  let currentDelay = 0;

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  if (Number(delay.value) < 0) {
    return Notiflix.Notify.failure(
      'Value for first step should be positive or equal 0!'
    );
  } else if (0 >= Number(amount.value)) {
    return Notiflix.Notify.failure(
      'Amount of promises should be higher then 0!'
    );
  }

  for (let i = 0; i <= Number(amount.value) - 1; i++) {
    currentDelay = Number(delay.value) + Number(step.value) * i;
    console.log(
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
        })
    );
  }
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
