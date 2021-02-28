import { PhotosType, ProfileType } from '../types/types';
import { instanse, APIResponseType } from './api';

type SavePhotoType = {
  photos: PhotosType
}

export const profileAPI = {
  getProfile(userId: number) {
    return instanse.get<ProfileType>(`profile/${userId}`).then((response) => response.data);

  },
  getStatus(userId: number) {
    return instanse.get<string>(`profile/status/${userId}`).then((response) => response.data);
  },
  updateStatus(status: string) {
    return instanse.put<APIResponseType>(`profile/status`, { status }).then((response) => response.data);
  },
  savePhoto(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return instanse
      .put<APIResponseType<SavePhotoType>>(`profile/photo`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
  saveProfile(profile: ProfileType) {
    return instanse.put<APIResponseType>(`profile`, profile).then((response) => response.data);
  },
};
