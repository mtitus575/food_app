import { RecipeManager } from "./recipeManager.js";

export class RecipeFormHandler {
  constructor() {
    this.modal = document.getElementById("addRecipeModal");
    this.form = document.getElementById("addRecipeForm");
    this.ingredientsContainer = document.getElementById(
      "ingredients-container"
    );
    this.instructionsContainer = document.getElementById(
      "instructions-container"
    );

    this.initializeEventListeners();
    this.addInitialFields();
  }

  initializeEventListeners() {
    // Open modal
    const addRecipeBtn = document.getElementById("addNewRecipe");
    if (addRecipeBtn) {
      addRecipeBtn.addEventListener("click", () => {
        this.openModal();
      });
    }

    // Close modal
    const closeBtn = document.querySelector(".close-modal");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.closeModal();
      });
    }

    const cancelBtn = document.getElementById("cancelRecipe");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        this.closeModal();
      });
    }

    // Close modal when clicking outside
    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }

    // Add ingredient/instruction buttons
    const addIngredientBtn = document.getElementById("add-ingredient");
    if (addIngredientBtn) {
      addIngredientBtn.addEventListener("click", () => {
        this.addIngredientField();
      });
    }

    const addInstructionBtn = document.getElementById("add-instruction");
    if (addInstructionBtn) {
      addInstructionBtn.addEventListener("click", () => {
        this.addInstructionField();
      });
    }

    // Form submission
    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        this.handleSubmit(e);
      });
    }
  }

  openModal() {
    if (this.modal) {
      this.modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.style.display = "none";
      document.body.style.overflow = "auto";
      this.resetForm();
    }
  }

  resetForm() {
    if (this.form) {
      this.form.reset();
    }
    if (this.ingredientsContainer) {
      this.ingredientsContainer.innerHTML = "";
    }
    if (this.instructionsContainer) {
      this.instructionsContainer.innerHTML = "";
    }
    this.addInitialFields();
  }

  addInitialFields() {
    // Add one ingredient field by default
    this.addIngredientField();
    // Add one instruction field by default
    this.addInstructionField();
  }

  addIngredientField() {
    if (!this.ingredientsContainer) return;

    const ingredientDiv = document.createElement("div");
    ingredientDiv.className = "ingredient-item";
    ingredientDiv.innerHTML = `
      <input type="text" placeholder="Ingredient name" required>
      <input type="number" placeholder="Amount" step="0.1" min="0" required>
      <input type="text" placeholder="Unit (cups, tbsp, etc)">
      <button type="button" class="remove-item">Remove</button>
    `;

    // Add remove functionality
    const removeBtn = ingredientDiv.querySelector(".remove-item");
    removeBtn.addEventListener("click", () => {
      ingredientDiv.remove();
    });

    this.ingredientsContainer.appendChild(ingredientDiv);
  }

  addInstructionField() {
    if (!this.instructionsContainer) return;

    const instructionDiv = document.createElement("div");
    instructionDiv.className = "instruction-item";
    instructionDiv.innerHTML = `
      <textarea placeholder="Describe this step..." rows="2" required></textarea>
      <button type="button" class="remove-item">Remove</button>
    `;

    // Add remove functionality
    const removeBtn = instructionDiv.querySelector(".remove-item");
    removeBtn.addEventListener("click", () => {
      instructionDiv.remove();
    });

    this.instructionsContainer.appendChild(instructionDiv);
  }

  collectFormData() {
    if (!this.form) return {};

    const formData = new FormData(this.form);

    // Collect basic data
    const recipeData = {
      name: formData.get("recipeName") || "",
      prepTime: parseInt(formData.get("prepTime")) || 0,
      cookTime: parseInt(formData.get("cookTime")) || 0,
      servings: parseInt(formData.get("servings")) || 1,
      image: formData.get("recipeImage") || "",
      ingredients: [],
      instructions: [],
    };

    // Collect ingredients
    if (this.ingredientsContainer) {
      const ingredientItems =
        this.ingredientsContainer.querySelectorAll(".ingredient-item");
      ingredientItems.forEach((item) => {
        const inputs = item.querySelectorAll("input");
        if (inputs.length >= 3 && inputs[0].value.trim()) {
          // Only add if name is provided
          recipeData.ingredients.push({
            name: inputs[0].value.trim(),
            amount: parseFloat(inputs[1].value) || 1,
            unit: inputs[2].value.trim() || "",
          });
        }
      });
    }

    // Collect instructions
    if (this.instructionsContainer) {
      const instructionItems =
        this.instructionsContainer.querySelectorAll(".instruction-item");
      instructionItems.forEach((item) => {
        const textarea = item.querySelector("textarea");
        if (textarea && textarea.value.trim()) {
          // Only add if instruction is provided
          recipeData.instructions.push(textarea.value.trim());
        }
      });
    }

    return recipeData;
  }

  handleSubmit(e) {
    e.preventDefault();

    try {
      const recipeData = this.collectFormData();

      // Validate we have at least basic data
      if (!recipeData.name || !recipeData.name.trim()) {
        alert("Please enter a recipe name.");
        return;
      }

      // Validate we have at least one ingredient and instruction
      if (recipeData.ingredients.length === 0) {
        alert("Please add at least one ingredient.");
        return;
      }

      if (recipeData.instructions.length === 0) {
        alert("Please add at least one instruction step.");
        return;
      }

      // Add the recipe using RecipeManager
      RecipeManager.addRecipe(recipeData);

      // Show success message
      alert(`Recipe "${recipeData.name}" added successfully!`);

      // Close the modal
      this.closeModal();
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Error adding recipe. Please check your input and try again.");
    }
  }
}
