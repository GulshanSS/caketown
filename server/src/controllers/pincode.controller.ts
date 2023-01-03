import { Request, Response } from "express";
import {
  CreatePincodeInput,
  DeletePincodeInput,
  GetPincodeInput,
  UpdatePincodeInput,
} from "../schemas/pincode.schema";
import {
  createPincode,
  deletePincode,
  getAllPincodes,
  getPincodeById,
  updatePincode,
} from "../services/pincode.service";

export const getAllPincodesHandler = async (req: Request, res: Response) => {
  try {
    const pincodes = await getAllPincodes();
    if (pincodes.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no Pincodes available to display" });
    }
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getPincodeByIdHandler = async (
  req: Request<GetPincodeInput["params"]>,
  res: Response
) => {
  try {
    const pincodeId = req.params.pincodeId;
    const pincode = await getPincodeById(pincodeId);
    if (!pincode) {
      return res.status(404).json({ message: "Pincode not found" });
    }
    return res.status(200).json(pincode);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const createPincodeHandler = async (
  req: Request<{}, {}, CreatePincodeInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    const pincode = await createPincode({ ...body });
    return res.status(201).json(pincode);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const updatePincodeHandler = async (
  req: Request<UpdatePincodeInput["params"], {}, UpdatePincodeInput["body"]>,
  res: Response
) => {
  try {
    const pincodeId = req.params.pincodeId;
    const oldPincode = await getPincodeById(pincodeId);
    if (!oldPincode) {
      return res.status(404).json({ message: "Pincode not found" });
    }
    const update = req.body;
    const updatedPincode = await updatePincode({ ...update }, pincodeId);
    return res.status(201).json(updatedPincode);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const deletePincodeHandler = async (
  req: Request<DeletePincodeInput["params"]>,
  res: Response
) => {
  try {
    const pincodeId = req.params.pincodeId;
    const pincode = await getPincodeById(pincodeId);
    if (!pincode) {
      return res.status(404).json({ message: "Pincode not found" });
    }
    await deletePincode(pincodeId);
    return res.status(200).json({ message: `${pincode.pincode} is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
