import http from "../../../helper/http";
import { useState } from "react";

export default function ContactDetails({ info }) {
  const [id, setId] = useState(info);
  return <div>{id}</div>;
}
