import React, { useState, useEffect } from 'react';


const DEFAULT_HABITS = [
  { id: 'commit', name: ' Open Source Commits', dailyChecked: false, streakCount: 5 },
  { id: 'leetcode', name: ' LeetCode Array Challenge', dailyChecked: false, streakCount: 12 },
  { id: 'docs', name: ' Read 3 Pages of Documentation', dailyChecked: true, streakCount: 8 },
  { id: 'ui', name: 'Tweak Tailwind Layout Designs', dailyChecked: false, streakCount: 3 }
];

function App() {
  
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('codesprint_habits');
    return saved ? JSON.parse(saved) : DEFAULT_HABITS;
  });

  const [inputTask, setInputTask] = useState('');

  
  useEffect(() => {
    localStorage.setItem('codesprint_habits', JSON.stringify(habits));
  }, [habits]);

  
  const toggleDailyHabit = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const statusChange = !habit.dailyChecked;
        return {
          ...habit,
          dailyChecked: statusChange,
          streakCount: statusChange ? habit.streakCount + 1 : Math.max(0, habit.streakCount - 1)
        };
      }
      return habit;
    }));
  };

  
  const handleCreateHabit = (e) => {
    e.preventDefault();
    if (!inputTask.trim()) return;

    const freshHabit = {
      id: Date.now().toString(),
      name: inputTask,
      dailyChecked: false,
      streakCount: 0
    };

    setHabits([...habits, freshHabit]);
    setInputTask('');
  };

  
  const simulateNewDayReset = () => {
    setHabits(habits.map(h => ({ ...h, dailyChecked: false })));
    alert(" Simulated calendar day cycle processed! All completion marks have been safely reset.");
  };

  
  const totalTasks = habits.length;
  const completedCount = habits.filter(h => h.dailyChecked).length;
  const metricsPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  const maximumStreakValue = habits.length > 0 ? Math.max(...habits.map(h => h.streakCount)) : 0;

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#090d16', color: '#f8fafc', minHeight: '90vh', borderRadius: '24px', border: '1px solid #1e293b', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
      
      {/*  */}
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '25px', marginBottom: '35px', gap: '20px' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '28px', fontWeight: '800', bggradient: 'true', color: '#818cf8', letterSpacing: '-0.5px' }}>⚡ CodeSprint Momentum Studio</h1>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>Gamify your engineering consistency metrics and monitor production streaks live.</p>
        </div>
        
        {/*  */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', padding: '12px 20px', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Daily Velocity</span>
            <h3 style={{ margin: '0', fontSize: '24px', color: '#34d399' }}>{metricsPercent}%</h3>
          </div>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', padding: '12px 20px', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Max Streak</span>
            <h3 style={{ margin: '0', fontSize: '24px', color: '#fbbf24' }}>🔥 {maximumStreakValue} d</h3>
          </div>
        </div>
      </header>

      {/*  */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '35px' }}>
        
        {/*  */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '16px', margin: '0', color: '#94a3b8', uppercase: 'true', fontWeight: '700' }}>Active Sprint Pipelines ({completedCount}/{totalTasks})</h2>
            <button onClick={simulateNewDayReset} style={{ backgroundColor: 'transparent', border: '1px dashed #64748b', color: '#94a3b8', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Simulate New Day 🔄</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {habits.map(habit => (
              <div 
                key={habit.id}
                onClick={() => toggleDailyHabit(habit.id)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '18px 20px', 
                  backgroundColor: habit.dailyChecked ? '#111827' : '#1e293b50', 
                  border: habit.dailyChecked ? '1px solid #312e81' : '1px solid #1e293b', 
                  borderRadius: '14px', 
                  cursor: 'pointer',
                  transition: '0.2s',
                  opacity: habit.dailyChecked ? 0.8 : 1
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '6px', border: '2px solid #818cf8', backgroundColor: habit.dailyChecked ? '#818cf8' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.15s' }}>
                    {habit.dailyChecked && <span style={{ color: '#090d16', fontWeight: '900', fontSize: '12px' }}>✓</span>}
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: habit.dailyChecked ? '#64748b' : '#f8fafc', textDecoration: habit.dailyChecked ? 'line-through' : 'none' }}>{habit.name}</span>
                </div>
                
                {/*  */}
                <span style={{ fontSize: '12px', fontWeight: '700', color: habit.dailyChecked ? '#fbbf24' : '#94a3b8', backgroundColor: '#111827', padding: '6px 12px', borderRadius: '8px' }}>
                   {habit.streakCount} days
                </span>
              </div>
            ))}
          </div>
        </section>

        {/*  */}
        <section style={{ height: 'fit-content' }}>
          <form onSubmit={handleCreateHabit} style={{ backgroundColor: '#111827', border: '1px solid #1e293b', padding: '25px', borderRadius: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#94a3b8' }}>Register Routine Pipeline Target</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="e.g., Solve 1 Dynamic Programming ticket..." 
                value={inputTask}
                onChange={(e) => setInputTask(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#090d16', color: '#fff', fontSize: '14px', boxSizing: 'border-box', width: '100%' }}
              />
              <button type="submit" style={{ padding: '12px', backgroundColor: '#818cf8', color: '#090d16', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: '0.2s' }}>
                Inject Sprint Pipe ➕
              </button>
            </div>
          </form>
        </section>

      </div>
    </div>
  );
}

export default App;