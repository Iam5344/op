import { useState } from 'react';
import { assignments, Assignment } from './assignments';
import { AssignmentDetail } from './AssignmentDetail';

export default function App() {
  const [selected, setSelected] = useState<Assignment | null>(null);

  const handleClick = (item: Assignment) => {
    setTimeout(() => {
      setSelected(item);
    }, 300);
  };

  return (
    <main>
      <h1>Завдання</h1>

      <div>
        {assignments.map((item) => (
          <div key={item.id} onClick={() => handleClick(item)}>
            <h3>{item.courseName}</h3>
            <p>Дата видачі: {item.issueDate}</p>
          </div>
        ))}
      </div>

      <hr />
      <AssignmentDetail assignment={selected} />
    </main>
  );
}
