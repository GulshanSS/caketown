import { AssetDoc } from "../models/asset.model";

export default interface ICategory {
  name: string;
  asset: AssetDoc["_id"];
  showInHome: boolean;
  showInSearch: boolean;
  status: boolean;
}
