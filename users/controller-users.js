const ServiceUser = require("./service-users");

const service = new ServiceUser();

class UserController {
  constructor() {}
  getAllUser = async (req, res) => {
    try {
      const result = await service.getAllUsers();
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  getFilteredUsers = async (req, res) => {
    try {
      const result = await service.getFilteredUsers(req.params.value);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      const result = await service.getUserById(req.params.id);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  getUserByToken = async (req, res) => {
    try {
      res.send(req.user);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  addUser = async (req, res) => {
    try {
      const result = await service.addUser(req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  updateUserById = async (req, res) => {
    try {
      const result = await service.updateUserById(req.params.id, req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  // updateAnotherUserById = async (req, res) => {
  //   try {
  //     const result = await service.updateUserById(req.params.id, req.body)
  //     res.status(201).send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  deleteUserById = async (req, res) => {
    try {
      const result = await service.deleteUserById(req.params.id);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  getUserPetsById = async (req, res) => {
    try {
      const result = await service.getUserPetsById(req.params.id);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  getUserWithPetsById = async (req, res) => {
    try {
      const result = await service.getUserWithPetsById(req.params.id);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  getUserWithAlbumsById = async (req, res) => {
    try {
      const result = await service.getUserWithAlbumsById(req.params.id);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  getListAlbumsWithPhotosByUserID = async (req, res) => {
    try {
      const result = await service.getListAlbumsWithPhotosByUserID(
        req.params.id
      );
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  getUserWithPhotosById = async (req, res) => {
    try {
      const result = await service.getUserWithPhotosById(req.params.id);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  loginUser = async (req, res) => {
    try {
      const result = await service.loginUser(req.body.login, req.body.password);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  logOutCurrentDevice = async (req, res) => {
    try {
      await service.logOutCurrentDevice(req.user, req.token);
      res.send({ response: "successfully logout" });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  logOutAllDevices = async (req, res) => {
    try {
      await service.logOutAllDevices(req.user, req.token);
      res.send({ response: "successfully logout" });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  deleteUserWithPets = async (req, res) => {
    try {
      const result = await service.deleteUserWithPets(req.params.id);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  getUserWithSubscriptionsById = async (req, res) => {
    try {
      const result = await service.getUserWithSubscriptionsById(req.params.id);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  getUserAfterPaginationAndSearchAndFilter = async (req, res) => {
    try {
      const result = await service.getUserAfterPaginationAndSearchAndFilter(
        req.body
      );
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };
}

module.exports = UserController;
