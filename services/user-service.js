const employeeModel = require("../models/educationModel");
// const LeaveModel = require("../models/leave-model");
// const employeeSalaryModel = require("../models/employee-salary");
const bcrypt = require("bcrypt");

class employeeService {
  createemployee = async (employee) => await employeeModel.create(employee);

  updateemployee = async (_id, employee) =>
    await employeeModel.updateOne({ _id }, employee);

  //   findCount = async (filter) =>
  //     await employeeModel.find(filter).countDocuments();

  findemployee = async (filter) => await employeeModel.findOne(filter);

  findemployees = async (filter) =>
    await employeeModel.find(filter).populate("team");

  verifyPassword = async (password, hashPassword) =>
    await bcrypt.compare(password, hashPassword);

  resetPassword = async (_id, password) =>
    await employeeModel.updateOne({ _id }, { password });

  updatePassword = async (_id, password) =>
    await employeeModel.updateOne({ _id }, { password });

  findLeaders = async (req, res, next) =>
    await employeeModel.aggregate([
      { $match: { type: "leader" } },
      {
        $lookup: {
          from: "teams",
          localField: "_id",
          foreignField: "leader",
          as: "team"
        }
      }
    ]);

  findFreeLeaders = async (req, res, next) =>
    await employeeModel.aggregate([
      { $match: { type: "leader" } },
      {
        $lookup: {
          from: "teams",
          localField: "_id",
          foreignField: "leader",
          as: "team"
        }
      },
      { $match: { team: { $eq: [] } } }
    ]);

  createLeaveApplication = async (data) => LeaveModel.create(data);

  findLeaveApplication = async (data) => LeaveModel.findOne(data);

  findAllLeaveApplications = async (data) => LeaveModel.find(data);

  assignSalary = async (data) => employeeSalaryModel.create(data);

  findSalary = async (data) => employeeSalaryModel.findOne(data);

  findAllSalary = async (data) => employeeSalaryModel.find(data);

  updateSalary = async (data, updatedSalary) =>
    employeeSalaryModel.findOneAndUpdate(data, updatedSalary);

  updateLeaveApplication = async (id, updatedLeave) =>
    LeaveModel.findByIdAndUpdate(id, updatedLeave);
}

module.exports = new employeeService();
