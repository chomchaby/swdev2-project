const getCoWorkingSpaces = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/coworkingspaces`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Cannot get co-working spaces");
    }
    return await response.json();
  };
  export default getCoWorkingSpaces;
  