import { Assignment } from './assignments';

export function AssignmentDetail({ assignment }: { assignment: Assignment | null }) {
  if (!assignment) return <p>Оберіть завдання</p>;

  return (
    <div>
      <h2>{assignment.courseName}</h2>
      <h3>{assignment.moduleName}</h3>
      <p>Опис: {assignment.description}</p>
      <p>Дата видачі: {assignment.issueDate}</p>
      <p>Дедлайн: {assignment.deadlineDate}</p>
      <p>Статус: {assignment.isSubmitted ? 'Здано' : 'Не здано'}</p>
    </div>
  );
}
