const mode = test

module.exports = (test, app) => {
  test.beforeEach(function (t) {
    if (app) t.context.app = app(mode)
  })

  // Destroy the database connection after each test.
  test.afterEach(function (t) {
  })
}
