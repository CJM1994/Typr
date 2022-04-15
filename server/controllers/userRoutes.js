const getUser = (req, res) => {
    res.status(200).json([
      { id: 1, name: "Connor" },
      { id: 2, name: "Amy" },
      { id: 3, name: "John" },
      { id: 4, name: "Laurie" },
    ]);
  };

  module.exports = {getUser}




