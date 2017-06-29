/**
 * Form publications
 */

import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { KbTopics, KbCategories } from '../collections';

// topic list
Meteor.publish('kb_topics.list', function kbTopicsList(params) {
  // console.log("params: ", params);
  check(params, {
    limit: Match.Optional(Number),
  });

  Counts.publish(this, 'kb_topics.list.count', KbTopics.find({}, {}), {
    noReady: true,
  });

  return KbTopics.find({});
});

// topic detail
Meteor.publish('kb_topics.detail', id => {
  check(id, String);

  return KbTopics.find({ createdUser: this.userId, _id: id });
});

// category list
Meteor.publish('kb_categories.list', function kbCategoriesList(params) {
  // console.log("params: ", params);
  check(params, {
    limit: Match.Optional(Number),
  });

  Counts.publish(this, 'kb_Categories.list.count', KbCategories.find({}, {}), {
    noReady: true,
  });

  return KbCategories.find({});
});

// category detail
Meteor.publish('kb_categories.detail', id => {
  check(id, String);

  return KbCategories.find({ createdUser: this.userId, _id: id });
});
