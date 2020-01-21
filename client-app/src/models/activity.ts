import { IAttendee } from "./attendee";
import { IComment } from "./comment";

export interface IActivitiesEnvelope {
  activities: IActivity[];
  activityCount: number
}

export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date | null;
  city: string;
  venue: string;
  isGoing: boolean;
  isHost: boolean;
  attendees: IAttendee[];
  comments: IComment[];
}
