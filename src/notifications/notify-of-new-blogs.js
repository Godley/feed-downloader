import AWS from 'aws-sdk';
import check from 'check-types';
import config from '../../config/config.json';
import log from '../log';

AWS.config.update(config.AWS.credentials);

function publishToNewPostTopic(subject, message) {
  return new Promise((resolve, reject) => {
    const sns = new AWS.SNS();
    sns.publish({
      TargetArn: config.AWS.SNS.newPostARN,
      Subject: subject,
      Message: message
    }, (error, data) => {
      if (error) {
        log.error({ error }, 'Error publishing to new post SNS topic');
        reject(new Error('Error publishing to new post SNS topic'));
      } else {
        log.info({ subject, message }, 'Posted to new post SNS Topic');
        resolve(data.MessageId);
      }
    });
  });
}

function formatNewBlogsNotification(usersToNewPosts) {
  if (!check.array(usersToNewPosts) || usersToNewPosts.length === 0) {
    throw new Error('Valid array of users with new posts required');
  }

  let notification = {};

  if (usersToNewPosts.length === 1) {
    const singleAuthor = usersToNewPosts[0];
    if (singleAuthor.newPosts.length === 1) {
      notification = {
        subject: `${singleAuthor.firstName} ${singleAuthor.lastName} published a new blog post`,
        message: singleAuthor.newPosts[0].title
      };
    } else {
      const intro = singleAuthor.newPosts.length > 2 ? 'Including:' : '';
      notification = {
        subject: `${singleAuthor.firstName} ${singleAuthor.lastName} published ${singleAuthor.newPosts.length} new blog posts`,
        message: `${intro} "${singleAuthor.newPosts[0].title}" and "${singleAuthor.newPosts[1].title}"`
      };
    }
  } else {
    const numberOfNewPosts = usersToNewPosts.reduce((total, user) => total + user.newPosts.length, 0);
    const intro = usersToNewPosts.length > 2 ? 'Including posts by' : 'Written by';
    notification = {
      subject: `Read ${numberOfNewPosts} new posts by ${usersToNewPosts.length} authors`,
      message: `${intro} ${usersToNewPosts[0].firstName} ${usersToNewPosts[0].lastName} and ${usersToNewPosts[1].firstName} ${usersToNewPosts[1].lastName}`
    };
  }

  return notification;
}

export default function notifyOfNewBlogs(usersToNewPosts) {
  const notification = formatNewBlogsNotification(usersToNewPosts);
  return publishToNewPostTopic(notification.subject, notification.message);
}
