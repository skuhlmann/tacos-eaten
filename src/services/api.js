import { db } from '../config/firebase'


class TrackerApi {
  all(callback) {
    return db.collection('tacos')
  }

  find(id) {
    return db.doc(`tacos/${id}`)
      .get()
      .then(doc => doc.data())
  }

  get(id) {
    return db.collection('tacos').doc(id)
  }

  add(tracker) {
    db.collection('tacos').add(tracker)
  }
  
  edit(tracker) {
    db.collection('tacos').doc(tracker.id).set(tracker)
  }
  
  delete(tracker) {
    db.collection('tacos')
      .doc(tracker.id)
      .delete()
  }
}

class EntryApi {
  all(trackerId) {
    return db.collection('tacos')
      .doc(trackerId)
      .collection('entry')
  }
}

class Api {
  constructor() {
    this.trackers = new TrackerApi();
    this.entries = new EntryApi();
  }
}

export default new Api();