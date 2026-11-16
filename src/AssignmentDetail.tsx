import { use } from 'react';
import { Assignment } from '../assignments';

interface Props {
  assignmentPromise: Promise<Assignment> | null;
  onComplete: (id: number) => void;
}

export default function AssignmentDetail({ assignmentPromise, onComplete }: Props) {
  if (!assignmentPromise) {
    return <p>Оберіть завдання зі списку</p>;
  }

  const assignment = use(assignmentPromise);

  return (
    <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ marginTop: 0 }}>{assignment.courseName}</h2>
      <h3>{assignment.moduleName}</h3>
      <p>Опис: {assignment.description}</p>
      <p>Дата видачі: {assignment.issueDate}</p>
      <p>Дедлайн: {assignment.deadlineDate}</p>
      <p>
        Статус: <strong>{assignment.isSubmitted ? 'Здано' : 'Не здано'}</strong>
      </p>

      {!assignment.isSubmitted && (
        <button
          onClick={() => onComplete(assignment.id)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Виконати завдання
        </button>
      )}
    </div>
  );
}
