import { Instruction, HandlerResult } from './types';

// Mock data - replace with actual database calls
const mockInstructions: Instruction[] = [
  { id: '1', x: 10.5, y: 20.3, z: 5.0, createdAt: '2025-12-21T10:00:00Z' },
  { id: '2', x: 15.2, y: 25.8, z: 7.5, createdAt: '2025-12-21T10:05:00Z' },
  { id: '3', x: 8.7, y: 18.4, z: 3.2, createdAt: '2025-12-21T10:10:00Z' },
  { id: '4', x: 22.1, y: 30.5, z: 9.8, createdAt: '2025-12-21T10:15:00Z' },
  { id: '5', x: 12.3, y: 22.7, z: 6.1, createdAt: '2025-12-21T10:20:00Z' },
];

export const getInstructionById = async (
  id: string
): Promise<HandlerResult<Instruction | { error: string }>> => {
  try {
    // Validate ID
    if (!id || id.trim() === '') {
      return {
        data: { error: 'Invalid instruction ID' },
        statusCode: 400
      };
    }

    // Find instruction by ID
    const instruction = mockInstructions.find(i => i.id === id);

    if (!instruction) {
      return {
        data: { error: `Instruction with ID ${id} not found` },
        statusCode: 404
      };
    }

    return {
      data: instruction,
      statusCode: 200
    };

  } catch (error) {
    console.error('Error fetching instruction by ID:', error);
    return {
      data: { error: 'Failed to fetch instruction' },
      statusCode: 500
    };
  }
};