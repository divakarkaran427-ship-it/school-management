const Notice = require('../models/notice.model');

// Notice create karo (Admin)
const createNotice = async (req, res) => {
  try {
    const { title, message, targetAudience } = req.body;

    const notice = new Notice({
      title,
      message,
      targetAudience,
      postedBy: req.user.id // jo logged in hai uska id
    });

    await notice.save();
    res.status(201).json({ message: 'Notice created successfully', notice });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Saare notices dekho
const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .populate('postedBy', 'name role')
      .sort({ createdAt: -1 }); // latest pehle
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Notice update karo
const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json({ message: 'Notice updated successfully', notice });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Notice delete karo
const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

module.exports = {
  createNotice,
  getAllNotices,
  updateNotice,
  deleteNotice
};