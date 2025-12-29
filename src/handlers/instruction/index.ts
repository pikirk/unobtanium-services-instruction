import { APIGatewayProxyEvent, APIGatewayProxyEventV2, APIGatewayProxyResult, APIGatewayProxyResultV2} from 'aws-lambda';
import { getInstructions } from './get-instructions';
import { getInstructionById } from './get-instruction-by-id';
import { createInstruction } from './create-instruction';
import { formatResponse, optionsResponse } from './utils';

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    const method = event.requestContext.http.method || event.requestContext?.http?.method;
    const pathParameters = event.pathParameters;

    // Handle OPTIONS for CORS preflight
    if (method === 'OPTIONS') {
      console.log('Handling OPTIONS request for CORS preflight');
      const respone = optionsResponse();
      console.log('OPTIONS response:', respone);
      return respone;
    }

    // GET /instructions/{id}
    if (method === 'GET' && pathParameters?.id) {
      console.log(`Fetching instruction with ID: ${pathParameters.id}`);
      const result = await getInstructionById(pathParameters.id);
      return formatResponse(result.data, result.statusCode);
    }

    // GET /instructions (with optional pagination)
    if (method === 'GET') {
      console.log('Fetching list of instructions with pagination if provided');
      const queryParams = event.queryStringParameters || {};
      const result = await getInstructions(queryParams);
      return formatResponse(result.data, result.statusCode);
    }

    // POST /instructions
    if (method === 'POST') {
      console.log('Creating a new instruction');
      const result = await createInstruction(event.body? JSON.parse(event.body) : {});
      return formatResponse(result.data, result.statusCode);
    }

    // Method not allowed
    return formatResponse(
      { error: 'Method not allowed' },
      405
    );

  } catch (error) {
    console.error('Handler error:', error);
    return formatResponse(
      { error: 'Internal server error' },
      500
    );
  }
};