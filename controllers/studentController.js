const Student = require('../models/user');

// @desc    Get all students
// @route   GET /api/students
// @access  Public
exports.getStudents = async (req, res) => {
  try {
    const { search, department } = req.query;
    
    // Build filter object
    let filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (department) {
      filter.department = { $regex: department, $options: 'i' };
    }
    
    const student = await Student.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: student.length,
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Public
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Create a new student
// @route   POST /api/students
// @access  Public
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    
    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists',
      });
    }
    
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Public
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists',
      });
    }
    
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Public
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'Student deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
