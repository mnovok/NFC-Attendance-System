const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Class = require('../models/Class');

// @desc    Saves attendance
// @route   POST /api/nfc
const saveAttendance =  async (req, res) => {
    const { uid } = req.body;

    if (!uid) {
        return res.status(400).send({ message: 'UID is missing' });
    }

    try {
        const student = await User.findOne({ uid: uid });

        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }

        //const classId = '678fc73771e8cb87c6f0dd48'; // Replace with actual class ID

        // TODO: trenutno je random al myb bi tribalo da se u body uz uid posalje i koji je kolegij
        const classIdArray = await Class.aggregate([{ $sample: { size: 1 } }]);
        const classId = classIdArray[0];

        // Create a new attendance record
        const attendance = new Attendance({
            studentId: student._id,
            classId: classId,
            status: 'Prisutan',
            studentUID: uid,
        });

        await attendance.save();

        res.status(201).send({ message: 'Attendance recorded successfully' });
    } catch (error) {
        console.error('Error processing NFC UID:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = {
    saveAttendance,
};