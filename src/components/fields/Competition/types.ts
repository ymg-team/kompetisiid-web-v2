export type CompetitionFormProps = {
  type: "create" | "edit";
  competitionData?: any;
};

export type CompetitionFormError = {
  title?: string;
  description?: string;
  prize_total?: string;
  prize_description?: string;
  organizer?: string;
  content?: string;
  main_cat?: string;
  sub_cat?: string;
  source_link?: string;
  register_link?: string;
  poster?: string;
  tags?: string;
  announcement?: string;
  contacts?: string;
  is_mediapartner?: string;
  is_guaranteed?: string;
  is_manage?: string;
  draft?: string;
  deadline_date?: string;
  announcement_date?: string;
};

export type CompetitionFormValues = {
  title: string;
  description: string;
  prize_total: number;
  prize_description: string;
  organizer: string;
  content: string;
  main_cat: number;
  sub_cat: number;
  source_link: string;
  register_link: string;
  poster: object | any;
  tags: any;
  announcements: string[] | string;
  contacts: string[] | string;
  is_mediapartner: boolean;
  is_guaranteed: boolean;
  is_manage: boolean;
  draft: boolean;
  deadline_date: Date;
  announcement_date: Date;
};
