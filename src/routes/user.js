import express from "express"; 
const router = express.Router(); 

// = In-Memory Users Storage; =
const users = [];

// === Method: POST ===
router.post(`/user`, (req, res) => {
  const { name, email } = req.body;
  const errors = {}; // - Object To store validation errors -

  // = Validation Logic =
  if (!name) {
    errors.name = `name is required`;
  }

  if (!email) {
    errors.email = `email is required`;
  }

  // = If There are errors | Send request 400 =
  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      message: `Bad Request | Invalid Request body`,
      errors: errors,
    });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({
    message: `User Created Successfully`,
    user: newUser,
  });
});

// === Method: GET ===
router.get(`/user`, (req, res) => {
  res.status(200).json(users);
});

// === Method: GET Users/:id ===
router.get(`/user/:id`, (req, res) => {
  try {
    const { id } = req.params;
    // = Convert ID in Number =
    //const numConId = Number(id);
    // = Found the User & compare with your ID =
    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
      res.status(404).json({
        message: `User Not Found`,
      });
    }

    res.status(200).json(foundUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Internal Server Error`, details: err.message });
  }
});

// === Method: PUT (/user/{id}) Update User ===
router.put(`/user/:id`, (req, res) => {
  try {
    const { id } = req.params; // Get ID of parameters of URL
    const { name, email } = req.body; // GET the Data of Body request
    const errors = {};
    const updateFields = {};

    const userIndex = users.findIndex((user) => user.id === id); // Find User By ID

    // == Not Found User ==
    if (userIndex === -1) {
      return res.status(404).json({ message: `User Not Found` });
    }

    // = Validation name of user =
    if (name !== undefined) {
      if (typeof name !== `string` || name.trim() === ``) {
        errors.name = `name must be a non-empty string`;
      } else {
        updateFields.name = name;
      }
    }

    // Validate Email Of User
    if (email !== undefined) {
      if (typeof email !== `string` || email.trim() === ``) {
        errors.email = `email must be a non-empty string`;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = `email format is invalid`;
      } else {
        updateFields.email = email;
      }
    }

    // Errors Of Validations To Fields, send 400 (status)
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: `Bad Request | Invalid Request Body`,
        errors: errors,
      });
    }

    // Not Have Fields To Update | Request To Return successfully (200)
    if (Object.keys(updateFields).length === 0) {
      return res.status(200).json({ user: users[userIndex] });
    }

    /* if (Object.keys(userIndex === -1)) {
      return res.status(404).json({ message: `User Not Found` });
    } */

    // - Update User -
    users[userIndex] = { ...users[userIndex], ...updateFields };

    // = Send the response '200' (status) OK, with the User Update =
    console.log(`PUT /user/:id - User updated. Returning:`, users[userIndex]); // DEBUG LOG
    res.status(200).json({ user: users[userIndex] });
  } catch (error) {
    console.log(`Error In Put /user/:id`, error);
    res.status(500).json({
      message: `Internal Server Error`,
      details: error.message,
    });
  }
});

// === Method: Delete (users/{id}) Delete User ===
router.delete(`/user/:id`, (req, res) => {
  const { id } = req.params;

  const findIndex = users.findIndex((user) => user.id === id);

  if (findIndex === -1) {
    return res.status(404).json({
      message: `User Not Found`,
    });
  }

  users.splice(findIndex, 1);

  res.status(204).send(); // Not Content
});

export default router; 