import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { RouteContext } from "../../RouteProvider";
import { DayType } from "../../types/DayType";
import { TrainRouteRequest } from "../../types/TrainRouteRequest";
import Modal from "../Modal/Modal";
import { TextField } from "../TextField/TextField";
import { NumberField } from "../NumberField";

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
  const [durationInRoute, setDurationInRoute] = useState("");
  const [addInfo, setAddInfo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const openModal = (message: string) => {
    setSuccessMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        closeModal();
      }, 2000);

      return () => clearTimeout(timer);
    }
    return () => {};
  }, [showModal]);

  const handleShowModal = (infoMessage: string) => {
    openModal(infoMessage);
    setShowModal(true);
  };

  useEffect(() => {
    if (selectedTrainRoute) {
      fillForm();
    }
  }, [selectedTrainRoute]);

  const fillForm = () => {
    if (selectedTrainRoute) {
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

  const isValidNumberOfTrain = /^[0-9]{1,5}$/.test(numberOfTrain);

  const isFormNotValid =
    fromCity === "" ||
    toCity === "" ||
    !isValidNumberOfTrain ||
    durationInRoute === "00:00" ||
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


  // const handleResetForm = () => {
  //   handleSelectRoute(null);
  // };
  
  return (
    <>
      <div className="is-flex is-justify-content-space-between">
        {!selectedTrainRoute ? (
          <h4 className="title">Add a route</h4>
        ) : (
          <h4 className="title">Edit route</h4>
        )}
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

      <form onSubmit={createRoute}>
        <div className="field is-grouped">
          <div className="control is-expanded">
            <TextField
              name="fromCity"
              label="From City"
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
            <NumberField
              name="numberOfTrain"
              label="Number of train"
              value={numberOfTrain}
              onChange={setNumberOfTrain}
              pattern="^[0-9]{1,5}$"
              required
            />
          </div>

          <div className="control is-expanded">
            <label className="label" htmlFor="durationInRoute">
              Duration in route
            </label>
            <input
              type="time"
              id="durationInRoute"
              value={durationInRoute}
              onChange={({ target }) => {
                setDurationInRoute(target.value);
              }}
              className="control input"
            />
          </div>

          <div className="control is-expanded">
            <label className="label" htmlFor="startTime">
              Start time
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
        </div>

        <div className="field">
          <div className="field is-normal">
            <label className="label" htmlFor="startTime">
              Days of the Week
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

        <div className="field is-grouped">
          <div className="buttons">
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

            {/* <button
              className="button is-light"
              onClick={handleResetForm}
            >
              Reset
            </button> */}
          </div>
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
