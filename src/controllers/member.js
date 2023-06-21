import mongoose from 'mongoose';
import Member from '../models/member';
import firebaseApp from '../helper/firebase'

const updateMember = (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    dni,
    phone,
    email,
    password,
    city,
    birthDay,
    postalCode,
    isActive,
    membership,
  } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: id,
      error: true,
    });
  }

  return Member.findOne({ dni })
    .then((repeatedDni) => {
      if (repeatedDni) {
        // eslint-disable-next-line
        if (repeatedDni.toObject()._id.toString() !== id) {
          return res.status(400).json({
            message: `DNI: ${repeatedDni.toObject().dni} already exists.`,
            data: undefined,
            error: true,
          });
        }
      }
      return Member.findOne({ email })
        .then((repeatedMail) => {
          if (repeatedMail) {
            // eslint-disable-next-line
            if (repeatedMail.toObject()._id.toString() !== id) {
              return res.status(400).json({
                message: `Email: ${repeatedMail.toObject().email} already exists.`,
                data: undefined,
                error: true,
              });
            }
          }
          return Member.findByIdAndUpdate(
            id,
            {
              firstName,
              lastName,
              dni,
              phone,
              email,
              password,
              city,
              birthDay,
              postalCode,
              isActive,
              membership,
            },
            { new: true },
          )
            .then((result) => {
              if (!result) {
                return res.status(404).json({
                  message: `The member with id: ${id} was not found`,
                  data: undefined,
                  error: true,
                });
              }
              return res.status(200).json({
                message: `The member with id: ${id} was successfully updated.`,
                data: result,
                error: false,
              });
            });
        });
    })
    .catch((error) => res.status(500).json(error));
};

const deleteMember = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'A valid Id is required',
      error: true,
    });
  }
  return Member.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `The member with id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Member ${result.firstName} deleted`,
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    }));
};

const getAllMembers = (req, res) => {
  Member.find()
    .then((members) => {
      if (members.length > 0) {
        res.status(200).json({
          message: 'Members list: ',
          data: members,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'No Members on the list, please create one.',
          error: true,
        });
      }
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

const getMembersById = (req, res) => {
  const { id } = req.params;

  Member.findById(id)
    .then((members) => {
      if (members !== null) {
        res.status(200).json({
          message: `Member Found! ${members.firstName}`,
          data: members,
          error: false,
        });
      } else {
        res.status(404).json({
          message: `Member not found with id: ${id}`,
          error: true,
        });
      }
    })
    .catch((error) => res.status(500).json({ message: 'An error ocurred', error }));
};

const createMembers = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'MEMBER' });
    const member = new Member(
      {
        firebaseUid: newFirebaseUser.uid,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dni: req.body.dni,
        phone: req.body.phone,
        city: req.body.city,
        birthDay: req.body.birthDay,
        postalCode: req.body.postalCode,
        membership: req.body.membership,
        isActive: req.body.isActive,
      },
    );

    const memberSaved = await member.save();

    return res.status(201).json({
      message: 'Register successfully',
      data: memberSaved,
    });
  } catch (error) {
    // Remove firebase user if it was created
    if (firebaseUid) {
      await firebaseApp.auth().deleteUser(firebaseUid);
    }

    return res.status(400).json({
      message: error.toString(),
    });
  }
};

export default {
  updateMember,
  deleteMember,
  getAllMembers,
  getMembersById,
  createMembers,
};
