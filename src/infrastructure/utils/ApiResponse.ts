export interface ApiResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: string;
      userName: string;
      email: string;
    };
  } | null;
  message: string;
  statusCode: number;
  errors: string[];
}
