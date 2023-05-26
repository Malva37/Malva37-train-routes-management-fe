/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { RouteContext } from "../../RouteProvider";
import { DayType } from "../../types/DayType";
import { TrainRouteRequest } from "../../types/TrainRouteRequest";
import Modal from "../Modal/Modal";
import { TextField } from "../TextField/TextField";

export const NewRouteForm: React.FC = () => {
  const {
    selectedTrainRoute,
    handleFormSubmit,
    handleUpdateRoute,
    handleSelectRoute,
  } = useContext(RouteContext);

  const [numberOfTrain, setNumberOfTrain] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [dayOfDispatch, setDayOfDispatch] = useState<DayType[]>([]);
  const [durationInRouteHours, setDurationInRouteHours] = useState(0);
  const [durationInRouteMinute, setDurationInRouteMinute] = useState(0);
  const [durationInRoute, setDurationInRoute] = useState("");
  const [addInfo, setAddInfo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        closeModal();
      }, 2000);

      return () => clearTimeout(timer);
    }
    return () => {};
  }, [showModal]);

  useEffect(() => {
    getFullDuration();
  }, [durationInRouteMinute, durationInRouteHours]);

  
  const openModal = (message: string) => {
    setSuccessMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleShowModal = (infoMessage: string) => {
    openModal(infoMessage);
    setShowModal(true);
  };

  const getFullDuration = () => {
    const hours = durationInRouteHours;
    const minutes = durationInRouteMinute;
    setDurationInRoute(`${hours}: ${minutes}`);
  };

  useEffect(() => {
    if (selectedTrainRoute) {
      fillForm();
    }
  }, [selectedTrainRoute]);

  const fillForm = () => {
    if (selectedTrainRoute) {
      const timeFromServer = selectedTrainRoute.durationInRoute;
      const [hours, minutes] = timeFromServer.split(":");
      
      setDurationInRouteHours(+hours);
      setDurationInRouteMinute(+minutes);
      setNumberOfTrain(selectedTrainRoute.numberOfTrain.toString());
      setFromCity(selectedTrainRoute.fromCity);
      setToCity(selectedTrainRoute.toCity);
      setDayOfDispatch(selectedTrainRoute.dayOfDispatch);
      setStartTime(selectedTrainRoute.startTime);
      setDurationInRoute(selectedTrainRoute.durationInRoute);
      if (selectedTrainRoute.addInfo) {
        setAddInfo(selectedTrainRoute.addInfo);
      }
    }
  };

  const isFormNotValid =
    fromCity === "" ||
    toCity === "" ||
    numberOfTrain === "" ||
    durationInRoute === "0: 0" ||
    startTime === "" ||
    dayOfDispatch.length === 0;

  let disabled = true;

  if (isFormNotValid) {
    disabled = true;
  } else {
    disabled = false;
  }

  const createRoute = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormNotValid) {
      return;
    }

    if (selectedTrainRoute) {
      const updatedRoute: TrainRouteRequest = {
        numberOfTrain,
        fromCity,
        toCity,
        dayOfDispatch,
        startTime,
        durationInRoute,
        addInfo,
      };

      handleUpdateRoute(selectedTrainRoute, updatedRoute);
      handleShowModal("You have edited route, let's go to routes list.");
      return;
    }

    const newRoute: TrainRouteRequest = {
      numberOfTrain,
      fromCity,
      toCity,
      dayOfDispatch,
      startTime,
      durationInRoute,
      addInfo,
    };

    handleFormSubmit(newRoute);
    handleShowModal("You have added new route, let's go to routes list.");
  };

  const handleCheckboxChange = (day: DayType) => {
    if (dayOfDispatch.includes(day)) {
      setDayOfDispatch(
        dayOfDispatch.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setDayOfDispatch([...dayOfDispatch, day]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (checked) {
      setDayOfDispatch(Object.values(DayType));
    } else {
      setDayOfDispatch([]);
    }
  };

  return (
    <>
      <nav
        className="navbar py-2 navbarFlex"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-item">
          {!selectedTrainRoute ? (
            <h4 className="title">Add a route</h4>
          ) : (
            <h4 className="title">Edit route</h4>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <p className="control">
              <Link
                to="/"
                className="is-align-items-stretch button is-dark"
                onClick={() => {
                  handleSelectRoute(null);
                }}
              >
                Go to routes list
              </Link>
            </p>
          </div>
        </div>
      </nav>

      <form onSubmit={createRoute}>
        <div className="field is-grouped">
          <div className="control is-expanded">
            <TextField
              name="fromCity"
              label="From city"
              value={fromCity}
              onChange={setFromCity}
              required
            />
          </div>

          <div className="control is-expanded">
            <TextField
              name="toCity"
              label="To city"
              value={toCity}
              onChange={setToCity}
              required
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control is-expanded">
            <TextField
              name="numberOfTrain"
              label="Number of train"
              value={numberOfTrain}
              onChange={setNumberOfTrain}
              required
            />
          </div>

          <div className="control is-expanded">
            <label className="label" htmlFor="startTime">
              Departure time
            </label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={({ target }) => {
                setStartTime(target.value);
              }}
              className="control input"
            />
          </div>

          <div className="control is-expanded is-grouped">
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <label className="label" htmlFor="durationInRouteHours">
                    Hours in route
                  </label>
                  <input
                    className="input"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="100"
                    name="durationInRouteHours"
                    value={durationInRouteHours}
                    onChange={({ target }) => {
                      setDurationInRouteHours(+target.value);
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label" htmlFor="durationInRouteMinute">
                    Minutes in route
                  </label>
                  <input
                    className="input"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="59"
                    name="durationInRouteMinute"
                    value={durationInRouteMinute}
                    onChange={({ target }) => {
                      setDurationInRouteMinute(+target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="field is-normal">
            <label className="label" htmlFor="startTime">
              Departure days
            </label>
          </div>
          <div className="field-body is-grouped is-flex is-justify-content-space-between is-flex-wrap-wrap">
            {Object.keys(DayType).map((day) => (
              <div className="field" key={day}>
                <div className="control">
                  <label
                    className="checkbox is-flex is-flex-direction-column is-align-items-center"
                    htmlFor={`checkbox-${day}`}
                  >
                    <input
                      type="checkbox"
                      id={`checkbox-${day}`}
                      checked={dayOfDispatch.includes(
                        DayType[day as keyof typeof DayType]
                      )}
                      onChange={() =>
                        handleCheckboxChange(
                          DayType[day as keyof typeof DayType]
                        )
                      }
                    />

                    <span className="is-centered">
                      {DayType[day as keyof typeof DayType]}
                    </span>
                  </label>
                </div>
              </div>
            ))}

            <div className="field">
              <div className="control">
                <label className="checkbox is-flex is-flex-direction-column is-align-items-center">
                  <input
                    type="checkbox"
                    checked={
                      dayOfDispatch.length === Object.values(DayType).length
                    }
                    onChange={handleSelectAll}
                  />
                  Select All
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="is-fullwidth control">
            <textarea
              name="addInfo"
              value={addInfo}
              className="textarea"
              placeholder="Additional information"
              onChange={({ target }) => {
                setAddInfo(target.value);
              }}
            />
          </div>
        </div>

        <div className="field">
          {selectedTrainRoute ? (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-dark"
              disabled={disabled}
            >
              Edit
            </button>
          ) : (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-dark"
              disabled={disabled}
            >
              Add
            </button>
          )}
        </div>
      </form>

      {showModal &&
        ReactDOM.createPortal(
          <Modal message={successMessage} />,
          document.getElementById("modal-root") as Element
        )}
    </>
  );
};
