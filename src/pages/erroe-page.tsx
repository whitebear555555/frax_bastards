import { useRouteError } from "react-router-dom";
import { NavBar } from "../App";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <NavBar />
    </div>
  );
}
