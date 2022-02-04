import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';
import AppError from '@shared/errors/AppError';

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;
  defaultAvatar: string;
  defaultPlanImage: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  driver: process.env.STORAGE_PROVIDER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  defaultAvatar: `/files/default/avatar.jpg`,
  defaultPlanImage: `/files/default/plan.png`,

  multer: {
    storage: multer.diskStorage({
      destination: function (request, file, callback) {
        //Se o arquivo for .jpeg/.png/.jpg/.gif ele envia o anexo para pasta /uploads/user-img
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/gif'
        ) {
          callback(null, path.resolve(tmpFolder, 'uploads', 'user-img'));
        }
        //Se o arquivo for pdf/.xlsx /.docx ele envia o anexo para pasta /uploads/anexos
        else if (
          file.mimetype === 'application/pdf' ||
          file.mimetype ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          file.mimetype ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          callback(null, path.resolve(tmpFolder, 'uploads', 'anexos'));
        } else {
          console.log(file.mimetype);
          throw new AppError('Tipo de arquivo não suportado!', 415);
        }
      },
      filename(request, file, callback) {
        const hash = crypto.randomBytes(10).toString('hex');

        const filename = `${hash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: '',
    },
  },
} as IUploadConfig;
