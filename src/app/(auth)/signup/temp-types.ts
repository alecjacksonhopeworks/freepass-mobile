export type ResourceCategory =
  | "Housing"
  | "Food"
  | "Community"
  | "Jobs"
  | "Education"
  | "Finance"
  | "Medical"
  | "MentalHealth"
  | "Legal"
  | "Transportation"
  | "Clothing"
  | "SubstanceUse"
  | "Counseling"
  | "EmploymentTraining"
  | "Childcare"
  | "Technology"
  | "ReentrySupport"
  | "Volunteer"
  | "Networking"
  | "Other";

export type SignupData = {
  name?: string;
  email?: string;
  password?: string;
  joiningAs?: "Finder" | "Provider";
  resourceInterests?: ResourceCategory[];
  picture?: string; // URI
  address?: string;
  bio?: string;
  contactInfo?: string;
};
