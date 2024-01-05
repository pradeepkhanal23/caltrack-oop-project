//Calorie Tracker Class
class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }

  //   -----------------------Public Methods-------------------------------------

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  //   -----------------------Private Methods-------------------------------------

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById("total-calories");
    totalCaloriesEl.textContent = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const calorieLimitEl = document.getElementById("calorie-limit");
    calorieLimitEl.textContent = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById("calories-consumed");

    const consumed = this._meals.reduce((total, meal) => {
      return total + meal.calories;
    }, 0);

    caloriesConsumedEl.textContent = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById("calories-burned");

    const burned = this._workouts.reduce((total, workout) => {
      return total + workout.calories;
    }, 0);

    caloriesBurnedEl.textContent = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById("calories-remaining");
    const caloriesRemainingCard = document.getElementById(
      "calories-remaining-card"
    );
    const caloriesGainLoss = document.getElementById("calories-gain-loss");
    const progressBar = document.getElementById("progress");

    const remaining = this._calorieLimit - this._totalCalories;

    if (remaining <= 0) {
      caloriesRemainingCard.classList.remove("bg-light", "text-dark");
      caloriesRemainingCard.classList.add("bg-danger", "text-light");

      caloriesGainLoss.classList.remove("bg-success", "text-white");
      caloriesGainLoss.classList.add("bg-danger", "text-white");

      progressBar.classList.remove("bg-success");
      progressBar.classList.add("bg-danger");
    } else {
      caloriesRemainingCard.classList.add("bg-light", "text-dark");
      caloriesRemainingCard.classList.remove("bg-danger", "text-light");

      caloriesGainLoss.classList.add("bg-success", "text-light");
      caloriesGainLoss.classList.remove("bg-danger", "text-light");

      progressBar.classList.remove("bg-danger");
      progressBar.classList.add("bg-success");
    }

    caloriesRemainingEl.textContent = remaining;
  }

  _displayCaloriesProgress() {
    const progressBar = document.getElementById("progress");

    const limitCalories = this._calorieLimit;
    const remainingCalories = this._calorieLimit - this._totalCalories;

    // Calculate the percentage of calories consumed
    const consumedPercentage =
      ((limitCalories - remainingCalories) / limitCalories) * 100;

    // Set the width of the progress bar
    progressBar.style.width = `${consumedPercentage}%`;
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString().slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString().slice(2);
    this.name = name;
    this.calories = calories;
  }
}

/*Now that we need to make this a complete app, which has events and much more functionality, we create a new App class and add events in it*/

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .querySelector("#meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));
    document
      .querySelector("#workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));
  }

  _newItem(type, e) {
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    //input validation
    if (name.value === "" || calories.value === "") {
      alert("Please Enter both values");
      return;
    }

    if (type === "meal") {
      const newMeal = new Meal(name.value, Number(calories.value));
      this._tracker.addMeal(newMeal);
    } else {
      const newWorkout = new Workout(name.value, Number(calories.value));
      this._tracker.addWorkout(newWorkout);
    }

    name.value = "";
    calories.value = "";

    const collapseMealOrWorkout = document.getElementById(`${type}-collapse`);

    const bootstrapCollapse = new bootstrap.Collapse(collapseMealOrWorkout, {
      toggle: true,
    });
  }
}

const app = new App();
