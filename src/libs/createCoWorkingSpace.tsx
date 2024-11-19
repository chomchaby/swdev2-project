const createCoWorkingSpace = async (
    name: string,
    address: string,
    operatingHours: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    token: string
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/coworkingspaces`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name:name,
            address: address,
            operatingHours: operatingHours,
            province: province,
            postalcode: postalcode,
            tel: tel,
            picture: picture,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create booking");
    }
    return await response.json();
  };
  export default createCoWorkingSpace;
  