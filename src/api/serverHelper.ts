import { TrainRoute } from "../types/TrainRoute";
import { client } from "../utils/fetchClient";

export const getTrainRoutes = async () => {
  const response = await client.get<TrainRoute[]>("/trainroutes");

  return response;
};

export const deleteTrainRoute = async (routeId: string) => {
  const response = await client.delete(`/trainroutes/${routeId}`);

  return response;
};

export const addTrainRoute = async (route: TrainRoute) => {
  const response = await client.post<TrainRoute>("/trainroutes", route);

  return response;
};

export const updateTrainRoute = (routeId: string, route: TrainRoute) => {
  return client.put<TrainRoute>(`/trainroutes/${routeId}`, route);
};
