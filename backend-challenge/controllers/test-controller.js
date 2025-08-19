const testController = {
  getAllUsers: (req, res) => {
    res.json([{ id: 1, name: 'Test' }]);
  }
};

module.exports = testController;
