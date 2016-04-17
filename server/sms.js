import meteor from 'meteor';
import { Accounts } from 'meteor/accounts-base';

if (meteor.settings && meteor.settings.ACCOUNTS_PHONE) {
  Accounts._options.adminPhoneNumbers = meteor.settings.ACCOUNTS_PHONE.ADMIN_NUMBERS;
  Accounts._options.phoneVerificationMasterCode = meteor.settings.ACCOUNTS_PHONE.MASTER_CODE;
}