# 🍃 Mongoose & MongoDB Atlas Checkpoint

This repository contains the solution for the **Mongoose & Node.js Checkpoint** as part of the Gomycode Full-Stack Web Development curriculum. The goal of this project is to practice database management, schema creation, and performing advanced CRUD (Create, Read, Update, Delete) operations using **Mongoose v8+** and **MongoDB Atlas**.

---

## 🚀 Features & Operations Implemented

All operations have been refactored to use modern JavaScript **Promises (`.then` / `.catch`)** to match Mongoose v8 standards and prevent callback deprecation issues, while maintaining compatibility with standard test runners.

* **Database Connection:** Securely connected to MongoDB Atlas via Environment Variables.
* **Schema Definition:** Created a `Person` prototype with validation (`name`, `age`, `favoriteFoods`).
* **Create Operations:** * `createAndSavePerson`: Saves a single record using the model constructor.
    * `createManyPeople`: Bulk-creates multiple documents using `Model.create()`.
* **Read Operations:**
    * `findPeopleByName`: Finds all people with a specific name using `Model.find()`.
    * `findOneByFood`: Finds a single record matching a favorite food using `Model.findOne()`.
    * `findPersonById`: Fetches a discrete document by its `_id` field.
* **Update Operations:**
    * `findEditThenSave`: Classical update workflow (Find -> Modify Array -> Save).
    * `findAndUpdate`: Modern update using `Model.findOneAndUpdate()` with `{ new: true }`.
* **Delete Operations:**
    * `removeById`: Deletes a single document via `Model.findByIdAndDelete()`.
    * `removeManyPeople`: Bulk deletes records matching a condition via `Model.deleteMany()`.
* **Advanced Query Chain:**
    * Chained `.find()`, `.sort()`, `.limit()`, and `.select()` to filter, sort, and slice query outcomes.

---

## 🛠️ Setup and Installation

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd <project-folder-name>