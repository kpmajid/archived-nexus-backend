// src/domain/models/ApiResponse.ts

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: any;
  };
}

export class ApiResponseBuilder<T = any> {
  private response: ApiResponse<T> = {
    success: true,
    message: "",
  };

  setSuccess(success: boolean): this {
    this.response.success = success;
    return this;
  }

  setMessage(message: string): this {
    this.response.message = message;
    return this;
  }

  setData(data: T): this {
    this.response.data = data;
    return this;
  }

  setError(code: string, details?: any): this {
    this.response.error = { code, details };
    return this;
  }

  build(): ApiResponse<T> {
    return this.response;
  }
}

export const createSuccessResponse = <T>(
  message: string,
  data?: T
): ApiResponse<T> => {
  const builder = new ApiResponseBuilder<T>()
    .setSuccess(true)
    .setMessage(message);

  if (data !== undefined) {
    builder.setData(data);
  }

  return builder.build();
};

export const createErrorResponse = (
  message: string,
  code: string,
  details?: any
): ApiResponse => {
  return new ApiResponseBuilder()
    .setSuccess(false)
    .setMessage(message)
    .setError(code, details)
    .build();
};
