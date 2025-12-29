export interface ApiResponse<T = any> {
  result: T;
  resultCode: number;
}

export interface Instruction {
  id: string;
  x: number;
  y: number;
  z: number;
  createdAt?: string;
}

export interface PaginationParams {
  p?: string;  // page number
  s?: string;  // page size
}

export interface PaginatedInstructions {
  instructions: Instruction[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface CreateInstructionInput {
  x: number;
  y: number;
  z: number;
}

export interface HandlerResult<T = any> {
  data: T;
  statusCode: number;
}