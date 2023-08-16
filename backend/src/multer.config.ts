import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

//Need to update proper location once portworx configured
export const multerConfig = {
  dest: process.env.UPLOAD_LOCATION,
};

export const multerOptions = {
  limits: {
    fileSize: +process.env.MAX_FILE_SIZE,
  },
  fileFilter: (_req: any, file: any, callback: any) => {
    if (file.mimetype.match('xlsx|xls|sheet')) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: multerConfig.dest,
    filename(_, file, callback) {
      /* istanbul ignore next */
      return callback(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};
