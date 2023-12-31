/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
import * as yup from 'yup';

import { EndpointDataBuilder, sharedValidation, ResponseDataType, swaggerDataExamples } from '../../../services/endpoint';
import { AuthorEntity } from '../../../db';

const dataBuilder = new EndpointDataBuilder();

class RequestBody {
  @dataBuilder.bodyField({
    validation: yup.string().strict().nullable(),
    swagger: {
      isRequired: false,
      type: 'string',
      example: 'John',
      nullable: true,
    },
  })
  firstName?: string;

  @dataBuilder.bodyField({
    validation: yup.string().strict().nullable(),
    swagger: {
      isRequired: false,
      type: 'string',
      example: 'Doe',
      nullable: true,
    },
  })
  lastName?: string;

  @dataBuilder.bodyField({
    validation: yup.string().strict().nullable(),
    swagger: {
      isRequired: false,
      type: 'string',
      example: '1975-01-01',
      nullable: true,
    },
  })
  dateOfBirthday?: Date;
}

class RequestQuery {
  //
}

class RequestParams {
  @dataBuilder.paramsField(sharedValidation.params.numberStringRequired)
  authorId: string;
}

type ResponseData = ResponseDataType<AuthorEntity>

export type ControllerType = RequestHandler<RequestParams, ResponseData, RequestBody, RequestQuery>

dataBuilder.setSwaggerResponses([{
  statusCode: HTTP_STATUS_CODES.OK,
  description: 'Success',
  schema: {
    example: {
      message: 'Success',
      meta: {},
      data: swaggerDataExamples.user,
    },
  },
}]);

export default dataBuilder.getDescription();
