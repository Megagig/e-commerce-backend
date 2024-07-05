const adminModel = require('../models/adminModel');
const { responseReturn } = require('../utilities/response');
const bcrpty = require('bcrypt');
const { createToken } = require('../utilities/tokenCreate');
class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select('+password');
      // console.log(admin);
      if (admin) {
        const match = await bcrpty.compare(password, admin.password);
        // console.log(match);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, {
            token,
            message: 'Admin logged in sucessfully',
          });
        } else {
          responseReturn(res, 404, { error: 'Password is Incorrect' });
        }
      } else {
        responseReturn(res, 404, { error: 'Email not Found' });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // End method

  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === 'admin') {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        // responseReturn(res, 404, { error: 'User not Found' });
        console.log('Seller info');
      }
    } catch (error) {
      // responseReturn(res, 500, { error: error.message });
      console.log(error.message);
    }
  }; // End the getuser Method
}

module.exports = new authControllers();
