import fs from 'fs';

import config from '../../config';
import { ResponseErrorTypeENUM, createError } from '../errorHelper';

const saveTextToFile = (title: string, text: string) => {
  if (!title || !text) {
    return;
  }
  const path = config.localPath || '';

  const fileName = `${title.replace(/\s/g, '')}.txt`;

  fs.writeFile(`${path}/${fileName}`, text, (err) => {
    if (err) {
      throw createError({
        message: 'Failed to save book',
        type: ResponseErrorTypeENUM.badRequest,
      });
    }
  });

  return fileName;
};

export default saveTextToFile;
