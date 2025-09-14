import React, { useState, useEffect } from 'react';
import { useAuth } from '/src/context/authContext/Index.jsx'; 
import { doSignOut } from '/src/firebase/auth.js';
import { addTaskForUser, getTasksForUser, updateTaskForUser, deleteTaskForUser } from '/src/firebase/database.js';

// --- NEW DEPENDENCY FOR CALENDAR ---
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// --- ICONS (as SVG components for easy styling) ---
const AddTaskIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const AllTasksIcon = () => <span className="material-symbols-outlined">list_alt</span>;
const LearnIcon = () => <span className="material-symbols-outlined">school</span>;
const MonitorIcon = () => <span className="material-symbols-outlined">monitoring</span>;
const TodayIcon = () => <span className="material-symbols-outlined">today</span>;
const UpcomingIcon = () => <span className="material-symbols-outlined">event_upcoming</span>;
const CompletedIcon = () => <span className="material-symbols-outlined">check_circle</span>;
const ProjectIcon = () => <span className="material-symbols-outlined">folder</span>;
const FireIcon = () => <span className="material-symbols-outlined">local_fire_department</span>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const DeleteIcon = () => <span className="material-symbols-outlined">delete</span>;
const ArrowForwardIcon = () => <span className="material-symbols-outlined">arrow_forward</span>;


// --- MODAL AND UI SUB-COMPONENTS ---

const WelcomeScreen = ({ onLetsGo }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="m-8 flex w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl animate-fade-in-up">
            <div className="p-8 text-center"><h2 className="text-3xl font-bold text-gray-900">Welcome to TeachMate!</h2><p className="mt-2 text-gray-600">Your all-in-one platform for seamless learning and teaching.</p></div>
            <div className="grid grid-cols-1 gap-6 px-8 sm:grid-cols-3">
                <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-gray-50 p-6 text-center"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-500"><span className="material-symbols-outlined text-2xl">book</span></div><h3 className="text-lg font-semibold text-gray-800">Access Resources</h3><p className="mt-1 text-sm text-gray-500">Find all your course materials, notes, and readings in one place.</p></div>
                <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-gray-50 p-6 text-center"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-500"><span className="material-symbols-outlined text-2xl">schedule</span></div><h3 className="text-lg font-semibold text-gray-800">Track Deadlines</h3><p className="mt-1 text-sm text-gray-500">Never miss a due date with our integrated assignment calendar.</p></div>
                <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-gray-50 p-6 text-center"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-500"><span className="material-symbols-outlined text-2xl">forum</span></div><h3 className="text-lg font-semibold text-gray-800">Collaborate Easily</h3><p className="mt-1 text-sm text-gray-500">Connect with teachers and peers through integrated messaging.</p></div>
            </div>
            <div className="p-8"><button onClick={onLetsGo} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-sky-500 py-4 text-xl font-bold text-white shadow-lg transition-all hover:bg-sky-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-sky-400 focus:ring-offset-2">Let's go!<ArrowForwardIcon /></button></div>
        </div>
    </div>
);

const AddTaskModal = ({ onSave, onCancel }) => {
    const [taskName, setTaskName] = useState('');
    const [date, setDate] = useState(new Date()); 
    const [priority, setPriority] = useState('P4');
    const [section, setSection] = useState('Self Study');

    const handleSave = () => {
        if (!taskName.trim()) return;
        onSave({ text: taskName, date: date.toISOString().split('T')[0], priority, section });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg animate-fade-in-up">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Add a new task</h2>
                    <div className="space-y-4">
                        <input value={taskName} onChange={(e) => setTaskName(e.target.value)} className="form-input w-full rounded-lg bg-white text-gray-900 border-gray-300 focus:border-sky-500 focus:ring-sky-500" placeholder="Enter task name" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <DatePicker 
                                selected={date} 
                                onChange={(newDate) => setDate(newDate)} 
                                className="form-input w-full rounded-lg bg-white text-gray-900 border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                                dateFormat="yyyy-MM-dd"
                           />
                           <select value={priority} onChange={(e) => setPriority(e.target.value)} className="form-select w-full rounded-lg bg-white text-gray-900 border-gray-300 focus:border-sky-500 focus:ring-sky-500">
                               <option>P1</option><option>P2</option><option>P3</option><option>P4</option>
                           </select>
                        </div>
                         <input value={section} onChange={(e) => setSection(e.target.value)} className="form-input w-full rounded-lg bg-white text-gray-900 border-gray-300 focus:border-sky-500 focus:ring-sky-500" placeholder="Project / Section Name" />
                    </div>
                </div>
                <div className="flex justify-end gap-4 bg-gray-50 p-4 rounded-b-xl border-t">
                    <button onClick={onCancel} className="px-6 py-2 text-sm font-semibold rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-lg">Add task</button>
                </div>
            </div>
        </div>
    );
};

