const Class = require('../models/Class');

// @desc    Gets class by professor id 
// @route   // GET /api/classes/
const getClassByProfessorId =  async (req, res) => {
    try {
        const { professorId } = req.query;
    
        const classes = await Class.find({ professorId })
            .populate('professorId') 

        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching classes data', error: err });
    }
}

module.exports = {
    getClassByProfessorId,
};