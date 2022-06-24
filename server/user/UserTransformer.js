module.exports = {
  transform (users) {
    if (!Array.isArray(users)) {
      users = [users]
    }

    return users.map(item => {
      return this.transformItem(item)
    })
  },
  transformItem (user) {
    return {
      email: user.email
    }
  }
}
