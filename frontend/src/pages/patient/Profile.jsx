import { useState, useEffect } from 'react';
import al from '../../assets/al.png';
import { useNavigate } from 'react-router-dom';
import mail from '../../assets/mail.png';
import home from '../../assets/hom.png';
import gen from '../../assets/gender.png';
import calendar from '../../assets/calendar.png'
import ph from '../../assets/ph.png';
function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user.id) return;
    fetch(`http://localhost:5000/api/patient/profile/${user.id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Profile:", data);
        setProfile(data);
      })
      .catch(err => console.error(err));
  }, []);

  if (!profile) return <p className="p-4">Loading...</p>;

  const memberSince = profile.memberSince
    ? new Date(profile.memberSince).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
      })
    : "N/A";

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)}>
          <img src={al} className="w-10 px-2 py-2" alt="back" />
        </button>
        <h1 className="font-semibold mr-[45%] mt-1">Profile</h1>
      </div>

      {/* Avatar & Name */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center mb-3">
        </div>
        <p className="font-bold text-xl">{profile.name}</p>
        <span className="mt-1 px-4 py-1 bg-cyan-100 text-cyan-600 rounded-full text-sm font-medium">
          Patient
        </span>
      </div>

      {/* Info Card */}
      <div className="border border-slate-300 rounded-xl p-4 space-y-4">
        {/* Email */}
        <div className="flex items-start gap-3">
          <span className="text-gray-400 mt-0.5 w-6"><img src={mail} alt="" /></span>
          <div>
            <p className="text-xs text-gray-400">Email</p>
            <p className="font-medium text-sm">{profile.email}</p>
          </div>
        </div>
        <hr className="border-gray-100" />

        {/* Phone */}
        <div className="flex items-start gap-3">
          <span className="text-gray-400 mt-0.5 w-6"><img src={ph} alt="" /></span>
          <div>
            <p className="text-xs text-gray-400">Phone Number</p>
            <p className="font-medium text-sm">{profile.phone || "N/A"}</p>
          </div>
        </div>
        <hr className="border-gray-100" />

        {/* Gender */}
        <div className="flex items-start gap-3">
          <span className="text-gray-400 mt-0.5 w-6"><img src={gen} alt="" /></span>
          <div>
            <p className="text-xs text-gray-400">Gender</p>
            <p className="font-medium text-sm">{profile.gender || "N/A"}</p>
          </div>
        </div>
        <hr className="border-gray-100" />

        {/* Address */}
        <div className="flex items-start gap-3">
          <span className="text-gray-400 mt-0.5 w-6"><img src={home} alt="" /></span>
          <div>
            <p className="text-xs text-gray-400">Address</p>
            <p className="font-medium text-sm">{profile.address || "N/A"}</p>
          </div>
        </div>
        <hr className="border-gray-100" />

        {/* Member Since */}
        <div className="flex items-start gap-3">
          <span className="text-gray-400 mt-0.5 w-6"><img src={calendar} alt="" /></span>
          <div>
            <p className="text-xs text-gray-400">Member Since</p>
            <p className="font-medium text-sm">{memberSince}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;