// استرجاع المحاضرات والمهام والاختبارات من localStorage أو تعيين مصفوفة فارغة
const lectures = JSON.parse(localStorage.getItem("lectures")) || []; // استرجاع المحاضرات
const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // استرجاع المهام
const exams = JSON.parse(localStorage.getItem("exams")) || []; // استرجاع الاختبارات

// دالة لتحديث الوقت الحالي
const updateTime = () => {
    const now = new Date(); // الحصول على الوقت الحالي
    document.getElementById('currentTime').textContent = now.toLocaleTimeString('ar-EG');
}; // عرض الوقت بتنسيق عربي


// دالة لإضافة محاضرة
const addLecture = () => {
    const subject = document.getElementById('subjectName').value; // الحصول على اسم المحاضرة
    const startTime = document.getElementById('startTime').value; // الحصول على وقت البدء
    const endTime = document.getElementById('endTime').value; // الحصول على وقت الانتهاء
    const day = document.getElementById('dayOfWeek').value; // الحصول على اليوم

    // التحقق من ملء جميع الحقول
    if (subject && startTime && endTime && day) {
        const lecture = { subject, startTime, endTime, day }; // إنشاء كائن المحاضرة
        lectures.push(lecture); // إضافة المحاضرة إلى المصفوفة
        localStorage.setItem("lectures", JSON.stringify(lectures)); // حفظ المحاضرات في localStorage
        displayLectures(); // عرض المحاضرات
        alert('تمت إضافة المحاضرة بنجاح!'); // تنبيه بنجاح عملية الإضافة
    } else {
        alert('يرجى ملء جميع الحقول'); // تنبيه في حالة عدم ملء جميع الحقول
    }
};

