// import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";

import { FC } from "react";

const URL = `https://yandex.ru/map-widget/v1/?ll=56.227424%2C58.004138&
mode=poi&poi%5Bpoint%5D=56.221126%2C58.002848&
poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1064300558&z=16.58`;

export const MapContacts: FC = () => (
  <iframe
    title="yandex-map"
    src={URL}
    width="100%"
    height="100%"
    style={{ border: "none", position: "relative" }}
  ></iframe>
);
