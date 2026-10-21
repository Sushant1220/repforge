const express = require('express');
const router = express.Router();
const { NotificationStore } = require('../config/dbStore');
const { protect } = require('../middleware/auth');

// @route GET /api/notifications
router.get('/', protect, async (req, res) => {
  try {
    const notifications = await NotificationStore.find({ userId: req.user._id });
    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(notifications);
  } catch (error) {
    console.error('Fetch notifications error:', error);
    res.status(500).json({ message: 'Server error fetching notifications' });
  }
});

// @route PUT /api/notifications/:id/read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const notification = await NotificationStore.findOne({ _id: req.params.id, userId: req.user._id });
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (error) {
    console.error('Read notification error:', error);
    res.status(500).json({ message: 'Server error updating notification' });
  }
});

module.exports = router;
