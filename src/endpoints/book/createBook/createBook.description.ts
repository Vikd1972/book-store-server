/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
import * as yup from 'yup';

import { BookEntity } from '../../../db';
import { EndpointDataBuilder, ResponseDataType, swaggerDataExamples } from '../../../services/endpoint';

const dataBuilder = new EndpointDataBuilder();

class RequestBody {
  @dataBuilder.bodyField({
    validation: yup.string().strict().nullable(),
    swagger: {
      isRequired: false,
      type: 'string',
      example: 'Cookbook',
      nullable: true,
    },
  })
  title?: string;

  @dataBuilder.bodyField({
    validation: yup.string().strict().nullable(),
    swagger: {
      isRequired: false,
      type: 'string',
      example: 'book about tasty and healthy food',
      nullable: true,
    },
  })
  text?: string;

  @dataBuilder.bodyField({
    validation: yup.string().strict().nullable(),
    swagger: {
      isRequired: false,
      type: 'string',
      example: '1975-01-01',
      nullable: true,
    },
  })
  yearOfPublication?: Date;

  @dataBuilder.bodyField({
    validation: yup.array().of(yup.number().required().positive()).strict().nullable(),
    swagger: {
      isRequired: false,
      type: 'string',
      example: 'Doe',
      nullable: true,
    },
  })
  genres?: number[];

  @dataBuilder.bodyField({
    validation: yup.array().of(yup.number().required().positive()).strict().nullable(),
    swagger: {
      isRequired: false,
      type: 'string',
      example: 'Doe',
      nullable: true,
    },
  })
  authors?: number[];
}

class RequestQuery {
  //
}

class RequestParams {
  //
}

type ResponseData = ResponseDataType<BookEntity>

export type ControllerType = RequestHandler<RequestParams, ResponseData, RequestBody, RequestQuery>

dataBuilder.setSwaggerResponses([{
  statusCode: HTTP_STATUS_CODES.CREATED,
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
