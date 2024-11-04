const getCoWorkingSpace = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/coworkingspaces/${id}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Cannot get co-working space detail");
  }
  return await response.json();
};
export default getCoWorkingSpace;
