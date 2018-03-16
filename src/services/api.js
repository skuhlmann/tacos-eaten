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
    return db.collection('tacos').add(tracker)
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

  add(trackerId, entry) {
    return db.collection('tacos')
      .doc(trackerId)
      .collection('entry')
      .add(entry)
  }
}

class Api {
  constructor() {
    this.trackers = new TrackerApi();
    this.entries = new EntryApi();
  }

  newTracker(tracker, entry) {
    this.trackers.add(tracker).then(doc => {
      this.entries.add(doc.id, entry)
    })
  }
}

export default new Api()