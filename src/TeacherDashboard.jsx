import React, { useState, useEffect } from 'react';
// Correcting the import paths to be explicit for the bundler
import { useAuth } from './context/authContext/Index.jsx'; 
import { doSignOut } from './firebase/auth.js';
import { findUserByEmail, connectTeacherAndStudent, getStudentsForTeacher, assignTasksToStudents } from './firebase/database.js';

// --- ICONS ---
const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;

// --- AssignTaskModal Component ---
const AssignTaskModal = ({ students, onAssign, onCancel }) => {
    const [text, setText] = useState('');
    const [section, setSection] = useState('Assignments');
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);

    const handleAssign = () => {
        if (!text.trim() || selectedStudentIds.length === 0) {
            alert("Please provide a task title and select at least one student.");
            return;
        }
        onAssign({ text, section, date: new Date().toISOString().split('T')[0], priority: 'P2' }, selectedStudentIds);
    };
    
    const handleStudentSelect = (studentId) => {
        setSelectedStudentIds(prev => 
            prev.includes(studentId) 
                ? prev.filter(id => id !== studentId) 
                : [...prev, studentId]
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div className="p-6 border-b"><h2 className="text-xl font-bold text-gray-900">Assign a New Task</h2></div>
                <div className="p-6 space-y-4">
                    <input value={text} onChange={(e) => setText(e.target.value)} className="form-input w-full rounded-lg border-gray-300" placeholder="Task Title (e.g., Chapter 5 Reading)" />
                    <input value={section} onChange={(e) => setSection(e.target.value)} className="form-input w-full rounded-lg border-gray-300" placeholder="Project Name (e.g., History Paper)" />
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-2 block">Assign to Students</label>
                        <div className="max-h-48 overflow-y-auto border rounded-lg p-2 space-y-2">
                            {students.length > 0 ? students.map(student => (
                                <div key={student.uid} className="flex items-center gap-3 p-1 rounded hover:bg-gray-100">
                                    <input type="checkbox" id={student.uid} checked={selectedStudentIds.includes(student.uid)} onChange={() => handleStudentSelect(student.uid)} className="form-checkbox h-5 w-5 rounded text-sky-600" />
                                    <label htmlFor={student.uid} className="flex items-center gap-3 cursor-pointer">
                                        <img src={student.photoURL} alt={student.displayName} className="h-9 w-9 rounded-full" />
                                        <span>{student.displayName}</span>
                                    </label>
                                </div>
                            )) : <p className="text-gray-500 p-2">Add students to your roster first.</p>}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 bg-gray-50 p-4 rounded-b-xl">
                    <button onClick={onCancel} className="px-6 py-2 text-sm font-semibold rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
                    <button onClick={handleAssign} className="px-6 py-2 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-lg">Assign Task</button>
                </div>
            </div>
        </div>
    );
};

// --- The Main TeacherDashboard Component ---
export default function TeacherDashboard() {
    const { currentUser } = useAuth();
    const [students, setStudents] = useState([]);
    const [studentEmail, setStudentEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showAssignModal, setShowAssignModal] = useState(false);

    useEffect(() => {
        if (currentUser) {
            const unsubscribe = getStudentsForTeacher(currentUser.uid, setStudents);
            return () => unsubscribe(); // Cleanup the listener
        }
    }, [currentUser]);
    
    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (!studentEmail.trim() || !currentUser) return;
        setMessage('Searching...');
        const studentProfile = await findUserByEmail(studentEmail);
        if (studentProfile && studentProfile.role === 'student') {
            try {
                await connectTeacherAndStudent(currentUser.uid, studentProfile.uid);
                setMessage(`Successfully added ${studentProfile.displayName}!`);
                setStudentEmail('');
            } catch (error) {
                setMessage('An error occurred. Please try again.');
                console.error(error);
            }
        } else {
            setMessage('No student found with this email. Please ask them to sign up first.');
        }
    };
    
    const handleAssignTasks = async (taskData, studentIds) => {
        await assignTasksToStudents(taskData, studentIds);
        setShowAssignModal(false);
        alert(`Task assigned to ${studentIds.length} student(s)!`);
    };

    if (!currentUser) {
        return <div className="flex items-center justify-center h-screen font-semibold text-gray-600">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <img src={currentUser?.photoURL} alt="Teacher" className="h-10 w-10 rounded-full" />
                        <button onClick={doSignOut} className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700">Sign Out</button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Student</h2>
                        <form onSubmit={handleAddStudent} className="flex flex-col gap-4">
                            <input type="email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="Student's email address" className="form-input w-full rounded-lg" required />
                            <button type="submit" className="w-full py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600">Add Student</button>
                        </form>
                        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
                    </div>
                     <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Students ({students.length})</h2>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {students.map(student => (
                                <div key={student.uid} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50">
                                    <img src={student.photoURL} alt={student.displayName} className="h-10 w-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-gray-700">{student.displayName}</p>
                                        <p className="text-xs text-gray-500">{student.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <div className="flex justify-between items-center mb-4">
                           <h2 className="text-xl font-semibold text-gray-800">Assigned Work</h2>
                           <button onClick={() => setShowAssignModal(true)} className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white text-sm font-semibold rounded-lg hover:bg-sky-600"><AddIcon /> Assign New Task</button>
                        </div>
                        <div className="text-center py-8 text-gray-500">
                           <p>A list of tasks you've assigned will appear here.</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                       <h2 className="text-xl font-semibold text-gray-800 mb-4">Progress Analytics</h2>
                       <div className="text-center py-8 text-gray-500">
                          <p>Student progress charts will appear here soon.</p>
                       </div>
                    </div>
                </div>
            </main>

            {showAssignModal && <AssignTaskModal students={students} onAssign={handleAssignTasks} onCancel={() => setShowAssignModal(false)} />}
        </div>
    );
}

