const Datastore = require('nedb-promises');
const bcrypt = require('bcryptjs');

const db = {
  users: Datastore.create(),
  workoutPlans: Datastore.create(),
  nutritionPlans: Datastore.create(),
  weightLogs: Datastore.create(),
  measurementLogs: Datastore.create(),
  dailyCheckIns: Datastore.create(),
  notifications: Datastore.create(),
  achievements: Datastore.create()
};

// Helper wrappers to mirror Mongoose API
class ModelWrapper {
  constructor(store, isUser = false) {
    this.store = store;
    this.isUser = isUser;
  }

  _enrichUser(doc) {
    if (!doc) return null;
    doc._id = doc._id || doc.id;
    if (this.isUser && !doc.matchPassword) {
      doc.matchPassword = async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      };
    }
    
    const self = this;
    doc.save = async function() {
      if (self.isUser && this.password && !this.password.startsWith('$2a$')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      }
      
      // Create clean plain JS object for NeDB update
      const clone = { ...this };
      delete clone.save;
      delete clone.matchPassword;

      await self.store.update({ _id: this._id }, clone, { upsert: true });
      return this;
    };
    return doc;
  }

  async findOne(query) {
    const doc = await this.store.findOne(query);
    return this._enrichUser(doc);
  }

  async findById(id) {
    const doc = await this.store.findOne({ _id: id });
    return this._enrichUser(doc);
  }

  async find(query = {}) {
    const docs = await this.store.find(query);
    return docs.map(d => this._enrichUser(d));
  }

  async create(data) {
    let doc = { ...data };
    if (this.isUser && doc.password && !doc.password.startsWith('$2a$')) {
      const salt = await bcrypt.genSalt(10);
      doc.password = await bcrypt.hash(doc.password, salt);
    }
    doc.createdAt = doc.createdAt || new Date();
    doc.updatedAt = doc.updatedAt || new Date();
    const inserted = await this.store.insert(doc);
    return this._enrichUser(inserted);
  }

  async deleteMany(query) {
    return await this.store.remove(query, { multi: true });
  }

  select() {
    return this;
  }
  sort(sortObj) {
    return this;
  }
}

const UserStore = new ModelWrapper(db.users, true);
const WorkoutPlanStore = new ModelWrapper(db.workoutPlans);
const NutritionPlanStore = new ModelWrapper(db.nutritionPlans);
const WeightLogStore = new ModelWrapper(db.weightLogs);
const MeasurementLogStore = new ModelWrapper(db.measurementLogs);
const DailyCheckInStore = new ModelWrapper(db.dailyCheckIns);
const NotificationStore = new ModelWrapper(db.notifications);
const AchievementStore = new ModelWrapper(db.achievements);

module.exports = {
  db,
  UserStore,
  WorkoutPlanStore,
  NutritionPlanStore,
  WeightLogStore,
  MeasurementLogStore,
  DailyCheckInStore,
  NotificationStore,
  AchievementStore
};
