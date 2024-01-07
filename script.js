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
    this._displayMealToTheDOM(meal);
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._displayWorkoutToTheDOM(workout);
    this._render();
  }

  //   -----------------------Private Methods-------------------------------------

  _deleteMealFromTheTracker(id) {
    // the explanation is same as deleting the workout from the _deleteWorkoutFromTheTracker() function written below this function
    const index = this._meals.findIndex((meal) => meal.id === id);

    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      this._meals.splice(index, 1);
      this._render();
    }
  }

  _deleteWorkoutFromTheTracker(id) {
    //once we get the ID of the specific meal object, we look out for the objects's index
    /* findIndex() has been used instead of find() becasue find returns an actual element whereas findIndex return the index and we can perform additional array methods to manipulate the actual array, thats why we are using findIndex here*/
    const index = this._workouts.findIndex((workout) => workout.id === id);

    /*if this returns true,means its a match, otherwise the searching goes all the way to the end of the arrya which is -1, so we are making sure we have a match before we perform any operations*/
    if (index !== -1) {
      //which means we have a match

      //we pulled the corresponsding workout object
      const workout = this._workouts[index];

      //we took off the calories since we are about to perform the delete operations and make sure the tracker total calories are up to date
      this._totalCalories -= workout.calories;

      //actually  took the object off the array based on its location and mutated the actual array
      this._workouts.splice(index, 1);

      //finally re-rendered the stats boxes to make a visual difference or UI manipulation
      this._render();
    }
  }

  _displayMealToTheDOM(meal) {
    const mealsEl = document.getElementById("meals");
    const div = document.createElement("div");
    div.classList.add("p-2", "my-1", "meal-item");
    div.setAttribute("data-id", meal.id);

    div.innerHTML = `
      <div
                  class="d-flex align-items-center justify-content-between fs-6 text-capitalize"
                >
                  ${meal.name}
                  <div class="bg-success text-light py-1 px-2 rounded-2">
                   ${meal.calories} Cal
                  </div>
                  <i class="bi bi-trash text-danger fs-4"></i>
                </div>
    `;

    mealsEl.appendChild(div);
  }

  _displayWorkoutToTheDOM(workout) {
    const workoutEl = document.getElementById("workouts");
    const div = document.createElement("div");
    div.classList.add("p-2", "my-1", "workout-item");
    div.setAttribute("data-id", workout.id);

    div.innerHTML = `
      <div
                  class="d-flex align-items-center justify-content-between fs-6 text-capitalize"
                >
                  ${workout.name}
                  <div class="bg-primary text-light py-1 px-2 rounded-2">
                   ${workout.calories} Cal
                  </div>
                  <i class="bi bi-trash text-danger fs-4"></i>
                </div>
    `;

    workoutEl.appendChild(div);
  }

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

    document
      .getElementById("meals")
      .addEventListener("click", this._deleteItem.bind(this, "meal"));

    document
      .getElementById("workouts")
      .addEventListener("click", this._deleteItem.bind(this, "workout"));
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

    //bootstrap inbuilt constructor that helps the collalspible element to toggle using Javascript, its found in the documentation
    const bootstrapCollapse = new bootstrap.Collapse(collapseMealOrWorkout, {
      toggle: true,
    });
  }

  _deleteItem(type, e) {
    if (e.target.classList.contains("bi-trash")) {
      if (confirm("Are you sure??")) {
        /* because the id itself is not present in this targeted div, we look up for the closest div which has the class of meal-item because it has that specific attached meal-id based on which we perform our delete operation (we can inspect elements after the meal is aaded via form submission) */
        const itemElement = e.target.closest(`${type}-item`);
        if (itemElement) {
          const itemId = itemElement.getAttribute("data-id");

          // We need to add this logic in the CalorieTracker class
          //based on the type, we are deleting eithe meal or workout
          type === "meal"
            ? this._tracker._deleteMealFromTheTracker(itemId)
            : this._tracker._deleteWorkoutFromTheTracker(itemId);

          // this Removes the item from the DOM but not from the tracker so , we have invoked _deleteMealFromTheTracker and _deleteWorkoutFromTheTracker to handle it
          itemElement.remove();
        }
      }
      return;
    }
  }
}

const app = new App();
