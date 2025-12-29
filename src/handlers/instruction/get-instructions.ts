import { Instruction, PaginationParams, PaginatedInstructions, HandlerResult } from './types';

// Mock data - replace with actual database calls
const mockInstructions: Instruction[] = [
  { id: '1', x: 10.5, y: 20.3, z: 5.0, createdAt: '2025-12-21T10:00:00Z' },
  { id: '2', x: 15.2, y: 25.8, z: 7.5, createdAt: '2025-12-21T10:05:00Z' },
  { id: '3', x: 8.7, y: 18.4, z: 3.2, createdAt: '2025-12-21T10:10:00Z' },
  { id: '4', x: 22.1, y: 30.5, z: 9.8, createdAt: '2025-12-21T10:15:00Z' },
  { id: '5', x: 12.3, y: 22.7, z: 6.1, createdAt: '2025-12-21T10:20:00Z' },
];

export const getInstructions = async (
  queryParams: PaginationParams
): Promise<HandlerResult<PaginatedInstructions>> => {
  try {
    // Parse pagination parameters with defaults
    const page = parseInt(queryParams.p || '1', 10);
    const pageSize = parseInt(queryParams.s || '10', 10);

    // Validate pagination params
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return {
        data: {
          error: 'Invalid pagination parameters. Page must be >= 1, size must be 1-100'
        } as any,
        statusCode: 400
      };
    }

    // Calculate pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get paginated results
    const paginatedInstructions = mockInstructions.slice(startIndex, endIndex);

    const result: PaginatedInstructions = {
      instructions: paginatedInstructions,
      page,
      pageSize,
      totalCount: mockInstructions.length
    };

    return {
      data: result,
      statusCode: 200
    };

  } catch (error) {
    console.error('Error fetching instructions:', error);
    return {
      data: { error: 'Failed to fetch instructions' } as any,
      statusCode: 500
    };
  }
};