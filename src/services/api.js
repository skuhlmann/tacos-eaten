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

  search(query) {
    const keyField = Object.keys(query)[0]

    console.log(keyField)
    console.log(query[keyField])

    return db.collection('tacos')
      .where(keyField, '==', query[keyField])
      .get()
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
    return this.trackers.add(tracker).then(doc => {
      this.entries.add(doc.id, entry)

      return doc.get().then(tracker => {
        return tracker.data()
      })
    })
  }
}

export default new Api()