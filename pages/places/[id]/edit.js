import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../../components/Form";
import { StyledLink } from "../../../components/StyledLink";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  // Fetch place data from API endpoint using SWR
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function editPlace(place) {
    // Send a PUT request to the API to update the place
    const response = await fetch(`/api/places/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(place), // Convert place object to JSON; place is the form data object
    });
    if (response.ok) {
      console.log("Successfully edited place");
      router.push("/");
    } else {
      console.error("Failed to edit place");
    }
  }

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <StyledLink href={`/places/${id}`} $justifySelf="start">
        back
      </StyledLink>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}
