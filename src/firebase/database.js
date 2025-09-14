import { getDatabase, ref, set, get, push, onValue, remove, update } from "firebase/database";
// Correcting the import path to be a standard module import without the extension
import { app, auth } from "./firebase"; 

const db = getDatabase(app);

// --- USER PROFILE FUNCTIONS ---
export const createUserProfile = async (user, role) => {
    const userRef = ref(db, 'users/' + user.uid);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
        await set(userRef, {
            uid: user.uid, email: user.email, displayName: user.displayName,
            photoURL: user.photoURL, role: role, createdAt: new Date().toISOString(),
        });
        const emailIndexRef = ref(db, 'emailToUid/' + btoa(user.email.toLowerCase()));
        await set(emailIndexRef, user.uid);
    }
};

// --- TEACHER & STUDENT CONNECTION FUNCTIONS ---
export const findUserByEmail = async (email) => {
    const emailIndexRef = ref(db, 'emailToUid/' + btoa(email.toLowerCase()));
    const snapshot = await get(emailIndexRef);
    if (snapshot.exists()) {
        const uid = snapshot.val();
        const userRef = ref(db, 'users/' + uid);
        const userSnap = await get(userRef);
        return userSnap.exists() ? userSnap.val() : null;
    }
    return null;
};

export const connectTeacherAndStudent = async (teacherId, studentId) => {
    const teacherStudentRef = ref(db, `teacher_students/${teacherId}/${studentId}`);
    await set(teacherStudentRef, true);
    const studentTeacherRef = ref(db, `student_teachers/${studentId}/${teacherId}`);
    await set(studentTeacherRef, true);
};

export const getStudentsForTeacher = (teacherId, callback) => {
    const teacherStudentsRef = ref(db, `teacher_students/${teacherId}`);
    return onValue(teacherStudentsRef, async (snapshot) => {
        if (snapshot.exists()) {
            const studentIds = Object.keys(snapshot.val());
            const studentPromises = studentIds.map(id => get(ref(db, 'users/' + id)));
            const studentSnapshots = await Promise.all(studentPromises);
            const students = studentSnapshots.map(snap => snap.val()).filter(Boolean);
            callback(students);
        } else {
            callback([]);
        }
    });
};

// --- TASK FUNCTIONS (STUDENT) ---
export const addTaskForUser = (userId, taskData) => {
    const tasksRef = ref(db, `tasks/${userId}`);
    const newTaskRef = push(tasksRef);
    return set(newTaskRef, { ...taskData, id: newTaskRef.key, completed: false, createdAt: new Date().toISOString() });
};
export const getTasksForUser = (userId, callback) => {
    const tasksRef = ref(db, `tasks/${userId}`);
    return onValue(tasksRef, (snapshot) => callback(snapshot.val() || {}));
};
export const updateTaskForUser = (userId, taskId, updates) => {
    const taskRef = ref(db, `tasks/${userId}/${taskId}`);
    return update(taskRef, updates);
};
export const deleteTaskForUser = (userId, taskId) => {
    const taskRef = ref(db, `tasks/${userId}/${taskId}`);
    return remove(taskRef);
};

// --- TASK FUNCTIONS (TEACHER) ---
export const assignTasksToStudents = async (taskData, studentIds) => {
    const teacher = auth.currentUser;
    if (!teacher) return;
    const taskPromises = studentIds.map(studentId => {
        const studentTasksRef = ref(db, `tasks/${studentId}`);
        const newTaskRef = push(studentTasksRef);
        return set(newTaskRef, {
            ...taskData,
            id: newTaskRef.key,
            assignedBy: teacher.uid,
            assignedByName: teacher.displayName,
            completed: false,
            createdAt: new Date().toISOString(),
        });
    });
    await Promise.all(taskPromises);
};

// --- Get all tasks assigned BY a teacher ---
export const getTasksAssignedByTeacher = (teacherId, callback) => {
    const teacherStudentsRef = ref(db, `teacher_students/${teacherId}`);
    return onValue(teacherStudentsRef, async (snapshot) => {
        if (!snapshot.exists()) {
            return callback([]);
        }
        const studentIds = Object.keys(snapshot.val());
        const allTasks = [];

        for (const studentId of studentIds) {
            const studentRef = ref(db, 'users/' + studentId);
            const studentSnap = await get(studentRef);
            const studentInfo = studentSnap.val();

            const tasksRef = ref(db, `tasks/${studentId}`);
            const tasksSnap = await get(tasksRef);
            if (tasksSnap.exists()) {
                const tasksData = tasksSnap.val();
                Object.values(tasksData).forEach(task => {
                    if (task.assignedBy === teacherId) {
                        allTasks.push({ ...task, student: studentInfo });
                    }
                });
            }
        }
        allTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        callback(allTasks);
    });
};

