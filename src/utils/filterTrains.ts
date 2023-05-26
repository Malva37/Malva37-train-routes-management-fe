import { TrainRoute } from "../types/TrainRoute";
import { SortType } from "../types/SortType";

export function filterRoutes(
  trainRoutes: TrainRoute[],
  sortType: SortType,
  query: string,
) {
  let visibleTrainRoutes = [...trainRoutes];

  switch (sortType) {
    case SortType.ACTIVE:
      visibleTrainRoutes = visibleTrainRoutes.filter(route => route.active);
      break;
    case SortType.DEACTIVE:
      visibleTrainRoutes = visibleTrainRoutes.filter(route => !route.active);
      break
    case SortType.ALL:
    default:
      break
  }

  if (query) {
    const preparedQuery = query.trim().toLowerCase();
    
    visibleTrainRoutes = visibleTrainRoutes.filter((route) => {
      const sutib1 = route.toCity.toLowerCase()
        .includes(preparedQuery);
      const sutib2 = route.fromCity.toLowerCase()
        .includes(preparedQuery);
  
      return sutib1 || sutib2;
    })
  }

  return visibleTrainRoutes;
}