import { Request, Response } from "express";
import {
  CreateVendorInput,
  DeleteVendorInput,
  GetVendorInput,
  UpdateVendorInput,
} from "../schemas/vendor.schema";
import {
  createVendor,
  deleteVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
} from "../services/vendor.service";

export const getAllVendorsHandler = async (req: Request, res: Response) => {
  try {
    const vendors = await getAllVendors();
    if (vendors.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no vendors to display" });
    }
    return res.status(200).json({ items: vendors.length, vendors });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const getVendorByIdHandler = async (
  req: Request<GetVendorInput["params"]>,
  res: Response
) => {
  try {
    const vendors = await getAllVendors();
    if (vendors.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no vendors to display" });
    }
    return res.status(200).json({ items: vendors.length, vendors });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const createVendorHandler = async (
  req: Request<{}, {}, CreateVendorInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    const vendor = await createVendor({ ...body });
    return res.status(201).json(vendor);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const updateVendorHandler = async (
  req: Request<UpdateVendorInput["params"], {}, UpdateVendorInput["body"]>,
  res: Response
) => {
  try {
    const vendorId = req.params.vendorId;
    const oldVendor = await getVendorById(vendorId);
    if (!oldVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    const update = req.body;
    const updatedVendor = await updateVendor({ ...update }, vendorId);
    return res.status(201).json(updatedVendor);
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};

export const deleteVendorHandler = async (
  req: Request<DeleteVendorInput["params"]>,
  res: Response
) => {
  try {
    const vendorId = req.params.vendorId;
    const vendor = await getVendorById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    await deleteVendor(vendorId);
    return res
      .status(200)
      .json({ message: `${vendor.name} vendor is deleted` });
  } catch (e: any) {
    return res.status(409).json({ message: e.message });
  }
};
