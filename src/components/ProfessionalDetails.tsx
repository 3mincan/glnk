import React from "react";
import { Button } from "@/components/";
import { User } from "lucide-react";
import graphData from "@/data/graphData.json";

const ProfessionalDetails: React.FC<{
  professionalId: string | null;
}> = ({ professionalId }) => {
  if (!professionalId) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-80">
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm">
            Please select a professional to view their details
          </p>
        </div>
      </div>
    );
  }

  const professional = graphData.nodes.find(
    (node) => node.id === professionalId
  );

  const specialties = [
    "Cardiology",
    "Neurology",
    "Oncology",
    "Pediatrics",
    "Dermatology",
    "Endocrinology",
    "Psychiatry",
    "Orthopedics",
  ];
  const descriptions = [
    "Highly experienced in patient-centered care.",
    "Published extensively in top medical journals.",
    "Specializes in complex case management.",
    "Known for compassionate and thorough treatment.",
    "Focused on clinical innovation and research.",
  ];

  const locations = [
    "London, UK",
    "New York, USA",
    "Toronto, Canada",
    "Berlin, Germany",
    "Istanbul, Turkey",
    "Paris, France",
    "Tokyo, Japan",
    "Sydney, Australia",
  ];

  const getRandomPeriod = () => {
    const start = Math.floor(Math.random() * 10) + 2005;
    const end = start + Math.floor(Math.random() * 4) + 2;
    return `${start} – ${end}`;
  };

  const degrees = ["MD", "PhD", "MBBS", "DO", "MSc", "MS"];

  const specializations = [
    "Cardiology",
    "Neurology",
    "Oncology",
    "Pediatrics",
    "Dermatology",
    "Endocrinology",
    "Psychiatry",
    "Orthopedics",
  ];

  const generateRandomProfessionalDetailsFromName = () => {
    const nodeIndex = professionalId?.slice(-4);
    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${nodeIndex}&size=300`;

    const name = professional?.name;
    const age = Math.floor(Math.random() * 60) + 20;
    const education = {
      institution: professional?.education[0],
      degree: degrees[Math.floor(Math.random() * degrees.length)],
      specialization:
        specializations[Math.floor(Math.random() * specializations.length)],
      period: getRandomPeriod(),
    };
    const randomSpecialty =
      specialties[Math.floor(Math.random() * specialties.length)];
    const randomDescription =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomLocation =
      locations[Math.floor(Math.random() * locations.length)];
    const patientsServed = Math.floor(Math.random() * 1000);
    const successRate = Math.floor(Math.random() * 100);
    return {
      profileImage: profileImage,
      specialty: randomSpecialty,
      description: randomDescription,
      location: randomLocation,
      age: age,
      name: name,
      education: education,
      patientsServed: patientsServed,
      successRate: successRate,
    };
  };

  const randomProfessionalDetails = generateRandomProfessionalDetailsFromName();

  const {
    specialty,
    description,
    location,
    age,
    name,
    education,
    profileImage,
    patientsServed,
    successRate,
  } = randomProfessionalDetails;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-80">
      {professional !== undefined ? (
        <>
          {/* Cover Picture */}
          <div className="relative h-24 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{
                backgroundImage: `url(${profileImage})`,
                filter: "blur(8px) brightness(1.2)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30" />
          </div>

          <div className="relative px-6 pb-6">
            {/* Profile Picture - positioned to overlap cover */}
            <div className="flex justify-center -mt-12 mb-4">
              <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                {profileImage !== "" ? (
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <User size={32} className="text-blue-500" />
                  </div>
                )}
              </div>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              <div className="flex items-center justify-center gap-2 py-2">
                <span className="text-gray-500 text-sm bg-gray-100 rounded px-2">
                  {specialty}
                </span>
                <span className="text-gray-500 text-sm bg-gray-100 rounded px-2">
                  {age}, {location}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{description}</p>

              <div className="flex justify-center space-x-8 mt-4 text-sm text-gray-500">
                <span>
                  Peers <strong className="text-gray-900">232</strong>
                </span>
                <span>
                  Following <strong className="text-gray-900">124</strong>
                </span>
              </div>
            </div>

            <div className="flex space-x-2 mb-6">
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                View Profile
              </Button>
              <Button variant="outline" className="flex-1">
                Resume
              </Button>
              <Button variant="outline" size="icon">
                <span>⋯</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-xs text-gray-500 mr-1">👥</span>
                  <span className="text-xs text-gray-500">Patient Served</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {patientsServed}
                </div>
                <div className="text-xs text-green-500">▲ +50</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-xs text-gray-500 mr-1">👑</span>
                  <span className="text-xs text-gray-500">Success rate</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {successRate}%
                </div>
                <div className="text-xs text-green-500">▲ +5%</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">About</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                luctus risus. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Aliquam luctus risus, finibus ornare vestibulum et,
                feugiat quis dui. Vivamus sit amet dolor
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Education</h4>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">H</span>
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">
                    {education.institution}
                  </h5>
                  <p className="text-sm text-gray-600">{education.degree}</p>
                  <p className="text-sm text-gray-500">
                    {education.specialization}
                  </p>
                  <p className="text-xs text-gray-400">{education.period}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-6">
          <p className="text-gray-500 text-sm">
            Please select a professional to view their details
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalDetails;
