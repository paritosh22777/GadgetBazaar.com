import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import Metadata from "../layout/Metadata";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { State, City } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  const shippingSubmit = (event) => {
    event.preventDefault();
    if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      alert.error("Phone number should be 10 digits long");
      return;
    }
    dispatch(saveShippingInfo({ address, city, state, pinCode, phoneNumber }));
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <Metadata title="Shipping Details" />
      <CheckoutSteps activeStep={0} />
      <div className="shipping-container">
        <div className="shipping-box">
          <h2 className="shipping-heading">Shipping Details</h2>
          <form
            className="shipping-form"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(event) => setPinCode(event.target.value)}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                size="10"
              />
            </div>
            <div>
              <TransferWithinAStationIcon />
              <select
                required
                value={state}
                onChange={(event) => setState(event.target.value)}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry("IN").map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {state && (
              <div>
                <LocationCityIcon />
                <select
                  required
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                >
                  <option value="">City</option>
                  {City &&
                    City.getCitiesOfState("IN", state).map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="CONTINUE"
              className="shipping-button"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Shipping;
