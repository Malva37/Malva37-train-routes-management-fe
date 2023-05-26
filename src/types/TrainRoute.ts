import { DayType } from './DayType';
export interface TrainRoute {
  id: string;
  numberOfTrain: string;
  fromCity: string;
  toCity: string;
  dayOfDispatch: DayType[];
  startTime: string;
  durationInRoute: string;
  active: boolean;
  addInfo?: string | null;
}