const EditTaskModal = ({ task, onSave, onCancel, onDelete }) => {
    const [taskData, setTaskData] = useState({ ...task, date: new Date(task.date) });

    const handleSave = () => {
        onSave({ ...taskData, date: taskData.date.toISOString().split('T')[0] });
    };
    
    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
           <div className="relative mx-auto flex w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl animate-fade-in-up">
               <div className="p-8"><h2 className="text-2xl font-bold text-gray-900">Edit Task</h2></div>
               <div className="space-y-6 px-8 pb-8">
                   <input name="text" value={taskData.text} onChange={handleChange} className="form-input w-full rounded-lg bg-white text-gray-900 border-gray-300 focus:border-sky-500 focus:ring-sky-500"/>
                   <DatePicker 
                        selected={taskData.date} 
                        onChange={(newDate) => setTaskData({ ...taskData, date: newDate })} 
                        className="form-input w-full rounded-lg bg-white text-gray-900 border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        dateFormat="yyyy-MM-dd"
                   />
                   <select name="priority" value={taskData.priority} onChange={handleChange} className="form-select w-full rounded-lg bg-white text-gray-900 border-gray-300 focus:border-sky-500 focus:ring-sky-500">
                        <option>P1</option><option>P2</option><option>P3</option><option>P4</option>
                   </select>
               </div>
               <div className="flex items-center justify-between bg-gray-50 px-8 py-6 rounded-b-2xl border-t">
                   <button onClick={() => onDelete(task.id)} className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg p-2 bg-red-50"><DeleteIcon/>Delete</button>
                   <div className="flex gap-4">
                       <button onClick={onCancel} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">Cancel</button>
                       <button onClick={handleSave} className="rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600">Save Changes</button>
                   </div>
               </div>
           </div>
        </div>
    );
};


