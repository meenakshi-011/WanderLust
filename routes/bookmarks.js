const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');

// Add to bookmarks
router.post('/:id', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const listingId = req.params.id;

        if (!user.bookmarks.includes(listingId)) {
            user.bookmarks.push(listingId);
            await user.save();
            req.flash("success", "Listing added to bookmarks!");
        } else {
            req.flash("error", "Listing already in bookmarks!");
        }

        res.redirect('back');
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect('back');
    }
});

// Remove from bookmarks
router.delete('/:id', isLoggedIn, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { bookmarks: req.params.id }
        });
        req.flash("success", "Listing removed from bookmarks!");
        res.redirect('back');
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect('back');
    }
});

module.exports = router; 