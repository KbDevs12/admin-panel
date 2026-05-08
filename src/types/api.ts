export interface ApiResponse<T = unknown> {
  ok: boolean;
  status: number;
  success: boolean;
  message: string;
  data: T;
}
