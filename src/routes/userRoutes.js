const express = require('express');
const { getUsers, createUser, loginUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);

module.exports = router;
