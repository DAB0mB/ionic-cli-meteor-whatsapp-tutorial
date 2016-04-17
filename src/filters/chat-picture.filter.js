import meteor from 'meteor';
import { _ } from 'meteor/underscore';
import { Filter } from '../entities';

export default class chatPicture extends Filter {
  filter(chat) {
    if (!chat) return;

    let otherId = _.without(chat.userIds, meteor.userId())[0];
    let otherUser = meteor.users.findOne(otherId);
    let hasPicture = otherUser && otherUser.profile && otherUser.profile.picture;

    return hasPicture ? otherUser.profile.picture : chat.picture || '/img/user-default.svg';
  };
}