import { Mongo } from 'meteor/mongo'

export const Votes = new Mongo.Collection('votes')

Votes.rawCollection().createIndex({ slug: 1 })