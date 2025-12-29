import { Instruction, CreateInstructionInput, HandlerResult } from './types';

export const createInstruction = async (
  body: string | null
): Promise<HandlerResult<Instruction | { error: string }>> => {
  try {
    // Validate body exists
    if (!body) {
      return {
        data: { error: 'Request body is required' },
        statusCode: 400
      };
    }

    // Parse JSON body
    let input: CreateInstructionInput;
    try {
      input = JSON.parse(body);
    } catch (error) {
      return {
        data: { error: 'Invalid JSON in request body' },
        statusCode: 400
      };
    }

    // Validate required fields
    if (typeof input.x !== 'number' || typeof input.y !== 'number' || typeof input.z !== 'number') {
      return {
        data: { error: 'Fields x, y, and z are required and must be numbers' },
        statusCode: 400
      };
    }

    // Create new instruction (mock - replace with database insert)
    const newInstruction: Instruction = {
      id: Math.random().toString(36).substring(7), // Mock ID generation
      x: input.x,
      y: input.y,
      z: input.z,
      createdAt: new Date().toISOString()
    };

    // TODO: Save to database
    console.log('Creating instruction:', newInstruction);

    return {
      data: newInstruction,
      statusCode: 201
    };

  } catch (error) {
    console.error('Error creating instruction:', error);
    return {
      data: { error: 'Failed to create instruction' },
      statusCode: 500
    };
  }
};