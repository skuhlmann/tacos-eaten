import { db } from '../config/firebase'


class trackerApi {
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
    // return
    db.collection('tacos').add(tracker)
  }
  
  edit(tracker) {
    // return
    db.collection('tacos').doc(tracker.id).set(tracker)
  }
  
  delete(tracker) {
    // return
    db.collection('tacos')
      .doc(tracker.id)
      .delete()
  }
}

export default new trackerApi();