import classNames from "classnames";
import "./TrainRoutesList.css";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SortType } from "../../types/SortType";
import { filterRoutes } from "../../utils/filterTrains";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faToggleOff,
  faToggleOn,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { RouteContext } from "../../RouteProvider";

export const TrainRoutesList: React.FC = () => {
  const {
    trainRoutes,
    handleStatusRoute,
    handleDeleteRoute,
    handleSelectRoute,
  } = useContext(RouteContext);
  const [sortType, setSortType] = useState<SortType>(SortType.ALL);
  const [query, setQuery] = useState("");
  let visibleTrainRoutes = filterRoutes(trainRoutes, sortType, query);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  return (
    <>
      <nav
        className="navbar py-2 navbarFlex"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-item">
          <div className="control is-expanded">
            <div className="select">
              <select
                value={sortType}
                onChange={({ target }) => {
                  setSortType(target.value as SortType);
                }}
              >
                <option value={SortType.ACTIVE}>Show {SortType.ACTIVE}</option>
                <option value={SortType.ALL}>Show {SortType.ALL}</option>
                <option value={SortType.DEACTIVE}>
                  Show {SortType.DEACTIVE}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="navbar-item onDesktop">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Type a city"
              value={query}
              onChange={handleChangeQuery}
            />
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <p className="control">
              <Link to="add" className="is-align-items-stretch button is-dark">
                Add new route
              </Link>
            </p>
          </div>
        </div>
      </nav>

      <div className="table-container">
        <table className="table is-fullwidth is-hoverable is-narrow">
          <thead>
            <tr className="has-background-link-light">
              <th className="columnStyle">Number of Train</th>
              <th className="columnStyle">Source City</th>
              <th className="columnStyle">Destination City</th>
              <th className="columnStyle">Date of dispatch</th>
              <th className="columnStyle">Start time</th>
              <th className="columnStyle">Duration in route</th>
              <th className="columnStyle">Additional information</th>
              <th className="columnStyle">Status of Route</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {trainRoutes.length ? (
              visibleTrainRoutes.map((route) => (
                <tr
                  key={route.id}
                  className={classNames({
                    "has-background-light": !route.active,
                  })}
                >
                  <td className="columnStyle is-vcentered">
                    {route.numberOfTrain}
                  </td>
                  <td className="columnStyle is-vcentered">{route.toCity}</td>
                  <td className="columnStyle is-vcentered">{route.fromCity}</td>
                  <td className="columnStyle is-vcentered">
                    {route.dayOfDispatch.length === 7
                      ? "every day"
                      : Array.isArray(route.dayOfDispatch)
                      ? route.dayOfDispatch.join(", ")
                      : route.dayOfDispatch}
                  </td>
                  <td className="columnStyle is-vcentered">
                    {route.startTime}
                  </td>
                  <td className="columnStyle is-vcentered">
                    {route.durationInRoute}
                  </td>
                  <td className="columnStyle is-vcentered">
                    {!route.addInfo ? "--" : route.addInfo}
                  </td>
                  <td className="columnStyle is-vcentered">
                    {route.active && (
                      <span className="icon">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    )}
                  </td>
                  <td className="is-vcentered">
                    <p className="buttons">
                      <button
                        className="button"
                        onClick={() => {
                          handleSelectRoute(route);
                        }}
                      >
                        <span className="icon">
                          <Link to="add">
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                        </span>
                      </button>

                      {route.active ? (
                        <button
                          className="button"
                          title="De-activate"
                          onClick={() => {
                            handleStatusRoute(route, false);
                          }}
                        >
                          <span className="icon">
                            <FontAwesomeIcon icon={faToggleOn} />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="button"
                          title="Activate"
                          onClick={() => {
                            handleStatusRoute(route, true);
                          }}
                        >
                          <span className="icon">
                            <FontAwesomeIcon icon={faToggleOff} />
                          </span>
                        </button>
                      )}

                      {route.active || (
                        <button
                          className="button"
                          onClick={() => {
                            handleDeleteRoute(route.id);
                          }}
                        >
                          <span className="icon">
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                        </button>
                      )}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No routes</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
