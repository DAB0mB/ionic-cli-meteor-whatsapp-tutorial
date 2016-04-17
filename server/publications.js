import meteor from 'meteor';
import { Chats, Messages } from './collections';

meteor.publish('users', function() {
  return meteor.users.find({}, { fields: { profile: 1 } });
});

meteor.publishComposite('chats', function() {
  if (!this.userId) return;

  return {
    find() {
      return Chats.find({ userIds: this.userId });
    },
    children: [
      {
        find(chat) {
          return Messages.find({ chatId: chat._id });
        }
      },
      {
        find(chat) {
          const query = { _id: { $in: chat.userIds } };
          const options = { fields: { profile: 1 } };

          return meteor.users.find(query, options);
        }
      }
    ]
  };
});