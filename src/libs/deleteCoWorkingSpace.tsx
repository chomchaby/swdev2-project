const deleteCoWorkingSpace = async (id: string, token: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/coworkingspaces/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete co-working space");
    }
    return await response.json();
  };
  export default deleteCoWorkingSpace;
  