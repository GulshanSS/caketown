import multer from "multer";
import { MULTER } from "./constants.config";

export default multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: MULTER.FILE_SIZE },
});
