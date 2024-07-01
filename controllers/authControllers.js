const adminModel = require('../models/adminModel');
const { responseReturn } = require('../utilities/response');
const bcrpty = require('bcrypt');

class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select('+password');
      // console.log(admin);
      if (admin) {
        const match = await bcrpty.compare(password, admin.password);
        console.log(match);
      } else {
        responseReturn(res, 404, { error: 'Email not Found' });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new authControllers();
