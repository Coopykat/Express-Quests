    const database = require("./database");
  
    const getUsers = (req, res) => {

      // GET FILTER QUEST NUMBER 6 //
      let sql = "select * from users";
      const sqlValues = [];

      if (req.query.language != null) {
        sql += " where language = ?";
        sqlValues.push(req.query.language);
      }else if (req.query.city != null) {
          sql += " where city = ?";
          sqlValues.push(req.query.city);
      }
      database
        .query(sql, sqlValues)
        .then(([users]) => {
          res.json(users);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error retrieving data from database");
        });
    };

    // GET USER BY ID //
    const getUserById = (req, res) => {

        const id = parseInt(req.params.id);

      database
        .query("select * from users where id = ?", [id])
        .then(([users]) => {
            if (users[0] != null) {
                res.json(users[0]);
            } else {
                res.status(404).send("Not Found");
              }
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send("Error retrieving data from database");
            });
        }

      // POST USER QUEST EXPRESS NUMBER 3 //
    const postUser = (req, res) => {
      const { firstname, lastname, email, city, language } = req.body;

      database
        .query(
        "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
        .then(([result]) => {
          res.location(`/api/users/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error saving the user");
        })   
    };
   
      // PUT USER QUEST NUMBER 4 //
      const updateUser = (req, res) => {
        const id = parseInt(req.params.id);
        const { firstname, lastname, email, city, language } = req.body;
      
        database
          .query(
            "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
            [firstname, lastname, email, city, language, id]
          )
          .then(([result]) => {
            if (result.affectedRows === 0) {
              res.status(404).send("Not Found");
            } else {
              res.sendStatus(204);
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Error editing the user");
          });
      };

      // DELETE USER QUEST NUMBER 5 //

      const deleteUser = (req, res) => {
        const id = parseInt(req.params.id);

        database
          .query("delete from users where id = ?", [id])
          .then(([result]) => {
            if (result.affectedRows === 0) {
              res.status(404).send("Not Found");
            } else {
              res.sendStatus(204);
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Error deleting the user");
          });
      }

  module.exports = {
    getUsers,
    getUserById,
    postUser,
    updateUser,
    deleteUser
  };