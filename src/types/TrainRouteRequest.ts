import { DayType } from './DayType';

export interface TrainRouteRequest {
  numberOfTrain: string;
  fromCity: string;
  toCity: string;
  dayOfDispatch: DayType[];
  startTime: string;
  durationInRoute: string;
  addInfo?: string | null;
}
