import { useState } from "react";

interface Contact {
  id: number;
  person_id: number;
  contact_number: string;
  type: string;
  created_at: string;
  updated_at: string;
}

interface EducationHistory {
  id: number;
  person_id: number;
  school_id: number;
  start_date: string;
  end_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
  school_name: string;
  school_address: string;
}

interface EmploymentHistory {
  id: number;
  person_id: number;
  company_id: number;
  start_date: string;
  end_date: string | null;
  position: string;
  created_at: string;
  updated_at: string;
  company_name: string;
  company_type: string;
}

interface PersonData {
  id: number;
  name: string;
  dob: string;
  contact: number;
  no_of_family_members: number;
  school_id: number;
  company_id: number;
  schooling_history: string;
  working_history: string;
  jurisdiction_id: number;
  birth_hospital_id: number;
  created_at: string;
  updated_at: string;
  jurisdiction_name: string;
  birth_hospital: string;
  current_school: string;
  current_company: string;
  contacts: Contact[];
  education_history: EducationHistory[];
  employment_history: EmploymentHistory[];
}

interface ApiResponse {
  success: boolean;
  data: PersonData;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export default function ManageData() {
  // ── Add Person Form State ───────────────────────────────────────
  const [personForm, setPersonForm] = useState({
    name: "",
    dob: "",
    contact: "",
    no_of_family_members: "",
    school_id: "",
    company_id: "",
    jurisdiction_id: "",
    birth_hospital_id: "",
  });

  // ── Additional Contacts (dynamic array) ─────────────────────────
  const [contacts, setContacts] = useState<Array<{ contact_number: string; type: string }>>([
    { contact_number: "", type: "" }
  ]);

  // ── Education Records (dynamic array) ───────────────────────────
  const [educationRecords, setEducationRecords] = useState<Array<{
    school_id: string;
    start_date: string;
    end_date: string;
    notes: string;
  }>>([{ school_id: "", start_date: "", end_date: "", notes: "" }]);

  // ── Employment Records (dynamic array) ──────────────────────────
  const [employmentRecords, setEmploymentRecords] = useState<Array<{
    company_id: string;
    start_date: string;
    end_date: string;
    position: string;
  }>>([{ company_id: "", start_date: "", end_date: "", position: "" }]);

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [createdPersonId, setCreatedPersonId] = useState<number | null>(null);

  // ── Search Person State ────────────────────────────────────────
  const [personId, setPersonId] = useState("");
  const [personData, setPersonData] = useState<PersonData | null>(null);
  const [searchStatus, setSearchStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [searchMessage, setSearchMessage] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // ── Add/Remove Contact Functions ────────────────────────────────
  const addContactField = () => setContacts([...contacts, { contact_number: "", type: "" }]);
  const removeContactField = (index: number) => setContacts(contacts.filter((_, i) => i !== index));
  const updateContact = (index: number, field: string, value: string) => {
    const newContacts = [...contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setContacts(newContacts);
  };

  // ── Add/Remove Education Functions ──────────────────────────────
  const addEducationField = () => setEducationRecords([...educationRecords, { school_id: "", start_date: "", end_date: "", notes: "" }]);
  const removeEducationField = (index: number) => setEducationRecords(educationRecords.filter((_, i) => i !== index));
  const updateEducation = (index: number, field: string, value: string) => {
    const newRecords = [...educationRecords];
    newRecords[index] = { ...newRecords[index], [field]: value };
    setEducationRecords(newRecords);
  };

  // ── Add/Remove Employment Functions ─────────────────────────────
  const addEmploymentField = () => setEmploymentRecords([...employmentRecords, { company_id: "", start_date: "", end_date: "", position: "" }]);
  const removeEmploymentField = (index: number) => setEmploymentRecords(employmentRecords.filter((_, i) => i !== index));
  const updateEmployment = (index: number, field: string, value: string) => {
    const newRecords = [...employmentRecords];
    newRecords[index] = { ...newRecords[index], [field]: value };
    setEmploymentRecords(newRecords);
  };

  // ── Main Form Submission ────────────────────────────────────────
  async function handleSubmitAll(e: React.FormEvent) {
    const token = getCookie("token");
    e.preventDefault();
    setSubmitStatus("loading");
    setSubmitMessage("");
    setCreatedPersonId(null);

    try {
      // Generate schooling and working history summaries
      const schoolingHistory = educationRecords
        .filter(edu => edu.school_id && edu.start_date && edu.end_date && edu.notes)
        .map(edu => `${edu.start_date} - ${edu.end_date}: ${edu.notes}`)
        .join("; ");

      const workingHistory = employmentRecords
        .filter(emp => emp.company_id && emp.start_date && emp.position)
        .map(emp => `${emp.start_date} - ${emp.end_date || "Present"}: ${emp.position}`)
        .join("; ");

      // Step 1: Create Person
      const personPayload = {
        ...personForm,
        contact: parseInt(personForm.contact),
        no_of_family_members: parseInt(personForm.no_of_family_members),
        school_id: parseInt(personForm.school_id),
        company_id: parseInt(personForm.company_id),
        jurisdiction_id: parseInt(personForm.jurisdiction_id),
        birth_hospital_id: parseInt(personForm.birth_hospital_id),
        schooling_history: schoolingHistory,
        working_history: workingHistory,
      };

      const personRes = await fetch("http://localhost:5000/api/Persons", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(personPayload),
      });

      if (!personRes.ok) {
        const errData = await personRes.json();
        throw new Error(errData.message || `Failed to create person: ${personRes.status}`);
      }

      const personData = await personRes.json();
      const newPersonId = personData.data?.id;
      if (!newPersonId) throw new Error("Person created but ID not returned");
      setCreatedPersonId(newPersonId);

      // Step 2: Add Contacts
      const contactPromises = contacts
        .filter(c => c.contact_number && c.type)
        .map(contact => 
          fetch("http://localhost:5000/api/contacts", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              person_id: newPersonId,
              contact_number: contact.contact_number,
              type: contact.type,
            }),
          })
        );

      // Step 3: Add Education Records
      const educationPromises = educationRecords
        .filter(edu => edu.school_id && edu.start_date && edu.end_date && edu.notes)
        .map(edu => 
          fetch("http://localhost:5000/api/education", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              person_id: newPersonId,
              school_id: parseInt(edu.school_id),
              start_date: edu.start_date,
              end_date: edu.end_date,
              notes: edu.notes,
            }),
          })
        );

      // Step 4: Add Employment Records
      const employmentPromises = employmentRecords
        .filter(emp => emp.company_id && emp.start_date && emp.position)
        .map(emp => 
          fetch("http://localhost:5000/api/employment", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              person_id: newPersonId,
              company_id: parseInt(emp.company_id),
              start_date: emp.start_date,
              end_date: emp.end_date || null,
              position: emp.position,
            }),
          })
        );

      await Promise.all([...contactPromises, ...educationPromises, ...employmentPromises]);

      setSubmitStatus("success");
      setSubmitMessage(`Person and all records created successfully! Person ID: ${newPersonId}`);

      // Reset form
      setPersonForm({
        name: "",
        dob: "",
        contact: "",
        no_of_family_members: "",
        school_id: "",
        company_id: "",
        jurisdiction_id: "",
        birth_hospital_id: "",
      });
      setContacts([{ contact_number: "", type: "" }]);
      setEducationRecords([{ school_id: "", start_date: "", end_date: "", notes: "" }]);
      setEmploymentRecords([{ company_id: "", start_date: "", end_date: "", position: "" }]);
    } catch (err: any) {
      console.error("Submission failed:", err);
      setSubmitStatus("error");
      setSubmitMessage(err.message || "Failed to create person and records");
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!personId.trim()) {
      setSearchStatus("error");
      setSearchMessage("Please enter a person ID");
      return;
    }

    setSearchStatus("loading");
    setSearchMessage("");
    setPersonData(null);

    try {
      const res = await fetch(`http://localhost:5000/api/Persons/${personId.trim()}`);
      if (!res.ok) {
        let errorText = "";
        try { const errData = await res.json(); errorText = errData.message || `HTTP ${res.status}`; } 
        catch { errorText = await res.text(); }
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      const response: ApiResponse = await res.json();
      if (response.success && response.data) {
        setPersonData(response.data);
        setSearchStatus("success");
        setSearchMessage("");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err: any) {
      console.error("Fetch failed:", err);
      setSearchStatus("error");
      setSearchMessage(err.message || "Failed to fetch person details");
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold p-4">Manage Data</h1>

      {/* ── Add Complete Person Form ───────────────────────────────── */}
      <div className="border rounded-lg p-6 drop-shadow-lg m-4">
        <h2 className="text-2xl font-bold mb-6">Add Complete Person Record</h2>

        <form onSubmit={handleSubmitAll} className="flex flex-col gap-6">
          {/* ── Basic Person Information ─────────────────────────── */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-bold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-semibold">Full Name</label>
                <input
                  type="text"
                  value={personForm.name}
                  onChange={(e) => setPersonForm({ ...personForm, name: e.target.value })}
                  placeholder="Enter full name"
                  required
                  className="px-4 py-2 border focus:border-black rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Date of Birth</label>
                <input
                  type="date"
                  value={personForm.dob}
                  onChange={(e) => setPersonForm({ ...personForm, dob: e.target.value })}
                  required
                  className="px-4 py-2 border focus:border-black rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Primary Contact Number</label>
                <input
                  type="number"
                  value={personForm.contact}
                  onChange={(e) => setPersonForm({ ...personForm, contact: e.target.value })}
                  placeholder="Enter contact number"
                  required
                  className="px-4 py-2 border focus:border-black rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Number of Family Members</label>
                <input
                  type="number"
                  value={personForm.no_of_family_members}
                  onChange={(e) => setPersonForm({ ...personForm, no_of_family_members: e.target.value })}
                  placeholder="Enter number"
                  required
                  className="px-4 py-2 border focus:border-black rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">School ID</label>
                <input
                  type="number"
                  value={personForm.school_id}
                  onChange={(e) => setPersonForm({ ...personForm, school_id: e.target.value })}
                  placeholder="Enter school ID"
                  required
                  className="px-4 py-2 border focus:border-black rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Company ID</label>
                <input
                  type="number"
                  value={personForm.company_id}
                  onChange={(e) => setPersonForm({ ...personForm, company_id: e.target.value })}
                  placeholder="Enter company ID"
                  required
                  className="px-4 py-2 border focus:border-black rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Jurisdiction ID</label>
                <input
                  type="number"
                  value={personForm.jurisdiction_id}
                  onChange={(e) => setPersonForm({ ...personForm, jurisdiction_id: e.target.value })}
                  placeholder="Enter jurisdiction ID"
                  required
                  className="px-4 py-2 border focus:border-black rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Birth Hospital ID</label>
                <input
                  type="number"
                  value={personForm.birth_hospital_id}
                  onChange={(e) => setPersonForm({ ...personForm, birth_hospital_id: e.target.value })}
                  placeholder="Enter birth hospital ID"
                  required
                  className="px-4 py-2 border focus:border-black rounded-md"
                />
              </div>
            </div>
          </div>

          {/* ── Education History ────────────────────────────────── */}
          <div className="border-b pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Education History</h3>
              <button
                type="button"
                onClick={addEducationField}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                + Add Education
              </button>
            </div>

            {educationRecords.map((edu, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">School ID</label>
                    <input
                      type="number"
                      value={edu.school_id}
                      onChange={(e) => updateEducation(index, "school_id", e.target.value)}
                      placeholder="Enter school ID"
                      className="px-4 py-2 border focus:border-black rounded-md"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Start Date</label>
                    <input
                      type="date"
                      value={edu.start_date}
                      onChange={(e) => updateEducation(index, "start_date", e.target.value)}
                      className="px-4 py-2 border focus:border-black rounded-md"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">End Date</label>
                    <input
                      type="date"
                      value={edu.end_date}
                      onChange={(e) => updateEducation(index, "end_date", e.target.value)}
                      className="px-4 py-2 border focus:border-black rounded-md"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Notes</label>
                  <textarea
                    value={edu.notes}
                    onChange={(e) => updateEducation(index, "notes", e.target.value)}
                    placeholder="Enter notes (e.g., degree, achievements)"
                    rows={2}
                    className="px-4 py-2 border focus:border-black rounded-md"
                  />
                </div>

                {educationRecords.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducationField(index)}
                    className="mt-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                  >
                    Remove Education
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* ── Employment History ───────────────────────────────── */}
          <div className="pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Employment History</h3>
              <button
                type="button"
                onClick={addEmploymentField}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                + Add Employment
              </button>
            </div>

            {employmentRecords.map((emp, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Company ID</label>
                    <input
                      type="number"
                      value={emp.company_id}
                      onChange={(e) => updateEmployment(index, "company_id", e.target.value)}
                      placeholder="Enter company ID"
                      className="px-4 py-2 border focus:border-black rounded-md"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Position</label>
                    <input
                      type="text"
                      value={emp.position}
                      onChange={(e) => updateEmployment(index, "position", e.target.value)}
                      placeholder="Enter position/role"
                      className="px-4 py-2 border focus:border-black rounded-md"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Start Date</label>
                    <input
                      type="date"
                      value={emp.start_date}
                      onChange={(e) => updateEmployment(index, "start_date", e.target.value)}
                      className="px-4 py-2 border focus:border-black rounded-md"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">End Date (leave blank if current)</label>
                    <input
                      type="date"
                      value={emp.end_date}
                      onChange={(e) => updateEmployment(index, "end_date", e.target.value)}
                      className="px-4 py-2 border focus:border-black rounded-md"
                    />
                  </div>
                </div>

                {employmentRecords.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEmploymentField(index)}
                    className="mt-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                  >
                    Remove Employment
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* ── Submit Button ────────────────────────────────────── */}
          <button
            type="submit"
            disabled={submitStatus === "loading"}
            className={`
              mt-2 px-6 py-3 bg-black text-white font-bold rounded-md text-lg
              hover:bg-gray-800 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {submitStatus === "loading" ? "Creating Person & Records..." : "Submit Complete Record"}
          </button>

          {submitMessage && (
            <p
              className={`mt-2 text-sm font-medium ${
                submitStatus === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {submitMessage}
            </p>
          )}
        </form>
      </div>

      {/* ── Search Person ──────────────────────────────────────── */}
      <div className="border rounded-lg p-6 drop-shadow-lg m-4">
        <h2 className="text-2xl font-bold mb-6">Search Person</h2>

        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Person ID</label>
            <input
              type="number"
              value={personId}
              onChange={(e) => setPersonId(e.target.value)}
              placeholder="Enter person ID"
              required
              className="px-4 py-2 border focus:border-black rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={searchStatus === "loading"}
            className={`
              mt-2 px-6 py-2 bg-black text-white font-bold rounded-md
              hover:bg-gray-800 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {searchStatus === "loading" ? "Fetching..." : "Fetch Details"}
          </button>

          {searchMessage && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {searchMessage}
            </p>
          )}
        </form>
      </div>

      {/* ── Person Details Display ─────────────────────────────── */}
      {personData && searchStatus === "success" && (
        <div className="space-y-6 m-4">
          {/* Basic Information */}
          <div className="border rounded-lg p-6 drop-shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-600">Name</p>
                <p className="text-lg">{personData.name}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Date of Birth</p>
                <p className="text-lg">
                  {formatDate(personData.dob)} ({calculateAge(personData.dob)} years old)
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Primary Contact</p>
                <p className="text-lg">{personData.contact}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Family Members</p>
                <p className="text-lg">{personData.no_of_family_members}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Jurisdiction</p>
                <p className="text-lg">{personData.jurisdiction_name}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Birth Hospital</p>
                <p className="text-lg">{personData.birth_hospital}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border rounded-lg p-6 drop-shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Contact Numbers</h2>
            <div className="space-y-3">
              {personData.contacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-semibold">{contact.contact_number}</p>
                    <p className="text-sm text-gray-600">{contact.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education History */}
          <div className="border rounded-lg p-6 drop-shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Education History</h2>
            <div className="space-y-4">
              {personData.education_history.map((edu) => (
                <div key={edu.id} className="p-4 bg-gray-50 rounded-md">
                  <h3 className="font-bold text-lg">{edu.school_name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{edu.school_address}</p>
                  <p className="text-sm">
                    <span className="font-semibold">Period:</span>{" "}
                    {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                  </p>
                  <p className="text-sm mt-2">
                    <span className="font-semibold">Notes:</span> {edu.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Employment History */}
          <div className="border rounded-lg p-6 drop-shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Employment History</h2>
            <div className="space-y-4">
              {personData.employment_history.map((emp) => (
                <div key={emp.id} className="p-4 bg-gray-50 rounded-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{emp.company_name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{emp.company_type}</p>
                      <p className="text-sm">
                        <span className="font-semibold">Position:</span> {emp.position}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Period:</span>{" "}
                        {formatDate(emp.start_date)} - {emp.end_date ? formatDate(emp.end_date) : "Present"}
                      </p>
                    </div>
                    {!emp.end_date && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="border rounded-lg p-6 drop-shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-600">Current School</p>
                <p className="text-lg">{personData.current_school}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Current Company</p>
                <p className="text-lg">{personData.current_company}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Schooling History Summary</p>
                <p className="text-lg">{personData.schooling_history}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Working History Summary</p>
                <p className="text-lg">{personData.working_history}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}