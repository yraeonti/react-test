import React, { useState } from "react";
import { STUDENTS } from "../studentsList";
// import student
// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split("-");
  const [yyyy, mm, dd] = validityDate.split("-");
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return maxValid >= selected && maxValid >= today;
}

function Search({ setResident, setError }) {
  const [input, setInput] = useState({
    name: "",
    date: "",
  });
  const updateList = () => {
    if (!input.name || !input.date) {
      setError("please fill in all input");
      return;
    }

    const isValidStudent = STUDENTS.find((student) => {
      return student.name.toLowerCase() === input.name.toLowerCase();
    });
     
    if (!isValidStudent) {
      setError(`Sorry, ${input.name} is not a verified student!`);
      return;
    }

    const validDate = checkValidity(input.date, isValidStudent.validityDate);
    if (!validDate) {
      setError(`Sorry, ${input.name}'s validity has Expired!`);
      return;
    }

    setResident((resident) => {
      const isUserAdded = resident.find((eachResident) => {
        return eachResident.name.toLowerCase() === input.name.toLowerCase();
      });
      if (isUserAdded) return resident;

      return [...resident, input];
    });
    setInput({
      name: "",
      date: "",
    });
    setError("");
  };
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-50 layout-row align-items-end justify-content-end">
      <label htmlFor="studentName">
        Student Name:
        <div>
          <input
            name="name"
            id="studentName"
            value={input.name}
            onChange={onChange}
            data-testid="studentName"
            type="text"
            className="mr-30 mt-10"
          />
        </div>
      </label>
      <label htmlFor="joiningDate">
        Joining Date:
        <div>
          <input
            name="date"
            id="joiningDate"
            value={input.date}
            onChange={onChange}
            data-testid="joiningDate"
            type="date"
            className="mr-30 mt-10"
          />
        </div>
      </label>
      <button
        type="button"
        data-testid="addBtn"
        className="small mb-0"
        onClick={updateList}
      >
        Add
      </button>
    </div>
  );
}

export default Search;
