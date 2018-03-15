class trackerBuilder {
  addMetaData(tracker) {
    const updatedTracker = Object.assign({
      slug: this.slugger(tracker.name)
    }, tracker) 
    
    return updatedTracker
  }

  slugger(name) {
    let cleanedName = name.toLowerCase().replace(/ /g, '')
    let randomString = Math.random().toString(36).substring(5)

    return `${cleanedName}-${randomString}`
  }
}

export default new trackerBuilder()