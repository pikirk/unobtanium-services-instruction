import { APIGatewayProxyResult, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ApiResponse } from './types';

export const formatResponse = (
  data: any,
  statusCode: number = 200
): APIGatewayProxyResultV2 => {
  const response: ApiResponse = {
    result: data,
    resultCode: statusCode
  };

  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    },
    body: JSON.stringify(response, null, 2)
  };
};

export const optionsResponse = (): APIGatewayProxyResultV2 => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    },
    body: ''
  };
};