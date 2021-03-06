export type DialogsType = {
  id: number;
  name: string;
};
export type MessagesType = {
  id: number;
  message: string;
};

export type PostsType = {
  id: number;
  message: string;
  likesCount: number;
};

export type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type PhotosType = {
  small: string;
  large: string;
};

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
  aboutMe: string
};

// export type ProfileType = {
//   userId: number | null;
//   lookingForAJob: boolean;
//   lookingForAJobDescription: string | null;
//   fullName: string | null;
//   contacts: ContactsType;
//   photos: PhotosType;
// };

export type FriendsType = {
  id: number;
  name: string;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};

export type FilterType = {
  term: string
  friend: boolean | null
}