import { useState, Suspense, lazy, useOptimistic, startTransition } from 'react';
import { initialAssignments, Assignment } from './assignments';
import { AssignmentDetailSkeleton } from './components/AssignmentDetailSkeleton';

const AssignmentDetail = lazy(() => import('./components/AssignmentDetail'));

export default function App() {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detailPromise, setDetailPromise] = useState<Promise<Assignment> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [optimisticAssignments, addOptimisticComplete] = useOptimistic(
    assignments,
    (state, completedId: number) =>
      state.map((item) =>
        item.id === completedId ? { ...item, isSubmitted: true } : item
      )
  );

  const fetchAssignmentDetails = (item: Assignment): Promise<Assignment> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(item);
      }, 800);
    });
  };

  const handleSelect = (item: Assignment) => {
    setError(null);
    setSelectedId(item.id);
    setDetailPromise(fetchAssignmentDetails(item));
  };

  const handleComplete = (id: number) => {
    setError(null);

    startTransition(async () => {
  
      addOptimisticComplete(id);

      const optimisticItem = optimisticAssignments.find((a) => a.id === id);
      if (optimisticItem) {
        setDetailPromise(Promise.resolve({ ...optimisticItem, isSubmitted: true }));
      }

      try {
        await new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() < 0.05) {
              reject(new Error('Помилка сервера (5%): не вдалося зберегти статус!'));
            } else {
              resolve();
            }
          }, 700);
        });

        setAssignments((prev) =>
          prev.map((item) => (item.id === id ? { ...item, isSubmitted: true } : item))
        );
      } catch (err) {
        setError((err as Error).message);
        const originalItem = assignments.find((a) => a.id === id);
        if (originalItem) {
          setDetailPromise(Promise.resolve(originalItem));
        }
      }
    });
  };

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Список завдань</h1>

      {error && (
        <div
          style={{
            padding: '10px',
            marginBottom: '12px',
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            borderRadius: '6px',
          }}
        >
          {error}
        </div>
      )}


      <div>
        {optimisticAssignments.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item)}
            style={{
              border: `1px solid ${selectedId === item.id ? '#2563eb' : '#ccc'}`,
              padding: '12px',
              marginBottom: '10px',
              cursor: 'pointer',
              borderRadius: '6px',
              backgroundColor: item.isSubmitted ? '#f0fdf4' : '#ffffff',
            }}
          >
            <h3 style={{ margin: '0 0 5px 0' }}>
              {item.courseName} {item.isSubmitted && '✅'}
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
              Дата видачі: {item.issueDate}
            </p>
          </div>
        ))}
      </div>

      <hr style={{ margin: '20px 0' }} />


      <Suspense fallback={<AssignmentDetailSkeleton />}>
        <AssignmentDetail
          assignmentPromise={detailPromise}
          onComplete={handleComplete}
        />
      </Suspense>
    </main>
  );
}
