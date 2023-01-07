import { Request, Response } from "express";
import {
  CreateAdminUserInput,
  DeleteAdminUserInput,
  GetAdminUserInput,
  UpdateAdminUserInput,
} from "../schemas/admin.user.schema";
import {
  createAdminUser,
  deleteAdminUser,
  getAdminUser,
  getAdminUserById,
  getAllAdminUsers,
  updateAdminUser,
} from "../services/admin.user.service";

export const getAllAdminUsersHandler = async (req: Request, res: Response) => {
  try {
    const adminUsers = await getAllAdminUsers();
    if (adminUsers.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no admin user to display" });
    }
    return res.status(200).json({ items: adminUsers.length, adminUsers });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getAdminUserByIdHandler = async (
  req: Request<GetAdminUserInput["params"]>,
  res: Response
) => {
  try {
    const adminUserId = req.params.adminUserId;
    const adminUser = await getAdminUserById(adminUserId);
    if (!adminUser) {
      return res.status(404).json({ message: "Admin User not found" });
    }
    return res.status(200).json(adminUser);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const createAdminUserHandler = async (
  req: Request<{}, {}, CreateAdminUserInput["body"]>,
  res: Response
) => {
  try {
    const adminUsername = req.body.username;
    const presentAdminUser = await getAdminUser({ username: adminUsername });
    if (presentAdminUser) {
      return res
        .status(200)
        .json(
          `Admin user with ${presentAdminUser.username} username is already present`
        );
    }
    const body = req.body;
    const createdAdminUser = await createAdminUser({ ...body });
    return res.status(201).json(createdAdminUser);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const updateAdminUserHandler = async (
  req: Request<
    UpdateAdminUserInput["params"],
    {},
    UpdateAdminUserInput["body"]
  >,
  res: Response
) => {
  try {
    const adminUserId = req.params.adminUserId;
    const oldAdminUser = await getAdminUserById(adminUserId);
    if (!oldAdminUser) {
      return res.status(404).json({ message: "Admin User not found" });
    }
    const adminUsername = req.body.username;
    if (adminUsername !== oldAdminUser.username) {
      const presentAdminUser = await getAdminUser({ username: adminUsername });
      if (presentAdminUser) {
        return res
          .status(200)
          .json(
            `Cannot update Admin user with ${presentAdminUser.username} username is already present`
          );
      }
    }
    const update = req.body;
    const updatedAdminUser = await updateAdminUser({ ...update }, adminUserId);
    return res.status(201).json(updatedAdminUser);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const deleteAdminUserHandler = async (
  req: Request<DeleteAdminUserInput["params"]>,
  res: Response
) => {
  try {
    const adminUserId = req.params.adminUserId;
    const adminUser = await getAdminUserById(adminUserId);
    if (!adminUser) {
      return res.status(404).json({ message: "Admin User not found" });
    }
    await deleteAdminUser(adminUserId);
    return res
      .status(200)
      .json({ message: `${adminUser.username} admin user is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
