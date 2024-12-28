export type Review = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

export type ReviewFormData = {
  rating: number;
  name: string;
  advantages: string;
  disadvantages: string;
  comment: string;
};

export type ReviewFormErrors = {
  ratingError: string;
  nameError: string;
  advantagesError: string;
  disadvantagesError: string;
  commentError: string;
};
