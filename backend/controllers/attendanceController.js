const Attendance = require('../models/Attendance');

// @desc    Gets student by id 
// @route   // GET /api/attendances/
const getStudentByUID =  async (req, res) => {
    try {
        const { studentUID } = req.query;
    
        const attendances = await Attendance.find({ studentUID })
            .populate('studentId') 
            .populate('classId');

        res.json(attendances);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching attendance data', error: err });
    }
}

module.exports = {
    getStudentByUID,
};