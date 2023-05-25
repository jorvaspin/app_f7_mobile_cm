/**
 * Importing pusher
 */
// // const Pusher = require('pusher-js');
// import {Pusher} from 'pusher-js'

// /**
//  * VuePusher class.
//  *
//  * @param {String} api_key
//  * @param {Object} options
//  */
// function VuePusher (api_key, options) {
//     this.pusher   = new Pusher(api_key, options);
//     this.channels = [];
// }

// /**
//  * Subscribe to the given channel and give a fallback to bind events to the channel.
//  *
//  * @param  {String}   channel_name
//  * @param  {Function} callback
//  */
// VuePusher.prototype.subscribe = function (channel_name, callback) {
//     var channel = this.pusher.subscribe(channel_name);

//     if (! this.channels.includes(channel)) {
//         this.channels.push(channel_name);
//     }

//     callback(channel);
// };

// /**
//  * Unsubscribe from the given channel.
//  *
//  * @param  {String} channel
//  */
// VuePusher.prototype.unsubscribe = function (channel) {
//     this.pusher.unsubscribe(channel);
// };

// /**
//  * Return all the chanels.
//  *
//  * @return {Array}
//  */
// VuePusher.prototype.getChannels = function () {
//     return this.channels;
// };

import Pusher from "pusher-js";

export default (app: { config: { globalProperties: { $pusher: Pusher; }; }; }, { apiKey, ...options }: any) => {
    // const Pusher = require('pusher-js')
    app.config.globalProperties.$pusher = new Pusher(apiKey, options)
  }

// export default{
//     install: (app, options) => {
//         app.config.globalProperties.$pusher = () => {
//             return new VuePusher(options.api_key, options.options);
//           }

//         // Vue.prototype.pusher  = pusher;
//         // Vue.prototype.$pusher = pusher.pusher; // Just in case they want to manage it themselves.
//     }
// };
