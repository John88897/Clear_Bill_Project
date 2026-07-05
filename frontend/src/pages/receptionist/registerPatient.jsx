import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";

function RegisterPatient() {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("user id is :", user.id);
    if (!user.id) {
      setError("You must be logged in to access this page.");
      setLoading(false);
      return;
    }
    authFetch(`http://localhost:5000/api/receptionists/${user.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  async function handleCreatePatient() {
    try {
      const newPatient = await authFetch(
        `http://localhost:5000/api/receptionists/${user.id}/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            gender,
            address,
            name,
            email,
            password,
          }),
        },
      );
      const data = await newPatient.json();

      if (!newPatient.ok) {
        setError(data.error);
        window.alert("Already exisiting patient!");
        return;
      }
      alert("successfully register patient" + JSON.stringify(data));
      navigate("/receptionist/dashboard");
    } catch (error) {
      console.log("There is an error inside registerPatient" + error);
      console.log(error.message);
      setError(error.message);
    }
  }
  if (loading) {
    return <h1>Loading ...</h1>;
  }
  if (error) {
    return (
      <h1 className=" items-center m-[20%]">
        <p className="">Error: {error}</p>
        <div className="text-center border border-gray-700 rounded-md text-white bg-orange-500 hover:bg-orange-600 text-md py-3 hover:border-gray-500 mt-5">
          <button
            type="button"
            onClick={() => {
              setError(null);
              navigate("/receptionist/dashboard");
            }}
          >
            Return to Dashboard
          </button>
        </div>
      </h1>
    );
  }
  return (
    <>
      <h3 className="flex justify-center text-3xl mt-[3.5em] font-bold ">
        Create Patient
      </h3>

      <div className="flex ">
        <div className="mt-[4.5em] ml-[25%] grid justify-center py-10 w-1/3 border border-[#00668A] rounded-lg">
          <div className="flex flex-rows gap-[1em]  ">
            <div className="grid pr-[1em]">
              <label>Name: </label>
              <label>Email: </label>
              <label>Password: </label>
              {/* <label>Phone: </label> */}
              <label>Gender: </label>
              <label>Address: </label>
            </div>

            <div className="grid gap-4">
              <input
                className=" border border-[#00668A] rounded-sm px-2 "
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              ></input>
              <input
                className=" border border-[#00668A] rounded-sm px-2"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className=" border border-[#00668A] rounded-sm px-2"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <input
                className=" border border-[#00668A] rounded-sm px-2"
                type="text"
                onChange={(e) => setGender(e.target.value)}
              ></input>
              <input
                className=" border border-[#00668A] rounded-sm px-2"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </div>
          </div>
        </div>

        <div className="mt-[6.5em] ml-[4em] text-center">
          <div className="border border-gray-700 rounded-md m-4 text-white bg-blue-500 hover:bg-blue-600 text-md py-1 hover:border-gray-500">
            <button type="button" onClick={handleCreatePatient}>
              Insert
            </button>
          </div>
          <div className="border border-gray-700 rounded-md m-4 px-2 text-white bg-orange-500 hover:bg-orange-600 text-md py-1 hover:border-gray-500">
            <button
              type="button"
              onClick={() => { console.log("click"); navigate("/receptionist/dashboard"); }}>
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
// }
export default RegisterPatient;
