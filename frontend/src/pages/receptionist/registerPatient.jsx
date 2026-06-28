import { useEffect } from "react";
import { useState } from "react";
import ReceptionistDashboard from "./receptionistDashboard";
function RegisterPatient() {

  const [name, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboard, setShowDashboard] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    console.log("user id is :", user.id);
    if (!user.id) {
      navigate("/login");
      return;
    }
    setLoading(true);
    fetch(`http://localhost:5000/api/receptionist/${user.id}`)
      .then((res) => {
        return res.json()
      }
      )
      .then((data) => {
        setLoading(false);
      }).catch((error) => {
        console.log(error)
        setError(error.message);
        setLoading(false);
      });
  }, []);


  async function handleCreatePatient() {
    try {
      const newPatient = await fetch(`http://localhost:5000/api/receptionist/${user.id}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),//turning object to json
      })
      const data = await newPatient.json()
      console.log(data)
    } catch (error) {
      console.log("There is an error inside registerPatient" + error);
      setError(error);
    }
  }

  if (loading) {
    return <h1>Loading ...</h1>
  }
  if (error) {
    return <h1>Error: {error}</h1>
  }
  if (dashboard) return <ReceptionistDashboard />;

  return (
    <>
      <h3 className="flex justify-center text-3xl mt-[3.5em] font-bold ">Create Patient</h3>

      <div className="flex  ">
        <div className="mt-[4.5em] ml-[25%] grid justify-center py-10 w-1/3 border border-[#00668A] rounded-lg">

          <div className="flex flex-rows gap-[1em]">

            <div className="grid pr-[1em]">
              <label>Name: </label>
              <label>Email: </label>
              <label>Password: </label>
            </div>

            <div className="grid gap-4">
              <input className=" border border-gray-[#00668A] rounded-sm px-2 " type="text"
                onChange={(e) => setFullName(e.target.value)}
              ></input>
              <input className=" border border-gray-[#00668A] rounded-sm px-2" type="email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input className=" border border-gray-[#00668A] rounded-sm px-2" type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

          </div>
        </div>

        <div className="mt-[6.5em] ml-[4em] text-center">
          <div className="border border-gray-700 rounded-md m-4 text-white bg-blue-500 hover:bg-blue-600 text-md py-1 hover:border-gray-500">
            <button type="submit" onClick={handleCreatePatient} >Insert</button>
          </div>
          <div className="border border-gray-700 rounded-md m-4 px-2 text-white bg-orange-500 hover:bg-orange-600 text-md py-1 hover:border-gray-500">
            <button type="submit" onClick={() => setShowDashboard(true)} >Return to Dashboard</button>
          </div>
        </div>

      </div>
    </>
  );
}
// }
export default RegisterPatient;