// دالة لعرض المحاضرات في الجدول الأسبوعي
const displayLectures = () => {
    const table = document.getElementById('weeklySchedule').getElementsByTagName('tbody')[0];
    table.innerHTML = ""; // لتفريغ المحتوى السابق عند إعادة العرض

    lectures.forEach((lecture, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${lecture.day}</td><td>${lecture.subject}</td><td>${lecture.startTime}</td><td>${lecture.endTime}</td><td><button class="delete-button" onclick="deleteLecture(${index})">حذف</button></td>`; // إضافة بيانات المحاضرة
        table.appendChild(row); // إضافة الصف إلى الجدول
    });
};

// دالة لحذف المحاضرة
const deleteLecture = (index) => {
    lectures.splice(index, 1); // حذف المحاضرة من المصفوفة
    localStorage.setItem("lectures", JSON.stringify(lectures)); // تحديث المحاضرات في localStorage
    displayLectures(); // إعادة عرض المحاضرات
    alert('تم حذف المحاضرة بنجاح!'); // إضافة رسالة تأكيد للحذف
};

// دالة لإضافة مهمة
const addTask = () => {
    const taskName = document.getElementById('taskName').value; // الحصول على اسم المهمة
    const taskDate = document.getElementById('taskDate').value; // الحصول على تاريخ المهمة
    const taskTime = document.getElementById('taskTime').value; // الحصول على وقت المهمة

    // التحقق من ملء جميع الحقول
    if (taskName && taskDate && taskTime) {
        const task = { name: taskName, date: taskDate, time: taskTime }; // إنشاء كائن المهمة
        tasks.push(task); // إضافة المهمة إلى المصفوفة
        localStorage.setItem("tasks", JSON.stringify(tasks)); // حفظ المهام في localStorage
        displayTasks(); // عرض المهام
        alert('تمت إضافة المهمة بنجاح!'); // تنبيه بنجاح عملية الإضافة
    } else {
        alert('يرجى ملء جميع الحقول'); // تنبيه في حالة عدم ملء جميع الحقول
    }
};

// دالة لعرض المهام
const displayTasks = () => {
    const table = document.getElementById('taskList').getElementsByTagName('tbody')[0];// الحصول على tbody في جدول المهام
    table.innerHTML = ""; // لتفريغ المحتوى السابق عند إعادة العرض

    // تكرار المهام لعرضها في الجدول
    tasks.forEach((task, index) => {
        const row = document.createElement('tr'); // إنشاء صف جديد
        row.innerHTML = `<td>${task.name}</td><td>${task.date}</td><td>${task.time}</td><td><button class="delete-button" onclick="deleteTask(${index})">حذف</button></td>`; // إضافة بيانات المهمة
        table.appendChild(row); // إضافة الصف إلى الجدول
    });
};

// دالة لحذف المهمة
const deleteTask = (index) => {
    tasks.splice(index, 1); // حذف المهمة من المصفوفة
    localStorage.setItem("tasks", JSON.stringify(tasks)); // تحديث المهام في localStorage
    displayTasks(); // إعادة عرض المهام
    alert('تم حذف المهمة بنجاح!'); // إضافة رسالة تأكيد للحذف
};

// دالة لإضافة اختبار
const addExam = () => {
    const examSubject = document.getElementById('examSubject').value; // الحصول على اسم الاختبار
    const examDate = document.getElementById('examDate').value; // الحصول على تاريخ الاختبار
    const examTime = document.getElementById('examTime').value; // الحصول على وقت الاختبار

    // التحقق من ملء جميع الحقول
    if (examSubject && examDate && examTime) {
        const exam = { subject: examSubject, date: examDate, time: examTime }; // إنشاء كائن الاختبار
        exams.push(exam); // إضافة الاختبار إلى المصفوفة
        localStorage.setItem("exams", JSON.stringify(exams)); // حفظ الاختبارات في localStorage
        displayExams(); // عرض الاختبارات
        alert('تمت إضافة الاختبار بنجاح!'); // تنبيه بنجاح عملية الإضافة
    } else {
        alert('يرجى ملء جميع الحقول'); // تنبيه في حالة عدم ملء جميع الحقول
    }
};

// دالة لعرض الاختبارات
const displayExams = () => {
    const table = document.getElementById('examList').getElementsByTagName('tbody')[0];// الحصول على tbody في جدول الاختبارات
    table.innerHTML = ""; // لتفريغ المحتوى السابق عند إعادة العرض

    // تكرار الاختبارات لعرضها في الجدول
    exams.forEach((exam, index) => {
        const row = document.createElement('tr'); // إنشاء صف جديد
        row.innerHTML = `<td>${exam.subject}</td><td>${exam.date}</td><td>${exam.time}</td><td><button class="delete-button" onclick="deleteExam(${index})">حذف</button></td>`; // إضافة بيانات الاختبار
        table.appendChild(row); // إضافة الصف إلى الجدول
    });
};

// دالة لحذف الاختبار
const deleteExam = (index) => {
    exams.splice(index, 1); // حذف الاختبار من المصفوفة
    localStorage.setItem("exams", JSON.stringify(exams)); // تحديث الاختبارات في localStorage
    displayExams(); // إعادة عرض الاختبارات
    alert('تم حذف الامتحان بنجاح!'); // إضافة رسالة تأكيد للحذف
};

// استدعاء الدوال عند تحميل الصفحة
window.onload = () => {
    updateTime(); // تحديث الوقت عند تحميل الصفحة
    if (document.getElementById('weeklySchedule')) displayLectures(); // عرض المحاضرات إذا كانت موجودة
    if (document.getElementById('taskList')) displayTasks(); // عرض المهام إذا كانت موجودة
    if (document.getElementById('examList')) displayExams(); // عرض الاختبارات إذا كانت موجودة

    // تحديد الرابط النشط
    const currentLocation = window.location.pathname; // الحصول على مسار الصفحة الحالي
    const navLinks = document.querySelectorAll('nav ul li a'); // الحصول على جميع روابط التنقل

        // إزالة الفئة النشطة من جميع الروابط
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // التحقق من الرابط النشط وإضافته إلى الفئة
    navLinks.forEach(link => {
        if (link.href.includes(currentLocation)) {
            link.classList.add('active'); // إضافة فئة النشط
        }
    });
};

// إضافة الوقت الحالي
setInterval(updateTime, 1000); // تحديث الوقت كل ثانية