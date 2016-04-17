import meteor from 'meteor';
import { _ } from 'meteor/underscore';
import { Filter } from '../entities';

export default class chatName extends Filter {
  filter(chat) {
    if (!chat) return;

    let otherId = _.without(chat.userIds, meteor.userId())[0];
    let otherUser = meteor.users.findOne(otherId);
    let hasName = otherUser && otherUser.profile && otherUser.profile.name;

    return hasName ? otherUser.profile.name : chat.name || 'NO NAME';
  }
}
