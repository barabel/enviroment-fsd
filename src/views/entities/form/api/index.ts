import { api } from '@/shared/api';

export interface TFormCallbackData {
  name: string
  phone: string
  message?: string
  [x: string]: any
}

export async function handleSubmitCallback(data: TFormCallbackData): Promise<any> {
  try {
    return await api.post('/api/form/callback', data);
  } catch (error) {
    console.error(error)
  }
}
