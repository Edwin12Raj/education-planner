import { useEffect, useState } from "react";

const Assignments = () => {
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");
  const [planner, setPlanner] = useState([]);

  // Load from localStorage on component mount
  useEffect(() => {
    const plannerData = localStorage.getItem("plannerData");
    if (plannerData) {
      setPlanner(JSON.parse(plannerData));
    }
  }, []);

  // Sync planner data to localStorage whenever it updates
  useEffect(() => {
    if (planner.length > 0) {
      localStorage.setItem("plannerData", JSON.stringify(planner));
    }
  }, [planner]);

  const handleAddClick = (e) => {
    e.preventDefault();
    if (!subject || !hours) return;

    const obj = {
      subject: subject,
      hours: parseInt(hours),
    };

    const plannerArray = [...planner, obj];
    setPlanner(plannerArray);
    setSubject("");
    setHours("");
  };

  const handlePlusBtn = (index) => {
    const plannerCopy = [...planner];
    const updatedObj = {
      ...plannerCopy[index],
      hours: parseInt(plannerCopy[index].hours) + 1,
    };
    plannerCopy.splice(index, 1, updatedObj);
    setPlanner(plannerCopy);
  };

  const handleMinusBtn = (index) => {
    const plannerCopy = [...planner];
    if (plannerCopy[index].hours > 1) {
      const updatedObj = {
        ...plannerCopy[index],
        hours: parseInt(plannerCopy[index].hours) - 1,
      };
      plannerCopy.splice(index, 1, updatedObj);
      setPlanner(plannerCopy);
    }
  };

  return (
    <>
      <h1>Edu Planner</h1>
      <form>
        <input
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          placeholder="Subject"
          value={subject}
        />
        <input
          onChange={(e) => setHours(e.target.value)}
          value={hours}
          type="number"
          step={1}
          placeholder="Hours"
        />
        <button onClick={handleAddClick}>Add</button>
      </form>

      {/* Display planner list */}
      <div className="subject-list">
        {planner.length > 0 ? (
          planner.map((data, index) => (
            <div key={`card_${index}`} className="subject-card">
              <p>{data.subject} - {data.hours} hours</p>
              <div>
                <button onClick={() => handlePlusBtn(index)}>+</button>
                <button className="minus-btn" onClick={() => handleMinusBtn(index)}>-</button>
              </div>
            </div>
          ))
        ) : (
          <p>No subjects added yet.</p>
        )}
      </div>
    </>
  );
};

export default Assignments;
