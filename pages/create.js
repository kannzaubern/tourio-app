import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form";
import { StyledLink } from "../components/StyledLink";
import useSWR from "swr";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const { mutate } = useSWR("/api/places/"); // forces re-fetch of data at /api/places/
  const router = useRouter();

  async function addPlace(place) {
    // function sends POST request to /api/places/ with the new place's details
    const response = await fetch("/api/places/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place), // Converting place object to JSON; place is the form data object.
    });
    console.log("adding place");

    if (response.ok) {
      mutate();
      router.push("/");
      return;
    }
    console.error("Failed to delete place.");
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <StyledBackLink href="/">back</StyledBackLink>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
