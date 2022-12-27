import { AssetDoc } from "../models/asset.model";

export interface ICategory {
  name: string;
  assetDetails: {
    displayAssetId: AssetDoc["_id"];
    assets: [AssetDoc["_id"]];
  };
  showInHome: boolean;
  showInSearch: boolean;
  status: boolean;
}
