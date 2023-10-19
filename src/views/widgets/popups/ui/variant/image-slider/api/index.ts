import { api } from '@/shared/api';
import { type ISlideImg } from '@/widgets/popups/ui/variant/image-slider';

export async function getImageSlides(url: string): Promise<{ items: ISlideImg[] } | undefined> {
  try {
    return await api.get(url);
  } catch (error) {
    console.error(error);
  }
};