// --- The Main StudentDashboard Component ---
export default function StudentDashboard() {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState({});
    const [projects, setProjects] = useState([]);
    const [activeSection, setActiveSection] = useState('Today');
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isLoadingTasks, setIsLoadingTasks] = useState(true);
    const [showWelcome, setShowWelcome] = useState(true);
    const [allTasksOpen, setAllTasksOpen] = useState(true);

    useEffect(() => {
        if (currentUser) {
            setIsLoadingTasks(true);
            const unsubscribe = getTasksForUser(currentUser.uid, (tasksData) => {
                setTasks(tasksData);
                if (tasksData) {
                    const projectNames = [...new Set(Object.values(tasksData).map(t => t.section || 'Uncategorized'))];
                    setProjects(projectNames);
                } else {
                    setProjects([]);
                }
                setIsLoadingTasks(false);
            });
            return () => unsubscribe();
        }
    }, [currentUser]);

    const handleAddTask = (newTaskData) => {
        if (!currentUser) return;
        addTaskForUser(currentUser.uid, newTaskData);
        setShowAddTaskModal(false);
    };

    const handleUpdateTask = (updatedTask) => {
        if (!currentUser) return;
        updateTaskForUser(currentUser.uid, updatedTask.id, updatedTask);
        setEditingTask(null);
    };

    const handleDeleteTask = (taskId) => {
        if (!currentUser) return;
        deleteTaskForUser(currentUser.uid, taskId);
        setEditingTask(null);
    };

    const toggleTaskCompletion = (task) => {
        if (!currentUser) return;
        updateTaskForUser(currentUser.uid, task.id, { completed: !task.completed });
    };

    const tasksArray = Object.values(tasks);
    const today = new Date().toISOString().split('T')[0];

    const getFilteredTasks = () => {
        if (activeSection === 'Today') return tasksArray.filter(t => t.date === today && !t.completed);
        if (activeSection === 'Upcoming') return tasksArray.filter(t => new Date(t.date).getTime() > new Date(today).getTime() && !t.completed);
        if (activeSection === 'Completed') return tasksArray.filter(t => t.completed);
        return tasksArray.filter(t => t.section === activeSection && !t.completed);
    };

    if (!currentUser) {
        return <div className="flex items-center justify-center h-screen font-semibold text-gray-600">Authenticating...</div>;
    }

    if (showWelcome) {
        return <WelcomeScreen onLetsGo={() => setShowWelcome(false)} />;
    }

    return (
        <div className="relative flex size-full min-h-screen flex-row bg-white" style={{fontFamily: 'Lexend, "Noto Sans", sans-serif'}}>
            <aside className="flex flex-col w-80 bg-gray-50 border-r border-gray-200 p-4 fixed h-full overflow-y-auto">
                <div className="flex items-center gap-3 mb-6 px-2">
                    <img className="rounded-full size-10" src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName || 'S'}&background=0ea5e9&color=fff`} alt="User avatar"/>
                    <h1 className="text-gray-800 text-lg font-semibold">{currentUser.displayName || "Student"}</h1>
                </div>
                <button onClick={() => setShowAddTaskModal(true)} className="flex items-center justify-center rounded-lg h-11 px-4 bg-sky-500 text-white text-sm font-bold gap-2 mb-4 hover:bg-sky-600 transition-colors shadow-sm">
                    <AddTaskIcon /> <span className="truncate">Add task</span>
                </button>
                <nav className="flex flex-col gap-4">
                    <div>
                        <button onClick={() => setAllTasksOpen(!allTasksOpen)} className="w-full flex items-center gap-3 px-2 py-2 text-gray-700 font-semibold text-left bg-sky-200">
                           <AllTasksIcon/> All Tasks <ChevronDownIcon className={`ml-auto transition-transform ${allTasksOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {allTasksOpen && (
                            <div className="pl-6 border-l-2 border-gray-200 ml-2 mt-2 space-y-1">
                                <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('Today'); }} className={`flex items-center justify-between gap-3 px-2 py-1.5 rounded-md font-medium text-sm ${activeSection === 'Today' ? 'bg-sky-100 text-sky-700' : 'text-gray-600 hover:bg-gray-100'}`}><div className="flex items-center gap-2"><TodayIcon /> Today</div> <span className="text-xs font-bold">{tasksArray.filter(t=>t.date === today && !t.completed).length}</span></a>
                                <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('Upcoming'); }} className={`flex items-center gap-3 px-2 py-1.5 rounded-md font-medium text-sm ${activeSection === 'Upcoming' ? 'bg-sky-100 text-sky-700' : 'text-gray-600 hover:bg-gray-100'}`}><UpcomingIcon /> Upcoming</a>
                                <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('Completed'); }} className={`flex items-center gap-3 px-2 py-1.5 rounded-md font-medium text-sm ${activeSection === 'Completed' ? 'bg-sky-100 text-sky-700' : 'text-gray-600 hover:bg-gray-100'}`}><CompletedIcon /> Completed</a>
                            </div>
                        )}
                    </div>
                    <a href="#" className="w-full flex items-center gap-3 px-2 py-2 text-gray-700 font-semibold hover:bg-gray-200 rounded-lg"><LearnIcon/> Learn</a>
                    <a href="#" className="w-full flex items-center gap-3 px-2 py-2 text-gray-700 font-semibold hover:bg-gray-200 rounded-lg"><MonitorIcon/> Monitor</a>
                </nav>

                <div className="flex flex-col gap-1 mt-6 pt-4 border-t">
                    <h2 className="text-gray-500 text-xs font-bold uppercase px-2 mb-2">My Projects</h2>
                    {projects.map(proj => (
                         <a key={proj} href="#" onClick={(e) => { e.preventDefault(); setActiveSection(proj); }} className={`flex items-center gap-3 px-2 py-1.5 rounded-md text-sm font-medium ${activeSection === proj ? 'bg-sky-100 text-sky-700' : 'text-gray-600 hover:bg-gray-100'}`}><ProjectIcon/> {proj}</a>
                    ))}
                </div>
            </aside>
            <main className="flex-1 ml-80 bg-gray-50">
                <header className="flex items-center justify-end whitespace-nowrap border-b border-solid border-gray-200 px-10 py-4 bg-white">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-orange-500"><FireIcon /><span className="font-bold text-sm">6 days</span></div>
                        
                        <button onClick={doSignOut} className="text-sm font-semibold text-gray-600 hover:text-red-500 bg-sky-100">Sign Out</button>
                    </div>
                </header>
                <div className="p-10">
                    <h1 className="text-gray-800 text-3xl font-bold leading-tight mb-8">{activeSection}</h1>
                     {isLoadingTasks ? <p className="text-gray-500">Loading tasks...</p> : (
                        <div className="space-y-2">
                           {getFilteredTasks().length > 0 ? getFilteredTasks().map(task => (
                                <div key={task.id} className="bg-white rounded-lg shadow-sm p-3 flex items-center gap-4">
                                   <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task)} className="h-5 w-5 rounded-full border-gray-300 text-sky-500 focus:ring-sky-500 shrink-0"/>
                                   <p onClick={() => setEditingTask(task)} className={`flex-1 cursor-pointer font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.text}</p>
                                   <span className={`px-2 py-1 text-xs font-semibold rounded-md ${task.priority === 'P1' ? 'text-red-700 bg-red-100' : 'text-gray-500 bg-gray-100'}`}>{task.priority}</span>
                                </div>
                           )) : <p className="text-gray-500">No tasks in this section. Great job!</p>}
                        </div>
                    )}
                </div>
            </main>
            {showAddTaskModal && <AddTaskModal onSave={handleAddTask} onCancel={() => setShowAddTaskModal(false)} />}
            {editingTask && <EditTaskModal task={editingTask} onSave={handleUpdateTask} onCancel={() => setEditingTask(null)} onDelete={handleDeleteTask} />}
        </div>
    );
}

