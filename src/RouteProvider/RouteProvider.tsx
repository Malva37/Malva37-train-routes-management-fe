/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { TrainRoute } from "../types/TrainRoute";
import { TrainRouteRequest } from "../types/TrainRouteRequest";
import { addTrainRoute, deleteTrainRoute, getTrainRoutes, updateTrainRoute } from "../api/serverHelper";

type ContextType = {
  trainRoutes: TrainRoute[];
  selectedTrainRoute: TrainRoute | null;
  handleSelectRoute: (route: TrainRoute | null) => void;
  handleFormSubmit: (route: TrainRouteRequest) => void;
  handleDeleteRoute: (routeId: string) => void;
  handleStatusRoute: (route: TrainRoute, activated: boolean) => void;
  handleUpdateRoute: (route: TrainRoute, updatedRoute: TrainRouteRequest) => void;
};

export const RouteContext = React.createContext<ContextType>({
  trainRoutes: [],
  selectedTrainRoute: null,
  handleSelectRoute: () => {},
  handleFormSubmit: () => {},
  handleDeleteRoute: () => {},
  handleStatusRoute: () => {},
  handleUpdateRoute: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const RouteProvider: React.FC<Props> = ({ children }) => {
  const [trainRoutes, setTrainRoutes] = useState<TrainRoute[]>([]);
  const [selectedTrainRoute, setSelectedTrainRoute] = useState<TrainRoute | null>(null);

  useEffect(() => {
    getTrainRoutesFromServer();
  }, []);

  const getTrainRoutesFromServer = async () => {
    try {
      const routesFromServer = await getTrainRoutes();
      setTrainRoutes(routesFromServer);
    } catch (error) {
      console.log(error,'here');
    }
  };

  const handleSelectRoute = (value: TrainRoute | null) => {
    setSelectedTrainRoute(value);
  };

  const handleFormSubmit = async (data: TrainRouteRequest) => {
    const newRoute: TrainRoute = {
      ...data,
      id: '',
      active: true,
    };

    try {
      await addTrainRoute(newRoute);
      setSelectedTrainRoute(null);
      await getTrainRoutesFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRoute = async (routeId: string) => {
    try {
      await deleteTrainRoute(routeId);
      setSelectedTrainRoute(null);
      await getTrainRoutesFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRoute = async (route: TrainRoute, updatedData: TrainRouteRequest) => {
    const updatedBook: TrainRoute = {
      ...route,
      numberOfTrain: updatedData.numberOfTrain,
      fromCity: updatedData.fromCity,
      toCity: updatedData.toCity,
      dayOfDispatch: updatedData.dayOfDispatch,
      startTime: updatedData.startTime,
      durationInRoute: updatedData.durationInRoute,
      addInfo: updatedData.addInfo,
    };

    if (route.id) {
      try {
        await updateTrainRoute(route.id, updatedBook);
        setSelectedTrainRoute(null);
        await getTrainRoutesFromServer();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleStatusRoute = async (route: TrainRoute, active: boolean) => {
    const addInfo = route.addInfo ? route.addInfo : '';
    
    const updatedRoute: TrainRoute = {
      ...route,
      addInfo,
      active,
    };

    if (route.id) {
      try {
        await updateTrainRoute(route.id, updatedRoute);
        setSelectedTrainRoute(null);
        await getTrainRoutesFromServer();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const contextValue = useMemo(() => {
    return {
      trainRoutes,
      selectedTrainRoute,
      handleSelectRoute,
      handleFormSubmit,
      handleDeleteRoute,
      handleUpdateRoute,
      handleStatusRoute,
    };
  }, [trainRoutes, selectedTrainRoute]);

  return (
    <RouteContext.Provider value={contextValue}>{children}</RouteContext.Provider>
  );
};
