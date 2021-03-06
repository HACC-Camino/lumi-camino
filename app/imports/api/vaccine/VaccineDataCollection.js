import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';

export const vaccineDataPublications = {
  vaccineData: 'VaccineData',
  vaccineDataAdmin: 'VaccineDataAdmin',
};

class VaccineDataCollection extends BaseCollection {
  constructor() {
    super('VaccineData', new SimpleSchema({
      owner: String,
      vaccineName: String,
      fDoseLotNum: String,
      fDoseDate: Date,
      fDoseSite: String,
      sDoseLotNum: String,
      sDoseDate: Date,
      sDoseSite: String,
      awsKey: {
        type: String,
        optional: true,
      },
    }));
  }

  define({ owner, vaccineName, fDoseLotNum, fDoseDate, fDoseSite, sDoseLotNum, sDoseDate, sDoseSite, awsKey }) {
    const docID = this._collection.insert({
      owner,
      vaccineName,
      fDoseLotNum,
      fDoseDate,
      fDoseSite,
      sDoseLotNum,
      sDoseDate,
      sDoseSite,
      awsKey,
    });
    return docID;
  }

  update(docID, { vaccineName, fDoseLotNum, fDoseDate, fDoseSite, sDoseLotNum,
    sDoseDate, sDoseSite, awsKey }) {
    const updateData = {};
    if (vaccineName) {
      updateData.vaccineName = vaccineName;
    }
    if (fDoseLotNum) {
      updateData.vaccineName = fDoseLotNum;
    }
    if (fDoseDate) {
      updateData.vaccineName = fDoseDate;
    }
    if (fDoseSite) {
      updateData.vaccineName = fDoseSite;
    }
    if (sDoseLotNum) {
      updateData.vaccineName = sDoseLotNum;
    }
    if (sDoseDate) {
      updateData.vaccineName = sDoseDate;
    }
    if (sDoseSite) {
      updateData.vaccineName = sDoseSite;
    }
    if (awsKey) {
      updateData.awsKey = awsKey;
    }
    this._collection.update(docID, { $set: updateData });
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;

      Meteor.publish(vaccineDataPublications.vaccineData, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      Meteor.publish(vaccineDataPublications.vaccineDataAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeVaccine() {
    if (Meteor.isClient) {
      return Meteor.subscribe(vaccineDataPublications.vaccineData);
    }
    return null;
  }

  subscribeVaccineAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(vaccineDataPublications.vaccineDataAdmin);
    }
    return null;
  }

  getUserVaccineData(username) {
    return this._collection.find({ owner: username }, {}).fetch();
  }

}

export const VaccineDatas = new VaccineDataCollection();
