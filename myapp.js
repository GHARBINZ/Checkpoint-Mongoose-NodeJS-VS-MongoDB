// 1. Load el dotenv w mongoose
require('dotenv').config();
const mongoose = require('mongoose');

// 2. El connection bil Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Connected successfully to MongoDB Atlas!"))
  .catch(err => console.error("❌ Connection error:", err));

// 3. Create el Schema (el blueprint)
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create el Model
const Person = mongoose.model('Person', personSchema);

// 4. Create and Save a Record
const createAndSavePerson = (done) => {
  // 1. Na9smou instance mel Model Person
  const john = new Person({
    name: "John Doe",
    age: 28,
    favoriteFoods: ["Pizza", "Sushi"]
  });

  // 2. Nsivioh fil DB bil Promises
  john.save()
    .then(data => done(null, data))  // Ken s7i7, nraj3ou el data
    .catch(err => done(err));        // Ken thama error, nraj3ou l-error
};

// 5. Create Many Records
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then(data => done(null, data))
    .catch(err => done(err));
};

// 6. Use model.find() to Search
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName })
    .then(data => done(null, data))
    .catch(err => done(err));
};

// 7. Use model.findOne()
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food })
    .then(data => done(null, data))
    .catch(err => done(err));
};

// 8. Use model.findById()
const findPersonById = (personId, done) => {
  Person.findById(personId)
    .then(data => done(null, data))
    .catch(err => done(err));
};

// 9. Perform Classic Updates (Find, Edit, then Save)
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // 1. Nlaoujo 3la el person bil ID mta3ou
  Person.findById(personId)
    .then(person => {
      // 2. N-pushiw el food el jdid fil array mta3o
      person.favoriteFoods.push(foodToAdd);
      
      // 3. N-sivioh men jdid fil database w nraj3ou el promise mta3 el save
      return person.save();
    })
    .then(updatedPerson => {
      // 4. Ken kol shay mrigel, npassiw el data lel done callback
      done(null, updatedPerson);
    })
    .catch(err => {
      // Ken thama error npassiwha lel done callback
      done(err);
    });
};

// 10. Perform New Updates Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // Nlaoujo bil name, n-updatiw el age, w nraj3ou el version el jdidda ({ new: true })
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }
  )
    .then(updatedDoc => {
      // Npassiw el document el jdid lel tester
      done(null, updatedDoc);
    })
    .catch(err => {
      done(err);
    });
};

// 11. Delete One Document
const removeById = (personId, done) => {
  // N-fassa7lo el document direct bil ID mta3ou
  Person.findByIdAndDelete(personId)
    .then(removedDoc => {
      // Nraj3ou el document eli tfassa7 lel done callback
      done(null, removedDoc);
    })
    .catch(err => {
      done(err);
    });
};

// 12. Delete Many Documents
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  // Nfass7o koll document fih name: "Mary"
  Person.deleteMany({ name: nameToRemove })
    .then(outcome => {
      // deleteMany trajja3 object fih counting mta3 items affected kima y7eb el test
      done(null, outcome);
    })
    .catch(err => {
      done(err);
    });
};

// 13. Chain Search Query Helpers
const queryChain = (done) => {
  const foodToSearch = "burritos";

  // Nabdaou el chainage mta3 el query helper
  Person.find({ favoriteFoods: foodToSearch }) // 1. Laouj 3la burrito lovers
    .sort({ name: 1 })                         // 2. Rattabhom alphabetic (A-Z)
    .limit(2)                                  // 3. Khoudh ken zoz documents bark
    .select('-age')                            // 4. Khbi el age (Hnak na7iw el field)
    .exec()                                    // 5. Executi el query (trajja3 Promise fil v8)
    .then(data => {
      // Npassiw el array mta3 el zoz personnes lel done callback
      done(null, data);
    })
    .catch(err => {
      done(err);
    });
};

// Exportations lel testing suite (kima FreeCodeCamp)
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;