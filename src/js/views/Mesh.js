import { html } from '../Helpers.js';
import {translate as t} from '../Translation.js';
import State from '../State.js';
import Session from '../Session.js';
import ProfilePhotoPicker from '../components/ProfilePhotoPicker.js';
import { route } from '../lib/preact-router.es.js';
import SafeImg from '../components/SafeImg.js';
import Filters from '../components/Filters.js';
import CopyButton from '../components/CopyButton.js';
import FollowButton from '../components/FollowButton.js';
import Identicon from '../components/Identicon.js';
import View from './View.js';

class Mesh extends View {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();
    this.cart = {};
    this.carts = {};
    this.state = {items:{}, filtered:{}};
    this.items = {};
    this.filtered = {};
    this.id = 'profile';
    this.class = 'public-messages-view';
  }

  addToCart(k, user, e) {
    e.stopPropagation();
    const count = (this.cart[k + user] || 0) + 1;
    State.local.get('cart').get(user).get(k).put(count);
  }

  renderUserMesh(user) {
    const chat = Session.channels[user];
    const uuid = chat && chat.uuid;
    const followable = !(this.isMyProfile || user.length < 40);
    let profilePhoto;
    if (this.isMyProfile) {
      profilePhoto = html`<${ProfilePhotoPicker} currentPhoto=${this.state.photo} placeholder=${user} callback=${src => this.onProfilePhotoSet(src)}/>`;
    } else {
      if (this.state.photo) {
        profilePhoto = html`<${SafeImg} class="profile-photo" src=${this.state.photo}/>`
      } else {
        profilePhoto = html`<${Identicon} str=${user} width=250/>`
      }
    }
    return html`
      <div class="content">
        ${this.renderItems()}
      </div>
    `;
  }

  runCheck(){
    const keys = Object.keys(this.state.items);
    
    keys.map(k => {
          
      const i = this.state.items[k];
      if( i.type == $("#getType").val()){
        console.log(i.name)
      $("#placeResults").append(`
        <div class="card" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;">
          <p class="pointName">${i.name}</p>
          <p class="type">${i.type}</p>
          <p class="type">${i.from}</p>
        </div>
      `)} else {
        return false
      }
    })
  }

  getNotification() {
    const SUGGESTED_FOLLOW = 'hyECQHwSo7fgr2MVfPyakvayPeixxsaAWVtZ-vbaiSc.TXIp8MnCtrnW6n2MrYquWPcc-DTmZzMBmc2yaGv9gIU';
    if (this.state.noFollows) {
      return html`
          <div class="centered-container">
            <div class="msg">
                <div class="msg-content">
                    <p>${t('follow_someone_info')}</p>
                    <div class="profile-link-container">
                        <a href="/profile/${SUGGESTED_FOLLOW}" class="profile-link">
                            <${Identicon} str=${SUGGESTED_FOLLOW} width=40/>
                            <iris-text path="profile/name" user=${SUGGESTED_FOLLOW} placeholder="Suggested follow"/>
                        </a>
                        <${FollowButton} id=${SUGGESTED_FOLLOW}/>
                    </div>
                    <p>${t('alternatively')} <a
                            href="/profile/${Session.getPubKey()}">${t('give_your_profile_link_to_someone')}</a>.</p>
                </div>
            </div>
          </div>
      `
    }
    return '';
  }


  reUpClique(){
    var URL= $("#getURL").val()
    var name =     document.getElementById("getName").innerText

    console.log(name)

  }

  renderItems() {
    const cartTotalItems = Object.keys(this.cart).reduce((sum, k) => sum + this.cart[k], 0);
    const keys = Object.keys(this.state.items);

    var URL= $("#getURL").val()
    var name = $("#getName").val()
    return html`

    <div class="flex flex-col">
      <br/><br/>
      <div class="px-4 py-5 sm:px-6">
          <h1 class="text-lg leading-9 font-medium text-gray-900">
            

            Archetype

          </h1>
          <h1 class=" float-right text-5xl font-black leading-9 font-medium text-black">
            <iris-text id="" editable="false" spellcheck="false"  path="profile/name" placeholder="Your Name" user=${Session.getPubKey()}/>
          </h1>
          
          <p class="mt-1 text-sm text-gray-500">
            The plans for fabrication of this item. Available data will be displaied, confidencial data will not be shown.
          </p>
          <br/>
          <div class="">

            <button class="menuItem black" style="    background-color: #529c52;border-radius: 10px;padding: 8px 20px;color: white !important;" onClick=${() => route(`/point/new`)}>
              <a style="color: white" href="/point/new" class="name"><i class="fas fa-plus"></i></a>
            </button>
      
          </div>
      </div>
      <br/><br/>
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200">
              <dl>
                  <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium">
                          Core Information
                      </dt>
                  </div>
                  <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Name
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div class="">
                          <div class="text-sm font-medium text-gray-900">
                            <iris-text id="" editable="true" spellcheck="false"  path="profile/name" placeholder="Name" user=${Session.getPubKey()}/>
                          </div>
                          <div class="text-sm text-gray-500">
                            <iris-text id="" editable="true" spellcheck="false"  path="profile/contact" placeholder="Contact" user=${Session.getPubKey()}/>
                          </div>
                      </div>
                      </dd>
                  </div>
                  <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                          Clique
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                        <a href="${URL}">${name}</a>
                      </dd>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                        <iris-text id="getName" editable="true" spellcheck="false"  path="profile/cliqueName" placeholder="Clique Name" user=${Session.getPubKey()}/> <br/>
                        <iris-text id="getURL" editable="true" spellcheck="false"  path="profile/cliqueURL" placeholder="Clique URL" user=${Session.getPubKey()}/>

                      </dd>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                     
                        <button  onClick=${e => this.reUpClique(e)}>Update</button>
                      </dd>

                  </div>
       

                  <br/><br/>


                  <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                          Date Created | D.M.Y
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          9.2.12
                      </dd>
                  </div>
              </dl>
          </div>
      </div>

      <br/><br/>

      

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200">
              <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium">
                      Blueprints
                  </dt>
              </div>
              ${!keys.length ? html`<p>Browse and clone another Mesh's point to get started</p>`:''}
              ${keys.map(k => {
                const i = this.state.items[k];
                return html`
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" onClick=${() => route(`/point/${k}/${i.from}`)}>
                  <dt class="text-sm font-medium text-gray-500">
                    ${i.name}
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    Blueprint
                  </dd>
                </div>
                `
              })}
              

          </div>
      </div>
      <br/><br/>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200">
              <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium">
                      Fabrication details
                  </dt>
              </div>
              <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dd class="mt-1 shadow px-4 py-5 text-sm rounded-lg text-gray-900 sm:mt-0 sm:col-span-1">
                      <h1 class="text-2xl font-bold font-medium text-black">Sales</h1>
                      <h2 class="text-2xl py-2  font-medium text-gray-500">$10,000</h2>
                      <h2 class="text-base py-2  hover:text-blue-800   font-medium text-blue-500">See Available Records > </h2>
                  </dd>
                  <dd class="mt-1 shadow px-4 py-5 text-sm rounded-lg text-gray-900 sm:mt-0 sm:col-span-1">
                      <h1 class="text-2xl font-bold font-medium text-black">Units Produced</h1>
                      <h2 class="text-2xl py-2  font-medium text-gray-500">30</h2>
                      <h2 class="text-base py-2  hover:text-blue-800   font-medium text-blue-500">See Available Records > </h2>
                  </dd>
                  <dd class="mt-1 shadow px-4 py-5 text-sm rounded-lg text-gray-900 sm:mt-0 sm:col-span-1">
                      <h1 class="text-2xl font-bold font-medium text-black">Average Lead</h1>
                      <h2 class="text-2xl py-2  font-medium text-gray-500">23 Days</h2>
                      <h2 class="text-base py-2  hover:text-blue-800   font-medium text-blue-500">See Available Records > </h2>
                  </dd>
              </div>
          </div>
      </div>
      <br/><br/>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200">
              <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium">
                      Componentry
                  </dt>
              </div>
              <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dd class="mt-1 shadow px-4 py-5 text-sm rounded-lg text-gray-900 sm:mt-0 sm:col-span-1">
                      <h1 class="text-2xl font-bold font-medium text-black">Subcomponents</h1>
                      <h2 class="text-2xl py-2  font-medium text-gray-500">3</h2>
                      <h2 class="text-base py-2  hover:text-blue-800   font-medium text-blue-500">See Subcomponents > </h2>
                  </dd>
                  <dd class="mt-1 shadow px-4 py-5 text-sm rounded-lg text-gray-900 sm:mt-0 sm:col-span-1">
                      <h1 class="text-2xl font-bold font-medium text-black">Used in</h1>
                      <h2 class="text-2xl py-2  font-medium text-gray-500">920</h2>
                      <h2 class="text-base py-2  hover:text-blue-800   font-medium text-blue-500">See Available Parents > </h2>
                  </dd>
                  <dd class="mt-1 shadow px-4 py-5 text-sm rounded-lg text-gray-900 sm:mt-0 sm:col-span-1">
                      <h1 class="text-2xl font-bold font-medium text-black">Substitutes</h1>
                      <h2 class="text-2xl py-2  font-medium text-gray-500">1</h2>
                      <h2 class="text-base py-2  hover:text-blue-800   font-medium text-blue-500">See Available Substitutes > </h2>
                  </dd>
              </div>
          </div>
      </div>
      <br/><br/>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200">
              <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium">
                      Activity
                  </dt>
              </div>
              <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dd class="mt-1 shadow px-4 py-5 text-sm rounded-lg text-gray-900 sm:mt-0 sm:col-span-1">
                      <h1 class="text-2xl font-bold font-medium text-black">Active Systems Containing Part</h1>
                      <h2 class="text-2xl py-2  font-medium text-gray-500">10</h2>
                      <h2 class="text-base py-2  hover:text-blue-800   font-medium text-blue-500">See Systems > </h2>
                  </dd>
                  <dd class="mt-1 shadow px-4 py-5 text-sm rounded-lg text-gray-900 sm:mt-0 sm:col-span-2">
                      <h1 class="text-2xl font-bold font-medium text-black">Replacement Rate</h1>
                      <h2 class="text-2xl py-2  font-medium text-gray-500">1.01</h2>
                      <h2 class="text-base py-2  hover:text-blue-800   font-medium text-blue-500">See Available Replacement Records > </h2>
                  </dd>
              </div>
          </div>
      </div>
      <br/><br/>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200">
              <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium">
                      Attachments
                  </dt>
              </div>
              <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                  Attachements
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul role="list" class="border border-gray-200 rounded-md divide-y divide-gray-200">
                          <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                              <!-- Heroicon name: solid/paper-clip -->
                              <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                              </svg>
                              <span class="ml-2 flex-1 w-0 truncate">
                              resume_back_end_developer.pdf
                              </span>
                          </div>
                          <div class="ml-4 flex-shrink-0">
                              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                              Download
                              </a>
                          </div>
                          </li>
                          <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div class="w-0 flex-1 flex items-center">
                              <!-- Heroicon name: solid/paper-clip -->
                              <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                              </svg>
                              <span class="ml-2 flex-1 w-0 truncate">
                              coverletter_back_end_developer.pdf
                              </span>
                          </div>
                          <div class="ml-4 flex-shrink-0">
                              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                              Download
                              </a>
                          </div>
                          </li>
                      </ul>
                      </dd>
              </div>
              <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Issue
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      IX
                  </dd>
              </div>
          </div>
      </div>
      <br/><br/>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200">
              <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium">
                      Known Fabricators
                  </dt>
              </div>
              <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                  Name
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div class="">
                      <div class="text-sm font-medium text-gray-900">
                          IX
                      </div>
                      <div class="text-sm text-gray-500">
                          unkown
                      </div>
                  </div>
                  </dd>
              </div>
              <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Issue
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      IX
                  </dd>
              </div>
          </div>
      </div>
      <br/><br/>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200">
              <dl>
                  <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium">
                          Core Information
                      </dt>
                  </div>
                  <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                      Name
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div class="">
                          <div class="text-sm font-medium text-gray-900">
                              Jane Cooper
                          </div>
                          <div class="text-sm text-gray-500">
                              jane.cooper@example.com
                          </div>
                      </div>
                      </dd>
                  </div>
                  <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                          Issue
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                          IX
                      </dd>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                          Core Distributed Manufacture Documentation
                      </dd>
                  </div>
                  <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                          Date Created | D.M.Y
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          9.2.12
                      </dd>
                  </div>
              </dl>
          </div>
      </div>
      <br/><br/>
  </div>

    `;
  }

  renderView() {
    if (this.props.mesh) {
      return this.renderUserMesh(this.props.mesh);
    }
    return html`
      ${this.renderItems()}
    `;
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  updateTotalPrice() {
    const totalPrice = Object.keys(this.cart).reduce((sum, currentKey) => {
      const item = this.items[currentKey];
      const price = item && parseInt(item.price) || 0;
      return sum + price * this.cart[currentKey];
    }, 0);
    this.setState({totalPrice});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mesh !== this.props.mesh) {
      this.componentDidMount();
    }
  }

  getCartFromUser(user) {
    State.local.get('cart').get(user).map().on((v, k, a, e) => {
      if (k === '#') { return; } // blah
      this.eventListeners['cart' + user] = e;
      this.cart[k + user] = v;
      this.carts[user] = this.carts[user] || {};
      this.carts[user][k] = v;
      this.setState({cart: this.cart, carts: this.carts});
      this.updateTotalPrice();
    });
  }

  onPoint(p, id, a, e, from) {
    this.eventListeners['points' + from] = e;
    if (p) {
      const o = {};
      p.from = from;
      o[id] = p;
      Object.assign(this.items, o);
      this.updateTotalPrice();
    } else {
      delete this.items[id];
    }
    this.setState({items: this.items});
  }

  getPointsFromUser(user) {
    State.public.user(user).get('mesh').get('points').map().on((...args) => {
      return this.onPoint(...args, user);
    });
  }

  getAllCarts() {
    const carts = {};
    State.local.get('cart').map((o, user) => {
      if (!user) {
        delete carts[user];
        return;
      }
      if (carts[user]) { return; }
      carts[user] = true;
      this.getCartFromUser(user);
    });
  }

  getAllPoints(group) {
    State.group(group).map('mesh/points', (...args) => {
      this.onPoint(...args);
    });
  }

  componentDidMount() {
    const user = this.props.mesh;
    this.eventListeners.forEach(e => e.off());
    this.cart = {};
    this.items = {};
    this.isMyProfile = Session.getPubKey() === user;
    this.setState({followedUserCount: 0, followerCount: 0, name: '', photo: '', about: '', totalPrice: 0, items: {}, cart: {}});

    State.local.get('noFollows').on(noFollows => this.setState({noFollows}));

    State.local.get('groups').get('follows').map().on((isFollowing, user, a, e) => {
      if (isFollowing && this.state.noFollows && Session.getPubKey() !== user) {
        State.local.get('noFollows').put(false);
        e.off();
      }
    });

    if (user) {
      this.getCartFromUser(user);
      this.getPointsFromUser(user);
    } else {
      let prevGroup;
      State.local.get('filters').get('group').on((group,k,x,e) => {
        if (group !== prevGroup) {
          this.items = {};
          this.setState({items:{}});
          prevGroup = group;
          this.eventListeners.push(e);
          this.getAllPoints(group);
        }
      });
      this.getAllCarts();
    }
  }
}

export default Mesh;
