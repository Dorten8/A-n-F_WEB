const mockUser = [
    {
    id: 1,
    username: 'testuser',
    password: 'test123',
    }
];

const loginUser = async (req, res, next) => {
    try{
        
    const { username, password } = req.body;

    // Find the user in the mock database
    const user = mockUser.find(u => u.username === username);

    //check if user exists
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Username not found',
        });
    }

    // 3. Check password (in real apps, we'd compare hashed passwords)
    if (user.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'Incorrect password',
        });
    }

    res.json({
        success: true,
        message: 'Login successful',
        user: {
            id: user.id,
            username: user.username,
        }
    });
} catch (error) {
    // passes errors to the Express error handler
    next(error);
    }
};

module.exports = {
    loginUser,
};